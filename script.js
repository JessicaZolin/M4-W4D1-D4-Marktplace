document.addEventListener("DOMContentLoaded", () => {
    datiNegozio();
});


// funzione per aggiornare i dati del negozio nel footer della pagina
const datiNegozio = () => {
    document.getElementById("nomeNegozio").innerHTML = negozio.nomeNegozio;
    document.getElementById("indirizzo").innerHTML = negozio.indirizzo;
    document.getElementById("metodiPagamento").innerHTML = negozio.metodiPagamento.join('<br>');
    document.getElementById("speseSpedizione").innerHTML = `Spese di spedizione: ${(negozio.speseSpedizione.toFixed(2)).replace('.', ',')} € <br>
    Spedizione gratuita da: ${(negozio.sogliaSpedizioneGratuita.toFixed(2)).replace('.', ',')} €`;
}