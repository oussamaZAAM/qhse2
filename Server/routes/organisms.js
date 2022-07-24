import { Router as _Router } from 'express';
const organismRouter = _Router();



import Organism from '../models/Organism.js';

organismRouter.post('/create', async (req, res) => {
    
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


organismRouter.get('/:orgId', async (req, res) => {
    try {
        const orgs = await Organism.findOne({_Id:req.params.orgId});
        res.status(200).json(orgs);
      } catch (err) {
        res.status(500).json(err);
      }
});
organismRouter.get('/a/:userId', async (req, res) => {
    try {
        const orgs = await Organism.find({user:req.params.userId});
        res.status(200).json(orgs);
      } catch (err) {
        res.status(500).json(err);
      }
});

organismRouter.delete('/:orgId', async (req, res) => {
    try {
        const orgs = await Organism.findOne({_Id:req.params.orgId});
        await orgs.deleteOne();
        res.status(200).json("The organism has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
});

export default organismRouter;