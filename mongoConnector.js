const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2tqgh.mongodb.net/BdShopDb?retryWrites=true&w=majority`;
const connectWithDb = () => {
    mongoose
        .connect(uri, {
            useNewUrlParser: true,

        })
        .then(() => console.log('DataBase Connected'))
        .catch(err => console.log(err));
};
module.exports = connectWithDb;