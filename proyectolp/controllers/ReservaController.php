<?php
require_once __DIR__ . "/../models/ReservaModel.php";

class ReservaController
{
    private $model;

    public function __construct()
    {
        $this->model = new ReservaModel();
    }

    public function obtenerReservasPorPsicologo($idPsicologo) {
        if (!is_numeric($idPsicologo)) {
            echo json_encode(["success" => false, "message" => "ID del psicólogo inválido."]);
            return;
        }
    
         Obtener reservas del modelo
        $reservas = $this->model->obtenerReservasPorPsicologo($idPsicologo);
    
        echo json_encode([
            "success" => true,
            "reservas" => $reservas
        ]);
    }
    

    public function reservarCita($data)
    {
        if (!isset($data['paciente_id'], $data['cita_id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Faltan datos para realizar la reserva']);
            return;
        }

        $paciente_id = $data['paciente_id'];
        $cita_id = $data['cita_id'];

        if ($this->model->verificarDisponibilidad($cita_id)) {
            $resultado = $this->model->reservarCita($paciente_id, $cita_id);

            if ($resultado) {
                http_response_code(201);
                echo json_encode(['message' => 'Cita reservada exitosamente']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Error al reservar la cita']);
            }
        } else {
            http_response_code(400); 
            echo json_encode(['error' => 'La cita ya está reservada']);
        }
    }

    public function cancelarReserva($data)
    {
        if (!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Faltan datos para cancelar la reserva']);
            return;
        }

        $reserva_id = $data['id'];
        $resultado = $this->model->eliminarReserva($reserva_id);

        if ($resultado) {
            http_response_code(200);
            echo json_encode(['message' => 'Reserva cancelada exitosamente']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Error al cancelar la reserva']);
        }
    }
}
