process.env.NODE_ENV = 'test';


const Product = require('../models/product');
const User = require('../models/user');

before((done) => {
    Product.deleteMany({}, (err) => {});
    User.deleteMany({}, (err) => {});
    done();
});
after((done) => {
    User.deleteMany({}, (err) => {});
    Product.deleteMany({}, (err) => {});
    done();
});