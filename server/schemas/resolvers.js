const { AuthenticationError } = require('apollo-server-express');
const { Profile, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getSingleUser: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('Necesitas hacer login!');
        },
    },

    Mutation: {
        createUser: async (parent, args) => {
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
                        $addToSet: { authors: args.authors },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw new AuthenticationError('Necesitas hacer login!');
        },
       
        deleteBook: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: args._id },
                    { $pull: { authors: args.authors } },
                    { new: true }
                );
            }
            throw new AuthenticationError('Necesitas hacer login!');
        };
    }
}
module.exports = resolvers;
