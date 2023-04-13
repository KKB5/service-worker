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
    // try {
    //     const applicationServerKey = urlB64ToUint8Array(
    //         'BN7AI0sZhe0I9dBpXmBzjprykIftPImBlI0oTKLyO3ujt8_FBmAD-y0IJPmbtI_WmDzVF6Ad3T-OGPuSWOW-eVc'
    //     )
    //     const options = { applicationServerKey, userVisibleOnly: true }
    //     const subscription = await self.registration.pushManager.subscribe(options)
    //     console.log(JSON.stringify(subscription))
    // } catch (err) {
    //     console.log('Error', err);
    // }
    console.log("Service Worker Activated")
})

self.addEventListener('push', function (event) {
    if (event.data) {
        console.log('Push event!! ', event.data.text())
        showLocalNotification("Hi", event.data.text(), self.registration);
    } else {
        console.log('Push event but no data')
    }
})

const showLocalNotification = (title, body, swRegistration) => {
    const options = {
        body,
        // here you can add more properties like icon, image, vibrate, etc.
    }
    swRegistration.showNotification(title, options)
}