import { Webhook } from "../../types"

export async function webhookCreate(webhook: Webhook, db): Promise<boolean|void> {
	let createdHook = null
	try {
		createdHook = await db('webhooks').insert({
			url: webhook.url,
			token: webhook.token
		})
	} catch (e) {
		console.log("Error:", e)
	}
	if (!createdHook || !createdHook.rowCount) {
		throw new Error('Could not insert row in created table.')
	}
	return true
}

export async function webhookGet(db) {
	return await db('webhooks').select('*')
}
