const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e6ix3.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('delivery-man'));
app.use(fileUpload());

const port = 5055;


app.get('/', (req, res) => {
    res.send("hello from db it's working working")
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const orderCollection = client.db("foodPanda").collection("order");
  
    app.post('/addOrder', (req, res) =>{
        const order = req.body;
        console.log('order')
        orderCollection.insertOne(order)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
    })
    // app.post('/orderByDay', (req, res) =>{
    //     const date = req.body;
    //     console.log(date.date)
    //     orderCollection.find({date: date})
    //     .toArray((err, documents)=>{
    //         res.send(documents);
    //     })
        
    // })
    app.post('/admin', (req, res) => {
        const file = req.files.file;
        const name = req.body.name;
        const email = req.body.email;
        console.log(name, email, file)
        // file.mv(`${__dirname}/delivery-man/${file.name}`, err =>{
        //     if (err){
        //         console.log(err);
        //         return res.status(500).send({msg:'Failed TO Upload Image'});
        //     }
        //     return res.send({name: file.name , path: `/${file.name}`})
        // })


        // const newImg = file.data;
        // const encImg = newImg.toString('base64');

        // var image = {
        //     contentType: file.mimetype,
        //     size: file.size,
        //     img: Buffer.from(encImg, 'base64')
        // };

        // doctorCollection.insertOne({ name, email, image })
        //     .then(result => {
        //         res.send(result.insertedCount > 0);
        //     })
    })
    app.get('/employments', (req, res) => {
        doctorCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    });


});


app.listen(process.env.PORT || port)