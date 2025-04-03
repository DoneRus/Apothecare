<?php
// Allow cross-origin requests from your frontend
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

include_once 'db_connect.php';

// Handle GET request to fetch testimonials
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM testimonials";
    $result = $conn->query($sql);
    
    if ($result) {
        $testimonials = array();
        while($row = $result->fetch_assoc()) {
            $testimonials[] = $row;
        }
        
        echo json_encode($testimonials);
    } else {
        echo json_encode(["error" => "Failed to fetch testimonials: " . $conn->error]);
    }
}

// Handle POST request to add testimonial
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the posted data
    $data = json_decode(file_get_contents("php://input"));
    
    // Validate required fields
    if (!isset($data->name) || !isset($data->content) || !isset($data->rating)) {
        echo json_encode(["error" => "Name, content, and rating are required"]);
        exit;
    }
    
    $name = $conn->real_escape_string($data->name);
    $role = $conn->real_escape_string($data->role ?? '');
    $content = $conn->real_escape_string($data->content);
    $rating = intval($data->rating);
    
    // Validate rating (1-5)
    if ($rating < 1 || $rating > 5) {
        echo json_encode(["error" => "Rating must be between 1 and 5"]);
        exit;
    }
    
    $sql = "INSERT INTO testimonials (name, role, content, rating) 
            VALUES ('$name', '$role', '$content', $rating)";
    
    if ($conn->query($sql) === TRUE) {
        $testimonial_id = $conn->insert_id;
        echo json_encode([
            "message" => "Testimonial added successfully",
            "id" => $testimonial_id
        ]);
    } else {
        echo json_encode(["error" => "Failed to add testimonial: " . $conn->error]);
    }
}

$conn->close();
?> 