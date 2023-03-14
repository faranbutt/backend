const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
      return res.status(400).json("Form fields is missing");
    }
    var hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      trx.insert({
        hash:hash,
        email:email
      })
      .into('login')
      .returning('email')
      .then(loginEmail=>{
        
        return trx('users')
        .returning('*')
        .insert({
          name: name,
          email:loginEmail[0].email,
          joined:new Date()
        })
        .then(response=>{
          res.json(response[0]);
        })
      })
      .then(trx.commit)
      .catch(trx.rollback);
    })
    
      .catch(err=>res.status(400).json("OOPS! Couldn't Register"))
    
  }
  module.exports = {
    handleRegister: handleRegister
  }