const {createTask} = require('../task');

module.exports = async (req, res) => {
    const task = {
        description: 'Mano, to testando so',
        id: 1,
        done: false
        // description: req.body.description,
        // id: req.body.id,
        // done: req.body.done
    };

    const new_task = await createTask(task);

    res.redirect('/todo');
}