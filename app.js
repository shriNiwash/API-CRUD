const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
require('./model/db');
const BookModel = require('./model/schema');
const hbs = require('hbs');
const path = require('path');
const async = require('hbs/lib/async');


app.use(bodyparser.json());
app.use(express.urlencoded({extended:false}));

const staticPath = path.join('__dirname',"../public");
console.log(staticPath);
app.use(express.static(staticPath));

//views engine

app.set('view engine','hbs');
app.set('views','./views');

//Insertion of Data(CREATE OPERATION)
app.get('/',(req,res)=>{
    res.render('Insert');
});


app.post('/',(req,res)=>{
    var name = req.body.name;
    var sold = req.body.sold;
    const insertDatas = new BookModel({
        name : `${name}`,
        sold : `${sold}`,
    });
    insertDatas.save().then((data)=>console.log("one row is inserted")).catch((err)=>console.log(err));
    res.redirect('/list');
});

//Read Operation
app.get('/list',async(req,res)=>{
    try{
        const datas = await BookModel.find();
        res.render('datalist',{list:datas});
    }
    catch(err){
        res.send("error", +err);
    }
});

app.get("/list/edit/:id",async(req,res)=>{
    const id = req.params.id;
    BookModel.findById(id, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log(docs);
            console.log(req.params.id);
            res.render('update',{
                dataList:docs,
                ide:req.params.id,
            });   
        }
    });
  
});

app.post("/list/edit/:id",async(req,res)=>{
    try{
    const result = await BookModel.findByIdAndUpdate(req.params.id,req.body);
    console.log(result);
    console.log(req.body);
    res.redirect('/list');
    }
    catch(err){
    console.log(err);
    }
})


app.get("/list/delete/:id",(req,res)=>{
    const ids = req.params.id;
    res.render('delete',{da:ids});
})

app.post("/list/delete/:id",async(req,res)=>{
    try{
        const resut = await BookModel.findByIdAndDelete(req.params.id);
        console.log(resut);
        console.log("deleted");
        res.redirect('/list');
    }
    catch(error){
        console.log(error);
    }

});



const crudRouter = require('./Router/crud_router');
app.use(crudRouter);

//The application is running on the port 3000
app.listen(PORT,()=>console.log(`The Application is running on the port ${PORT}`));