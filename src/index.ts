import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
export const app = express()

const port = process.env.PORT || 5000

export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404

}
const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]
const adresses = [{id: 1, value: 'Nezalejnasti 12'}, {id: 2, value: 'Selickaga 11'}]

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)
app.get('/products', (req: Request, res: Response) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.send(products.filter(p => p.title.indexOf(searchString) > -1))
    } else {
        res.send(products)
    }

})
app.post('/products', (req: Request, res: Response) => {
    const newProduct = {
        id: +(new Date()),
        title: req.body.title,
    }
    products.push(newProduct)

    res.status(201).send(newProduct)

})
app.get('/products/:id', (req: Request, res: Response) => {
    let product = products.find(p => p.id === +req.params.id);
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
    res.send(product)
})
app.put('/products/:id', (req: Request, res: Response) => {
    let product = products.find(p => p.id === +req.params.id);
    if (product) {
        product.title = req.body.title
        res.send(product)
    } else {
        res.send(404)
    }
    res.send(product)
})
app.delete('/products/:id', (req: Request, res: Response) => {
    for (let i = 0; products.length > i; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})
app.get('/adresses', (req: Request, res: Response) => {
    res.send(adresses)
})
app.get('/adresses/:id', (req: Request, res: Response) => {
    let adress = adresses.find(a => a.id === +req.params.id);
    if (adress) {
        res.send(adress)
    } else {
        res.send(404)
    }
    res.send(adress)
})

app.delete('/__test__/data', (req: Request, res: Response) => {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})