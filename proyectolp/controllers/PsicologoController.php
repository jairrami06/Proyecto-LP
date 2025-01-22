<?php
require_once __DIR__ . "/../models/PsicologoModel.php";

class PsicologoController {
    private $model;

    public function __construct() {
        $this->model = new PsicologoModel();
    }

    public function seguimientoPaciente($data) {
        if (!isset($data['paciente_id'], $data['psicologo_id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Faltan datos para realizar el seguimiento']);
            return;
        }

        $paciente_id = $data['paciente_id'];
        $psicologo_id = $data['psicologo_id'];

        $seguimiento = $this->model->seguimientoPaciente($paciente_id, $psicologo_id);

        if ($seguimiento) {
            http_response_code(200); 
            echo json_encode(['seguimiento' => $seguimiento]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'No se encontraron citas pasadas para este paciente con este psicólogo']);
        }
    }
    
    public function crearPsicologo($data) {
        if (!isset($data['nombre'], $data['usuario'], $data['contrasena'], $data['email'], $data['especialidad'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Faltan datos para crear el psicólogo']);
            return;
        }

        $psicologoId = $this->model->crearPsicologo(
            $data['nombre'],
            $data['usuario'],
            $data['contrasena'],
            $data['email'],
            $data['especialidad']
        );

        if ($psicologoId) {
            http_response_code(201);
            echo json_encode(['message' => 'Psicólogo creado exitosamente', 'id' => $psicologoId]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Error al crear el psicólogo']);
        }
    }

}

