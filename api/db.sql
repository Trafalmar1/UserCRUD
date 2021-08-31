CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR(30),
  email VARCHAR(30),
  password VARCHAR(255),
  role VARCHAR(30)
);

INSERT INTO users (username, email,role)
  VALUES ('TrafalMar', 'vladiksav2@gmail.com','1234','admin');
