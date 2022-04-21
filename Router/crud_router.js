const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
require('../model/db');
const BookModel = require('../model/schema');
const async = require('hbs/lib/async');


router.use(bodyparser.json());
router.use(express.urlencoded({extended:false}));

//Creating the Post Request API(CREATE OPERATION)
router.post('/books',async(req,res)=>{
    const InsertData = new BookModel({
        id : req.body.id,
        name : req.body.name,
        sold : req.body.sold,
   });
   try{
      const data = await InsertData.save();
      res.json(data);
      console.log(data);
      res.status(200);

   }
   catch(err){
       res.send('error', +err);
   }
});

//Creating GET request API(READ OPERATION)
router.get('/books/list',async(req,res)=>{
    try{
        const ListData = await BookModel.find();
        res.json(ListData);
    }
    catch(err){
        res.send('error', +err);
    }

});

//API Fetching By ID (READ OPERATION)
router.get('/books/list/:id',async(req,res)=>{
    try{
        const Datas = await BookModel.findById(req.params.id);
        res.json(Datas);
        res.status(200);
        console.log(Datas);
    }
    catch(err){
        res.send(err);
    }
});

//Update Opertaion
router.patch('/books/list/:id',async(req,res)=>{
    try{
        const result = await BookModel.findByIdAndUpdate(req.params.id,req.body);
        res.json(result);
        console.log(result);
    }
    catch(err){
        res.send('THere is an error', +err);
    }
});

//Delete Operation

router.delete('/books/list/:id',async(req,res)=>{
    try{
        const deleted = await BookModel.findByIdAndDelete(req.params.id);
        res.json(deleted);
        console.log(deleted);
    }
    catch(err){
        res.send('There is an error', +err);
    }
});


module.exports = router;