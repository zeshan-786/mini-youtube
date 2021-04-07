module.exports = `
type Video {
    id: ID!
    title: String!
    description: String!
    url: String!
    thumnail: String
    updatedAt: String
    createdAt: String
}

type Query {
    video(id: ID!): Video!
    getVideos(page: Int, limit: Int ) : [Video]!
}
type Mutation {
    createVideo(title:String!, url: String! description: String, thumnail: String): Video!
    updateVideo(id: ID!, title: String, url: String, description: String, thumnail: String): Video!
    removeVideo(id: ID!): Video!
}
`;
