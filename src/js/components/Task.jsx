import React, { useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const Task = () => {
    const [lista, setLista] = useState([]);
    const [task, setTask] = useState("");

    const handleAddTask = () => {
        if (task.trim() === "") return; // Evitar agregar tareas vacías

        const nuevaTarea = {
            id: Date.now(), // Usamos el timestamp como ID único
            label: task,
            is_done: false
        };

        setLista([...lista, nuevaTarea]); // Agregar la nueva tarea al arreglo
        setTask(""); // Limpiar el input
    };

    const handleDeleteTask = (id) => {
        const nuevasTareas = lista.filter((tarea) => tarea.id !== id); // Filtrar el arreglo para eliminar la tarea
        setLista(nuevasTareas);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") { // Verificar si la tecla presionada es "Enter"
            handleAddTask(); // Llamar a la función para agregar la tarea
        }
    };

    return (
        <>
            <h1>To Do List</h1>
            <div className="container-md">
                {/* Input para agregar tareas */}
                <input
                   className="rounded-pill mb-2 w-100 text-center"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyDown={handleKeyDown} // Escuchar el evento onKeyDown
                    type="text"
                    placeholder="Escribe una tarea y presiona Enter"
                /><br />
                {/* Lista de tareas */}
                <ListGroup as="ol" numbered>
                    {lista.map((tarea) => (
                        <ListGroup.Item
                            as="li"
                            className="mb-2 d-flex justify-content-between align-items-center task-item"
                            key={tarea.id}
                        >
                            {tarea.label}
                            {/* Botón de basurero (oculto por defecto) */}
                            <Button
                                variant="secondary"
                                onClick={() => handleDeleteTask(tarea.id)}
                                className="delete-button"
                            >
                                <i className="fa-solid fa-trash mb-2 fs-6"></i>
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                {/* Alerta con el número de tareas pendientes */}
                <Alert variant="warning">
                    <Alert.Heading>Pending Tasks: {lista.length}</Alert.Heading>
                </Alert>
            </div>

            {/* Estilos CSS */}
            <style>
                {`
                    .task-item {
                        cursor: pointer;
                        transition: background-color 0.3s;
                    }

                    .task-item:hover {
                        background-color: #f8f9fa; /* Cambia el fondo al hacer hover */
                    }

                    .delete-button {
                        opacity: 0; /* Oculto por defecto */
                        transition: opacity 0.3s; /* Transición suave */
                    }

                    .task-item:hover .delete-button {
                        opacity: 1; /* Muestra el botón al hacer hover sobre la tarea */
                    }
                `}
            </style>
        </>
    );
};

export default Task;
