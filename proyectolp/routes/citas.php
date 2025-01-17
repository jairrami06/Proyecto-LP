<?php
require_once __DIR__ . "/../controllers/CitaController.php";

$controller = new CitaController();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $controller->verCitas();
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller->crearCita($data);
}  elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller->editarCita($data);
    
}else {
    echo json_encode(["message" => "Método no soportado"]);
}
?>