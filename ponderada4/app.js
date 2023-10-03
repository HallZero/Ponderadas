const express =  require('express');
const {createTask, readTask, updateTask, deleteTask} = require('./task');
const {createUser, readUserByName, updateUser, deleteUser} = require('./user');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/login');
const newTask = require('./routes/newTask');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.get('/todo', (req, res) => {
    res.sendFile(__dirname + '/todo.html');
});

app.post('/login', loginRoute);

app.post('/task', newTask);

app.get('/get-task', async (req, res) => {
    const task = await readTask({user_id: 1});

    res.send(task);
});

app.listen(port, () => {
    console.log('Server running on port ' + port + '...');
});