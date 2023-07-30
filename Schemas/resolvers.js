// Schemas/resolvers.js

const { User, Book } = require('../models'); // Import your Mongoose models if using MongoDB

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // Return the logged-in user based on the context (e.g., authentication)
      // In this example, we assume you have an authenticated user and can access their ID from the context.
      const userId = context.user.id;
      const user = await User.findById(userId);
      return user;
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      // Your login logic here (e.g., verifying credentials and generating a token)
      // Return an authentication object containing the user and token.
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      // Perform password validation here (e.g., using bcrypt.compare)
      const isValidPassword = true; // Replace with actual password validation logic
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }
      // Generate and return a token (e.g., using JWT)
      const token = 'your-generated-token'; // Replace with your actual token
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      // Your logic to add a new user to the database
      // Return an authentication object containing the new user and token.
      const newUser = await User.create({ username, email, password });
      const token = 'your-generated-token'; // Replace with your actual token
      return { token, user: newUser };
    },
    saveBook: async (parent, { bookData }, context) => {
      // Your logic to save a book for the logged-in user
      // In this example, we assume you have an authenticated user and can access their ID from the context.
      const userId = context.user.id;
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { savedBooks: bookData } },
        { new: true }
      );
      return user;
    },
    removeBook: async (parent, { bookId }, context) => {
      // Your logic to remove a book from the savedBooks array of the logged-in user
      // In this example, we assume you have an authenticated user and can access their ID from the context.
      const userId = context.user.id;
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      return user;
    },
  },
};

module.exports = resolvers;
