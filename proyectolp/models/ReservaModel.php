<?php
require_once __DIR__ . "/../config/db.php";

class ReservaModel
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    public function obtenerReservasPorPsicologo($idPsicologo) {
        $sql = "SELECT r.id AS reserva_id, r.cita_id, r.fecha_reserva, c.fecha AS fecha_cita, c.hora, 
                       c.modalidad, u.nombre AS paciente_nombre 
                FROM reserva r
                INNER JOIN cita c ON r.cita_id = c.id
                INNER JOIN paciente p ON r.paciente_id = p.id
                INNER JOIN usuario u ON p.id = u.id
                WHERE c.psicologo_id = ?";
    
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$idPsicologo]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    

    public function reservarCita($paciente_id, $cita_id)
    {
        $query = "INSERT INTO reserva (paciente_id, cita_id) VALUES (?, ?)";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([$paciente_id, $cita_id]);
    }

    public function verificarDisponibilidad($cita_id)
    {
        $query = "SELECT COUNT(*) FROM reserva WHERE cita_id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->execute([$cita_id]);
        return $stmt->fetchColumn() == 0; // Retorna true si no hay reserva
    }

    public function eliminarReserva($reserva_id)
    {
        $query = "DELETE FROM reserva WHERE id = ?";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([$reserva_id]);
    }
}