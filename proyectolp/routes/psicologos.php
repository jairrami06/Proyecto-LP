<?php
require_once __DIR__ . "/../controllers/PsicologoController.php";

$controller = new PsicologoController();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller->seguimientoPaciente($data);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller->crearPsicologo($data);
} else {
    echo json_encode(["message" => "Método no soportado"]);
}
