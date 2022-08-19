import mongoose from 'mongoose';

const ZoneSchema = new mongoose.Schema({
    
    type: {
        type: String, 
        required: true,
    },
    libelle: {
        type: String,
    },
    code: {
        type: String, 
        required: true,
    },
    ordre: {
        type: String, 
        required: true,
    },
    superficie: {
        type: Number, 
        required: true,
    },
    nbr_niveau: {
        type: Number,
    },
    responsable: {
        type: String, 
        required: true,
    },
    equipe: {
        type: Array, 
        required: true,
    },
    atex: {
        type: Number,
    },
    flux: {
        type: Object,
        required: true,
    },
    organism: {
        type: String,
        required: true
    }
})

const Zone = mongoose.model('Zone', ZoneSchema);
export default Zone;