const express =  require('express');
const {createTask, readTask, updateTask, deleteTask} = require('./models/task');
const {createUser, readUserByName, updateUser, deleteUser} = require('./models/user');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/login');
const newTask = require('./routes/newTask');
const path = require('path')
const { spawn } = require('child_process');

const app = express();
const port = 3000;

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

app.post('/predict', (req, res) => {
    const inputData = req.body;

    const pythonProcess = spawn('python', ['./machine-learning/prediction.py']);
    
    let response = '';

    // Send input data to the Python script
    pythonProcess.stdin.write(JSON.stringify(inputData));
    pythonProcess.stdin.end();

    pythonProcess.stdout.on('data', (data) => {
        response += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python script: ${data}`);
        res.status(500).send('Internal server error');
    });

    pythonProcess.on('close', () => {
        try {
            const parsedResponse = JSON.parse(response);
            res.json(parsedResponse);
        } catch (error) {
            console.error('Error parsing response from Python script:', error);
            res.status(500).send('Internal server error');
        }
    });
});


app.get('/get-task', async (req, res) => {
    const task = await readTask({user_id: 1});

    res.send(task);
});

app.listen(port, () => {
    console.log('Server running on port ' + port + '...');
});