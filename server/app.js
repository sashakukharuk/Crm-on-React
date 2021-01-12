const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const muggersRoutes = require('./routes/muggers')
const keys = require('./config/keys')

const app = express()

mongoose.connect(keys.mongoURL, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(()=> console.log('MongoDB connected'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

// app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/muggers', muggersRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('build'))

	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(
				__dirname, 'build', 'index.html'
			)
		)
	})
}

module.exports = app
