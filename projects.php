<?php
require 'logic.php';

header('Content-Type: application/json');

$sql = "SELECT title, description FROM projects ORDER BY id DESC";
$query = mysqli_query($conn, $sql);

$projects = [];
while ($row = mysqli_fetch_assoc($query)) {
    $projects[] = $row;
}

echo json_encode($projects);
?>
