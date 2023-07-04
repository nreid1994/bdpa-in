<?php
require_once "../contrib/constants.php";
require_once "../contrib/api_request.php";

header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");

$GENERIC_ERROR = "Incorrect Username or Password";

$json_data = file_get_contents('php://input');
$data = json_decode($json_data);

$user_result = fetch("users/{$data->username}");
$user_response = json_decode($user_result);

if (isset($user_response->error)) {
    echo json_encode(array("error" => $GENERIC_ERROR."1"));
    exit();
}

$user_id = $user_response->user->user_id;

$connection = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
$stmt = $connection->prepare("select password, api_salt from user where user_id=?");
$stmt->bind_param("s", $user_id);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows() != 1) {
    $stmt->close();
    echo json_encode(array("error" => $GENERIC_ERROR));
    exit();
}

$stmt->bind_result($password, $api_salt);
$stmt->fetch();
$stmt->close();

if (!password_verify($data->password, $password)) {
    echo json_encode(array("error" => $GENERIC_ERROR));
    exit();
}

$key = hash_pbkdf2("sha256", $data->password, hex2bin($api_salt), 100000, 64);
$api_result = fetch("users/{$user_id}/auth", "POST", array("key" => bin2hex($key)));
$response = json_decode($api_result);

if (isset($response->error)) {
    echo json_encode($response);
    exit();
}

echo json_encode($user_response);
?>