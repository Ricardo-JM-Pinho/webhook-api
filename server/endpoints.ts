import * as express from 'express'
import webhooks from './api/webhooks'

const api: express.Application = express.call(null)

api.use('/webhooks', webhooks)

api.get('/', (req, res) => {
	res.json({
		status: 'running',
	})
})

export default api
