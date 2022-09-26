import mongoose from 'mongoose';

const PersonnelSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    prenom: {
        type: String,
        required: true,
    },
    naissance: {
        type: Date,
        required: true,
    },
    cin: {
        type: String,
        required: true,
    },
    metier: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    zone: {
        type:String
    }
})

const Personnel = mongoose.model('Personnel', PersonnelSchema);

export default Personnel;