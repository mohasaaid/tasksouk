const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "ServiceRequest",
    tableName: "service_requests",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        serviceOfferId: {
            type: "int",
            nullable: false
        },
        customerId: {
            type: "int",
            nullable: false
        },
        scheduledDate: {
            type: "timestamp",
            nullable: false
        },
        status: {
            type: "enum",
            enum: ['pending', 'confirmed', 'completed', 'cancelled'],
            default: 'pending'
        },
        additionalDetails: {
            type: "json",
            nullable: true
        },
        completionDate: {
            type: "timestamp",
            nullable: true
        }
    },
    indices: [
        {
            name: "IDX_SR_SERVICE_OFFER",
            columns: ["serviceOfferId"]
        },
        {
            name: "IDX_SR_CUSTOMER",
            columns: ["customerId"]
        }
    ],
    relations: {
        serviceOffer: {
            target: "ServiceOffer",
            type: "many-to-one",
            joinColumn: {
                name: "serviceOfferId",
                referencedColumnName: "id"
            }
        },
        customer: {
            target: "User",
            type: "many-to-one",
            joinColumn: {
                name: "customerId",
                referencedColumnName: "id"
            }
        }
    }
});
