
import { Router as _Router } from 'express';
const userRouter = _Router();
import User from '../models/User.js'
import bcrypt from "bcrypt" //Sert a rendre les mots de passe crypte dans la base des donnees.

//Les fonctions qu'on executera lorsqu'on accedera a un url dans le fichier ./routes/users.js
userRouter.post('/register', async (req, res) => {


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

     const newUser = new  User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
     });  
    try{
        //Assurant que le username et l'email sont uniques et qu'ils n'existent pas deja dans la base de donnee
        const currentUserEmail = await User.findOne({email: newUser.email} ) 
        const currentUserName = await User.findOne({name: newUser.name} ) 
        if(!currentUserEmail && !currentUserName) {
          const cuser = await newUser.save(function(){});  
          res.status(201).json(cuser);
        } else {
          res.status(404).json({status:false})
        }
    } catch (error) {
         res.status(404).send({ message: error.message });
    }
}
)
userRouter.post("/login", async (req, res) => {
    const user = req.body;
    try{
        const currentUser = await User.findOne({email: user.email})
        if(!currentUser){
            res.status(404).json("user not found")
        } else {   
          const validPassword = await bcrypt.compare(user.password, currentUser.password)
          if(!validPassword){
            res.status(400).send("wrong password")
          } else {
            res.status(200).json(currentUser);
          }
        }
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}
)
userRouter.get("/allusers", async (req, res) => {
    try {
      const allUsers = await User.find();
    //   const friendPosts = await Promise.all(
    //     currentUser.followings.map((friendId) => {
    //       return Post.find({ userId: friendId });
    //     })
    //   );
      res.status(200).json(allUsers);
    } catch (err) {
      res.status(500).json(err);
    }
  }
)
userRouter.put("/update", async (req, res) => {
     let samePassword = true;
     try{
      const currentUser = await User.findOne({_id: req.body._id} )   
      samePassword = req.body.password === currentUser.password
     }catch(error){        
       res.status(409).json({message: error.message})
    }
    let salt=''
    let user1={}
    let hashedPassword = req.body.password
     if(!samePassword){
       salt = await bcrypt.genSalt(10);
       user1 = req.body;
       hashedPassword = await bcrypt.hash(user1.password, salt)
     }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: {...req.body, password:hashedPassword},
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } 
)
  //checkPsw sert a compare le mot de passe cree avec celui qu'existe dans la base de donne d'un certain utilisateur. 
  userRouter.get("/check", async (req, res) => {
    const valid = await bcrypt.compare(req.body.pw1, req.body.pw2)
    res.status(200).json({status:valid})

  })

  export default userRouter; 