const {createTask} = require('../task');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.secret;

module.exports = async (req, res) => {

    const token = req.headers.authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        const task = {
            description: req.body.description,
            id: 1,
            done: false
        };
    
        const new_task = await createTask(task);
    
        return res.status(201).json(new_task);

    } catch (error) {
        return res.status(403).json({ error: 'Forbidden' });
    }
}