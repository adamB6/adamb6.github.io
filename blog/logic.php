<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'adam');
define('DB_PASS', '123456');
define('DB_NAME', 'myblog');

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

if(isset($_REQUEST["new_post"])){
  $title = $_REQUEST["title"];
  $content = $_REQUEST["content"];

  $sql = "INSERT INTO data(title, content) VALUES('$title', '$content')";
  mysqli_query($conn, $sql);
  header("Location: index.php");
  exit();
}