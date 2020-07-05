const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const temporarySchema = new Schema(
    {

        day: {
            type: String,
            required: true,
        },
        hour: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true,
        },
        services: [{
            serviceId: { type: Schema.Types.ObjectId, required: true },
            count: { type: Number, required: true },
        }],

        clientId: { type: Schema.Types.ObjectId, required: true },

    },
    {
        timestamps: true
    }
);
temporarySchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 5 });
module.exports = mongoose.connection.useDb("manager")
    .model("Cart", temporarySchema);
