<?php
require_once __DIR__ . "/../models/CitaModel.php";

class CitaController {
    private $model;

    public function __construct() {
        $this->model = new CitaModel();
    }

    public function crearCita($data) {
        if (!isset($data['psicologo_id'], $data['fecha'], $data['hora'], $data['modalidad'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Faltan datos para crear la cita']);
            return;
        }

        $resultado = $this->model->crearCita(
            $data['psicologo_id'],
            $data['fecha'],
            $data['hora'],
            $data['modalidad']
        );

        if ($resultado) {
            http_response_code(201);
            echo json_encode(['message' => 'Cita creada exitosamente']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Error al crear la cita']);
        }
    }

    public function verCitas() {
        $citas = $this->model->obtenerCitas();
        echo json_encode($citas);
    }
}

