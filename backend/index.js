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

const dummyDb = { subscription: { "endpoint": "https://fcm.googleapis.com/fcm/send/f0BBi1aTLvU:APA91bHPEV-8MgmtUh3kMT1yzFxnPG2jubETG5t1xXpWjCB5dDe1bJuq-a7WOa9IQ_onHdnidhKZgBgdvIK6Crkn1nTxbSNzV1ESLlo4B1RsgoJ1VCjC6S1kboLQW6s1tVPALwpcHBPq", "expirationTime": null, "keys": { "p256dh": "BG9f0yjw3F4GI7vNJHC61coUvjpb5iK_3eBJptlZYyayB7S_mybEn6nFohcedAvk7PzD3dk8r8lU1jVPDbreVI4", "auth": "eNP-uYKqQdcm0E1ulDlcBQ" } } }

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