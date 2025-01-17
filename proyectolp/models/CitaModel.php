<?php
require_once __DIR__ . "/../config/db.php";

class CitaModel {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function crearCita($psicologo_id, $fecha, $hora, $modalidad) {
        $query = "INSERT INTO cita (psicologo_id, fecha, hora, modalidad) VALUES (?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([$psicologo_id, $fecha, $hora, $modalidad]);
    }

    public function editarCita($id, $psicologo_id, $fecha, $hora, $modalidad) {
        $query = "UPDATE cita SET psicologo_id = ?, fecha = ?, hora=?, modalidad=? WHERE id = ? ";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([$psicologo_id, $fecha, $hora, $modalidad, $id]);
    }

    public function obtenerCitas() {
        $query = "SELECT c.id, c.fecha, c.hora, c.modalidad, p.nombre AS psicologo_nombre 
                  FROM cita c
                  JOIN psicologo ps ON c.psicologo_id = ps.id
                  JOIN usuario p ON ps.id = p.id";
        $stmt = $this->db->query($query);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
