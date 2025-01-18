<?php
require_once __DIR__ . "/../config/db.php";

class ReservaModel
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
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