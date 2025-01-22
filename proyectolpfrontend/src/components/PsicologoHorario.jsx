import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { BASE_URL } from "../api/config";
import { Typography, Box, CircularProgress, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import AgregarCita from "./AgregarCita";

const PsicologoHorario = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const psicologoId = location.state?.userId;
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const fetchCitasYReservas = async () => {
      try {
        const citasResponse = await axios.get(`${BASE_URL}/citas/3`);
        const reservasResponse = await axios.get(`${BASE_URL}/reservas/3`);

        const reservasEvents = reservasResponse.data.reservas.map((reserva) => ({
          id: `reserva-${reserva.reserva_id}`,
          title: `Reserva(${reserva.modalidad}): ${reserva.paciente_nombre}`,
          start: `${reserva.fecha_cita}T${reserva.hora}`,
          color: "#4CAF50",
        }));

        const citasEvents = citasResponse.data.data
          .filter((cita) => {
            return !reservasEvents.some(
              (reserva) => reserva.start === `${cita.fecha}T${cita.hora}`
            );
          })
          .map((cita) => ({
            id: `cita-${cita.id}`,
            title: `Cita(${cita.modalidad}): Disponible`,
            start: `${cita.fecha}T${cita.hora}`,
            color: "#2196F3",
          }));

        setEvents([...reservasEvents, ...citasEvents]);
      } catch (error) {
        console.error("Error al cargar citas y reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCitasYReservas();
  }, [psicologoId]);

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
        Horario del Psicólogo
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
        sx={{
          marginBottom: 3,
          backgroundColor: "#1976d2",
          ":hover": { backgroundColor: "#1565c0" },
        }}
      >
        Agregar Cita
      </Button>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60%">
          <CircularProgress />
        </Box>
      ) : (
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
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            slotMinHeight={10}
            locale="es"
            slotMinTime="08:00:00"
            slotMaxTime="17:59:59"
            height="100%"
            themeSystem="standard"
            allDaySlot={false}
            customButtons={{
              prev: {
                text: "⟵ Anterior",
              },
              next: {
                text: "Siguiente ⟶",
              },
            }}
            buttonText={{
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
            }}
          />
        </Box>
      )}
      {/* Pasar el psicologoId al modal */}
      <AgregarCita open={openModal} handleClose={handleCloseModal} psicologoId={psicologoId} />
    </Box>
  );
};

export default PsicologoHorario;
