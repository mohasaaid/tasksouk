const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Freelancer",
  tableName: "freelancers",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    name: {
      type: "varchar",
      nullable: false
    },
    email: {
      type: "varchar",
      nullable: false,
      unique: true
    },
    phone: {
      type: "varchar",
      nullable: true
    },
    skills: {
      type: "simple-array", // Use 'simple-array' for an array of simple values (strings, numbers)
      nullable: true
    },
    ratings: {
        type: "decimal",
        nullable: true,
        precision: 3, // Total number of digits
        scale: 1      // Digits after the decimal point
    },      
    location: {
      type: "varchar",
      nullable: true
    },
    availability: {
      type: "boolean",
      default: true
    },
    profile_picture: {
      type: "varchar",
      nullable: true
    },
    bio: {
      type: "text",
      nullable: true
    }
  }
});
