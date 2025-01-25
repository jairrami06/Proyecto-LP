<?php
require_once __DIR__ . "/../models/PacienteModel.php";

class PacienteController {
    private $model;

    public function __construct() {
        $this->model = new PacienteModel();
    }


    public function obtenerNombrePaciente($paciente_id) {
        if (!$paciente_id) {
            echo json_encode(["success" => false, "message" => "El ID del psicólogo es requerido."]);
            return;
        }
        $nombre = $this->model->obtenerNombrePaciente($paciente_id);
        if ($nombre) {
            http_response_code(200); 
            echo json_encode(['nombre' => $nombre]);
        } else {
            http_response_code(404); 
            echo json_encode(['error' => 'Paciente no encontrado']); 
        }
    }



    public function crearPaciente($data) {
        if (!isset($data['nombre'], $data['usuario'], $data['contrasena'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Faltan datos para crear el paciente']);
            return;
        }

        $pacienteId = $this->model->crearPaciente(
            $data['nombre'],
            $data['usuario'],
            $data['contrasena']
        );

        if ($pacienteId) {
            http_response_code(201);
            echo json_encode(['message' => 'Paciente creado exitosamente', 'id' => $pacienteId]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Error al crear el paciente']);
        }
    }

}
