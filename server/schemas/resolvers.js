const { AuthenticationError } = require('apollo-server-express');
const { Profile, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {

        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('Necesitas hacer login!');
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
             return await User.create({ args });
          },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No existe usuario con este correo electrónico!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Contraseña incorrecta!');
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: args._Id },
                    {
                        $addToSet: { authors: args.info },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw new AuthenticationError('Necesitas hacer login!');
        },
       
        removeBook: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: args.userId },
                    { $pull: { saveBooks:args.bookId } },
                    { new: true }
                );
            }
            throw new AuthenticationError('Necesitas hacer login!');
        }
    }
}
module.exports = resolvers;
