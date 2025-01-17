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

    public function editarCita($data) {
        if (!isset($data['id'], $data['psicologo_id'], $data['fecha'], $data['hora'], $data['modalidad'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Faltan datos para editar la cita']);
            return;
        }

        $resultado = $this->model->editarCita(
            $data['id'],
            $data['psicologo_id'],
            $data['fecha'],
            $data['hora'],
            $data['modalidad']
        );

        if ($resultado) {
            http_response_code(201);
            echo json_encode(['message' => 'Cita editada exitosamente']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Error al editar la cita']);
        }
    }

    public function eliminarCita($data) {
        if (!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Falta el ID para eliminar la cita']);
            return;
        }
    
        $resultado = $this->model->eliminarCita($data['id']);
    
        if ($resultado) {
            http_response_code(200);
            echo json_encode(['message' => 'Cita eliminada exitosamente']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Error al eliminar la cita']);
        }
    }
    

}

