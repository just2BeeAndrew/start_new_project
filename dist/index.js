"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const products = [{ id: 1, title: 'tomato' }, { id: 2, title: 'orange' }];
const adresses = [{ id: 1, value: 'Nezalejnasti 12' }, { id: 2, value: 'Selickaga 11' }];
const parserMiddleware = (0, body_parser_1.default)({});
app.use(parserMiddleware);
app.get('/products', (req, res) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.send(products.filter(p => p.title.indexOf(searchString) > -1));
    }
    else {
        res.send(products);
    }
});
app.post('/products', (req, res) => {
    const newProduct = {
        id: +(new Date()),
        title: req.body.title,
    };
    products.push(newProduct);
    res.status(201).send(newProduct);
});
app.get('/products/:id', (req, res) => {
    let product = products.find(p => p.id === +req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
    res.send(product);
});
app.put('/products/:id', (req, res) => {
    let product = products.find(p => p.id === +req.params.id);
    if (product) {
        product.title = req.body.title;
        res.send(product);
    }
    else {
        res.send(404);
    }
    res.send(product);
});
app.delete('/products/:id', (req, res) => {
    for (let i = 0; products.length > i; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
app.get('/adresses', (req, res) => {
    res.send(adresses);
});
app.get('/adresses/:id', (req, res) => {
    let adress = adresses.find(a => a.id === +req.params.id);
    if (adress) {
        res.send(adress);
    }
    else {
        res.send(404);
    }
    res.send(adress);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
