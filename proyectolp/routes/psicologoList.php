<?php
require_once __DIR__ . "/../controllers/PsicologoListController.php";

$controller = new PsicologoListController();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller->obtenerPsicologos();
} else {
    echo json_encode(["message" => "Método no soportado"]);
}
