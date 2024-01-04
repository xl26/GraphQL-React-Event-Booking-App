const bcrypt = require("bcryptjs");
const User = require("../../models/users");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (args) => {
    try {
      const check = await User.findOne({ email: args.userInput.email });
      if (check) {
        throw new Error("User already exists.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        name: args.userInput.name,
        email: args.userInput.email,
        password: hashedPassword,
      });
      const result = await user.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (error) {
      throw error;
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("User does not exist");
      } else {
        const pwCheck = await bcrypt.compare(password, user.password);
        if (!pwCheck) {
          throw new Error("Incorrect Password, try again.");
        }

        const token = jwt.sign(
          { userId: user.id, email: user.email },
          `${process.env.SECRET_KEY}`,
          {
            expiresIn: "1h",
          }
        );
        return { userId: user.id, token: token, tokenExpiration: 1 };
      }
    } catch (error) {
      throw new Error(error);
    }
  },
};
