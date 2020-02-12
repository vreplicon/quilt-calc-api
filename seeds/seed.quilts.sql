TRUNCATE quilts RESTART
IDENTITY CASCADE;

INSERT INTO quilts

  (quilt_name, width, height, border, block_width, block_height, class_name, standard_pattern, lookup_id)
VALUES
  ('Stripes', 3, 6, 0, 24, 12, 'striped-block', TRUE, NULL),
  ('Stripes', 4, 4, 5, 24, 12, 'striped-block', FALSE, '123');