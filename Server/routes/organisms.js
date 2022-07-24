import { Router as _Router } from 'express';
import Organism from '../models/Organism.js';


const OrganismRouter = _Router();


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
                    date: req.body.date,                    
                });
                const cuser = await newOrganism.save(function(){});  
                res.status(201).json(cuser);
        
});

OrganismRouter.put("/:orgId", async (req, res) => {
  try{
    const updatedorganism = await Organism.findByIdAndUpdate({_id: req.params.orgId},{
          name: req.body.name,
          site_num: req.body.site_num,
          creation_time: req.body.creation_time,
          domaines: req.body.domaines,
          tel: req.body.tel,
          Adresse: req.body.Adresse,
          Carte: req.body.Carte,
          date: req.body.date, 
    });
    res.status(200).json("Organism had been updated");
  } catch (err) {
    res.status(500).json(err);
  }
})

OrganismRouter.get('/:orgId', async (req, res) => {
    try {
        const orgs = await Organism.findOne({_id:req.params.orgId});
        res.status(200).json(orgs);
      } catch (err) {
        res.status(500).json(err);
      }
});

export default OrganismRouter;