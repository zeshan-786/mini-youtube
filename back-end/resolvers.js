const {
  listVideos,
  updateVideo,
  showVideo,
  createVideo,
  removeVideo,
} = require("./controllers/VideoController");

module.exports = {
  Query: {
    getVideos: async (parent, args) => await listVideos(args),
    video: async (parent, args) => await showVideo(args),
  },
  Mutation: {
    createVideo: async (parent, args) => {
      try {
        return await createVideo(args);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateVideo: async (parent, args) => {
      try {
        return await updateVideo(args);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    removeVideo: async (parent, args) => {
      try {
        return await removeVideo(args);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
