import mongoose from 'mongoose'

let isConnected : boolean =  false;

export const connectToDatabase = async() => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL){
        console.log('Missing MongoDB URL');
        return;
    }

    if(isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName : 'stack-overflow'
        } )
    }catch(err){
        console.log('DB connection failed with the following error: ', err);
    }
    isConnected = true;
}