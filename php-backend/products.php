<?php
require_once 'cors.php';
require_once 'db.php';

// Set content type to JSON
header('Content-Type: application/json');

// Handle different request methods
$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'GET':
            // Get all products or a single product
            if (isset($_GET['id'])) {
                $id = $_GET['id'];
                $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
                $stmt->execute([$id]);
                
                if ($stmt->rowCount() > 0) {
                    $product = $stmt->fetch();
                    echo json_encode($product);
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'Product not found']);
                }
            } else {
                $stmt = $pdo->query("SELECT * FROM products");
                $products = $stmt->fetchAll();
                echo json_encode($products);
            }
            break;
            
        case 'POST':
            // Add a new product
            $data = json_decode(file_get_contents("php://input"), true);
            
            // Validate required fields
            if (!isset($data['name']) || !isset($data['category']) || !isset($data['price'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing required fields: name, category, and price are required']);
                exit;
            }
            
            // Default values for optional fields
            $description = $data['description'] ?? '';
            $sale_price = $data['sale_price'] ?? null;
            $rating = $data['rating'] ?? 0;
            $reviews = $data['reviews'] ?? 0;
            $properties = $data['properties'] ? json_encode($data['properties']) : null;
            $is_new = $data['is_new'] ?? 0;
            $is_featured = $data['is_featured'] ?? 0;
            $image_url = $data['image_url'] ?? null;
            
            $sql = "INSERT INTO products 
                    (name, category, description, price, sale_price, rating, reviews, properties, is_new, is_featured, image_url) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            
            $stmt = $pdo->prepare($sql);
            
            if ($stmt->execute([
                $data['name'],
                $data['category'],
                $description,
                $data['price'],
                $sale_price,
                $rating,
                $reviews,
                $properties,
                $is_new,
                $is_featured,
                $image_url
            ])) {
                $id = $pdo->lastInsertId();
                
                // Return the newly created product
                $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
                $stmt->execute([$id]);
                $product = $stmt->fetch();
                
                http_response_code(201); // Created
                echo json_encode([
                    'message' => 'Product created successfully',
                    'product' => $product
                ]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to create product']);
            }
            break;
            
        case 'PUT':
            // Update an existing product
            if (!isset($_GET['id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Product ID is required']);
                exit;
            }
            
            $id = $_GET['id'];
            $data = json_decode(file_get_contents("php://input"), true);
            
            // Build the update query dynamically based on provided fields
            $updateFields = [];
            $params = [];
            
            if (isset($data['name'])) {
                $updateFields[] = 'name = ?';
                $params[] = $data['name'];
            }
            
            if (isset($data['category'])) {
                $updateFields[] = 'category = ?';
                $params[] = $data['category'];
            }
            
            if (isset($data['description'])) {
                $updateFields[] = 'description = ?';
                $params[] = $data['description'];
            }
            
            if (isset($data['price'])) {
                $updateFields[] = 'price = ?';
                $params[] = $data['price'];
            }
            
            if (array_key_exists('sale_price', $data)) {
                $updateFields[] = 'sale_price = ?';
                $params[] = $data['sale_price'];
            }
            
            if (isset($data['rating'])) {
                $updateFields[] = 'rating = ?';
                $params[] = $data['rating'];
            }
            
            if (isset($data['reviews'])) {
                $updateFields[] = 'reviews = ?';
                $params[] = $data['reviews'];
            }
            
            if (isset($data['properties'])) {
                $updateFields[] = 'properties = ?';
                $params[] = json_encode($data['properties']);
            }
            
            if (isset($data['is_new'])) {
                $updateFields[] = 'is_new = ?';
                $params[] = $data['is_new'] ? 1 : 0;
            }
            
            if (isset($data['is_featured'])) {
                $updateFields[] = 'is_featured = ?';
                $params[] = $data['is_featured'] ? 1 : 0;
            }
            
            if (isset($data['image_url'])) {
                $updateFields[] = 'image_url = ?';
                $params[] = $data['image_url'];
            }
            
            if (empty($updateFields)) {
                http_response_code(400);
                echo json_encode(['error' => 'No fields to update']);
                exit;
            }
            
            // Add the ID to the params array
            $params[] = $id;
            
            $sql = "UPDATE products SET " . implode(', ', $updateFields) . " WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            
            if ($stmt->execute($params)) {
                // Return the updated product
                $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
                $stmt->execute([$id]);
                
                if ($stmt->rowCount() > 0) {
                    $product = $stmt->fetch();
                    echo json_encode([
                        'message' => 'Product updated successfully',
                        'product' => $product
                    ]);
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'Product not found after update']);
                }
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to update product']);
            }
            break;
            
        case 'DELETE':
            // Delete a product
            if (!isset($_GET['id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Product ID is required']);
                exit;
            }
            
            $id = $_GET['id'];
            
            $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
            
            if ($stmt->execute([$id])) {
                if ($stmt->rowCount() > 0) {
                    echo json_encode(['message' => 'Product deleted successfully']);
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'Product not found']);
                }
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to delete product']);
            }
            break;
            
        default:
            http_response_code(405); // Method Not Allowed
            echo json_encode(['error' => 'Method not allowed']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?> 