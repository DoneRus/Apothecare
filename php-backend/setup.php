<?php
// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

// Database connection parameters
$servername = "localhost";
$username = "root";     // Default XAMPP username
$password = "";         // Default XAMPP password is empty

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Create database
$sql = "CREATE DATABASE IF NOT EXISTS apothecare_db";
if ($conn->query($sql) === TRUE) {
    $message[] = "Database created successfully or already exists";
} else {
    die(json_encode(["error" => "Error creating database: " . $conn->error]));
}

// Select the database
$conn->select_db("apothecare_db");

// Create products table
$sql = "CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2),
    rating DECIMAL(3, 2) DEFAULT 0,
    reviews INT DEFAULT 0,
    is_new BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    image_url VARCHAR(255),
    properties JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    $message[] = "Products table created successfully or already exists";
} else {
    die(json_encode(["error" => "Error creating products table: " . $conn->error]));
}

// Create testimonials table
$sql = "CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100),
    content TEXT NOT NULL,
    rating INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    $message[] = "Testimonials table created successfully or already exists";
} else {
    die(json_encode(["error" => "Error creating testimonials table: " . $conn->error]));
}

// Create cart table
$sql = "CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    quantity INT DEFAULT 1,
    session_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
)";

if ($conn->query($sql) === TRUE) {
    $message[] = "Cart table created successfully or already exists";
} else {
    die(json_encode(["error" => "Error creating cart table: " . $conn->error]));
}

// Check if there are any products
$result = $conn->query("SELECT COUNT(*) as count FROM products");
$row = $result->fetch_assoc();
$productCount = $row['count'];

// Insert sample products if none exist
if ($productCount == 0) {
    // Sample products from your frontend data
    $productsSQL = "INSERT INTO products (name, category, description, price, rating, reviews, is_new, is_featured, image_url, properties) VALUES
    ('Vitamin D3 Complex', 'Vitamins', 'High-potency vitamin D supplement for immune support and bone health.', 24.99, 4.8, 127, FALSE, TRUE, '/images/products/vitamin-d3.jpg', '{\"color\":\"amber\",\"icon\":\"pill\"}'),
    ('Omega-3 Fish Oil', 'Supplements', 'Pharmaceutical-grade fish oil with EPA and DHA for heart and brain health.', 29.99, 4.9, 215, FALSE, TRUE, '/images/products/omega-3.jpg', '{\"color\":\"blue\",\"icon\":\"capsule\"}'),
    ('Probiotic Complex', 'Digestive', 'Multi-strain probiotic formula for gut health and immune support.', 34.99, 4.7, 98, TRUE, TRUE, '/images/products/probiotic.jpg', '{\"color\":\"green\",\"icon\":\"capsule\"}'),
    ('Melatonin Complex', 'Sleep Aid', 'Extended-release melatonin formula for quality sleep support.', 19.99, 4.6, 78, FALSE, TRUE, '/images/products/melatonin.jpg', '{\"color\":\"purple\",\"icon\":\"pill\"}'),
    ('Multivitamin Complete', 'Vitamins', 'Comprehensive daily multivitamin with essential nutrients and minerals.', 39.99, 4.8, 189, FALSE, TRUE, '/images/products/multivitamin.jpg', '{\"color\":\"amber\",\"icon\":\"tablet\"}'),
    ('Magnesium Glycinate', 'Minerals', 'Highly absorbable magnesium for muscle function and nervous system support.', 27.99, 4.7, 110, FALSE, TRUE, '/images/products/magnesium.jpg', '{\"color\":\"blue\",\"icon\":\"tablet\"}'),
    ('CoQ10 Ubiquinol', 'Heart Health', 'Enhanced absorption CoQ10 for heart health and energy production.', 45.99, 4.9, 76, TRUE, FALSE, '/images/products/coq10.jpg', '{\"color\":\"red\",\"icon\":\"softgel\"}'),
    ('Zinc Picolinate', 'Minerals', 'High-potency zinc supplement for immune support and skin health.', 18.99, 4.6, 92, FALSE, FALSE, '/images/products/zinc.jpg', '{\"color\":\"gray\",\"icon\":\"tablet\"}')";
    
    if ($conn->query($productsSQL) === TRUE) {
        $message[] = "Sample products inserted successfully";
    } else {
        $message[] = "Error inserting sample products: " . $conn->error;
    }
}

