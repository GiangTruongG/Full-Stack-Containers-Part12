const express = require('express');
const { Todo } = require('../mongo');
const redis = require('redis');
const { promisify } = require('util');
const router = express.Router();

const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const currentTodoCounter = await getAsync('added_todos') || 0;
  await setAsync('added_todos', parseInt(currentTodoCounter) + 1);

  res.send(todo);
});

/* GET statistics for todoCounter */
router.get('/statistics', async (req, res) => {
  const currentTodoCounter = await getAsync('added_todos') || 0;

  res.send({
   added_todos: parseInt(currentTodoCounter),
  });
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  req.id = id;
  if (!req.todo) return res.sendStatus(404)

  next();
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {

  res.send(req.todo); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  await Todo.findByIdAndUpdate(req.id, req.body, { new: true }, function(err, updatedTodo) {
   if (err) throw err;

   console.log(updatedTodo);
   res.send(updatedTodo);
}); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
