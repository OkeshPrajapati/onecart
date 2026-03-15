import multer from "multer"

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public")
    },
    filename: (req, file, cb) => {
        cb(null,Date.now()+"-"+file.originalname)
    }
});
let uploads = multer({ storage })

export default uploads;