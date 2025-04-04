<?php
// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

$host = 'localhost';
$username = 'root';
$password = '';

try {
    // Create connection without database
    $pdo = new PDO("mysql:host=$host", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Create database
    $sql = "CREATE DATABASE IF NOT EXISTS apothecare_db";
    $pdo->exec($sql);
    echo "Database created successfully<br>";

    // Use the database
    $pdo->exec("USE apothecare_db");

// Create testimonials table
$sql = "CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100),
    content TEXT NOT NULL,
    rating INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
    $pdo->exec($sql);
    echo "Testimonials table created successfully<br>";

    // Create products table
    $sql = "CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        sale_price DECIMAL(10,2),
        rating DECIMAL(3,2),
        reviews INT,
        properties JSON,
        is_new BOOLEAN DEFAULT FALSE,
        is_featured BOOLEAN DEFAULT FALSE,
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    $pdo->exec($sql);
    echo "Products table created successfully<br>";

// Create cart table
$sql = "CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        INDEX idx_session_id (session_id)
    )";
    $pdo->exec($sql);
    echo "Cart table created successfully<br>";

    // Insert sample products if the table is empty
    $stmt = $pdo->query("SELECT COUNT(*) FROM products");
    if ($stmt->fetchColumn() == 0) {
        $pdo->exec("
            INSERT INTO products (name, category, description, price, sale_price, rating, reviews, properties, is_new, is_featured, image_url) VALUES
            ('Biologische Honing', 'Honing', 'Pure biologische honing direct van de imker', 9.99, NULL, 4.8, 25, '{\"serving_size\":\"250g\",\"quantity\":\"1 pot\"}', true, true, '/images/products/honey1.jpg'),
            ('Bijenwas Kaarsen Set', 'Kaarsen', 'Handgemaakte kaarsen van pure bijenwas', 14.99, 12.99, 4.6, 15, '{\"quantity\":\"3 stuks\"}', true, true, '/images/products/candles1.jpg'),
            ('Propolis Tinctuur', 'Gezondheid', 'Natuurlijke propolis tinctuur voor weerstand', 19.99, NULL, 4.9, 32, '{\"serving_size\":\"30ml\",\"quantity\":\"1 fles\"}', false, true, '/images/products/propolis1.jpg'),
            ('Honingraat', 'Honing', 'Verse honingraat van Nederlandse bijen', 12.99, NULL, 4.7, 18, '{\"weight\":\"200g\"}', false, true, '/images/products/honeycomb1.jpg')
        ");
        echo "Sample products inserted successfully<br>";
    }

    // Insert sample testimonials if the table is empty
    $stmt = $pdo->query("SELECT COUNT(*) FROM testimonials");
    if ($stmt->fetchColumn() == 0) {
        $pdo->exec("
            INSERT INTO testimonials (name, role, content, rating) VALUES
            ('Maria de Vries', 'Vaste klant', 'De honing is heerlijk en de service is uitstekend!', 5),
            ('Jan Jansen', 'Imker', 'Mooie producten, snelle levering. Aanrader!', 4),
            ('Sophie Bakker', 'Natuurliefhebber', 'De bijenwas kaarsen zijn prachtig en ruiken heerlijk.', 5)
        ");
        echo "Sample testimonials inserted successfully<br>";
    }

    // Return JSON response
    http_response_code(200);
    echo json_encode(["message" => "Setup completed successfully!"]);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Setup failed: " . $e->getMessage()]);
}
?> 