<?php
require_once __DIR__ . "/../config/db.php";

class PsicologoModel{
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    public function seguimientoPaciente($paciente_id, $psicologo_id) {
        $query = "SELECT r.id AS reserva_id, c.fecha, c.hora, c.modalidad
                  FROM reserva r
                  JOIN cita c ON r.cita_id = c.id
                  WHERE r.paciente_id = ? 
                  AND c.psicologo_id = ? 
                  AND (c.fecha < CURDATE() OR (c.fecha = CURDATE() AND c.hora < CURTIME()))"; 
        $stmt = $this->db->prepare($query);
        $stmt->execute([$paciente_id, $psicologo_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function crearPsicologo($nombre, $usuario, $contrasena, $email, $especialidad) {
        $this->db->beginTransaction();

        try {
            $queryUsuario = "INSERT INTO usuario (nombre, usuario, contrasena, tipo) VALUES (?, ?, ?, 'psicologo')";
            $stmtUsuario = $this->db->prepare($queryUsuario);
            $hashedPassword = password_hash($contrasena, PASSWORD_BCRYPT);
            $stmtUsuario->execute([$nombre, $usuario, $hashedPassword]);

            $usuarioId = $this->db->lastInsertId();

            $queryPsicologo = "INSERT INTO psicologo (id, email, especialidad) VALUES (?, ?, ?)";
            $stmtPsicologo = $this->db->prepare($queryPsicologo);
            $stmtPsicologo->execute([$usuarioId, $email, $especialidad]);

            $this->db->commit();
            return $usuarioId;
        } catch (Exception $e) {
            $this->db->rollBack();
            return false;
        }
    }
    
    
}
