const express =  require('express');
const {createTask, readTask, updateTask, deleteTask} = require('./models/task');
const {createUser, readUserByName, updateUser, deleteUser} = require('./models/user');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/login');
const newTask = require('./routes/newTask');
const path = require('path');

const app = express();
const port = 3000;
const axios = require('axios');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/login.html'));
});

app.get('/todo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/todo.html'));
});

app.get('/create', async (req, res) => {
    try{
        const user = await createUser({name: 'teste', password: 'teste123'});
        res.json({ message: 'User created successfully!', user });
    } catch (error) {
        res.status(500).json({ error: 'User creation failed.' });
    }
});

app.post('/login', loginRoute);

app.post('/task', newTask);

app.get('/chart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/charts.html'));
})

app.get('/get-data', (req, res) => {
    res.send({x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]});
})

app.post('/predict', async (req, res) => {
    const inputData = req.body;

    // console.log(req.body);

    try {
        const response = await axios.post('http://python-p4:8000/predict', inputData);
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling prediction endpoint:', error);
        res.status(500).send('Internal server error');
    }
});


app.get('/get-task', async (req, res) => {
    const task = await readTask({user_id: 1});

    res.send(task);
});

app.listen(port, () => {
    console.log('Server running on port ' + port + '...');
});