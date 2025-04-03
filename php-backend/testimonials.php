<?php
require_once 'cors.php';
require_once 'db.php';

try {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            // Get all testimonials
            $stmt = $pdo->prepare("
                SELECT * FROM testimonials 
                ORDER BY created_at DESC
            ");
            $stmt->execute();
            $testimonials = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode($testimonials);
            break;

        case 'POST':
            // Get the posted data
            $data = json_decode(file_get_contents("php://input"));
            
            // Validate required fields
            if (!isset($data->name) || !isset($data->content) || !isset($data->rating)) {
                http_response_code(400);
                echo json_encode([
                    'error' => 'Name, content, and rating are required'
                ]);
                exit;
            }
            
            // Validate rating (1-5)
            if ($data->rating < 1 || $data->rating > 5) {
                http_response_code(400);
                echo json_encode([
                    'error' => 'Rating must be between 1 and 5'
                ]);
                exit;
            }
            
            // Prepare and execute the insert statement
            $stmt = $pdo->prepare("
                INSERT INTO testimonials (name, role, content, rating) 
                VALUES (:name, :role, :content, :rating)
            ");
            
            $stmt->execute([
                ':name' => $data->name,
                ':role' => $data->role ?? '',
                ':content' => $data->content,
                ':rating' => $data->rating
            ]);
            
            $testimonial_id = $pdo->lastInsertId();
            
            echo json_encode([
                'message' => 'Testimonial added successfully',
                'id' => $testimonial_id
            ]);
            break;

        default:
            http_response_code(405);
            echo json_encode([
                'error' => 'Method not allowed'
            ]);
            break;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Database error: ' . $e->getMessage()
    ]);
}
?> 