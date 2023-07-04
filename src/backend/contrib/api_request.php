<?php
require_once "constants.php";
require_once "rate_limit.php";

function fetch($endpoint, $method ="GET", $payload = null) {
    $opt = array(
        CURLOPT_URL => sprintf('%s/%s/%s', API_URL, API_VERSION, $endpoint),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            "Content-type: application/json",
            "Accept: application/json",
            "Access-Control-Allow-Origin: *",
            "Access-Control-Allow-Credentials: true",
            sprintf("Authorization: bearer %s", API_KEY),
        ],
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
    );

    
    
    if (($method == "POST" || $method == "PATCH")) {
        if (!$payload) echo json_encode(array("error" => "Request is missing a Payload"));
        $opt[CURLOPT_POSTFIELDS] = json_encode($payload);
    }

    $ch = curl_init();
    curl_setopt_array($ch, $opt);

    $limiter = RateLimiter::getInstance();
    $limiter->await();
    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
}

function test() {
    echo json_encode(fetch("users"));
}
?>