<?php
require_once __DIR__ . "/../controllers/ReservaController.php";

$controller = new ReservaController();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $urlParts = explode('/', $_SERVER['REQUEST_URI']);
    $psicologoId = $urlParts[count($urlParts) - 1];

    $controller->obtenerReservasPorPsicologo($psicologoId);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller->reservarCita($data);
} elseif ($method === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller->cancelarReserva($data);
} else {
    echo json_encode(["message" => "Método no soportado"]);
}
