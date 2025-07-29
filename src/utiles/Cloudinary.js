import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUDNNAME, 
        api_key:process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET  // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadOnCloudinary= async(localfilepath)=>{
        try {
            if(!localfilepath) return null
            const responce = await cloudinary.uploader.upload(localfilepath, {resource_type: "auto"});
            // Remove the local file after uploading
            console.log("File uploaded successfully:", responce.url);
            return responce;
        } catch (error) {
            fs.unlinkSync(localfilepath); // Delete the file if upload fails
            console.error("Error uploading to Cloudinary:", error);
            return null;
        }
     }
    
    console.log(uploadOnCloudinary);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();