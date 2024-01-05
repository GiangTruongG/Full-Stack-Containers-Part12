const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const { MONGO_URL } = require('../util/config')

// if (MONGO_URL && !mongoose.connection.readyState) mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connect('mongodb://the_username:the_password@todo-app-mongo-1:27017/the_database', { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = {
  Todo
}
