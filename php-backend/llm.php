<?php
require_once 'cors.php';
require_once 'db.php';

// Set content type to JSON
header('Content-Type: application/json');

// Handle different request methods
$method = $_SERVER['REQUEST_METHOD'];

// Mistral AI API configuration
$apiKey = 'vHrsX9bWGF3AW7fR0hblwIQzSekJQHa1';
$apiEndpoint = 'https://api.mistral.ai/v1/chat/completions';

// Handle the request
try {
    switch ($method) {
        case 'POST':
            // Get the request body
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (!isset($data['messages']) || !is_array($data['messages'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Messages array is required']);
                exit;
            }
            
            // Prepare the request to the Mistral API
            $requestData = [
                'model' => $data['model'] ?? 'mistral-small',
                'messages' => $data['messages'],
                'temperature' => $data['temperature'] ?? 0.7,
                'max_tokens' => $data['max_tokens'] ?? 2000,
                'top_p' => $data['top_p'] ?? 1.0,
                'stream' => false
            ];
            
            // Initialize cURL session
            $ch = curl_init($apiEndpoint);
            
            // Set cURL options
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestData));
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Content-Type: application/json',
                "Authorization: Bearer $apiKey"
            ]);
            
            // Execute cURL request
            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            
            // Check for cURL errors
            if (curl_errno($ch)) {
                http_response_code(500);
                echo json_encode(['error' => 'API request failed: ' . curl_error($ch)]);
                exit;
            }
            
            // Check for API errors
            if ($httpCode >= 400) {
                http_response_code($httpCode);
                echo $response; // Forward the error response from the API
                exit;
            }
            
            // Close cURL session
            curl_close($ch);
            
            // Return the API response
            echo $response;
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error: ' . $e->getMessage()]);
}
?> 