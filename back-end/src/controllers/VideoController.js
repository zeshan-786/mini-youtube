const VideoModel = require("../models/VideoModel.js");

/**
 * VideoController.js
 *   Server-side logic for managing Videos.
 */
module.exports = {
  listVideos: async ({ page, limit }) => {
    page = page ? page : 1;
    limit = limit ? limit : 10;
    let skip = 0;
    if (page > 1) {
      skip = (page - 1) * limit;
    }
    const total = await VideoModel.find({}).countDocuments()
    const data = await VideoModel.find({}).limit(limit).skip(skip)
    return { totalPages: Math.ceil(total/limit),current: page, videos: data }
  },

  showVideo: async ({ id }) => {
    const video = await VideoModel.findOne({ _id: id });
    if (!video) {
      throw Error("No Video found");
    }
    return video;
  },
  createVideo: async ({ title, description, url, thumbnail }) => {
    let video = new VideoModel({
      title: title,
      description: description,
      url: url,
      thumbnail: thumbnail,
    });
    return await video.save();
  },
  updateVideo: async ({ id, title, description, url, thumbnail }) => {
    const Video = await VideoModel.findOne({ _id: id });
    if (!Video) {
      throw Error("No Video found");
    }

    Video.title = title ? title : Video.title;
    Video.description = description ? description : Video.description;
    Video.url = url ? url : Video.url;
    Video.thumbnail = thumbnail ? thumbnail : Video.thumbnail;

    return await Video.save();
  },

  removeVideo: async ({ id }) => {
    return await VideoModel.findByIdAndRemove(id);
  },
};
