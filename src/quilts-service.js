const QuiltsService = {
  getAllStandardQuilts(knex) {
    return knex.select("*").from("quilts").where("standard_pattern", 'TRUE');
  },

  getByLookupId(knex, id) {
    return knex
      .from("quilts")
      .select("*")
      .where("lookup_id", id)
      .first();
  },

    addNewQuilt(knex, newQuilt) {
        return knex
            .insert(newQuilt)
            .into('quilts')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
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
