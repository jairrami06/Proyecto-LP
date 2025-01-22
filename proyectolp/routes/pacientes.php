<?php
require_once __DIR__ . "/../controllers/PacienteController.php";

$controller = new PacienteController();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller->crearPaciente($data);
} else {
    echo json_encode(["message" => "Método no soportado"]);
}
