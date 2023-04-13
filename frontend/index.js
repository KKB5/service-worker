const check = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error('No Service Worker support!')
    }
    if (!('PushManager' in window)) {
        throw new Error('No Push API Support!')
    }
}

const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register('service.js')
    return swRegistration
}

function popupdata() {
    document.getElementById('modalOverlay').style.display = 'block'
}

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

const checkNotification = async () => {
    const permission = await window.Notification.permission
    console.log(permission)
    if (permission == "granted") {
        document.getElementById('modalOverlay').style.display = 'none'
        document.getElementById('modalOverlay2').style.display = 'none'
    }
}

const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission()
    console.log(permission)
    // if (permission !== 'granted') {
    //     throw new Error('Permission not granted for Notification')
    // }
    if (permission === 'granted') {
        document.getElementById('modalOverlay').style.display = 'none'
        document.getElementById('modalOverlay2').style.display = 'none'

    }
    if (permission === 'denied') {
        document.getElementById('modalOverlay2').style.display = 'block'
    }
    try {
        const applicationServerKey = urlB64ToUint8Array(
            'BN7AI0sZhe0I9dBpXmBzjprykIftPImBlI0oTKLyO3ujt8_FBmAD-y0IJPmbtI_WmDzVF6Ad3T-OGPuSWOW-eVc'
        )
        const registration = await navigator.serviceWorker.getRegistration('/service.js');
        console.log(registration)
        const options = { applicationServerKey, userVisibleOnly: true }
        const subscription = await registration.pushManager.subscribe(options)
        console.log(JSON.stringify(subscription))
    } catch (err) {
        console.log('Error', err);
    }
}

const notificationPermission = async () => {
    // navigator.serviceWorker.getRegistrations().then(function (registrations) {
    //     for (let registration of registrations) {
    //         registration.unregister();
    //     }
    // });
    // const swRegistration = await registerServiceWorker()
    const permission = await requestNotificationPermission()
}

const main = async () => {
    check()
    const swRegistration = await registerServiceWorker()
}

main();