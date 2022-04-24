import User from '../models/user.js'

export const register = async (req, res) => {

     const user = req.body;
     const newUser = new  User(user);  
    try{
        await newUser.save();  
        
        res.status(201).json(newUser);
    } catch (error) {
         res.status(404).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    const user = req.body;
    
    try{
        const currentUser = await User.findOne({email: user.email, password: user.password} )        

        res.status(200).json(currentUser);

    } catch (error) {
        res.status(409).json({message: error.message})
    }
}
