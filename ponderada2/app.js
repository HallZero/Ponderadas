const express =  require('express');
const {createTask, updateTask, deleteTask} = require('./task');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/create', async (req, res) => {
    const task = {
        description: 'Teste',
        id: 1
    };

    const new_task = await createTask(task);

    res.send(new_task);
});

app.listen(port, () => {
    console.log('Server running on port ' + port + '...');
});