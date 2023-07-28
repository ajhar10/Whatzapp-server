import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from 'dotenv'
import { Configuration, OpenAIApi} from "openai";
import openAiRoutes from "./routes/openai.js"

//CONFIGURATION
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}))
app.use(morgan("common"));
app.use(bodyParser.urlencoded({limit:'30mb', extended: true }));
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(cors());


//OPENAI Configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  export const openai = new OpenAIApi(configuration);

//ROUTES SET
app.use("/openai",openAiRoutes)
//SERVER SETUP
const PORT = process.env.PORT || 3003;
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})