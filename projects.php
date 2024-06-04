<?php
require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

header('Content-Type: application/json');

$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$user = $_ENV['DB_USER'];
$password = $_ENV['DB_PASSWORD'];
$port = $_ENV['DB_PORT'];

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if (isset($_GET['action']) && $_GET['action'] == 'getProjects') {
        $stmt = $pdo->query('SELECT title, project_description FROM projects ORDER BY id DESC');
        
        if (!$stmt) {
            $errorInfo = $pdo->errorInfo();
            error_log("Query failed: " . implode(":", $errorInfo));
            http_response_code(500);
            echo json_encode(['error' => 'Query failed: ' . implode(":", $errorInfo)]);
            exit();
        }

        $projects = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            error_log("Fetched project: " . json_encode($row));
            $projects[] = $row;
        }

        if (empty($projects)) {
            error_log("No projects found");
        }

        echo json_encode($projects);
    } else {
        error_log("Invalid action");
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action']);
    }
} catch (PDOException $e) {
    error_log("PDOException: " . $e->getMessage()); // Log the detailed error for server-side review
    http_response_code(500);
    echo json_encode(['error' => 'An internal server error occurred: ' . $e->getMessage()]);
}
?>
