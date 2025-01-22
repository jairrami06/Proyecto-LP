<?php
require_once __DIR__ . "/../config/db.php";

class UsuarioModel {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function getUsuarioByUsername($username) {
        $query = "SELECT id, usuario, contrasena, tipo FROM usuario WHERE usuario = ?";
        $stmt = $this->db->prepare($query);
        $stmt->execute([$username]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
