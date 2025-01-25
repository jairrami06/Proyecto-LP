<?php
require_once __DIR__ . "/../controllers/PacienteController.php";

$controller = new PacienteController();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller->crearPaciente($data);
} 
if ($method === 'GET') {
    $urlParts = explode('/', $_SERVER['REQUEST_URI']); 
    $paciente_id = $urlParts[count($urlParts) - 1];
    $controller->obtenerNombrePaciente($paciente_id);
}else {
    echo json_encode(["message" => "Método no soportado"]);
}
