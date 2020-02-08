TRUNCATE quilts RESTART
IDENTITY CASCADE;

INSERT INTO quilts

  (quilt_name, width, height, blockWidth, blockHeight, class_name)
VALUES
  ('Stripes', 3, 6, 24, 12, 'striped-block');