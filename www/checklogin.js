async function getUser() {
    const reponse = await fetch('/.auth/me');
    const payload = await reponse.json();
    console.log(payload.clientPrincipal);
    if (payload.clientPrincipal == null) {
        window.location.replace = "/login.html";

    }
}

getUser();