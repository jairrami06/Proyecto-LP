<?php
require_once __DIR__ . "/../controllers/UsuarioController.php";

$controller = new UsuarioController();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller->login($data);
} else {
    echo json_encode(["message" => "Método no soportado"]);
}