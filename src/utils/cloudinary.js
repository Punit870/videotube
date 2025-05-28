import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary with your credentials
cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const uploadOnCloudinary = async (localFilePath) => {
        try {
            if(!localFilePath) return null
          const response =await  cloudinary.uploader.upload(localFilePath,{
                resource_type: "auto",
            })
            console.log("file uploaded on clodinary .file src :"+ response.url)
            //omce the file is uploaded ,we would like to delete it from our server
            fs.unlinkSync(localFilePath);
            return response
        } catch (error) {
            fs.unlinkSync(localFilePath);
            return null
        }
    }


    const deleteFromCloudinary = async (publicId) => {
        try {
            const result = await cloudinary.uploader.destroy(publicId);
            console.log("file deleted from clodinary .file src :"+ result);
            return result;
        } catch (error) {
            console.error("Error deleting file from Cloudinary:", error);
            return null;
        }
    }
    export {uploadOnCloudinary, deleteFromCloudinary};