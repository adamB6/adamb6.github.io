<?php
require 'logic.php';

header('Content-Type: application/json');

$sql = "SELECT id, title, content, created_on FROM blog ORDER BY created_on DESC";
$query = mysqli_query($conn, $sql);

$posts = [];
while ($row = mysqli_fetch_assoc($query)) {
    $posts[] = $row;
}

echo json_encode($posts);
?>