// Check if there are any testimonials
$result = $conn->query("SELECT COUNT(*) as count FROM testimonials");
$row = $result->fetch_assoc();
$testimonialCount = $row['count'];

// Insert sample testimonials if none exist
if ($testimonialCount == 0) {
    // Sample testimonials from your frontend data
    $testimonialsSQL = "INSERT INTO testimonials (name, role, content, rating) VALUES
    ('Sarah Johnson', 'Fitness Instructor', 'ApotheCare\'s Vitamin D3 Complex has been a game-changer for my energy levels. As someone who spends most of my day indoors teaching classes, I noticed a significant improvement in my overall wellbeing after just two weeks.', 5),
    ('Michael Chen', 'Software Developer', 'After trying numerous sleep supplements with no success, I finally found ApotheCare\'s Melatonin Complex. The extended-release formula helps me fall asleep naturally and wake up refreshed without feeling groggy. Highly recommend!', 5),
    ('Emma Rodriguez', 'Registered Nurse', 'As a healthcare professional, I\'m extremely particular about the supplements I take. ApotheCare\'s Probiotic Complex has the perfect blend of strains for digestive health, and I\'ve recommended it to many of my patients with great feedback.', 4),
    ('David Williams', 'Marathon Runner', 'I\'ve been using the Omega-3 Fish Oil for joint support during my training. The pharmaceutical-grade quality makes a noticeable difference compared to other brands I\'ve tried. My recovery time has improved significantly.', 5),
    ('Olivia Taylor', 'Yoga Instructor', 'ApotheCare\'s Magnesium Glycinate has been essential for my muscle recovery and sleep quality. I appreciate the thoughtful formulation and how it doesn\'t cause the digestive issues I experienced with other magnesium supplements.', 4),
    ('James Wilson', 'Retired Teacher', 'At 68, maintaining my health is a top priority. The Multivitamin Complete gives me confidence that I\'m supporting my immune system and overall wellbeing. The easy-to-swallow tablets are a plus for seniors like me.', 5),
    ('Sophia Garcia', 'New Mother', 'Finding quality supplements while breastfeeding was challenging until I discovered ApotheCare. Their customer service was exceptional in helping me choose products safe for this stage of life. The Vitamin D3 has helped maintain my energy through sleepless nights.', 5),
    ('Thomas Brown', 'Personal Trainer', 'I\'ve recommended ApotheCare supplements to dozens of my clients, and the feedback has been consistently positive. The CoQ10 Ubiquinol in particular has been beneficial for my older clients focused on heart health during their fitness journey.', 4)";
    
    if ($conn->query($testimonialsSQL) === TRUE) {
        $message[] = "Sample testimonials inserted successfully";
    } else {
        $message[] = "Error inserting sample testimonials: " . $conn->error;
    }
}

// Add is_featured column if it doesn't exist
$sql = "ALTER TABLE products ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE";
if ($conn->query($sql) === TRUE) {
    $message[] = "Added is_featured column to products table";
} else {
    $message[] = "Error adding is_featured column: " . $conn->error;
}

// Update some products as featured
$sql = "UPDATE products SET is_featured = TRUE WHERE id IN (1, 2, 3, 4)";
if ($conn->query($sql) === TRUE) {
    $message[] = "Updated featured products";
} else {
    $message[] = "Error updating featured products: " . $conn->error;
}

$conn->close();

// Return success message
echo json_encode([
    "success" => true,
    "message" => "Database setup completed successfully",
    "details" => $message
]);
?> 