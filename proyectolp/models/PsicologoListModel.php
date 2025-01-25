<?php
require_once __DIR__ . "/../config/db.php";

class PsicologoListModel{
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    public function obtenerPsicologos() {
        $query = "
            SELECT u.id, u.nombre
            FROM usuario u
            INNER JOIN psicologo p ON u.id = p.id
            WHERE u.tipo = 'psicologo'"; 

        $stmt = $this->db->prepare($query);
        $stmt->execute();

        $psicologos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $psicologos;
    }
}
