import asynchandler from "../utiles/asynchandler.js";

const registeruser = asynchandler(async (req, res) => {
    return res.status(200).json({
        message :"ok",
    })
})


export default registeruser