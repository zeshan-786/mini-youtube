require('dotenv').config()
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const cookieParser = require('cookie-parser')
const path = require('path')
const { makeExecutableSchema } = require("graphql-tools");
const  { graphqlUploadExpress, GraphQLUpload }  = require('graphql-upload')

const typeDefs = require("./typeDef");
const resolvers = require("./resolvers");
const db = require('./database/connection')

const {  } = require('./resolvers')

// Connect to db
db.connectMongodb()

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const root = {
  Upload: GraphQLUpload,
  getPhotos,
  addPhoto,
  editPhoto,
  deletePhoto,
  searchPhotos
}

app.use(
  '/graphql',
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }),
  expressGraphql({
    schema,
    rootValue: root,
    graphiql: true
  })
)

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    customFormatErrorFn: (err) => {
      console.log(err.message);
      return err.message;
    },
    graphiql: true,
  })
);
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
