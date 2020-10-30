import 'mocha'
import { expect } from 'chai'
import knex from '../server/db/pg'
import { StorageMode } from '../server/types'
import { postWebhookCreate, postWebhookTest } from '../server/api/webhooks/api'

process.env.STORAGE_MODE = StorageMode.memory

const res = {
	sendStatus: statusCode => 200,
	status: function(newStatus) {
		return {
				status: newStatus,
				json: function(jsonText) {
					return jsonText
				}}
    }
}

before(async () => {
    await knex('webhooks').truncate()
})
after(async () => {
    await knex('webhooks').truncate()
    knex.destroy()
})

context('Api testing in db mode', () => {
	it('should create webhook and return 200', async () => {
		expect(await postWebhookCreate({body: {url:'https://postman-echo.com/post', token:'test'}}, res)).to.equal(200)
	})
	it('should have webhook in database', async () => {
        const getWebhooks = await knex('webhooks').select('url', 'token')
        expect(getWebhooks.length).to.equal(1)
        expect(getWebhooks[0]).to.eql({ url: 'https://postman-echo.com/post', token: 'test' })
	})
	it('should return an error from lack of url', async () => {
		const response = await postWebhookCreate({body: {url:null, token:'test'}}, res)
		expect(response.error).to.equal("missing or wrong type of parameter 'url'")
	})
	it('should return an error from lack of token', async () => {
		const response = await postWebhookCreate({body: {url:'https://postman-echo.com/post', token:null}}, res)
		expect(response.error).to.equal("missing or wrong type of parameter 'token'")
	})
	it('should call the webhook and return 200', async () => {
		expect(await postWebhookTest({body: {payload:[]}}, res)).to.equal(200)
	})
	it('should return an error from lack of payload', async () => {
		const response = await postWebhookTest({body: {payload:null}}, res)
		expect(response.error).to.equal("missing or wrong type of parameter 'payload'")
	})
	it('should return an error from token parameter', async () => {
		const response = await postWebhookTest({body: {payload:[], token:"test"}}, res)
		expect(response.error).to.equal("request must not include parameter 'token'")
	})
	it('should return an error from the lack of database webhooks', async () => {
		await knex('webhooks').del()
		const response = await postWebhookTest({body: {payload:[]}}, res)
		expect(response.error).to.equal("could not retrieve webhooks")
	})
})