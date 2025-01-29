import React, { useEffect, useState, useCallback } from "react";
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
  const [events, setEvents] = useState([]);


  /* Busca y obtiene el nombre del paciente con su id en useLocation */
  useEffect(() => {
    if (!paciente_id) {
      console.error("No se encontró el ID del paciente, o no se inció sesión.");
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

  /* Busca y obtiene la lista de psicólogos para ponerlas en el  */
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

  /* Guarda el psicólogo seleccionado del dropdown */
  const handleSelectPsicologo = (event) => {
    setSelectedPsicologo(event.target.value);
    console.log(selectedPsicologo);
  };

  const fetchCitas = useCallback(async () => {
    setLoading(true);
    try {
      const citasResponse = await axios.get(`${BASE_URL}/citas/${selectedPsicologo}`);
      const reservasResponse = await axios.get(`${BASE_URL}/reservas/${selectedPsicologo}`);

      let citas = [];
      let reservas = [];

      if (citasResponse.data.data) {
        citas = citasResponse.data.data;
        console.log("Citas del psicologo: ");
        console.log(citas)
      }

      if (reservasResponse.data.reservas) {
        reservas = reservasResponse.data.reservas;
        console.log("Reservas del psicologo: ");
        console.log(reservas);
      }

      const reservaIds = new Set(reservas.map(reserva => `reserva-${reserva.reserva_id}`));

      const citasEvents = citas.map((cita) => {
        const idCita = `reserva-${cita.id}`; 
        const estado = reservaIds.has(idCita) ? 'reservada' : 'disponible'; 
        const color = estado === 'reservada' ? 'orange' : 'green';

        return {
          id: `cita-${cita.id}`, 
          title: `Modalidad: ${cita.modalidad}`,
          start: `${cita.fecha}T${cita.hora}`,
          color: color, 
          extendedProps: {
            estado: estado,
          },
        };
      });
      
      console.log("citasEvents");
      console.log(citasEvents);
      setEvents(citasEvents);
    } catch (error) {
      console.error("Error al cargar citas:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedPsicologo]);

  useEffect(() => {
    fetchCitas();
  }, [fetchCitas]);




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

      {/* Dropdown de psicólogos */}
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

      {/* Calendario */}
     {selectedPsicologo && ( 
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
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          locale="es"
          slotMinTime="08:00:00"
          slotMaxTime="17:59:59"
          height="100%"
          themeSystem="standard"
          allDaySlot={false}
          buttonText={{
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            prev: "<",
            next: ">",
          }}
        /> 
      </Box>
        )}
    </Box>
  );
};

export default Paciente;
