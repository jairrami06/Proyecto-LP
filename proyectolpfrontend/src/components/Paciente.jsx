import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Modal, Box, Typography, CircularProgress, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
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
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [reservationConfirmed, setReservationConfirmed] = useState(false); // Estado para confirmar la reserva




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

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    console.log(info.event);
    setOpenModal(true);
  };




  /* Guarda el psicólogo seleccionado del dropdown */
  const handleSelectPsicologo = (event) => {
    setSelectedPsicologo(event.target.value);
    console.log(selectedPsicologo);
  };

  const handleReserva = async () => {
    if (!selectedEvent || selectedEvent.extendedProps.estado !== 'disponible') {
      return;
    }
    setLoading(true);
    try {
      console.log(paciente_id);
      console.log(selectedEvent.id);
      const response = await axios.post(`${BASE_URL}/reservas`, {
        paciente_id: paciente_id, // Usa el ID del paciente
        cita_id: selectedEvent.id, // Usa el ID de la cita seleccionada
      });

      if (response.data.message === 'Cita reservada exitosamente') {
        //   setOpenModal(false); 
        setReservationConfirmed(true);
        fetchCitas();
      } else {
        alert('Error al reservar la cita');
      }
    } catch (error) {
      alert('Hubo un error al intentar reservar la cita');
      console.error(error);
    } finally {
      setLoading(false);
    }
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

      const reservaIds = new Set(reservas.map(reserva => reserva.cita_id));
      console.log("id de la citas de las reservas");
      console.log(reservaIds);

      const citasEvents = citas.map((cita) => {
        const idCita = cita.id;
        const estado = reservaIds.has(idCita) ? 'reservada' : 'disponible';
        const color = estado === 'reservada' ? 'orange' : 'green';

        return {
          id: idCita,
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
            eventClick={handleEventClick}
          />

          {/* Modal */}
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-titulo"
            aria-describedby="modal-descripcion"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                backgroundColor: 'white',
                padding: 3,
                borderRadius: 2,
                boxShadow: 24,
              }}
            >
              {reservationConfirmed ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    ¡Tu cita ha sido confirmada con éxito!
                  </Typography>
                  <Box display="flex" justifyContent="flex-end" marginTop={2}>
                    <Button onClick={() => {
                      setOpenModal(false);
                      setReservationConfirmed(false);
                    }} color="primary">
                      Cerrar
                    </Button>
                  </Box>
                </>
              ) : (
                // Contenido del modal de la cita (antes de confirmar)
                <>
                  <Typography variant="h6" gutterBottom>
                    Detalles de la Cita
                  </Typography>
                  {selectedEvent && (
                    <>
                      <Typography variant="h6">{selectedEvent.title}</Typography>
                      <Typography variant="body1">Fecha: {selectedEvent.start.toLocaleString()}</Typography>
                      <Typography variant="body1">Estado: {selectedEvent.extendedProps.estado}</Typography>

                      {/* Botón de reservar si la cita está disponible */}
                      {selectedEvent.extendedProps.estado === 'disponible' && !loading && (
                        <Box display="flex" justifyContent="flex-end" marginTop={2}>
                          <Button onClick={handleReserva} color="primary">
                            Reservar
                          </Button>
                        </Box>
                      )}

                    </>
                  )}
                  <Box display="flex" justifyContent="flex-end" marginTop={2}>
                    <Button onClick={() => setOpenModal(false)} color="primary">
                      Cerrar
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Modal>


        </Box>
      )}
    </Box>
  );
};

export default Paciente;
