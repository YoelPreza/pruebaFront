
CREATE DATABASE tasksdb

CREATE TABLE task( 
id SERIAL PRIMARY KEY UNIQUE,
user_id VARCHAR(5),
user_name VARCHAR(50),
date DATE,
punch_in TIME,
punch_out TIME
);