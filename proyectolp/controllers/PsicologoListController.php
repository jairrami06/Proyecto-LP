<?php
require_once __DIR__ . "/../models/PsicologoListModel.php";

class PsicologoListController {
    private $model;

    public function __construct() {
        $this->model = new PsicologoListModel();
    }

public function obtenerPsicologos() {
        $psicologos = $this->model->obtenerPsicologos();

        if ($psicologos) {
            http_response_code(200);
            echo json_encode($psicologos);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'No se encontraron psicólogos']);
        }
    }
}