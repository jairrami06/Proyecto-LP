<?php
require_once __DIR__ . "/../controllers/CitaController.php";

$controller = new CitaController();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $urlParts = explode('/', $_SERVER['REQUEST_URI']); 
    $psicologoId = $urlParts[count($urlParts) - 1];

    $controller->obtenerCitasPorPsicologo($psicologoId);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller->crearCita($data);
} elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller->editarCita($data);
} elseif ($method === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller->eliminarCita($data);
} else {
    echo json_encode(["message" => "Método no soportado"]);
}
