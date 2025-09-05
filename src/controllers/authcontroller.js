import User from "../models/user_model.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



const generateToken = (id, role_id) => {
    return jwt.sign({ id, role_id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};



const loginuser = async (req, res, next) => {
    try {

        const { email, password } = req.body
        const user = await User.findOne({ email }).populate("role_id");
        const is_match = await bcrypt.compare(password, user.password)

        if (!user) {
            return res.status(400).json({ message: "Invalid credentialss" });
        }

        if (!is_match) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = generateToken(user._id, user.role_id._id);
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role_id.name,
            },
        });
    }
    catch (err) {
        next(err);
    }

}


export default loginuser








// Middleware to protect routes
export const protect = async (req, res, next) => {
  console.log("iiiiiiiii")


  let token;
  console.log("wwwwww",token)

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      console.log("UUUUUUUU",token)

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request
      req.user = await User.findById(decoded.id).populate("role_id");

      next();
    } catch (err) {
      return res.status(401).json({ message: "Not authorized" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Middleware to allow only specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role_id.name)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};




