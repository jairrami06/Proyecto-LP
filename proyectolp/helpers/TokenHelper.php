<?php
require_once __DIR__ . "/../libs/JWT.php";

use \Firebase\JWT\JWT;

class TokenHelper {
    private static $secretKey = 'mi_clave_secreta';

    public static function generateToken($usuario) {
        $issuedAt = time();
        $expirationTime = $issuedAt + 3600;
        $payload = array(
            'iss' => 'localhost', 
            'iat' => $issuedAt, 
            'exp' => $expirationTime,
            'userId' => $usuario['id'],
            'tipo' => $usuario['tipo']
        );
        $algoritmo = 'HS256';
        
        return JWT::encode($payload, self::$secretKey, $algoritmo);
    }
}
