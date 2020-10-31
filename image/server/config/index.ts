export const PORT = process.env.PORT || 8080

export const PG = process.env.SQL_CONNECTION ? {
	connectionString: process.env.SQL_CONNECTION,
} : {
	user: process.env.SQL_USER,
	password: process.env.SQL_PASSWORD,
	database: process.env.SQL_DATABASE,
	host: process.env.SQL_HOST,
	port: process.env.SQL_PORT,
}
