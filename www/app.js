
async function getUser() {
    const response = await fetch('/api/users');
    const payload = await response.json();
    console.log(payload);
    const { clientPrincipal } = payload;
    return clientPrincipal;
}

console.log(await getUser());