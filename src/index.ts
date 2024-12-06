import express, {Request, Response} from 'express'

const app = express()

const port = process.env.PORT || 5000

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]
const adresses = [{id: 1, value: 'Nezalejnasti 12'}, {id: 2, value: 'Selickaga 11'}]

app.get('/products', (req: Request, res: Response) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.send(products.filter(p => p.title.indexOf(searchString) > -1))
    } else {
        res.send(products)
    }

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})