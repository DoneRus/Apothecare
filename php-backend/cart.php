<?php
require_once 'cors.php';
require_once 'db.php';

header('Content-Type: application/json');

session_start();

// Zorg ervoor dat we een sessie ID hebben
if (!isset($_SESSION['id'])) {
    $_SESSION['id'] = session_id();
}

try {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            // Haal winkelwagen items op
            $stmt = $pdo->prepare("
                SELECT c.id as cart_id, c.quantity, p.* 
                FROM cart c 
                JOIN products p ON c.product_id = p.id 
                WHERE c.session_id = ?
            ");
            $stmt->execute([$_SESSION['id']]);
            $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Transform the results to include cart_id
            $items = array_map(function($item) {
                return [
                    'id' => $item['cart_id'],
                    'quantity' => $item['quantity'],
                    'product' => [
                        'id' => $item['id'],
                        'name' => $item['name'],
                        'category' => $item['category'],
                        'description' => $item['description'],
                        'price' => floatval($item['price']),
                        'sale_price' => $item['sale_price'] ? floatval($item['sale_price']) : null,
                        'rating' => floatval($item['rating']),
                        'reviews' => intval($item['reviews']),
                        'properties' => $item['properties'] ? json_decode($item['properties']) : null,
                        'is_new' => (bool)$item['is_new'],
                        'is_featured' => (bool)$item['is_featured'],
                        'image_url' => $item['image_url'] ?? null
                    ]
                ];
            }, $items);
            
            echo json_encode($items);
            break;

        case 'POST':
            // Voeg item toe aan winkelwagen
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['product_id']) || !isset($data['quantity'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Product ID and quantity are required']);
                exit;
            }

            // Controleer of product bestaat
            $stmt = $pdo->prepare("SELECT id FROM products WHERE id = ?");
            $stmt->execute([$data['product_id']]);
            if (!$stmt->fetch()) {
                http_response_code(404);
                echo json_encode(['error' => 'Product not found']);
                exit;
            }

            // Controleer of item al in winkelwagen zit
            $stmt = $pdo->prepare("
                SELECT id, quantity 
                FROM cart 
                WHERE session_id = ? AND product_id = ?
            ");
            $stmt->execute([$_SESSION['id'], $data['product_id']]);
            $existingItem = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($existingItem) {
                // Update hoeveelheid
                $stmt = $pdo->prepare("
                    UPDATE cart 
                    SET quantity = quantity + ? 
                    WHERE id = ?
                ");
                $stmt->execute([$data['quantity'], $existingItem['id']]);
                $cartId = $existingItem['id'];
            } else {
                // Voeg nieuw item toe
                $stmt = $pdo->prepare("
                    INSERT INTO cart (session_id, product_id, quantity) 
                    VALUES (?, ?, ?)
                ");
                $stmt->execute([$_SESSION['id'], $data['product_id'], $data['quantity']]);
                $cartId = $pdo->lastInsertId();
            }

            // Haal het bijgewerkte winkelwagen item op
            $stmt = $pdo->prepare("
                SELECT c.id as cart_id, c.quantity, p.* 
                FROM cart c 
                JOIN products p ON c.product_id = p.id 
                WHERE c.id = ?
            ");
            $stmt->execute([$cartId]);
            $item = $stmt->fetch(PDO::FETCH_ASSOC);

            // Transform the result
            $result = [
                'id' => $item['cart_id'],
                'quantity' => $item['quantity'],
                'product' => [
                    'id' => $item['id'],
                    'name' => $item['name'],
                    'category' => $item['category'],
                    'description' => $item['description'],
                    'price' => floatval($item['price']),
                    'sale_price' => $item['sale_price'] ? floatval($item['sale_price']) : null,
                    'rating' => floatval($item['rating']),
                    'reviews' => intval($item['reviews']),
                    'properties' => $item['properties'] ? json_decode($item['properties']) : null,
                    'is_new' => (bool)$item['is_new'],
                    'is_featured' => (bool)$item['is_featured'],
                    'image_url' => $item['image_url'] ?? null
                ]
            ];

            echo json_encode($result);
            break;

        case 'PUT':
            // Update winkelwagen item hoeveelheid
            $cartId = $_GET['id'] ?? null;
            if (!$cartId) {
                http_response_code(400);
                echo json_encode(['error' => 'Winkelwagen item ID is vereist']);
                exit;
            }

            $data = json_decode(file_get_contents('php://input'), true);
            if (!isset($data['quantity'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Hoeveelheid is vereist']);
                exit;
            }

            // Controleer of item in winkelwagen bestaat
            $stmt = $pdo->prepare("
                SELECT id 
                FROM cart 
                WHERE id = ? AND session_id = ?
            ");
            $stmt->execute([$cartId, $_SESSION['id']]);
            if (!$stmt->fetch()) {
                http_response_code(404);
                echo json_encode(['error' => 'Winkelwagen item niet gevonden']);
                exit;
            }

            // Update hoeveelheid
            $stmt = $pdo->prepare("
                UPDATE cart 
                SET quantity = ? 
                WHERE id = ?
            ");
            $stmt->execute([$data['quantity'], $cartId]);

            // Haal het bijgewerkte winkelwagen item op
            $stmt = $pdo->prepare("
                SELECT c.id as cart_id, c.quantity, p.* 
                FROM cart c 
                JOIN products p ON c.product_id = p.id 
                WHERE c.id = ?
            ");
            $stmt->execute([$cartId]);
            $item = $stmt->fetch(PDO::FETCH_ASSOC);

            // Transform the result
            $result = [
                'id' => $item['cart_id'],
                'quantity' => $item['quantity'],
                'product' => [
                    'id' => $item['id'],
                    'name' => $item['name'],
                    'category' => $item['category'],
                    'description' => $item['description'],
                    'price' => floatval($item['price']),
                    'sale_price' => $item['sale_price'] ? floatval($item['sale_price']) : null,
                    'rating' => floatval($item['rating']),
                    'reviews' => intval($item['reviews']),
                    'properties' => $item['properties'] ? json_decode($item['properties']) : null,
                    'is_new' => (bool)$item['is_new'],
                    'is_featured' => (bool)$item['is_featured'],
                    'image_url' => $item['image_url'] ?? null
                ]
            ];

            echo json_encode($result);
            break;

        case 'DELETE':
            if (isset($_GET['id'])) {
                // Verwijder specifiek item
                $stmt = $pdo->prepare("
                    DELETE FROM cart 
                    WHERE id = ? AND session_id = ?
                ");
                $stmt->execute([$_GET['id'], $_SESSION['id']]);
                
                if ($stmt->rowCount() === 0) {
                    http_response_code(404);
                    echo json_encode(['error' => 'Cart item not found']);
                    exit;
                }
                
                echo json_encode(['success' => true, 'message' => 'Item removed successfully']);
            } else {
                // Maak winkelwagen leeg
                $stmt = $pdo->prepare("
                    DELETE FROM cart 
                    WHERE session_id = ?
                ");
                $stmt->execute([$_SESSION['id']]);
                
                echo json_encode(['success' => true, 'message' => 'Cart cleared successfully']);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(['error' => 'Methode niet toegestaan']);
            break;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database fout: ' . $e->getMessage()]);
} 