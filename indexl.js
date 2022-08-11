const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const winston = require('winston');
const expressWinston = require('express-winston');
const winstonFile = require('winston-daily-rotate-file');


const app = express();
const port = process.env.PORT || 5000;



// middleware
app.use(cors());
app.use(express.json());

/// custom middleware
const processRequest = async (req, res, next) => {

    let correlationId = req.headers['x-correlation-id'];
    if (!correlationId) {
        correlationId = Date.now().toString();
        req.headers['x-correlation-id'] = correlationId;
    }
    res.set('x-correlation-id', correlationId);
    return next();
}
app.use(processRequest);

const getMessage = (req, res) => {
    let obj = {
        correlationId: req.headers['x-correlation-id'],
        requestBody: req.body
    };

    return JSON.stringify(obj);
}

const fileInfoTransport = new (winston.transports.DailyRotateFile)(
    {
        filename: 'log-info-%DATE%.log',
        datePattern: 'yyyy-MM-DD-HH'
    }
);
const fileErrorTransport = new (winston.transports.DailyRotateFile)(
    {
        filename: 'log-error-%DATE%.log',
        datePattern: 'yyyy-MM-DD-HH'
    }
);

const infoLogger = expressWinston.logger({
    transports: [
        new winston.transports.Console(),
        fileInfoTransport

    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: false,
    msg: getMessage
});

const errorLogger = expressWinston.errorLogger({
    transports: [
        new winston.transports.Console(),
        fileErrorTransport,

    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: true,
    msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error": "{{err.message}}" }'
});
app.use(infoLogger);

app.use(errorLogger);








const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2tqgh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    return res.send('hello bro myResearchServer .');
});


async function run() {
    try {
        await client.connect();
        console.log('connect to the database');

        const database = client.db('myResearch');
        const servicesCollection = database.collection('services');

        const blogsCollection = database.collection('blogs');
        const ourTeamCollection = database.collection('ourTeam');
        const reviewsCollection = database.collection('reviews');
        const ordersCollection = database.collection('orders');
        const cartsCollection = database.collection('carts');
        const usersCollection = database.collection('users');


        // users api
        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            let isAdmin = false;
            if (user?.role === 'admin') {
                isAdmin = true;
            }
            res.json({ admin: isAdmin });
        });
        // user post api
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            console.log(result);
            res.json(result);
        });
        // user put api
        app.put('/users', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email };
            const options = { upsert: true };
            const updateDoc = { $set: user };
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            res.json(result);
        });

        // user admin cheecked api
        app.put('/users/admin', async (req, res) => {
            const user = req.body;

            const filter = { email: user.email };

            const updateDoc = { $set: { role: 'admin' } };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.json(result);

        })





        // GET API FOR blogs
        app.get('/blogs', async (req, res) => {
            const cursor = blogsCollection.find({});
            const blogs = await cursor.toArray();
            res.json(blogs);
        });
        // GET API FOR reviews
        app.get('/reviews', async (req, res) => {
            const cursor = reviewsCollection.find({});
            const reviews = await cursor.toArray();
            res.json(reviews);
        });
        // reviews post api
        app.post('/reviews', async (req, res) => {
            const review = req.body;
            console.log('hit the post api', review);
            const result = await reviewsCollection.insertOne(review);
            console.log(result);
            res.json(result);
        })
        // GET API FOR our team
        app.get('/ourteam', async (req, res) => {
            const cursor = ourTeamCollection.find({});
            const ourteam = await cursor.toArray();
            res.json(ourteam);
        });


        // GET API FOR services
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.json(services);
        });
        // GET API FOR SINGLE services

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            console.log('getting specific tour', id);
            const query = { _id: ObjectId(id) };
            const tour = await servicesCollection.findOne(query);
            res.json(tour);
        });
        // DELETE API
        app.delete('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await servicesCollection.deleteOne(query);
            res.json(result);
        });


        // POST API FOR services
        app.post('/services', async (req, res) => {
            const tour = req.body;
            console.log('hit the post api', tour);

            const result = await servicesCollection.insertOne(tour);
            console.log(result);
            res.json(result)
        });


        // Add Orders API
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await ordersCollection.insertOne(order);
            res.json(result);
        });
        app.get('/orders', async (req, res) => {
            const cursor = ordersCollection.find({});
            const orders = await cursor.toArray();
            res.json(orders)
        });

        app.get('/orders/:email', async (req, res) => {
            const email = req.params.email;
            console.log('getting email', email);
            const query = { email: email };
            const cursor = ordersCollection.find(query);
            const orders = await cursor.toArray();
            res.json(orders);
        });

        //UPDATE API
        app.put('/orders/:id', async (req, res) => {
            const id = req.params.id;
            console.log(req.body);
            const updatedOrder = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    status: 'Shipped ',

                },
            };
            const result = await ordersCollection.updateOne(filter, updateDoc, options)
            console.log('updating', id)
            res.json(result)
        })

        // DELETE API
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.deleteOne(query);
            res.json(result);
        });

        // Add carts API
        app.post('/carts', async (req, res) => {
            const cart = req.body;
            const result = await cartsCollection.insertOne(cart);
            res.json(result);
        });


        app.get('/carts/:email', async (req, res) => {
            const email = req.params.email;
            console.log('getting email', email);
            const query = { email: email };
            const cursor = cartsCollection.find(query);
            const carts = await cursor.toArray();
            res.json(carts);
        });
        // DELETE API
        app.delete('/carts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { id: id };
            const result = await cartsCollection.deleteOne(query);
            res.json(result);
        });
        /// console.log(level, message);

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

// app.use(errorLogger);
app.listen(port, () => {
    console.log('listening from port', port);
});