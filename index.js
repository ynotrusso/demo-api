import express from 'express'
import 'dotenv/config'
import db from './db.js'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())


app.get('/fruits', async (req, res) => {
    let price = req.query.price
    
    let myQuery = `SELECT * FROM fruits`

    if (req.query.price) {
        myQuery += ` WHERE price = ${price}`
    }
    
    const response = await db.query(myQuery)
    res.json(response.rows)
})

app.post('/fruits', (req, res) => {
    console.log(req.body)
    db.query(`INSERT INTO fruits (name, price, featured)
    VALUES ('${req.body.name}', '${req.body.price}', ${req.body.featured || false})`)
    res.send('fruit inserted')
})

app.listen(4010, () => {
    console.log('Server is running on port 4010')
})