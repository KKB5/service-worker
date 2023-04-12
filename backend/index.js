const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const webpush = require('web-push')
const app = express()
app.use(cors())
app.use(bodyParser.json())

const port = 4000

const vapidKeys = {
    publicKey:
        'BC46GaIHH30osUyPew2mNGCHo4pGmaCY6WEiuimdgFlMX61emEyw9iS9uviCBbNKAiD-E9oWFle3R5lzVV5kMeg',
    privateKey: '_585fP4nyNIMB5gNk6kE4SDozLITdGjnRYVxXz1PYU',
}

webpush.setVapidDetails(
    'mailto:janip33184@fitzola.com',
    vapidKeys.process.env.PublicKey,
    vapidKeys.process.env.PrivateKey
)



app.get('/', (req, res) => res.send('Hello World!'))

const dummyDb = { subscription: { "endpoint": "https://fcm.googleapis.com/fcm/send/dnlPg7niK9c:APA91bHjTDh-Ttctg3EhlACoSCbtUCmRIYWrCBwmjEqoU2R3B19Z2oIgYIudebD7jgX2mryxpuRbOyrCCSmTWcSUp5K3J6KHMLHiaTDeQfKriKgOqpTugmtWauz9f5A_PjSqSvIEbm3p", "expirationTime": null, "keys": { "p256dh": "BC6dVk2gHO7m47NHv4xy_KvtTLpIEQxFO_DhF_DXZQfEph2Qejw5osU04a6dG-zIDvI5HiSYEQafuga25V9sRqQ", "auth": "L_EdeH5n4YDQFMErz3T4og" } } }

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