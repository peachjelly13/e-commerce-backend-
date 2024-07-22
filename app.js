import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import fileUpload from "express-fileupload"
//** fileUpload in express */
//It simplifies the process of handling file uploads in web 
//applications by providing an easy-to-use interface and 
//handling many of the complexities involved in uploading files

const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json())
//parses incoming requests with JSON payloads. 
app.use(cookieParser())
// parses cookies attached to the client request object. 
app.use(bodyParser.urlencoded({extended:true}))
//incoming requests with URL-encoded payloads
//example name=John&age=30
app.use(fileUpload())
//for uploading files, read more about how file handling is handled in backend
//previously have used multer for file upload in projects can also read about that 


export {app}