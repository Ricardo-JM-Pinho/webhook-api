import 'mocha'
import { expect } from 'chai'
import { StorageMode } from '../server/types'
import { postWebhookCreate } from '../server/api/webhooks/api'

process.env.STORAGE_MODE = StorageMode.memory

const res = {
    sendStatus: statusCode => 200,
}

context('Api testing in memory mode', () => {
	it('testing api', async () => {
		expect(await postWebhookCreate({body: {url:null, token: null}}, res)).to.equal(200)
	})
})