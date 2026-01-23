import fs from "fs";
import { v2 as cloudinary } from 'cloudinary';

let isConfigured = false;

const configureCloudinary = () => {
  if (isConfigured) return;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  isConfigured = true;
};


const uploadOnCloudinary = async (localfilepath) => {
    try{

        configureCloudinary();

        if (!localfilepath) return null
        // Upload the file on cloudinary

        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
        })  
        
        // File has been uploaded successfully
        console.log("The file has been uploaded SUCESSFULLY on CLOUDINARY", response.url);
        if (fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath);
        }   
        return response;
    } 
    catch (error) {
        if (fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath);
        }   
  // Remove the locally saved temporary file as uploading failed
        return null;
    }
}

export { uploadOnCloudinary }