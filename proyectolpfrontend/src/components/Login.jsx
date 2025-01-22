import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from '../api/config';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [tipo, setTipo] = useState("paciente");
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [especialidad, setEspecialidad] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "usuario") setUsuario(value);
        if (name === "contrasena") setContrasena(value);
        if (name === "nombre") setNombre(value);
        if (name === "email") setEmail(value);
        if (name === "especialidad") setEspecialidad(value);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const data = { usuario, contrasena };
    
            const response = await axios.post(`${BASE_URL}/login`, data);
    
            localStorage.setItem('token', response.data.token);
    
            const user = response.data.user;
            if (user.tipo === 'paciente') {
                navigate("/paciente", { state: { userId: response.data.user.id } });
            } else if (user.tipo === 'psicologo') {
                navigate("/psicologo", { state: { userId: response.data.user.id } });
            }
        } catch (error) {
            if (error.response) {
                console.error('Error en el inicio de sesión:', error.response.data);
                alert(`Error: ${error.response.data.error || 'Inicio de sesión fallido'}`);
            } else if (error.request) {
                console.error('No hubo respuesta del servidor:', error.request);
                alert('Error: No se pudo conectar con el servidor.');
            } else {
                console.error('Error inesperado:', error.message);
                alert(`Error inesperado: ${error.message}`);
            }
        }
    };
    
    
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        const data = {
            usuario,
            contrasena,
            nombre,
            tipo,
        };

        if (tipo === "psicologo") {
            data.email = email;
            data.especialidad = especialidad;
        }

        try {
            let response;
            if (tipo === "paciente") {
                response = await axios.post(`${BASE_URL}/pacientes`, data);
            } else if (tipo === "psicologo") {
                response = await axios.post(`${BASE_URL}/psicologos`, data);
            }
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert("Hubo un error al registrar el usuario.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {!showRegisterForm ? (
                <form
                    onSubmit={handleLoginSubmit}
                    className="bg-white p-6 rounded-lg shadow-lg w-96"
                >
                    <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>

                    <div className="mb-4">
                        <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
                            Usuario
                        </label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            value={usuario}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="contrasena"
                            name="contrasena"
                            value={contrasena}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
                    >
                        Iniciar sesión
                    </button>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            onClick={() => setShowRegisterForm(true)}
                            className="text-indigo-600 hover:text-indigo-800"
                        >
                            ¿No tienes cuenta? Regístrate
                        </button>
                    </div>
                </form>
            ) : (
                <form
                    onSubmit={handleRegisterSubmit}
                    className="bg-white p-6 rounded-lg shadow-lg w-96"
                >
                    <h2 className="text-2xl font-bold mb-4 text-center">Registrar cuenta</h2>

                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
                            Usuario
                        </label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            value={usuario}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="contrasena"
                            name="contrasena"
                            value={contrasena}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {tipo === "psicologo" && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="especialidad" className="block text-sm font-medium text-gray-700">
                                    Especialidad
                                </label>
                                <input
                                    type="text"
                                    id="especialidad"
                                    name="especialidad"
                                    value={especialidad}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Tipo de usuario</label>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="paciente"
                                name="tipo"
                                value="paciente"
                                checked={tipo === "paciente"}
                                onChange={() => setTipo("paciente")}
                                className="mr-2"
                            />
                            <label htmlFor="paciente" className="mr-4">Paciente</label>

                            <input
                                type="radio"
                                id="psicologo"
                                name="tipo"
                                value="psicologo"
                                checked={tipo === "psicologo"}
                                onChange={() => setTipo("psicologo")}
                                className="mr-2"
                            />
                            <label htmlFor="psicologo">Psicólogo</label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
                    >
                        Registrar
                    </button>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            onClick={() => setShowRegisterForm(false)}
                            className="text-indigo-600 hover:text-indigo-800"
                        >
                            ¿Ya tienes cuenta? Inicia sesión
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Login;
