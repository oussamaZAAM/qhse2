import { Router as _Router } from 'express';
import Zone from '../models/Zone.js';
import Personnel from '../models/Personnel.js';

const ZoneRouter = _Router();

ZoneRouter.post("/createZone", async(req, res) => {
    const newZone = new Zone({
        _id: req.body._id,
        type: req.body.type,
        code: req.body.code,
        ordre: req.body.ordre,
        superficie: req.body.superficie,
        responsable: req.body.responsable,
        equipe: req.body.equipe,
        flux: req.body.flux,
        organism: req.body.organism
    })
    const createdZone = await newZone.save(function (){});
    const updatedPersonnel = await Personnel.findByIdAndUpdate({_id:req.body.responsable}, {
       zone: req.body.code
    });
    for(let i=0;req.body.equipe.length>i;i++){
    const updatedPersonnel = await Personnel.findByIdAndUpdate({_id:req.body.equipe[i]}, {
       zone: req.body.code
    });
}
    res.status(200).send(createdZone);
})
ZoneRouter.post("/createBatiment", async(req, res) => {
    const newBatiment = new Zone({
        _id: req.body._id,
        type: req.body.type,
        libelle: req.body.libelle,
        code: req.body.code,
        ordre: req.body.ordre,
        superficie: req.body.superficie,
        nbr_niveau: req.body.nbr_niveau,
        responsable: req.body.responsable,
        equipe: req.body.equipe,
        atex: req.body.atex,
        flux: req.body.flux,
        organism: req.body.organism
    })
    const createdBatiment = await newBatiment.save(function (){});
    res.status(200).send(createdBatiment);
})
ZoneRouter.get("/z/:orgId", async(req, res) => {
    try{
        const zones = await Zone.find({organism: req.params.orgId, type: 'zone'});
        res.status(200).send(zones);
    } catch(err){
        res.status(500).json(err.message);
    }
})
ZoneRouter.get("/b/:orgId", async(req, res) => {
    try{
        const batiments = await Zone.find({organism: req.params.orgId, type: 'batiment'});
        res.status(200).send(batiments);
    } catch(err){
        res.status(500).json(err.message);
    }
})
ZoneRouter.get("/:zoneId", async(req, res) => {
    try{
        const zone = await Zone.findOne({_id: req.params.zoneId});
        res.status(200).json(zone);
    } catch(err){
        res.status(500).json(err.message);
    }
})

ZoneRouter.get('/includes/:personId', async (req, res) => {
    try{
        const includedZones = await Zone.find({$or: [{responsable: req.params.personId}, {equipe: req.params.personId}]});
        res.status(200).json(includedZones);
    } catch (err) {
        res.status(500).json(err);
    }
})

ZoneRouter.put("/:zoneId", async (req, res) => {
    try {
        const updatedZone = await Zone.findByIdAndUpdate({_id: req.params.zoneId},{
            _id: req.body._id,
            type: req.body.type,
            libelle: req.body.libelle,
            code: req.body.code,
            ordre: req.body.ordre,
            superficie: req.body.superficie,
            nbr_niveau: req.body.nbr_niveau,
            responsable: req.body.responsable,
            equipe: req.body.equipe,
            atex: req.body.atex,
            flux: req.body.flux,
            organism: req.body.organism
        });
        const createdZone = await newZone.save(function (){});
    const updatedPersonnel = await Personnel.findByIdAndUpdate({_id:req.body.responsable}, {
       zone: req.body.code
    });
    for(let i=0;req.body.equipe.length>i;i++){
    const updatedPersonnel = await Personnel.findByIdAndUpdate({_id:req.body.equipe[i]}, {
       zone: req.body.code
    });
}
        res.status(200).json("Zone Equipe / Responsable has been settled");
    } catch (err) {
        res.status(500).json(err.message);
    }
})

ZoneRouter.put("/d/:zoneId", async(req, res) => {
    console.log("ayoub")
    try{
        await Zone.findByIdAndDelete({_id: req.params.zoneId});
        console.log(req.body)
    const updatedPersonnel = await Personnel.findByIdAndUpdate({_id:req.body.responsable}, {
       zone: ""
    });
    for(let i=0;req.body.equipe.length>i;i++){
    const updatedPersonnel = await Personnel.findByIdAndUpdate({_id:req.body.equipe[i]}, {
       zone: ""
    });
}
        res.status(200).json("Zone/Batiment deleted successfully");
    } catch(err){
        res.status(500).json(err.message);
    }
})

export default ZoneRouter;