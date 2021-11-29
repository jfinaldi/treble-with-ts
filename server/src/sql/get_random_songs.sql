SELECT 
    s.songId,
    s.name,
    s.author,
    i.name as instrumentName,
    s.createdOn,
    i.instrumentId as instrumentId,
    i.madeBy as instrumentMadeBy,
    (SELECT GROUP_CONCAT(n.value, ",") FROM notes n WHERE n.songId = s.songId ORDER BY n.position) AS notes
FROM songs s
JOIN instruments i
    ON s.instrumentId = i.instrumentId
ORDER BY RANDOM() LIMIT 2;
