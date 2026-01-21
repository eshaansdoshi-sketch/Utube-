import mongoose from "mongoose"

// Always a safe practice to use try and catch along with async await

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`) // TO see which db host are we using rn
    }

    catch (error){ 
        console.log("ERROR: ",error)
        process.exit(1)
    }
}

export default connectDB;   