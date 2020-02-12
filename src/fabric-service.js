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

	addNewFabric(knex, fabric, quilt) {
		const fieldsToInsert = fabric.map(f =>
			({
				fabric_name : f.fabric_name,
        amount : f.amount,
				quilt_id: quilt.id
			}));
		return knex
			.insert(fieldsToInsert)
			.into('fabric')
			.returning('*')
			.then(rows => {
				return rows[0]
			})
	},
};

module.exports = FabricService;
