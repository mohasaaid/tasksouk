const { EntitySchema } = require("typeorm");

// User
module.exports = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
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
        birthdate: {
            type: "date",  // Adding the birthdate field
            nullable: true  // Set to true if birthdate is not mandatory for all users
        },
        roles: {
            type: "simple-array",
            nullable: false  // Assuming every user must have at least one role
        }
    }
});