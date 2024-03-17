const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'dwvuqahw2',
    api_key: '563441375781984',
    api_secret: 'x2dEVPTIwie3i9dBNG2-wyCMz1Y'
});


exports.getUrl = async(file) =>{

    console.log(file);

    const cloudinaryResponse = await cloudinary.uploader.upload(
        file.tempFilePath
    );

    console.log(cloudinaryResponse.secure_url);

    return cloudinaryResponse.secure_url;

}