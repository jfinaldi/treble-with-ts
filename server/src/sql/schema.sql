PRAGMA foreign_keys;

CREATE TABLE IF NOT EXISTS instruments (
	instrumentId INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR(50),
	madeBy VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS songs (
	songId INTEGER PRIMARY KEY AUTOINCREMENT,
	author VARCHAR(50),
	name VARCHAR(100),
	createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	instrumentId INTEGER,
	FOREIGN KEY (instrumentId) REFERENCES instruments(instrumentId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notes (
	noteId INTEGER PRIMARY KEY AUTOINCREMENT,
	value VARCHAR(10),
	position INTEGER,
	songId INTEGER,
	FOREIGN KEY (songId) REFERENCES songs(songId) ON UPDATE CASCADE ON DELETE CASCADE
);


INSERT INTO instruments (instrumentId, name, madeBy) VALUES (1, 'Drums', 'Aaron');
INSERT INTO instruments (instrumentId, name, madeBy) VALUES (2, 'Harp', 'Jainam');
INSERT INTO instruments (instrumentId, name, madeBy) VALUES (3, 'DJ Catpaw', 'Jennifer');
INSERT INTO instruments (instrumentId, name, madeBy) VALUES (4, 'Xylophone', 'Himanshu');
INSERT INTO instruments (instrumentId, name, madeBy) VALUES (5, 'Piano', 'Default');

INSERT INTO songs (songId, author, name, instrumentId) VALUES (1, 'Default', 'Ode to Joy (Dubstep Remix)', 5);
INSERT INTO notes (value, position, songId) VALUES ('E4', 1, 1);
INSERT INTO notes (value, position, songId) VALUES ('E4', 2, 1);
INSERT INTO notes (value, position, songId) VALUES ('F4', 3, 1);
INSERT INTO notes (value, position, songId) VALUES ('G4', 4, 1);
INSERT INTO notes (value, position, songId) VALUES ('G4', 5, 1);
INSERT INTO notes (value, position, songId) VALUES ('F4', 6, 1);
INSERT INTO notes (value, position, songId) VALUES ('E4', 7, 1);
INSERT INTO notes (value, position, songId) VALUES ('D4', 8, 1);
INSERT INTO notes (value, position, songId) VALUES ('C4', 9, 1);
INSERT INTO notes (value, position, songId) VALUES ('C4', 10, 1);
INSERT INTO notes (value, position, songId) VALUES ('D4', 11, 1);
INSERT INTO notes (value, position, songId) VALUES ('E4', 12, 1);
INSERT INTO notes (value, position, songId) VALUES ('E4', 13, 1);
INSERT INTO notes (value, position, songId) VALUES ('D4', 14, 1);
INSERT INTO notes (value, position, songId) VALUES ('D4', 15, 1);

INSERT INTO songs (songId, author, name, instrumentId) VALUES (2, 'Default', 'Numb Linkin Park', 1);
INSERT INTO notes (value, position, songId) VALUES ('4', 1, 2);
INSERT INTO notes (value, position, songId) VALUES ('5', 2, 2);
INSERT INTO notes (value, position, songId) VALUES ('6', 3, 2);
INSERT INTO notes (value, position, songId) VALUES ('7', 4, 2);
INSERT INTO notes (value, position, songId) VALUES ('8', 5, 2);

INSERT INTO songs (songId, author, name, instrumentId) VALUES (3, 'Default', 'Mary Had A Little Lamb', 3);
INSERT INTO notes (value, position, songId) VALUES ('0.950', 1, 3);
INSERT INTO notes (value, position, songId) VALUES ('0.830', 2, 3);
INSERT INTO notes (value, position, songId) VALUES ('0.750', 3, 3);
INSERT INTO notes (value, position, songId) VALUES ('0.830', 4, 3);
INSERT INTO notes (value, position, songId) VALUES ('0.950', 5, 3);
INSERT INTO notes (value, position, songId) VALUES ('0.950', 6, 3);
INSERT INTO notes (value, position, songId) VALUES ('0.950', 7, 3);
INSERT INTO notes (value, position, songId) VALUES ('0.830', 8, 3);
INSERT INTO notes (value, position, songId) VALUES ('0.830', 9, 3);
INSERT INTO notes (value, position, songId) VALUES ('0.830', 10, 3);
INSERT INTO notes (value, position, songId) VALUES ('0.950', 11, 3);
INSERT INTO notes (value, position, songId) VALUES ('1.150', 12, 3);
INSERT INTO notes (value, position, songId) VALUES ('1.150', 13, 3);
