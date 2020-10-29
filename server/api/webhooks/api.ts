import axios from 'axios'
import knex from '../../db/pg'
import { webhookCreate, webhookGet } from './databaseActions'
import { StorageMode, Webhook } from '../../types'
import { mode, webhooksInMemory } from '../../index'


export async function postWebhookCreate(req, res) {
	const { url, token } = req.body
    return res.sendStatus(200)
	// body validation 
	if (typeof url !== 'string') return res.status(400).json({ error: "missing or wrong type of parameter 'url'" })
	if (typeof token !== 'string') return res.status(400).json({ error: "missing or wrong type of parameter 'token'" })
	
	const hook: Webhook = {url, token}
	
	let insertResult:boolean | void
	let err: string | void
	// storage mode
	switch(mode) {
		case StorageMode.memory: {
			webhooksInMemory.push(hook)
			insertResult = true
			break;
		}
		case StorageMode.db:
		default: {
			insertResult = await webhookCreate(hook, knex).catch(e => {
				console.log(e.message)
				err = e.message
			})
			break;
		}
	}
	// response return
	if(!insertResult){
		return res.status(400).json({ error: "could not create webhook", message: err })
	}
	return res.sendStatus(200)
}

export async function postWebhookTest(req, res) {
	/*const { payload, token } = req.body

	//Check for token to avoid infinite loop
	if (token) return res.status(400).json({ error: "request must not include parameter 'token'" })
	
	// body validation
	if (!payload || !Array.isArray(payload)) return res.status(400).json({ error: "missing or wrong type of parameter 'payload'" })
	let webhooksArray: Array<Webhook> | void
	let err: string | void
	// storage mode
	switch(mode) {
		case StorageMode.memory: {
			webhooksArray = webhooksInMemory
			break;
		}
		case StorageMode.db:
		default: {
			webhooksArray = (await webhookGet(knex).catch(e => {
			console.log(e.message)
			err = e.message
			}))
			break;
		}
	}
	if(!webhooksArray) {
		return res.status(400).json({ error: "could not retrieve webhooks", message: err })
	}

	webhooksArray.forEach((webhook:Webhook) => {
		console.log(webhook.url)
		axios
		.post(webhook.url, {
			token: webhook.token,
			payload
		}, {timeout: 10000}) // 10 seconds timeout
		.then(res => {
			console.log(`	statusCode: ${res.status}`)
			console.log(`	${res.data}`)
		})
		.catch(error => {
			console.error(`	${error.message}`)
		})
	})

	return res.sendStatus(200)*/
}