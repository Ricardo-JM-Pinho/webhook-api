import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { PORT } from './config'
import api from './endpoints'

const app = express()


app.use(cors())
app.use(express.json({ limit: '10000mb' }))
app.use(bodyParser.json())
app.use('/api', api)


app.listen(PORT, () => console.log(
	`Listening on port ${PORT}! [${process.env.NODE_ENV}]`,
))
