import { Router as _Router } from 'express';
const RawRouter = _Router();



import Raw from '../models/Raw.js';

RawRouter.post('/create', async (req, res) => {
  
                const newProduct = new Raw({
                    name: req.body.name,  
                    product: req.body.product,                          
                    fiche_technique: req.body.fiche_technique,                   
                    fds: req.body.fds,                 
                    photos: req.body.photos,                   
                    emballage: req.body.emballage,                   
                    grammage: req.body.grammage,                   
                    energie: req.body.energie,                   
                    proteine: req.body.proteine,                   
                    carbs: req.body.carbs,                   
                    lipide: req.body.lipide,
                    userEtiquettes: req.body.userEtiquettes,
                    editCount: req.body.editCount,
                });
                console.log(newProduct);
                const cuser = await newProduct.save(function(){});
                res.status(200).json(cuser);
});


RawRouter.get('/a/:orgId', async (req, res) => {
    try {
        const Products = await Raw.find({organism:req.params.orgId});
        res.status(200).json(Products);
      } catch (err) {
        res.status(500).json(err);
      }
});

RawRouter.get('/:prodId', async (req, res) => {
    try {
        const product = await Raw.findOne({name:req.params.prodId});
        res.status(200).json(product);
      } catch (err) {
        res.status(500).json(err);
      }
});

RawRouter.put('/:prodId', async (req, res) => {
  try {
      const updatedProduct = await Raw.findOne({_id:req.params.prodId}, {
        name: req.body.name,
        product: req.body.product,
        photos: req.body.photos,
        fiche_technique: req.body.fiche_technique,
        fds: req.body.fds,
        emballage: req.body.emballage,
        grammage: req.body.grammage,
        energie: req.body.energie,
        proteine: req.body.proteine,
        carbs: req.body.carbs,
        lipide: req.body.lipide,
        userEtiquettes: req.body.userEtiquettes,
        editCount: req.body.editCount,
      });
      await updatedProduct.save(function(){});
      res.status(200).json("Product has been updated");
    } catch (err) {
      res.status(500).json(err);
    }
});

RawRouter.delete('/:prodId', async (req, res) => {
  try {
      const products = await Raw.findOne({_id:req.params.prodId});
      await products.deleteOne();
      res.status(200).json("The product has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
});

export default RawRouter;