const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const { typeDefs } = require("./Schemas/typeDefs"); // Import your typeDefs
const { resolvers } = require("./Schemas/resolvers"); // Import your resolvers

// Import your typeDefs and resolvers
const { typeDefs } = require("./Schemas/typeDefs");
const { resolvers } = require("./Schemas/resolvers");

const app = express();
// Middleware function for authentication
const authMiddleware = (req, res, next) => {
  // Check for the authorization header in the request
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Extract the token from the authorization header
    const token = authHeader.split(" ")[1];

    // Verify the token (e.g., using JWT.verify or any other method)
    // For simplicity, we assume the token is valid and contains user information
    // You should replace this with your actual authentication logic
    const user = { id: "user-id", email: "user@example.com" };

    // Add the user to the request context so that it's accessible in resolvers
    req.user = user;
  }

  // Continue to the next middleware or resolver
  next();
};

// Apply the authentication middleware to the Express app
app.use(authMiddleware);

// Connect to MongoDB (if applicable)
mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Create an instance of Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Connect Apollo Server to Express
server.applyMiddleware({ app });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
});
