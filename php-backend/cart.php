<?php
require_once 'cors.php';
require_once 'db_connect.php';

// Simple session management
session_start();
if (!isset($_SESSION['session_id'])) {
    $_SESSION['session_id'] = uniqid();
}
$session_id = $_SESSION['session_id'];

// Handle GET request to fetch cart items
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT c.id, c.quantity, p.* 
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.session_id = '$session_id'";
    $result = $conn->query($sql);
    
    if ($result) {
        $cart_items = array();
        while($row = $result->fetch_assoc()) {
            $cart_items[] = $row;
        }
        
        echo json_encode($cart_items);
    } else {
        echo json_encode(["error" => "Failed to fetch cart items: " . $conn->error]);
    }
}

// Handle POST request to add to cart
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the posted data
    $data = json_decode(file_get_contents("php://input"));
    
    // Validate required fields
    if (!isset($data->product_id) || !isset($data->quantity)) {
        echo json_encode(["error" => "Product ID and quantity are required"]);
        exit;
    }
    
    $product_id = intval($data->product_id);
    $quantity = intval($data->quantity);
    
    // Check if product exists
    $check_product = $conn->query("SELECT id FROM products WHERE id = $product_id");
    if ($check_product->num_rows === 0) {
        echo json_encode(["error" => "Product not found"]);
        exit;
    }
    
    // Check if product already in cart
    $sql = "SELECT id, quantity FROM cart 
            WHERE product_id = $product_id AND session_id = '$session_id'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        // Update existing cart item
        $row = $result->fetch_assoc();
        $new_quantity = $row['quantity'] + $quantity;
        $sql = "UPDATE cart SET quantity = $new_quantity 
                WHERE id = " . $row['id'];
    } else {
        // Add new cart item
        $sql = "INSERT INTO cart (product_id, quantity, session_id) 
                VALUES ($product_id, $quantity, '$session_id')";
    }
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Cart updated successfully"]);
    } else {
        echo json_encode(["error" => "Failed to update cart: " . $conn->error]);
    }
}

// Handle DELETE request to remove from cart
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"));
    
    // Handle "clear cart" request
    if (isset($data->clear_cart) && $data->clear_cart === true) {
        $sql = "DELETE FROM cart WHERE session_id = '$session_id'";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Cart cleared successfully"]);
        } else {
            echo json_encode(["error" => "Failed to clear cart: " . $conn->error]);
        }
        exit;
    }
    
    // Handle individual item removal
    if (!isset($data->cart_id)) {
        echo json_encode(["error" => "Cart item ID is required"]);
        exit;
    }
    
    $cart_id = intval($data->cart_id);
    
    $sql = "DELETE FROM cart WHERE id = $cart_id AND session_id = '$session_id'";
    
    if ($conn->query($sql) === TRUE) {
        if ($conn->affected_rows > 0) {
            echo json_encode(["message" => "Item removed from cart successfully"]);
        } else {
            echo json_encode(["error" => "Item not found in cart"]);
        }
    } else {
        echo json_encode(["error" => "Failed to remove item from cart: " . $conn->error]);
    }
}

$conn->close();
?> 