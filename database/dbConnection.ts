import mongoose from 'mongoose'

let isConnected : boolean =  false;

export const connectToDatabase = async() => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL){
        return console.log('Missing MongoDB URL');      
    }

    if(isConnected) {
        return console.log('MongoDB is already connected');
    }

    try{
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName : 'stack-overflow'
        });
        isConnected = true;
        console.log('DB is Connected');
    }catch(err){
        console.log('DB connection failed with the following error: ', err);
    }
  
};