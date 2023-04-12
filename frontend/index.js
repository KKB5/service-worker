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

const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission()
    console.log(permission)
    // if (permission !== 'granted') {
    //     throw new Error('Permission not granted for Notification')
    // }
    if (permission === 'granted') {
        document.getElementById('modalOverlay').style.display = 'none'
    }
    if (permission === 'denied') {
        document.getElementById('modalOverlay2').style.display = 'block'
    }
    // if (permission === 'default') {
    //     setTimeout(popupdata, 5000);
    // }
}

const notificationPermission = async () => {
    // navigator.serviceWorker.getRegistrations().then(function (registrations) {
    //     for (let registration of registrations) {
    //         registration.unregister();
    //     }
    // });
    // const swRegistration = await registerServiceWorker()
    const swRegistration = await registerServiceWorker()
    const permission = await requestNotificationPermission()
}

const main = async () => {
    check()
    const swRegistration = await registerServiceWorker()
    const permission = await requestNotificationPermission()

}
  // main(); we will not call main in the beginning.