import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ToDoList() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/task_list/')
            .then(response => {
                setMessage(response.data[0].task);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <div>
            <h1>To Do List</h1>
            <p>{message}</p>
        </div>
    );
}

export default ToDoList;