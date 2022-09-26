import mongoose from 'mongoose';
const RawSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  product: {
    type: String,
    required: true
  },
  fiche_technique: {
    type: String,
    required: true
  },
  fds: {
    type: String,
    required: true
  },
  photos: {
    type: Array,
    required: true
  },
  emballage: {
    type: String,
    required: true
  },
  grammage: {
    type: String,
    required: true
  },
  energie: {
    type: Number,
    required: true
  },
  proteine: {
    type: Number,
    required: true
  },
  carbs: {
    type: Number,
    required: true
  },
  lipide: {
    type: Number,
    required: true
  },
  userEtiquettes: {
    type: Object,
  },
  editCount: {
    type: Number,
    default: 0,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Raw = mongoose.model('Raw', RawSchema);

export default Raw;