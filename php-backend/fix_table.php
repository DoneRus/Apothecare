<?php
// Database configuration
require_once 'db.php';

header('Content-Type: text/html; charset=utf-8');

try {
    echo "<h2>Fixing products table</h2>";
    
    // First, check if the image_url column exists
    $stmt = $pdo->query("SHOW COLUMNS FROM products LIKE 'image_url'");
    $columnExists = $stmt->rowCount() > 0;
    
    if ($columnExists) {
        echo "<p>The image_url column already exists. No changes needed.</p>";
    } else {
        echo "<p>The image_url column does not exist. Proceeding with fix...</p>";
        
        // We need to drop the cart table first since it has a foreign key to products
        $pdo->exec("DROP TABLE IF EXISTS cart");
        echo "<p>Dropped cart table to remove foreign key constraint</p>";
        
        // Drop the products table if it exists
        $pdo->exec("DROP TABLE IF EXISTS products");
        echo "<p>Dropped products table</p>";
        
        // Recreate the products table with the correct schema
        $sql = "CREATE TABLE products (
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
        echo "<p>Products table created successfully</p>";
        
        // Insert sample products
        $pdo->exec("
            INSERT INTO products (name, category, description, price, sale_price, rating, reviews, properties, is_new, is_featured, image_url) VALUES
            ('Biologische Honing', 'Honing', 'Pure biologische honing direct van de imker', 9.99, NULL, 4.8, 25, '{\"serving_size\":\"250g\",\"quantity\":\"1 pot\"}', true, true, '/images/products/honey1.jpg'),
            ('Bijenwas Kaarsen Set', 'Kaarsen', 'Handgemaakte kaarsen van pure bijenwas', 14.99, 12.99, 4.6, 15, '{\"quantity\":\"3 stuks\"}', true, true, '/images/products/candles1.jpg'),
            ('Propolis Tinctuur', 'Gezondheid', 'Natuurlijke propolis tinctuur voor weerstand', 19.99, NULL, 4.9, 32, '{\"serving_size\":\"30ml\",\"quantity\":\"1 fles\"}', false, true, '/images/products/propolis1.jpg'),
            ('Honingraat', 'Honing', 'Verse honingraat van Nederlandse bijen', 12.99, NULL, 4.7, 18, '{\"weight\":\"200g\"}', false, true, '/images/products/honeycomb1.jpg')
        ");
        echo "<p>Sample products inserted successfully</p>";
        
        // Recreate the cart table
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
        echo "<p>Cart table recreated successfully</p>";
    }
    
    // Verify that the image_url column now exists
    $stmt = $pdo->query("SHOW COLUMNS FROM products LIKE 'image_url'");
    if ($stmt->rowCount() > 0) {
        echo "<h3 style='color: green;'>Fix successful! The image_url column now exists in the products table.</h3>";
    } else {
        echo "<h3 style='color: red;'>Fix failed! The image_url column still does not exist in the products table.</h3>";
    }
    
    // Show the products table schema
    echo "<h3>Current products table schema:</h3>";
    echo "<pre>";
    $stmt = $pdo->query("DESCRIBE products");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        print_r($row);
    }
    echo "</pre>";
    
} catch(PDOException $e) {
    echo "<h3 style='color: red;'>Error: " . $e->getMessage() . "</h3>";
}
?> 