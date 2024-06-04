<?php
require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$user = $_ENV['DB_USER'];
$password = $_ENV['DB_PASSWORD'];
$port = $_ENV['DB_PORT'];

// Create connection
$conn = new mysqli($host, $user, $password, $dbname, $port);

// Check connection
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

$sql = "SELECT * FROM blog";
$query = mysqli_query($conn, $sql);

if (isset($_REQUEST["new_post"])) {
  $title = $_REQUEST["title"];
  $content = $_REQUEST["content"];

  // Using prepared statements to prevent SQL injection
  $stmt = $conn->prepare("INSERT INTO blog(title, content) VALUES(?, ?)");
  $stmt->bind_param("ss", $title, $content);
  $stmt->execute();

  header("Location: index.php?info=added");
  exit();
}


if (isset($_REQUEST["id"])) {
  $id = $_REQUEST["id"];

  $sql = "SELECT * FROM blog WHERE id = $id";
  $query = mysqli_query($conn, $sql);
}

if (isset($_REQUEST['update'])){
  $id = $_REQUEST['id'];
  $title = $_REQUEST['title'];
  $content = $_REQUEST['content'];

  // Using prepared statements to prevent SQL injection
  $stmt = $conn->prepare("UPDATE blog SET title = ?, content = ? WHERE id = ?");
  $stmt->bind_param("ssi", $title, $content, $id);
  $stmt->execute();

  header("Location: index.php?info=updated");
  exit();
}


if (isset($_REQUEST["delete"])) {
  $id = $_REQUEST["id"];

  // Using prepared statements to prevent SQL injection
  $stmt = $conn->prepare("DELETE FROM blog WHERE id = ?");
  $stmt->bind_param("i", $id);
  $stmt->execute();

  header("Location: index.php?info=deleted");
  exit();
}


// Handle projects
if (isset($_REQUEST["new_project"])) {
  $title = $_REQUEST["title"];
  $description = $_REQUEST["project_description"];

  // Using prepared statements to prevent SQL injection
  $stmt = $conn->prepare("INSERT INTO projects (title, project_description) VALUES (?, ?)");
  $stmt->bind_param("ss", $title, $project_description);
  $stmt->execute();

  header("Location: index.php?info=project_added");
  exit();
}

if (isset($_REQUEST['update_project'])) {
  $id = $_REQUEST['id'];
  $title = $_REQUEST['title'];
  $description = $_REQUEST['project_description'];

  // Using prepared statements to prevent SQL injection
  $stmt = $conn->prepare("UPDATE projects SET title = ?, project_description = ? WHERE id = ?");
  $stmt->bind_param("ssi", $title, $project_description, $id);
  $stmt->execute();

  header("Location: index.php?info=project_updated");
  exit();
}

if (isset($_REQUEST["delete_project"])) {
  $id = $_REQUEST["id"];

  // Using prepared statements to prevent SQL injection
  $stmt = $conn->prepare("DELETE FROM projects WHERE id = ?");
  $stmt->bind_param("i", $id);
  $stmt->execute();

  header("Location: index.php?info=project_deleted");
  exit();
}

mysqli_close($conn);
?>