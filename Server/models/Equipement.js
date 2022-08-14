import mongoose from 'mongoose';

const EquipementSchema = new mongoose.Schema({

    type: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    organism: {
        type: String,
        required: true,
    },
    libelle: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    num_inventaire: {
        type: String,
        required: true,
    },
    zone: {
        type: String,
    },
    fiche_technique: {
        type: String,
        required: true,
    },
    fds: {
        type: String,
        required: true,
    },
    affection: {
        type: String,
        required: true,
    }
})

const Equipement = mongoose.model('Equipement', EquipementSchema);

export default Equipement