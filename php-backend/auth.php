<?php
require_once 'cors.php';
require_once 'db.php';

// Set content type to JSON
header('Content-Type: application/json');

// Handle different request methods
$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'POST':
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (!isset($data['action'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Action is required']);
                exit;
            }

            switch ($data['action']) {
                case 'register':
                    // Validate required fields
                    if (!isset($data['name']) || !isset($data['email']) || !isset($data['password'])) {
                        http_response_code(400);
                        echo json_encode(['error' => 'Name, email, and password are required']);
                        exit;
                    }

                    // Check if email already exists
                    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
                    $stmt->execute([$data['email']]);
                    if ($stmt->rowCount() > 0) {
                        http_response_code(409);
                        echo json_encode(['error' => 'Email already registered']);
                        exit;
                    }

                    // Hash password
                    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

                    // Insert new user
                    $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
                    if ($stmt->execute([$data['name'], $data['email'], $hashedPassword])) {
                        $userId = $pdo->lastInsertId();
                        
                        // Start session
                        session_start();
                        $_SESSION['user_id'] = $userId;
                        $_SESSION['user_name'] = $data['name'];
                        
                        echo json_encode([
                            'message' => 'Registration successful',
                            'user' => [
                                'id' => $userId,
                                'name' => $data['name'],
                                'email' => $data['email']
                            ]
                        ]);
                    } else {
                        http_response_code(500);
                        echo json_encode(['error' => 'Failed to register user']);
                    }
                    break;

                case 'login':
                    // Validate required fields
                    if (!isset($data['email']) || !isset($data['password'])) {
                        http_response_code(400);
                        echo json_encode(['error' => 'Email and password are required']);
                        exit;
                    }

                    // Get user by email
                    $stmt = $pdo->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
                    $stmt->execute([$data['email']]);
                    $user = $stmt->fetch();

                    if (!$user || !password_verify($data['password'], $user['password'])) {
                        http_response_code(401);
                        echo json_encode(['error' => 'Invalid email or password']);
                        exit;
                    }

                    // Start session
                    session_start();
                    $_SESSION['user_id'] = $user['id'];
                    $_SESSION['user_name'] = $user['name'];

                    echo json_encode([
                        'message' => 'Login successful',
                        'user' => [
                            'id' => $user['id'],
                            'name' => $user['name'],
                            'email' => $user['email']
                        ]
                    ]);
                    break;

                default:
                    http_response_code(400);
                    echo json_encode(['error' => 'Invalid action']);
                    break;
            }
            break;

        case 'GET':
            // Check if user is logged in
            session_start();
            if (!isset($_SESSION['user_id'])) {
                http_response_code(401);
                echo json_encode(['error' => 'Not authenticated']);
                exit;
            }

            // Get user info
            $stmt = $pdo->prepare("SELECT id, name, email FROM users WHERE id = ?");
            $stmt->execute([$_SESSION['user_id']]);
            $user = $stmt->fetch();

            if (!$user) {
                http_response_code(404);
                echo json_encode(['error' => 'User not found']);
                exit;
            }

            echo json_encode($user);
            break;

        case 'DELETE':
            // Logout
            session_start();
            session_destroy();
            echo json_encode(['message' => 'Logged out successfully']);
            break;

        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?> 