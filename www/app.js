
async function getUser() {
    const response = await fetch('/api/user');
    const payload = await response.json();
    console.log(payload);
    const { clientPrincipal } = payload;
    return clientPrincipal;
}

console.log(await getUser());