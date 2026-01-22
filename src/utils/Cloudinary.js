import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRETS
    });

const uploadOnCloudinary = async (localfilepath) => {
    try{
        if (!localfilepath) return null
        // Upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: 'auto'
        })  
        // File has been uploaded successfully
        console.log("The file has been uploaded SUCESSFULLY on CLOUDINARY", response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localfilepath)  // Remove the locally saved temporary file as uploading failed
        return null;
    }
}

export {uploadOnCloudinary}