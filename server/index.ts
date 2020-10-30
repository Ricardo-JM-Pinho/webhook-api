import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { PORT } from './config'
import api from './endpoints'
import { Webhook } from '../server/types'

const app = express()

export const mode = process.env.STORAGE_MODE
export const webhooksInMemory: Array<Webhook> = []


app.use(cors())
app.use(express.json({ limit: '10000mb' }))
app.use(bodyParser.json())
app.use('/api', api)
if(process.env.NODE_ENV !== "unitTest" && process.env.NODE_ENV !== "integrationTest") {
	app.listen(PORT, () => console.log(
		`Listening on port ${PORT}! [${process.env.NODE_ENV}]`,
	))
}
