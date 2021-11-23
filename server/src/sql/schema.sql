PRAGMA foreign_keys;

CREATE TABLE IF NOT EXISTS songs (
	songId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	author VARCHAR(50),
	name VARCHAR(100) NOT NULL
	createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
	instrumentId INT Not NULL
	FOREIGN KEY (instrumentId) REFERENCES instruments(instrumentId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notes (
	noteId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	value VARCHAR(10),
	position INT NOT NULL
	songId INT,
	FOREIGN KEY (songId) REFERENCES songs(songId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS instruments (
	instrumentId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50),
	madeBy VARCHAR(50)
);

INSERT INTO instruments (instrumentId, name, madeBy) VALUES (1, 'Drums', 'Aaron');
INSERT INTO instruments (instrumentId, name, madeBy) VALUES (2, 'Harp', 'Jainam');
INSERT INTO instruments (instrumentId, name, madeBy) VALUES (3, 'Kitty Piano', 'Jennifer');
INSERT INTO instruments (instrumentId, name, madeBy) VALUES (4, 'Xylophone', 'Himanshu');
INSERT INTO instruments (instrumentId, name, madeBy) VALUES (5, 'Piano', 'Default');

INSERT INTO instruments (songId, author, name, instrumentId) VALUES (1, 'Default', 'Ode to Joy (Dubstep Remix)', 5);


INSERT INTO notes (value, position, songId) VALUES ('E4', 1, 1);
INSERT INTO notes (value, position, songId) VALUES ('E4', 1, 1);
INSERT INTO notes (value, position, songId) VALUES ('F4', 1, 1);
INSERT INTO notes (value, position, songId) VALUES ('G4', 1, 1);
INSERT INTO notes (value, position, songId) VALUES ('G4', 1, 1);
INSERT INTO notes (value, position, songId) VALUES ('F4', 1, 1);
INSERT INTO notes (value, position, songId) VALUES ('E4', 1, 1);
INSERT INTO notes (value, position, songId) VALUES ('D4', 1, 1);
INSERT INTO notes (value, position, songId) VALUES ('C4', 1, 1);
INSERT INTO notes (value, position, songId) VALUES ('C4', 1, 1);
INSERT INTO notes (value, position, songId) VALUES ('D4', 1, 1);
INSERT INTO notes (value, position, songId) VALUES ('E4', 1, 1);
INSERT INTO notes (value, position, songId) VALUES ('E4', 1, 1);
INSERT INTO notes (value, position, songId) VALUES ('D4', 1, 1);
INSERT INTO notes (value, position, songId) VALUES ('D4', 1, 1);


-- INSERT INTO songs (id, song_title, notes, instrument) 
-- VALUES (2, 'Test Track', '4,5,6,7,8','drum');

-- INSERT INTO songs (id, song_title, notes, instrument) 
-- VALUES (3, 'Mary Had A Little Lamb',
-- 	 '0.950,0.830,0.750,0.830,0.950,0.950,0.950,0.830,0.830,0.830,0.950,1.150,1.150,0.950,0.830,0.750,
-- 	  0.830,0.950,0.950,0.950,0.830,0.830,0.950,0.830,0.750',
-- 	 'cat');