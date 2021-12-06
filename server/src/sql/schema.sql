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

INSERT INTO songs (songId, author, name, instrumentId) VALUES (4, 'Default', 'Bells On Parade', 4);
INSERT INTO notes (value, position, songId) VALUES ('3', 1, 4);
INSERT INTO notes (value, position, songId) VALUES ('5', 2, 4);
INSERT INTO notes (value, position, songId) VALUES ('4', 3, 4);
INSERT INTO notes (value, position, songId) VALUES ('7', 4, 4);

INSERT INTO songs (songId, author, name, instrumentId) VALUES (5, 'Default', 'Never Gonna Give You Up', 3);
INSERT INTO notes (value, position, songId) VALUES ('1.268', 1, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.455', 2, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.567', 3, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.268', 4, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.994', 5, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.994', 6, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.741', 7, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.268', 8, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.455', 9, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.567', 10, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.268', 11, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.741', 12, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.741', 13, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.567', 14, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.268', 15, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.455', 16, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.567', 17, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.268', 18, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.567', 19, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.741', 20, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.455', 21, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.268', 22, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.15', 23, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.15', 24, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.741', 25, 5);
INSERT INTO notes (value, position, songId) VALUES ('1.567', 26, 5);

INSERT INTO songs (songId, author, name, instrumentId) VALUES (6, 'Default', 'Sick Drum Solo Breh', 1);
INSERT INTO notes (value, position, songId) VALUES ('7', 1, 6);
INSERT INTO notes (value, position, songId) VALUES ('12', 2, 6);
INSERT INTO notes (value, position, songId) VALUES ('7', 3, 6);
INSERT INTO notes (value, position, songId) VALUES ('4', 4, 6);
INSERT INTO notes (value, position, songId) VALUES ('9', 5, 6);
INSERT INTO notes (value, position, songId) VALUES ('10', 6, 6);
INSERT INTO notes (value, position, songId) VALUES ('6', 7, 6);

INSERT INTO songs (songId, author, name, instrumentId) VALUES (7, 'Default', 'Knockin on Heavens Harp', 2);
INSERT INTO notes (value, position, songId) VALUES ('F7', 1, 7);
INSERT INTO notes (value, position, songId) VALUES ('D7', 2, 7);
INSERT INTO notes (value, position, songId) VALUES ('B6', 3, 7);
INSERT INTO notes (value, position, songId) VALUES ('A6', 4, 7);
INSERT INTO notes (value, position, songId) VALUES ('D6', 5, 7);
INSERT INTO notes (value, position, songId) VALUES ('B5', 6, 7);
INSERT INTO notes (value, position, songId) VALUES ('G5', 7, 7);
INSERT INTO notes (value, position, songId) VALUES ('E5', 8, 7);
INSERT INTO notes (value, position, songId) VALUES ('C5', 9, 7);
INSERT INTO notes (value, position, songId) VALUES ('F4', 10, 7);
INSERT INTO notes (value, position, songId) VALUES ('D4', 11, 7);
INSERT INTO notes (value, position, songId) VALUES ('G1', 12, 7);

INSERT INTO songs (songId, author, name, instrumentId) VALUES (8, 'Default', 'Fisher Price', 4);
INSERT INTO notes (value, position, songId) VALUES ('4', 1, 8);
INSERT INTO notes (value, position, songId) VALUES ('5', 2, 8);
INSERT INTO notes (value, position, songId) VALUES ('3', 3, 8);
INSERT INTO notes (value, position, songId) VALUES ('6', 4, 8);
INSERT INTO notes (value, position, songId) VALUES ('2', 5, 8);

INSERT INTO songs (songId, author, name, instrumentId) VALUES (9, 'Default', 'Bards Ballad', 2);
INSERT INTO notes (value, position, songId) VALUES ('E1', 1, 9);
INSERT INTO notes (value, position, songId) VALUES ('G1', 2, 9);
INSERT INTO notes (value, position, songId) VALUES ('B5', 3, 9);


