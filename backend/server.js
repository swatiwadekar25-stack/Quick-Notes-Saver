import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import noteRoutes from "./routes/noteRoutes.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("../frontend"))
app.use(cors());


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });


app.use("/api/notes",noteRoutes)



app.listen(5000, () => {
    console.log("Server is running on port 5000");
});