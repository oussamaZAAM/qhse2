import mongoose from 'mongoose';

const OrganismSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  site_num: {
    type: String,
    required: true
  },
  creation_date: {
    type: Date,
    required: true
  },
  domaines: {
    type: String,
    required: true
  },
  tel: {
    type: String,
    required: true
  },
  Adresse: {
    type: String,
    required: true
  },
  Carte: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Organism = mongoose.model('Organism', OrganismSchema);

export default Organism;