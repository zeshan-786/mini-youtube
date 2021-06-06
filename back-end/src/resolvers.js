const shortid = require("shortid");
const { createWriteStream, mkdir } = require("fs");
const path = require('path')

const {
  listVideos,
  updateVideo,
  showVideo,
  createVideo,
  removeVideo,
} = require("./controllers/VideoController");

const baseURL = process.env.API_URL ? process.env.API_URL : 'http://localhost:5000'

const storeUpload = async ({ stream, filename, mimetype }) => {
  const id = shortid.generate();
  const ImagePath = `images/file${id}${path.extname(filename)}`;
  return new Promise((resolve, reject) =>
    
    stream
      .pipe(createWriteStream(ImagePath))
      .on("data", (data) => console.log(data))
      .on("finish", () => {
        resolve({ url: `${baseURL}/${ImagePath}`, message: 'Upload successfull' });
      })
      .on("error", (err) => {
        console.log(err);
        resolve({  message: 'Error while uploading file'  });
      })
  );
};

const processUpload = async (upload) => {
  const { createReadStream, filename, mimetype, encoding } = await upload;
  const stream = createReadStream();
  if (['image/png','image/jpeg','image/jpg','video/mp4'].includes(mimetype)){
    return await storeUpload({ stream, filename, mimetype, encoding }) 
  } else{
    return { message: 'Invalid Format please upload video or image' }
  }
};

module.exports = {
  Query: {
    getVideos: async (parent, args) => await listVideos(args),
    video: async (parent, args) => await showVideo(args),
  },
  Mutation: {
    uploadFile: async (parent, args) => {
      mkdir("images", { recursive: true }, (err) => {
        if (err) throw err;
      });
      const { file } = args;
      const upload = await processUpload(file);
      return upload;
    },
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
