<?php
require_once 'cors.php';
require_once 'db.php';

// Set a larger limit for file uploads (10MB)
ini_set('upload_max_filesize', '10M');
ini_set('post_max_size', '10M');

try {
    // Check if a file was uploaded
    if (!isset($_FILES['image'])) {
        http_response_code(400);
        echo json_encode(['error' => 'No image file uploaded']);
        exit;
    }

    $file = $_FILES['image'];
    $productId = $_POST['product_id'] ?? null;

    // Validate product ID
    if (!$productId) {
        http_response_code(400);
        echo json_encode(['error' => 'Product ID is required']);
        exit;
    }

    // Check for upload errors
    if ($file['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['error' => 'File upload failed']);
        exit;
    }

    // Validate file type
    $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!in_array($file['type'], $allowedTypes)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid file type. Only JPG, PNG, and WebP are allowed']);
        exit;
    }

    // Create upload directory if it doesn't exist
    $uploadDir = '../public/images/products/';
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Generate unique filename
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = uniqid('product_') . '.' . $extension;
    $filepath = $uploadDir . $filename;

    // Move uploaded file
    if (!move_uploaded_file($file['tmp_name'], $filepath)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save image']);
        exit;
    }

    // Update product in database with image URL
    $imageUrl = '/images/products/' . $filename;
    $stmt = $pdo->prepare("UPDATE products SET image_url = ? WHERE id = ?");
    $stmt->execute([$imageUrl, $productId]);

    if ($stmt->rowCount() === 0) {
        // Remove uploaded file if product update failed
        unlink($filepath);
        http_response_code(404);
        echo json_encode(['error' => 'Product not found']);
        exit;
    }

    echo json_encode([
        'success' => true,
        'message' => 'Image uploaded successfully',
        'image_url' => $imageUrl
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?> 