const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Review",
    tableName: "reviews",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        reviewerId: {
            type: "int",
            nullable: false
        },
        userId: {
            type: "int",
            nullable: true
        },
        freelancerId: {
            type: "int",
            nullable: true
        },
        rating: {
            type: "decimal",
            precision: 2,
            scale: 1,
            nullable: false
        },     
        comment: {
            type: "text",
            nullable: true
        },
        reviewDate: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP"
        }
    },
    relations: {
        reviewer: {
            target: "User",
            type: "many-to-one",
            joinColumn: {
                name: "reviewerId",
                referencedColumnName: "id"
            }
        },
        user: {
            target: "User",
            type: "many-to-one",
            joinColumn: {
                name: "userId",
                referencedColumnName: "id"
            },
            nullable: true
        },
        freelancerProfile: {
            target: "FreelancerProfile",
            type: "many-to-one",
            joinColumn: {
                name: "freelancerId",
                referencedColumnName: "userId"
            },
            nullable: true
        }
    }
});
