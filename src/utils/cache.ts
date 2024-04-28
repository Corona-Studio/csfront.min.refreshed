export function updateCache() {
    let _token = Math.ceil(Math.random() * 10000);
    caches.keys().then(function (names) {
        for (let name of names) {
            caches.delete(name);
            console.log(`removed: ${name}`);
        }
    });
    window.location.replace(`/?renew=${_token}`);
}
