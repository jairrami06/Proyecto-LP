<?php
require_once __DIR__ . "/../models/UsuarioModel.php";
require_once __DIR__ . "/../helpers/TokenHelper.php";

class UsuarioController {
    private $usuarioModel;

    public function __construct() {
        $this->usuarioModel = new UsuarioModel();
    }
    
    public function login($data) {
        if (!isset($data['usuario'], $data['contrasena'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Usuario y contraseña son requeridos']);
            return;
        }

        $usuario = $this->usuarioModel->getUsuarioByUsername($data['usuario']);
        
        if (!$usuario) {
            http_response_code(400);
            echo json_encode(['error' => 'Usuario no encontrado']);
            return;
        }

        if (!password_verify($data['contrasena'], $usuario['contrasena'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Contraseña incorrecta ' . $data['contrasena'] . ' ' . $usuario['contrasena']]);
            return;
        }

        $token = TokenHelper::generateToken($usuario);

        echo json_encode([
            'message' => 'Inicio de sesión exitoso',
            'token' => $token,
            'user' => $usuario
        ]);
    }
}
