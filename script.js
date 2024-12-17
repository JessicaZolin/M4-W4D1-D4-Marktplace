// variabili globali
let url = "https://striveschool-api.herokuapp.com/api/product/"

// funzioni da far girare all'apertura della pagina
document.addEventListener("DOMContentLoaded", () => {
    datiNegozio();
});


// funzione per aggiornare i dati del negozio nel footer della pagina
const datiNegozio = () => {
    document.getElementById("nomeNegozio").innerHTML = negozio.nomeNegozio;
    document.getElementById("indirizzo").innerHTML = negozio.indirizzo;
    document.getElementById("metodiPagamento").innerHTML = negozio.metodiPagamento.join('<br>');
    document.getElementById("speseSpedizione").innerHTML = `Shipping cost: ${(negozio.speseSpedizione.toFixed(2)).replace('.', ',')} € <br>
    Free shipping from: ${(negozio.sogliaSpedizioneGratuita.toFixed(2)).replace('.', ',')} €`;
}


// funzione per ottenere i dati dei prodotti dal backend (GET)
const getProducts = () => {

    fetch(url, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYxY2MzZDUzMDRhNzAwMTUxNDhiNGQiLCJpYXQiOjE3MzQ0NjI1MjUsImV4cCI6MTczNTY3MjEyNX0.n2QGMygGGk-HYuiAjC_nAQLZ4U4pxStmMi6HSKzeSzw"
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Errore nella richiesta");
    }).then(data => {
        console.log(data);
    }).catch(error => {
        console.error(error);
    });
}


// funzione per aggiungere un prodotto al carrello (POST)
const addProduct = () => {

    fetch(url, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYxY2MzZDUzMDRhNzAwMTUxNDhiNGQiLCJpYXQiOjE3MzQ0NjI1MjUsImV4cCI6MTczNTY3MjEyNX0.n2QGMygGGk-HYuiAjC_nAQLZ4U4pxStmMi6HSKzeSzw"
        }
    })

}
