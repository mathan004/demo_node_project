import mongoose from "mongoose";


const roleSchema = new mongoose.Schema(

    {
        name: {
            type: String,
            required: true

        },

        status: {
            type: Boolean,
            default: true

        },

    },
    { timestamps: true }



);

const Role = mongoose.model("Role", roleSchema);
export default Role;