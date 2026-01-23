//require('dotenv').config({path: './env'})   This works just fine , but messes with the consistency
import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});

import {app} from './app.js'
import connectDB from "./db/index.js";



//Second Approach: calling a function by importing (BETTER APPROACH)
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Your server is running on :${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGO DB connectiona error !!!",err)
})



/* First Approach
import express from "express";

(async () => {
    try{
        await mongoose.connect(`${process.env.MONOGODB_URI}/${db_name}`)
        app.on("error", (error) => {
            console.log("ERRRR: ",error);
            throw error
        })

        app.listen(process.env.PORT, () =>{
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    }

    catch (error){
        console.log("ERROR: ",error);
        throw err
    }

})()

*/
