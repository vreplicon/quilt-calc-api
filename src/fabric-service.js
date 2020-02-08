const FabricService = {
  getAllFabric(knex) {
    return knex.select("*").from("fabric");
  },

  getById(knex, id) {
    return knex
      .from("fabric")
      .select("*")
      .where("id", id)
      .first();
  },

  getByQuiltId(knex, quilt_id) {
    return knex
      .from("fabric")
      .select("fabric_name", "amount")
      .where("quilt_id", quilt_id);
  },

  test(knex) {
    return knex("quilts")
      .fullOuterJoin("fabric", "quilts.id", "=", "fabric.quilt_id")
      .select("*");
  }
};

module.exports = FabricService;
