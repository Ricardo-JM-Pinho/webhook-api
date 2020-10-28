import * as express from 'express'
import knex from '../../db/pg'
import { webhookCreate, webhookGet } from './databaseActions'
import { StorageMode, Webhook } from '../../types'

const webhooks: express.Application = express.call(null)
const mode = process.env.STORAGE_MODE
const webhooksInMemory: Array<Webhook> = []

webhooks.post('/', async (req, res) => {
	const { url, token } = req.body

	// body validation 
	if (typeof url !== 'string') return res.status(400).json({ error: "missing parameter 'url'" })
	if (typeof token !== 'string') return res.status(400).json({ error: "missing parameter 'token'" })
	
	const hook: Webhook = {url, token}
	
	let insertResult:boolean | null
	let err: string | null

	// storage mode
	switch(mode) {
		case StorageMode.memory: {
			webhooksInMemory.push(hook)
			insertResult = true
		}
		case StorageMode.db:
		default: {
			insertResult = (await webhookCreate(hook, knex).catch(e => {
				console.log(e.message)
				err = e.message
			}))
		}
	}
	
	// response return
	if(!insertResult){
		return res.status(400).json({ error: "could not create webhook", message: err })
	}
	return res.sendStatus(200)
})

webhooks.post('/test', async (req, res) => {
	const { payload } = req.body
	
	// body validaiton
	if (!payload) return res.status(400).json({ error: "missing parameter 'payload'" })
	
	let webhooksArray: Array<Webhook> | null
	let err: string | null
	// storage mode
	switch(mode) {
		case StorageMode.memory: {
			webhooksArray = webhooksInMemory
		}
		case StorageMode.db:
		default: {
			webhooksArray = (await webhookGet(knex).catch(e => {
			console.log(e.message)
			err = e.message
			}))
		}
	}

	// response return
	if(!webhooks) {
		return res.status(400).json({ error: "could not retrieve webhooks", message: err })
	}
	return res.sendStatus(200)
})

export default webhooks
