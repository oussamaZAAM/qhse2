import mongoose from 'mongoose';

const FournisseurSchema = new mongoose.Schema({
  
  
  code_four: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  raison_soc: {
    type: String,
    required: true
  },
  
  tel: {
    type: Number,
    required: true
  },
  ville: {
    type: String,
    required: true
  },
  pays: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true
  }
});

const Fournisseur = mongoose.model('Fournisseur', FournisseurSchema);

export default Fournisseur;