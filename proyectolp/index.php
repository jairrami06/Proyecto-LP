<?php
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");


$request = explode("/", trim($_SERVER['REQUEST_URI'], "/"));

if (count($request) > 1) {
    $route = $request[1];

    if ($route === "pacientes") {
        require_once "./routes/pacientes.php";
    } elseif ($route === "psicologos") {
        require_once "./routes/psicologos.php";
    } elseif ($route === "reservas") {
        require_once "./routes/reservas.php";
    } elseif ($route === "citas") {
        require_once "./routes/citas.php";
    } elseif ($route === "login") {
        require_once "./routes/usuarios.php";
    } 
    elseif ($route === "psicologoList") {
        require_once "./routes/psicologoList.php";
    }else {
        http_response_code(404);
        echo json_encode(["message" => "Ruta no encontrada"]);
    }
} else {
    echo json_encode(["message" => "Bienvenido a la API"]);
}
?>