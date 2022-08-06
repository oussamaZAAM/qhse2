import { Router as _Router } from 'express';

const PersonnelRouter = _Router();

import Personnel from '../models/Personnel.js';

PersonnelRouter.post('/create', async (req, res)=>{
    const newPersonnel = await new Personnel({
        nom: req.body.nom,
        prenom: req.body.prenom,
        naissance: req.body.naissance,
        cin: req.body.cin,
        metier: req.body.metier,
        zone_affecte: req.body.zone_affecte,
        photo: req.body.photo,
    })
    
    const cuser = await newPersonnel.save(function(){});  
    res.status(201).json(cuser);
})

PersonnelRouter.get('/a/:userId', async (req, res)=>{
    try{
        const persons = await Personnel.find({user:req.params.userId});
        res.status(200).json(persons);
      } catch (err) {
        res.status(500).json(err);
    }
})

export default PersonnelRouter;