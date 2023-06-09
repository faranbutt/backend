const profileHandler = (req, res, db) => {
    const { id } = req.params;
    let found = false;
    db.select('*').from('users').where({
      id: id,
    })
    .then(user=>{
      if(user.length){
        res.json(user[0]);
      }
      else{
        res.status(400).json("User Not Found")
      }
      })
      .catch(err=>res.status(400).json("Error Getting user!"))
  }

  module.exports = {
    profileHandler:profileHandler
  }
