const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "FreelancerProfile",
    tableName: "freelancer_profiles",
    columns: {
        userId: {
            primary: true,
            type: "int",
            unique: true
        },
        skills: {
            type: "simple-array",
            nullable: true
        },
        bio: {
            type: "text",
            nullable: true
        },
        portfolioUrls: {
            type: "simple-array",
            nullable: true
        },
        availabilitySchedule: {
            type: "json",
            nullable: true
        },
        serviceArea: {
            type: "varchar",
            nullable: true
        },
        certifications: {
            type: "simple-array",
            nullable: true
        },
        hourlyRate: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true
        },
        languages: {
            type: "simple-array",
            nullable: true
        },
        insurance: {
            type: "boolean",
            default: false
        },
        responseTime: {
            type: "varchar",
            nullable: true
        }
    },
    relations: {
        user: {
            target: "User",
            type: "one-to-one",
            inverseSide: "freelancerProfile",
            joinColumn: {
                name: "userId",
                referencedColumnName: "id"
            }
        },
        reviews: {
            target: "Review",
            type: "one-to-many",
            inverseSide: "freelancer",
            joinColumn: {
                name: "freelancerId",
                referencedColumnName: "userId"
            }
        },
        serviceOffers: { 
            target: "ServiceOffer",
            type: "one-to-many",
            inverseSide: "freelancer",
            joinColumn: {
                name: "freelancerId",
                referencedColumnName: "userId"
            }
        }
    }
});
