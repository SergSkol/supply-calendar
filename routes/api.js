'use strict';

const Supply = require("../models/supply");

module.exports = function (app) {

  app.route('/api/supply')
    .get(async function (req, res){
      let supply;
      try {
        supply = await Supply.find();
        res.send(supply);
      } catch (err) {
        res.send(err);
      }
    })
    
    .post(async function (req, res){
      let title = req.body.title;
      if (!title) {
        res.send("missing required field title");
      } else {
        let newSupply = new Supply({
          title: title
        });
        let supply = await newSupply.save();
        res.send(supply);
      }
    })

  app.route('/api/supply/:id')
    .get(async function (req, res){
      let id = req.params.id;
      try {
        const supply = await Supply.findOne({_id: id});
        res.send(supply);
      } catch (err) {
        res.send('no supply exists');
      }
    })
    
    .post(async function(req, res){
      let id = req.params.id;
      let step = req.body.step;
    
      if (!step)
        return res.send("missing required field step")
      else
        try {
          let supply = await Supply.findByIdAndUpdate(
            {_id: id}, 
            { $push: { steps: step } }, 
            { returnDocument: "after" });

          res.send(supply)
        } catch {
          res.send("no supply exists")
        }
    })

    .delete(async function(req, res){
      let id = req.params.id;
      //if successful response will be 'delete successful'
      try {
        await Supply.findOneAndDelete({_id: id});
        res.send("delete successful");
      } catch (err) {
        res.send("no supply exists");
      }

    });
  
};
