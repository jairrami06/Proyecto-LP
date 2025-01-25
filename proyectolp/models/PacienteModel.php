<?php
require_once __DIR__ . "/../config/db.php";

class PacienteModel
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    public function obtenerNombrePaciente($pacienteId)
    {
        $query = "SELECT u.nombre FROM usuario u INNER JOIN paciente p ON u.id = p.id WHERE p.id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->execute([$pacienteId]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            return $result['nombre'];
        } else {
            return null;
        }
    }
   
    

    public function crearPaciente($nombre, $usuario, $contrasena)
    {
        $this->db->beginTransaction();

        try {
            $queryUsuario = "INSERT INTO usuario (nombre, usuario, contrasena, tipo) VALUES (?, ?, ?, 'paciente')";
            $stmtUsuario = $this->db->prepare($queryUsuario);
            $hashedPassword = password_hash($contrasena, PASSWORD_BCRYPT);
            $stmtUsuario->execute([$nombre, $usuario, $hashedPassword]);

            $usuarioId = $this->db->lastInsertId();

            $queryPaciente = "INSERT INTO paciente (id) VALUES (?)";
            $stmtPaciente = $this->db->prepare($queryPaciente);
            $stmtPaciente->execute([$usuarioId]);

            $this->db->commit();
            return $usuarioId;
        } catch (Exception $e) {
            $this->db->rollBack();
            return false;
        }
    }
}
