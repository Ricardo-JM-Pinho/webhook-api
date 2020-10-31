CREATE TABLE webhooks (
	id serial PRIMARY KEY,
	url VARCHAR ( 256 ) NOT NULL,
	token VARCHAR ( 50 )
);