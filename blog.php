<?php
require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

header('Content-Type: application/json');

$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$user = $_ENV['DB_USER'];
$password = $_ENV['DB_PASSWORD'];

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);

    if(isset($_GET['action']) && $_GET['action'] == 'newest'){

    $stmt = $pdo->query('SELECT id, title, content, created_on FROM blog ORDER BY created_on DESC LIMIT 10');

    $posts = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $posts[] = $row;
    }

    echo json_encode($posts);
}
} catch (PDOException $e) {
    error_log($e->getMessage()); // Log the detailed error for server-side review
    http_response_code(500);
    echo json_encode(['error' => 'An internal server error occurred.']);
}

