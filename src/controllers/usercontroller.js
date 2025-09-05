import User from "../models/user_model.js";
import Role from "../models/role_model.js"



const registerUser = async (req, res, next) => {
    try {

        const { name, email, password, role_id } = req.body

        //check the user if already exists based on email
        const exists_email = await User.findOne({ email })

        if (exists_email) {

            return res.status(400).json({ message: "user already exists" })
        }

          // check if role exists
        const roleExists = await Role.findById(role_id);
        if (!roleExists) {
        return res.status(400).json({ message: "Invalid role_id provided" });
        }




        const user = await User.create({ name, email, password, role_id })
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                email:user.email,
                role:roleExists.name

            },
        });

    } catch (err) {
        next(err);
    }

}





export default registerUser;

