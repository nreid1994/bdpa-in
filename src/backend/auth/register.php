<?php
require_once "../contrib/constants.php";
require_once "../contrib/api_request.php";

header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");

$json_data = file_get_contents('php://input');
$data = json_decode($json_data);

$api_salt = openssl_random_pseudo_bytes(16);
$key = hash_pbkdf2("sha256", $data->password, $api_salt, 100000, 64);

$api_salt = bin2hex($api_salt);
$key = bin2hex($key);

$api_result = fetch("users", "POST", array(
    "username" => $data->username,
    "email" => $data->email,
    "salt" => $api_salt,
    "key" => $key,
    "type" => $data->type,
));

$response = json_decode($api_result);
if (isset($response->error)) {
    echo json_encode($response);
    exit();
}

$user = $response->user;
$password = password_hash($data->password, PASSWORD_DEFAULT);

$connection = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
$stmt = $connection->prepare("INSERT INTO `user` (user_id, password, api_salt, url) VALUES(?,?,?,?)");

$stmt->bind_param("ssss", $user->user_id, $password, $api_salt, $user->user_id);
if(!$stmt->execute()) echo json_encode(array("error" => $stmt->error));
else echo json_encode($response);

$stmt->close();
?>