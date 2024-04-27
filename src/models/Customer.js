
const { EntitySchema } = require("typeorm");

// CustomerProfile (extends User)
module.exports = new EntitySchema({
    name: "CustomerProfile",
    tableName: "customer_profiles",
    columns: {
        userId: {
            primary: true,
            type: "int",
            unique: true
        },
        preferences: {
            type: "text",
            nullable: true
        },
        transactionHistory: {
            type: "json",
            nullable: true
        },
        paymentMethod: {
            type: "varchar",
            nullable: true
        },
        savedAddresses: {
            type: "simple-array",
            nullable: true
        },
        notificationPreferences: {
            type: "json",
            nullable: true
        },
        marketingPreferences: {
            type: "boolean",
            default: false
        },
        profileVisibility: {
            type: "boolean",
            default: true
        },
        rating: {
            type: "decimal",
            precision: 2,
            scale: 1,
            nullable: true
        }
    },
    relations: {
        user: {
            target: "User",
            type: "one-to-one",
            inverseSide: "customerProfile",
            joinColumn: {
                name: "userId",
                referencedColumnName: "id"
            }
        }
    }
});


