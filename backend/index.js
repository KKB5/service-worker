const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const webpush = require('web-push')
const app = express()
const env = require('dotenv').config()
app.use(cors())
app.use(bodyParser.json())

const port = 4000

const vapidKeys = {
    publicKey: process.env.PublicKey,
    privateKey: process.env.PrivateKey
}

webpush.setVapidDetails(
    'mailto:janip33184@fitzola.com',
    process.env.PublicKey,
    process.env.PrivateKey
)



app.get('/', (req, res) => res.send('Hello World!'))

const dummyDb = { subscription: { "endpoint": "https://fcm.googleapis.com/fcm/send/civVIfviSHY:APA91bEKVxr0iw0ITi9JtzSow7Et4JmIeCbVA_6sP3voW7_YgpFFhpH9V9rBRVC6liqQc4L379jJFp6hmOFEgY0NIz4Cpiptk-PuehrqgyQai76KECOXlrFBRUHoNusHwfbAROjCvxwu", "expirationTime": null, "keys": { "p256dh": "BOPDTpn1V3U3txrfg7eT2fbJsRJbEu9v3kIdDYGg61jpSKX5mPPP0kTNRXZsRESyqzXokfYNG_QpuZqyHvAleMM", "auth": "JBKQdbsmrUro_HPRLpsK8A" } } }

// const saveToDatabase = async (subscription) => {
//     dummyDb.subscription = subscription
// }

// app.post('/save-subscription', async (req, res) => {
//     const subscription = req.body
//     await saveToDatabase(subscription)
//     res.json({ message: 'success' })
// })

const sendNotification = (subscription, dataToSend = '') => {
    webpush.sendNotification(subscription, dataToSend)
}

app.get('/send-notification', (req, res) => {
    const subscription = dummyDb.subscription
    const message = 'Initial push notification test'
    sendNotification(subscription, message)
    res.json({ message: "message sent" })
})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))