<?php
require_once '../contrib/db.php';

header('Content-type: application/json');
$json_data = file_get_contents('php://input');
$data = json_decode($json_data);

$connection = new DB();
$connection = $connection->get_conn();
$stmt = $connection->prepare("select salt from user where username=?");
$stmt->bind_param("s", $data->username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows() != 1) {
    echo json_encode(array("salt" => ""));
} else {
    $stmt->bind_result($salt);
    $stmt->fetch();
    echo json_encode(array("salt" => $salt));
}
$stmt->close();
?>