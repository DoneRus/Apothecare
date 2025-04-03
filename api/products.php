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

// Handle GET request to fetch products
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM products";
    $result = $conn->query($sql);
    
    if ($result) {
        $products = array();
        while($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
        
        echo json_encode($products);
    } else {
        echo json_encode(["error" => "Failed to fetch products: " . $conn->error]);
    }
}

// Handle POST request to add product
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the posted data
    $data = json_decode(file_get_contents("php://input"));
    
    // Validate required fields
    if (!isset($data->name) || !isset($data->price)) {
        echo json_encode(["error" => "Name and price are required"]);
        exit;
    }
    
    $name = $conn->real_escape_string($data->name);
    $price = floatval($data->price);
    $description = $conn->real_escape_string($data->description ?? '');
    $category = $conn->real_escape_string($data->category ?? '');
    $rating = isset($data->rating) ? floatval($data->rating) : 0;
    
    $sql = "INSERT INTO products (name, price, description, category, rating) 
            VALUES ('$name', $price, '$description', '$category', $rating)";
    
    if ($conn->query($sql) === TRUE) {
        $product_id = $conn->insert_id;
        echo json_encode([
            "message" => "Product added successfully",
            "id" => $product_id
        ]);
    } else {
        echo json_encode(["error" => "Failed to add product: " . $conn->error]);
    }
}

$conn->close();
?> 