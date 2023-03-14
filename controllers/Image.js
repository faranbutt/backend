const Clarifai = require('clarifai');
const app = new Clarifai.App({
  apiKey: 'c34b2b53fb924b4a90af4776d5f684d2'
 });
const ApiCallHandler = (req,res) => {
  const { input } =  req.body
  app.models.predict(Clarifai.CELEBRITY_MODEL,input)
  .then(data => {res.json(data)})
  .catch(err=>res.status(404).json(err))
}
const ImageHandler = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('enteries', 1)
    .returning('enteries')
    .then(enteries => {
      res.json(enteries[0].enteries);
    })
    .catch(err=>{
      res.status(400).json("Error Occured!")
    })
  
  }
  
  module.exports = {
    ImageHandler:ImageHandler,
    ApiCallHandler:ApiCallHandler
  }