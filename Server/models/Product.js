import mongoose from 'mongoose';
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  shifelife: {
    type: String,
    required: true
  },
  time_shife: {
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
    type: String,
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
  type_client: {
    type: String,
    required: true
  },
  creation_date: {
    type: String,
    required: true
  },
  agrement: {
    type: String,
    required: true
  },
  autorisation: {
    type: String,
    required: true
  },
  site: {
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
  calcium: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;