TRUNCATE fabric RESTART
IDENTITY CASCADE;


INSERT INTO fabric
  (quilt_id, fabric_name, amount)
VALUES
  (1, 'Main color', 157),
  (1, 'Secondary color', 157),
  (2, 'Main color', 157),
  (2, 'Secondary color', 157);