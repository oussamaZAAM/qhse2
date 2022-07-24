import { Router as _Router } from 'express';
const organismRouter = _Router();


const OrganismRouter = _Router();

import Organism from '../models/Organism.js';

OrganismRouter.post('/create', async (req, res) => {
    
                const newOrganism = new Organism({
                    name: req.body.name,
                    user: req.body.user,
                    site_num: req.body.site_num,
                    creation_time: req.body.creation_time,
                    domaines: req.body.domaines,
                    tel: req.body.tel,
                    Adresse: req.body.Adresse,
                    Carte: req.body.Carte,
                });
                
                const cuser = await newOrganism.save(function(){});  
                res.status(201).json(cuser);
        
});


OrganismRouter.get('/:orgId', async (req, res) => {
    try {
        const orgs = await Organism.findOne({_Id:req.params.orgId});
        res.status(200).json(orgs);
      } catch (err) {
        res.status(500).json(err);
      }
});
OrganismRouter.get('/a/:userId', async (req, res) => {
    try {
        const orgs = await Organism.find({user:req.params.userId});
        res.status(200).json(orgs);
      } catch (err) {
        res.status(500).json(err);
      }
});

OrganismRouter.delete('/:orgId', async (req, res) => {
    try {
        const orgs = await Organism.findOne({_Id:req.params.orgId});
        await orgs.deleteOne();
        res.status(200).json("The organism has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
});

export default OrganismRouter;
