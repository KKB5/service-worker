const urlB64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray;
}

self.addEventListener('activate', async () => {
    // This will be called only once when the service worker is activated.
    try {
        const applicationServerKey = urlB64ToUint8Array(
            'BFuR9HeG0NorXJbBQZdIj3Z7euYpwe30T84wrkNo2SLh0rQINiJwhVfHqFvpsC4EocQRmekamvVWMTE-r7N9w6Y'
        )
        const options = { applicationServerKey, userVisibleOnly: true }
        const subscription = await self.registration.pushManager.subscribe(options)
        console.log(JSON.stringify(subscription))
    } catch (err) {
        console.log('Error', err);
    }
})

self.addEventListener('push', function (event) {
    if (event.data) {
        console.log('Push event!! ', event.data.text())
    } else {
        console.log('Push event but no data')
    }
})