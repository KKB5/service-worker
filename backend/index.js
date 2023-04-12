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
        'BFuR9HeG0NorXJbBQZdIj3Z7euYpwe30T84wrkNo2SLh0rQINiJwhVfHqFvpsC4EocQRmekamvVWMTE-r7N9w6Y',
    privateKey: 'DGRxi3QYoJkEW7wulVzw9Z3GRR3sRfEXs5552hiYO54',
}

webpush.setVapidDetails(
    'mailto:janip33184@fitzola.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)



app.get('/', (req, res) => res.send('Hello World!'))

const dummyDb = { subscription: { "endpoint": "https://fcm.googleapis.com/fcm/send/cXdOcwtt3qU:APA91bEIsXdyHxMG-TdHDgZO0Qcts2ngDX4CB5EK1OSRqahJUacnngZLiaC5kFPRqDoJ7WzY1_vPnaxioWJiPjDFTJidDsDzYmeasdI_qDRSJ42J5Jc-angFeRubgBkMV24j5e8UXG59", "expirationTime": null, "keys": { "p256dh": "BMGLLEUVEOxjVyGUdljI_rd5npbwbS3aI86cGMXPPqJTs_ImF8isGhNtrPdz6Bf8N7K5FAkpVKIXtjgmZd3vTBA", "auth": "Y5anrFrF28jt2k0JMo0hhQ" } } }

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