import { Router as _Router } from 'express';
const ProductRouter = _Router();



import Product from '../models/Product.js';

ProductRouter.post('/create', async (req, res) => {
                const newProduct = new Product({
                    name: req.body.name,                   
                    shifelife: req.body.shifelife,                   
                    time_shife: req.body.time_shife,                   
                    fiche_technique: req.body.fiche_technique,                   
                    fds: req.body.fds,                 
                    photos: req.body.photos,                   
                    emballage: req.body.emballage,                   
                    grammage: req.body.grammage,                   
                    type_client: req.body.type_client,                   
                    creation_date: req.body.creation_date,                   
                    agrement: req.body.agrement,                   
                    autorisation: req.body.autorisation,                   
                    site: req.body.site,                   
                    energie: req.body.energie,                   
                    proteine: req.body.proteine,                   
                    carbs: req.body.carbs,                   
                    lipide: req.body.lipide,                   
                    calcium: req.body.calcium,                   
                    date: req.body.date,                   
                });
                const cuser = await newProduct.save(function(){});
                res.status(200).json(cuser);
});


ProductRouter.get('/:orgId', async (req, res) => {
    try {
        const product = await Product.findOne({user:req.params.orgId});
        res.status(200).json(product);
      } catch (err) {
        res.status(500).json(err);
      }
});

export default ProductRouter;