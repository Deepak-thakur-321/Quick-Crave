require("dotenv").config();
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
   publicKey: process.env.IMAGEKIT_PUBLIC_KEY, 
   privateKey: process.env.IMAGEKIT_PRIVETE_KEY,
   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadImage(file, fileName) {
   try {
      const result = await imagekit.upload({
         file,      
         fileName,  
      });
      return result.url;
   } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
   }
}

module.exports = { uploadImage };
