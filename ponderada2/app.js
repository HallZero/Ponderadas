const express =  require('express');
const {createTask, readTask, updateTask, deleteTask} = require('./task');
const {createUser, readUserByName, updateUser, deleteUser} = require('./user');
const loginRoute = require('./routes/login');
const newTask = require('./routes/newTask');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // Send the login page
    res.sendFile(__dirname + '/login.html');
});

app.get('/todo', (req, res) => {
    // Send the todo page
    res.sendFile(__dirname + '/todo.html');
});

app.post('/login', loginRoute);

app.get('/create', async (req, res) => {
    const user = await createUser({name: 'teste', password: 'teste123'});
    
    const task = {
        description: 'Teste',
        id: 1,
        done: false
    };

    const new_task = await createTask(task);

    res.send(new_task);
});

app.post('/task', newTask);

app.get('/get-task', async (req, res) => {
    const task = await readTask({user_id: 1});

    res.send(task);
});

app.listen(port, () => {
    console.log('Server running on port ' + port + '...');
});