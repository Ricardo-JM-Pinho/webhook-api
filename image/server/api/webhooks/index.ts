import * as express from 'express'
import { postWebhookCreate, postWebhookTest } from './api'

const webhooks: express.Application = express.call(null)

webhooks.post('/', async (req, res) => {
	return postWebhookCreate(req,res)
})

webhooks.post('/test', async (req, res) => {
	return postWebhookTest(req,res)
})

export default webhooks
