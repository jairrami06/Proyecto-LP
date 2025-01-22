<?php
require_once __DIR__ . "/../config/db.php";

class CitaModel {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function obtenerCitasPorPsicologo($psicologoId) {
        $query = "SELECT c.id, c.fecha, c.hora, c.modalidad, r.paciente_id
                  FROM cita c
                  LEFT JOIN reserva r ON c.id = r.cita_id
                  WHERE c.psicologo_id = :psicologo_id";
    
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':psicologo_id', $psicologoId, PDO::PARAM_INT);
        $stmt->execute();
    
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
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

    public function eliminarCita($id) {
        $query = "DELETE FROM cita WHERE id = ?";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([$id]);
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
