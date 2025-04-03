<?php
// Database connection parameters
$servername = "localhost";
$username = "root";     // Default XAMPP username
$password = "";         // Default XAMPP password is empty
$dbname = "apothecare_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // Return error as JSON
    header('Content-Type: application/json');
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

// Set UTF-8 character set
$conn->set_charset("utf8");
?> 