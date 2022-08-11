const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000



/// use middleware
app.use(cors());
app.use(express.json());





//Replace the uri string with your MongoDB deployment's connection string.

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2tqgh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        console.log('connect to the database');
        const database = client.db('myResearch');
        const servicesCollection = database.collection('services');
        const ordersCollection = database.collection('orders');
        servicesCollection.createIndex({ name: "text", description: "text" })



        // Get API for services

        app.get('/services', async (req, res) => {


            const searchText = req.query.search;
            console.log(searchText);
            let result;

            if (searchText) {
                const cursor = servicesCollection.find({});
                result = await cursor.toArray();
                // console.log(result);
                const re = result.filter(data => {

                    if (data.model.toLowerCase().includes(searchText.toLowerCase())) {
                        return data;
                    }


                });
                console.log(re);
                result = re;

            }
            else if (searchText === undefined) {

                result = 'request not found';
            }
            else {
                const cursor = servicesCollection.find({});
                console.log('mamun');
                result = await cursor.toArray();

            }
            res.json(result);
            // res.json('my services api is worked');
        });




        // GET API for single services

        app.get('/services/:id', async (req, res) => {

            const id = req.params.id;
            console.log('getting specific tour ', id);
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.findOne(query);
            res.json(service);
        })


        // post api for orders

        app.post('/orders', async (req, res) => {

            const order = req.body;
            const result = await ordersCollection.insertOne(order);
            res.json(result);
        });

        // Get api for orders

        app.get('/orders', async (req, res) => {

            const cursor = ordersCollection.find({});
            const orders = await cursor.toArray();
            res.json(orders);
        });

        // delete api for orders

        app.delete('/orders/:id', async (req, res) => {

            const id = req.params.id;
            const query = { _id: ObjectId(id) };

            const result = await ordersCollection.deleteOne(query);
            res.json(result);

        })

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello  my reaserch-server!')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})