const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "ServiceOffer",
    tableName: "service_offers",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        freelancerId: {
            type: "int",
            nullable: false
        },
        categoryId: {
            type: "int",
            nullable: false
        },
        description: {
            type: "text",
            nullable: true
        },
        minimumPrice: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: false
        },
        workPhotos: {
            type: "simple-array", // Array of URLs to images
            nullable: true
        }
    },
    indices: [
        {
            name: "IDX_FREELANCER_CATEGORY_UNIQUE", // Naming the index for clarity
            unique: true, // Ensuring that the combination of freelancerId and categoryId is unique
            columns: ["freelancerId", "categoryId"]
        }
    ],
    relations: {
        freelancer: {
            target: "FreelancerProfile",
            type: "many-to-one",
            joinColumn: {
                name: "freelancerId",
                referencedColumnName: "userId"
            }
        },
        category: {
            target: "Category",
            type: "many-to-one",
            joinColumn: {
                name: "categoryId",
                referencedColumnName: "id"
            }
        },
        serviceRequests: {  // New relation added here
            target: "ServiceRequest",
            type: "one-to-many",
            inverseSide: "serviceOffer",
            joinColumn: {
                name: "id",
                referencedColumnName: "serviceOfferId"
            }
        }
    }
});
