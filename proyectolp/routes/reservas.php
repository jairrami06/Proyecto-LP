<?php
require_once __DIR__ . "/../controllers/ReservaController.php";

$controller = new ReservaController();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $controller->reservarCita($data);
} else {
    echo json_encode(["message" => "Método no soportado"]);
}
?>
