<?php
// Prevent any output before headers
if (ob_get_length()) ob_clean();

// Set content type to JSON
header("Content-Type: application/json; charset=UTF-8");

// Allow requests from the frontend
header("Access-Control-Allow-Origin: http://localhost:3000");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Allow credentials (cookies, authorization headers)
header("Access-Control-Allow-Credentials: true");

// Cache preflight requests for 1 hour
header("Access-Control-Max-Age: 3600");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Error handler function
function handleError($errno, $errstr, $errfile, $errline) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Internal Server Error: ' . $errstr
    ]);
    exit();
}

// Set error handler
set_error_handler('handleError');

// Exception handler function
function handleException($e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Internal Server Error: ' . $e->getMessage()
    ]);
    exit();
}

// Set exception handler
set_exception_handler('handleException');
?> 