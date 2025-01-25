import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box, Typography, CircularProgress, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../api/config";

const Paciente = () => {
  const location = useLocation();
  const paciente_id = location.state?.userId;

  const [nombrePaciente, setNombrePaciente] = useState(null);
  const [psicologoList, setPsicologoList] = useState([]);
  const [selectedPsicologo, setSelectedPsicologo] = useState("");
  const [loading, setLoading] = useState(true);

  // Obtener nombre del paciente
  useEffect(() => {
    if (!paciente_id) {
      console.error("No se encontró el ID del paciente.");
      return;
    }

    const obtenerNombre = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/pacientes/${paciente_id}`);
        setNombrePaciente(response.data.nombre);
      } catch (error) {
        console.error("Error al obtener el nombre del paciente:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerNombre();
  }, [paciente_id]);

  // Obtener lista de psicólogos
  useEffect(() => {
    const obtenerPsicologos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/psicologoList`);
        setPsicologoList(response.data);
      } catch (error) {
        console.error("Error al obtener los psicólogos:", error);
      }
    };

    obtenerPsicologos();
  }, []);

  // Manejar la selección del psicólogo
  const handleSelectPsicologo = (event) => {
    setSelectedPsicologo(event.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={3}
      sx={{
        maxWidth: "90%",
        margin: "auto",
        height: "90vh",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Bienvenido, {loading ? <CircularProgress size={24} /> : nombrePaciente || "Paciente no encontrado"}
      </Typography>

      {/* Selector de psicólogos */}
      {loading ? (
        <CircularProgress size={10} />
      ) : (
        <Box width="100%" marginBottom={3}>
          <FormControl fullWidth>
            <InputLabel id="select-psicologo-label">Elige un psicólogo</InputLabel>
            <Select
              labelId="select-psicologo-label"
              value={selectedPsicologo}
              onChange={handleSelectPsicologo}
              label="Selecciona tu psicólogo"
            >
              {psicologoList?.map((psicologo) => (
                <MenuItem key={psicologo.id} value={psicologo.id}>
                  {psicologo.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Calendario estático */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: "8px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          padding: 2,
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={[]} // Calendario vacío
          locale="es"
          height="100%"
          themeSystem="standard"
          allDaySlot={false}
        />
      </Box>
    </Box>
  );
};

export default Paciente;
