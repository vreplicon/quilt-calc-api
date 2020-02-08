CREATE TABLE fabric (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  quilt_id INTEGER REFERENCES quilts
(id) ON
DELETE CASCADE NOT NULL,
  fabric_name TEXT
NOT NULL,
  amount INTEGER NOT NULL
);