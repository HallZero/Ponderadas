const express =  require('express');
const {createTask, readTask, updateTask, deleteTask} = require('./task');
const {createUser, readUser, updateUser, deleteUser} = require('./user');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/create', async (req, res) => {
    const user = await createUser({name: 'Teste'});
    
    const task = {
        description: 'Teste',
        id: 1,
        done: false
    };

    const new_task = await createTask(task);

    res.send(new_task);
});

app.listen(port, () => {
    console.log('Server running on port ' + port + '...');
});