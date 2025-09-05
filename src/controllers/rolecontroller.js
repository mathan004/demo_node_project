import Role from "../models/role_model.js";



export const registerRole = async (req, res, next) => {
    try {

        const { name } = req.body

        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({ message: "Role already exists" });
        }

        // 3. Create new role
        const role = await Role.create({ name });
        res.status(201).json({
            message: "Role registered successfully",
            user: {
                id: role._id,
                name: role.name
            },
        });

    } catch (err) {  
        next(err);
    }

}


export const getRoles = async (req, res, next) => {
    try {

        const roles = await Role.find({ status: true });
        res.status(200).json({
            message: "Roles Fetched successfully",
            roles
        });

    } catch (err) {
        next(err)
    }
}



export const updateRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body


        const updatedRole = await Role.findByIdAndUpdate(
            id,
            { name, status },
        );

        if (!updatedRole) {
            return res.status(404).json({ message: "Role not found" });
        }

        res.status(200).json({
            message: "Role updated successfully",
            role: updatedRole
        });


    } catch (err) {
        next(err)

    }

}


export const deleteRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const role = await Role.findByIdAndDelete(id)
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        res.status(200).json({
            message: "Role deleted successfully",
            role: {
                id: role._id,
                name: role.name,
            },
        });
    }catch(err){
        next(err)
    }
}

