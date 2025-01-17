CREATE DATABASE IF NOT EXISTS citaspsicologicas;
USE citaspsicologicas;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    tipo ENUM('paciente', 'psicologo') NOT NULL
);

CREATE TABLE paciente (
    id INT PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE psicologo (
    id INT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100) NOT NULL,
    FOREIGN KEY (id) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE cita (
    id INT AUTO_INCREMENT PRIMARY KEY,
    psicologo_id INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    modalidad ENUM('presencial', 'virtual') NOT NULL,
    FOREIGN KEY (psicologo_id) REFERENCES psicologo(id) ON DELETE CASCADE
);

CREATE TABLE reserva (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    cita_id INT NOT NULL,
    fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES paciente(id) ON DELETE CASCADE,
    FOREIGN KEY (cita_id) REFERENCES cita(id) ON DELETE CASCADE
);

INSERT INTO usuario (nombre, usuario, contrasena, tipo) VALUES
('Juan Pérez', 'juanp', 'contrasena123', 'paciente'),
('Ana Gómez', 'anag', 'contrasena456', 'psicologo'),
('María López', 'marial', 'contrasena789', 'psicologo');

INSERT INTO paciente (id) VALUES
(1);

INSERT INTO psicologo (id, email, especialidad) VALUES
(2, 'ana@gomez.com', 'Psicología Clínica'),
(3, 'maria@lopez.com', 'Psicología Infantil');

INSERT INTO cita (psicologo_id, fecha, hora, modalidad) VALUES
(2, '2025-01-20', '08:00:00', 'presencial'),
(2, '2025-01-20', '09:00:00', 'virtual'),
(3, '2025-01-21', '10:00:00', 'presencial'),
(3, '2025-01-21', '11:00:00', 'virtual');

INSERT INTO reserva (paciente_id, cita_id) VALUES
(1, 2);
