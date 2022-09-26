import { Router as _Router } from 'express';

const EquipementRouter = _Router();

import Equipement from '../models/Equipement.js';
import Zone from '../models/Zone.js';

EquipementRouter.post("/createEq", async (req, res) => {
    const newEquipement = new Equipement({
        _id: req.body._id,
        type: req.body.type,
        user: req.body.user,
        organism: req.body.organism,
        libelle: req.body.libelle,
        code: req.body.code,
        num_inventaire: req.body.num_inventaire,
        zone: req.body.zone,
        fiche_technique: req.body.fiche_technique,
        fds: req.body.fds,
        affection: req.body.affection,
    });
    
    const createdEquipement = await newEquipement.save();
    
    res.status(201).json(createdEquipement);
})
EquipementRouter.post("/createMat", async (req, res) => {
    const newEquipement = new Equipement({
        _id: req.body._id,
        type: req.body.type,
        user: req.body.user,
        organism: req.body.organism,
        libelle: req.body.libelle,
        type_materiel: req.body.type_materiel,
        code: req.body.code,
        num_inventaire: req.body.num_inventaire,
        fiche_technique: req.body.fiche_technique,
        fds: req.body.fds,
        affection: req.body.affection,
    });
    
    const createdEquipement = await newEquipement.save();
    
    res.status(201).json(createdEquipement);
})
EquipementRouter.post("/createLog", async (req, res) => {
    const newEquipement = new Equipement({
        _id: req.body._id,
        type: req.body.type,
        user: req.body.user,
        organism: req.body.organism,
        libelle: req.body.libelle,
        code: req.body.code,
        num_inventaire: req.body.num_inventaire,
        fiche_technique: req.body.fiche_technique,
        fds: req.body.fds,
        affection: req.body.affection,
    });
    
    const createdEquipement = await newEquipement.save();
    
    res.status(201).json(createdEquipement);
})

EquipementRouter.get("/:equipmentId", async (req, res) => {
    try {
        const equips = await Equipement.findOne({_id:req.params.equipmentId});
        res.status(200).json(equips);
    } catch (err) {
      res.status(500).json(err);
    }
})

EquipementRouter.put("/:equipmentId", async (req, res) => {
    try {
        const Updatedquip = await Equipement.findByIdAndUpdate({_id:req.params.equipmentId}, {
            type: req.body.type,
            user: req.body.user,
            organism: req.body.organism,
            libelle: req.body.libelle,
            code: req.body.code,
            num_inventaire: req.body.num_inventaire,
            zone: req.body.zone,
            fiche_technique: req.body.fiche_technique,
            fds: req.body.fds,
            affection: req.body.affection,
        });
        res.status(200).json("Equipement had been updated");
    } catch (err) {
      res.status(500).json(err);
    }
})

EquipementRouter.get("/relatedTo/:zoneId", async(req, res) => {
    try {
        const wantedZone = await Zone.findOne({_id: req.params.zoneId});
        const oldEquips = await Equipement.find({zone: wantedZone.code});
        res.status(200).json(oldEquips);
    } catch (err) {
        res.status(500).json(err);
    }
})


EquipementRouter.get("/all/:userId", async (req, res) => {
    try {
        const equips = await Equipement.find({user: req.params.userId});
        res.status(200).json(equips);
    } catch (err) {
      res.status(500).json(err);
    }
})

EquipementRouter.delete("/:equipmentId", async (req, res) => {
    try {
        const equip = await Equipement.findOne({_id:req.params.equipmentId});
        await equip.deleteOne();
        res.status(200).json("The equipement has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
})


export default EquipementRouter; 