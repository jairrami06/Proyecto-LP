import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, MenuItem, FormControl, InputLabel, Select, CircularProgress } from "@mui/material";
import axios from "axios";
import { BASE_URL } from '../api/config';

const AgregarCita = ({ open, handleClose, psicologoId, onSuccess }) => {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [modalidad, setModalidad] = useState("virtual");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/citas`, {
        psicologo_id: psicologoId,
        fecha,
        hora,
        modalidad,
      });
      if (response.data.message === "Cita creada exitosamente") {
        alert("Cita agregada con éxito");
        onSuccess();
        handleClose();
      } else {
        setError("Hubo un error al agregar la cita");
      }
    } catch (err) {
      setError("Hubo un error al agregar la cita");
    } finally {
      setLoading(false);
    }
  };

  const availableHours = Array.from({ length: 10 }, (_, index) => 8 + index);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-agregar-cita" aria-describedby="modal-para-agregar-cita">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Agregar Cita
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Fecha"
            type="date"
            fullWidth
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Hora</InputLabel>
            <Select
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              label="Hora"
              displayEmpty
              fullWidth
            >
              {availableHours.map((hour) => (
                <MenuItem key={hour} value={`${hour}:00:00`}>
                  {hour}:00
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Modalidad</InputLabel>
            <Select
              value={modalidad}
              onChange={(e) => setModalidad(e.target.value)}
              label="Modalidad"
              displayEmpty
            >
              <MenuItem value="virtual">Virtual</MenuItem>
              <MenuItem value="presencial">Presencial</MenuItem>
            </Select>
          </FormControl>

          {error && <Typography color="error" align="center">{error}</Typography>}

          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Agregar Cita"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AgregarCita;
