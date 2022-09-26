import { Router as _Router } from 'express';


const FournisseurRouter = _Router();

import Fournisseur from '../models/Fournisseur.js';

FournisseurRouter.post('/create', async (req, res) => {
    
                const newFournisseur = new Fournisseur({
                    _id: req.body._id,
                    code_four: req.body.code_four,
                    user: req.body.user,
                    raison_soc: req.body.raison_soc,
                    ville: req.body.ville,
                    tel: req.body.tel,
                    pays: req.body.pays,
                    mail: req.body.mail
                });
                const cuser = await newFournisseur.save();  
                res.status(201).json(cuser);
               

});

FournisseurRouter.put("/:fourId", async (req, res) => {
  try{
    const updatedfournisseur = await Fournisseur.findByIdAndUpdate({_id: req.params.fourId},{
        code_four: req.body.code_four,
        user: req.body.user,
        raison_soc: req.body.raison_soc,
        ville: req.body.ville,
        pays: req.body.pays,
        tel: req.body.tel,
        mail: req.body.mail
    });
    res.status(200).json("Fournisseur had been updated");
  } catch (err) {
    res.status(500).json(err);
  }
})

FournisseurRouter.get('/:fourId', async (req, res) => {
    try {
        const fours = await Fournisseur.findOne({_id:req.params.fourId});
        res.status(200).json(fours);
    } catch (err) {
      res.status(500).json(err);
    }
}); 
FournisseurRouter.get('/a/:userId', async (req, res) => {
    try {
        const fours = await Fournisseur.find({user:req.params.userId});
        res.status(200).json(fours);
      } catch (err) {
        res.status(500).json(err);
      }
});

FournisseurRouter.delete('/:fourId', async (req, res) => {
    try {
        const fours = await Fournisseur.findOne({_id:req.params.fourId});
        await fours.deleteOne();
        res.status(200).json("The supplier has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
});

export default FournisseurRouter;
