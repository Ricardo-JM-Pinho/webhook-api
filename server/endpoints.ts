import * as express from 'express'

const api: express.Application = express.call(null)


api.get('/', (req, res) => {
	res.json({
		status: 'running',
	})
})

export default api
