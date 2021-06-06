const { gql } = require("apollo-server");

module.exports = gql`
  type File {
    url: String!
    message: String!
  }

  type Video {
    id: ID!
    title: String!
    description: String!
    url: String!
    thumnail: String
    updatedAt: String
    createdAt: String
  }

  type VideosResponse {
    videos: [Video]!
    totalPages: Int!
    current: Int!
  }

  type Query {
    video(id: ID!): Video!
    getVideos(page: Int, limit: Int): VideosResponse!
  }
  type Mutation {
    uploadFile(file: Upload!): File
    createVideo(
      title: String!
      url: String!
      description: String
      thumnail: String
    ): Video!
    updateVideo(
      id: ID!
      title: String
      url: String
      description: String
      thumnail: String
    ): Video!
    removeVideo(id: ID!): Video!
  }
`;
