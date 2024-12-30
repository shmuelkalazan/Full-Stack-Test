import { connect } from 'mongoose';

export const connectToMongo = async () => {
    try {

        await connect(process.env.DB_CONNECT);
        console.log("db conected");
    } catch (error) {


        console.log("Can't connect to mongo");

    }
}

