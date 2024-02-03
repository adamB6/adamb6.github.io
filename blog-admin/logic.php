<?php
define('DB_HOST', 'portfolio.c5eaeakcmpq0.us-east-1.rds.amazonaws.com');
define('DB_USER', 'adam');
define('DB_PASS', 'JgV5iFZwyBHNVvj');
define('DB_NAME', 'portfolio');

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

$sql = "SELECT * FROM blog";
$query = mysqli_query($conn, $sql);

if (isset($_REQUEST["new_post"])) {
  $title = $_REQUEST["title"];
  $content = $_REQUEST["content"];

  $sql = "INSERT INTO blog(title, content) VALUES('$title', '$content')";
  mysqli_query($conn, $sql);
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

  $sql = "UPDATE blog SET title = '$title', content = '$content' WHERE id = $id";
  mysqli_query($conn, $sql);

  header("Location: index.php?info=updated");
  exit();
}

if (isset($_REQUEST["delete"])) {
  $id = $_REQUEST["id"];

  $sql = "DELETE FROM blog WHERE id = $id";
  $query = mysqli_query($conn, $sql);

  header("Location: index.php?info=deleted");
  exit();
}

mysqli_close($conn);