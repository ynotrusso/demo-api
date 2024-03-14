import express from 'express'
import 'dotenv/config'
const app = express()
import db from './db.js'

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
    db.query(`INSERT INTO fruits (name, price, featured)
    VALUES ('mango', 15, true)`)
    res.send('fruit inserted')
})

app.listen(4010, () => {
    console.log('Server is running on port 4010')
})