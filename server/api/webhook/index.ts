import * as express from 'express'
import knex from '../../db/pg'
import { webhookCreate, webhookGet } from './databaseActions'

const webhooks: express.Application = express.call(null)

webhooks.post('/', async (req, res) => {
	const { url, token} = req.body
	
	if (!url) return res.status(400).json({ error: "missing parameter 'name'" })
	if (!token) return res.status(400).json({ error: "missing parameter 'token'" })
	let err = null
	const webhook = (await webhookCreate(url, token, knex).catch(e => {
		console.log(e.message)
		err = e.message
	}))[0]
	if(!webhook) return res.status(400).json({ error: "could not create webhook", message: err })
	return res.sendStatus(200)
})

webhooks.post('/test', async (req, res) => {
	const { payload } = req.body
	
	if (!payload) return res.status(400).json({ error: "missing parameter 'payload'" })
	let err = null
	const webhooks = (await webhookGet(knex).catch(e => {
		console.log(e.message)
		err = e.message
	}))
	if(!webhooks) return res.status(400).json({ error: "could not retrieve webhooks", message: err })

	return res.sendStatus(200)
})

export default webhooks
