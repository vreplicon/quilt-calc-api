const QuiltsService = {
  getAllQuilts(knex) {
    return knex.select("*").from("quilts");
  },

  getById(knex, id) {
    return knex
      .from("quilts")
      .select("*")
      .where("id", id)
      .first();
  },

  groupFabric(quilt, fabric) {
    let newQuilt = {
      ...quilt,
      fabric: []
    };

    fabric.forEach(f => {
      if (f.quilt_id == quilt.id) {
        newQuilt.fabric.push({ fabric_name: f.fabric_name, amount: f.amount });
      }
    });

    return newQuilt;
  }
};

module.exports = QuiltsService;
