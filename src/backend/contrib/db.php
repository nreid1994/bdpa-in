<?php
require_once 'constants.php';

class DB {
    private $conn;
    function __construct() {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME); 
    }

    function get_conn() {
        return $this->conn;
    }
}
?>