const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,

        },
        description: {
            type: String,
            required: true,

        },
        state: {
            type: Boolean,
            required: true,
            default: 0
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    }
);

module.exports = model("Task", taskSchema);