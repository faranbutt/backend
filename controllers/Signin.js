const handleSignin = (req, res, db, bcrypt) => {
    const {email,password} =  req.body
    if(!email || !password){
      return res.status(404).json('Form Field missing in Signin')
    }
    db.select('email','hash')
    .from('login')
    .where('email','=',email)
    .then(user => {
     const isValid = bcrypt.compareSync(password, user[0].hash);
     if(isValid){
       db.select('*').from('users')
       .where('email','=',email)
       .then(user=>{
         res.json(user[0])
       })
       .catch(err=>res.status(404).json('Unable to Signin'))
     }
     else{
       res.status(404).json('Error in Signin')
     } 
    })
    .catch(err=>res.status(400).json('Wrong Credintials'))
   }

   module.exports = {
    handleSignin: handleSignin
   }
