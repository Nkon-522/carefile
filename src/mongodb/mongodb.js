//import "../env/env.js";
import mongoose from "mongoose";

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_CLUSTER = process.env.MONGO_CLUSTER;

//console.log(MONGO_USER, MONGO_PASSWORD, MONGO_CLUSTER)

mongoose.connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`
);

//const db = mongoose.connection;

const medicinaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    coordenadas: {
        type: [
            {
                type: [Number],
                required: true,
            },
        ],
        required: true,
    }
});

export const Medicina = mongoose.model("medicina", medicinaSchema);

/*
const medicina1 = new Medicina({
    nombre: "Paracetamol",
    coordenadas: [
        [19.432608, -99.133209],
        [19.432608, -99.133209],
        [19.432608, -99.133209],
        [19.432608, -99.133209],
    ]
});

try {
    await medicina1.save()
    console.log("Medicina guardada");
} catch (error) {
    console.log(error);
};


db.close();
*/