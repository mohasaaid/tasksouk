const { EntitySchema } = require("typeorm");


module.exports = new EntitySchema({
  name: "Category",
  tableName: "categories",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    name: {
      type: "varchar"
    },
    description: {
      type: "text",
      nullable: true
    },
    image_url: {
      type: "varchar",
      nullable: true
    }
  }
});
