function makeQuiltsArray() {
  return [
    {
      quilt_name: "Stripes",
      width: 3,
      height: 6,
      border: 0,
      block_width: 24,
      block_height: 12,
      class_name: "striped-block",
      standard_pattern: false,
      lookup_id: 1
    }
  ];
}

module.exports = { makeQuiltsArray };
