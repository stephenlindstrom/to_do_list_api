import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function ToDoList() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = Cookies.get('token');
        console.log(token);
        axios.get('http://localhost:8000/task_list/', { headers : {Authorization: `Bearer ${token}`}})
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