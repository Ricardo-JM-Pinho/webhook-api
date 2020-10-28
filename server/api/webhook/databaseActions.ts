export async function webhookCreate(url, token, db) {
	let createdInfo = null
	try {
		createdInfo = await db('webhooks').insert({
			url,
			token
		})
	} catch (e) {
		console.log("Error:", e)
	}
	if (!createdInfo) throw new Error('Could not insert row in created table.')
	return true
}

export async function webhookGet(db) {
	return await db('webhooks').select('*')
}
