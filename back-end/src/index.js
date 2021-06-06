const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    // Import database connection
    require("./database/connection").connectMongodb();
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: true,
    });

    server.listen(PORT, () => {
      console.log(`🚀 server running @ http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
