import * as knex from 'knex'
import { PG } from '../../config'

export default knex({
	client: 'pg',
	connection: PG,
})
