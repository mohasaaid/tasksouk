const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "KYCInfo",
    tableName: "kyc_infos",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        freelancerId: {
            type: "int",
            unique: true
        },
        documentType: {
            type: "varchar",
            nullable: true // e.g., 'passport', 'driver_license'
        },
        documentNumber: {
            type: "varchar",
            nullable: true
        },
        documentImage: {
            type: "varchar",
            nullable: true
        },
        verificationStatus: {
            type: "varchar",
            nullable: true // e.g., 'pending', 'verified', 'rejected'
        },
        verificationDate: {
            type: "timestamp",
            nullable: true
        }
    },
    relations: {
        freelancer: {
            target: "FreelancerProfile",
            type: "one-to-one",
            inverseSide: "kycInfo",
            joinColumn: {
                name: "freelancerId",
                referencedColumnName: "userId"
            }
        }
    }
});
