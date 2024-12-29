// variabili globali
let url = "https://striveschool-api.herokuapp.com/api/product/"
let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYzNGYxNzk5MDYxMDAwMTViNjc3YWEiLCJpYXQiOjE3MzQ1NjMwOTMsImV4cCI6MTczNTc3MjY5M30.L1m8gbLoPM1-bBITECcvMgiwrUcmCBi_A1QWgifXpiw"

// funzioni da far girare all'apertura della pagina
document.addEventListener("DOMContentLoaded", () => {
    datiNegozio();
    navbar();
    getProducts();
});


// funzione per aggiornare i dati del negozio nel footer della pagina
const datiNegozio = () => {
    let datiNegozio = document.getElementById("datiNegozio");
    datiNegozio.innerHTML = `
    <ul class="list-unstyled justify-content-between d-flex flex-column flex-lg-row gap-md-3 m-0">
        <li class="col-2" id="nomeNegozio">${negozio.nomeNegozio}</li>
        <li class="col" id="indirizzo">${negozio.indirizzo}</li>
        <li class="col d-none d-lg-block" id="metodiPagamento">${negozio.metodiPagamento.join('<br>')}</li>
        <li class="col d-none d-lg-block" id="speseSpedizione">Shipping cost: ${(negozio.speseSpedizione.toFixed(2)).replace('.', ',')} € <br>
        Free shipping from: ${(negozio.sogliaSpedizioneGratuita.toFixed(2)).replace('.', ',')} €</li>
    </ul>
    `;
}

// --------------------------------------- Creazione Navbar/Sidebar ---------------------------------------

const navbar = () => {
    let nav = document.getElementsByTagName("nav")[0]
    nav.innerHTML += `
        <div class="container d-flex justify-content-between align-items-center">

            <!-- Logo -->
            <h3 class="nav-item py-2 pe-5">SPORTSWEAR</h3>

            <!-- Menu per schermi grandi -->
            <div class="collapse navbar-collapse justify-content-between align-items-center" id="navbarNav">
                <ul class="navbar-nav gap-3 justify-content-center align-items-center">
                    <li class="nav-item">
                        <a href="frontpage.html" class="nav-link">Home</a>
                    </li>
                    <li class="nav-item">
                        <a href="backOffice.html" class="nav-link" id="backoffice-button" type="button">BackOffice</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">Contact</a>
                    </li>
                </ul>


                <!-- Form per cercare un prodotto -->
                <form class="d-none d-lg-flex p-3" role="search">
                    <input type="text" class="form-control me-2" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-dark" type="submit">Search</button>
                </form>

                <!-- Bottone per accedere -->
                <div class="d-none d-lg-flex gap-3 justify-content-center align-items-centers">
                    <button class="btn btn-outline-dark">Login</button>
                    <button class="btn btn-outline-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-cart3" viewBox="0 0 16 16">
                            <path
                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                    </button>
                </div>
            </div>


            <!-- Bottone per aprire e chiudere il menu -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
    `;

    let side = document.getElementById("sidebar")
    side.innerHTML += `
        <div class="d-flex justify-content-between align-items-center p-3">
            <button class="btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                    class="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path fill-rule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
            </button>
            <button class="btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart3"
                    viewBox="0 0 16 16">
                    <path
                        d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
            </button>
            <button class="btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search"
                    viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
            </button>
        </div>
        `;
}

// --------------------------------- FRONTPAGE ---------------------------------


// funzione per ottenere i dati dei prodotti dal backend (GET)
const getProducts = () => {

    fetch(url, {
        headers: {
            "Authorization": token
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Errore nella richiesta");
    }).then(data => {
        console.log(data);
        if (document.body.contains(document.getElementById("products"))) {
            displayProducts(data);
        }

    }).catch(error => {
        console.error(error);
    });
}


// -----------------------------------------------------------------------------------------------


// funzione per visualizzare i prodotti nella sezione products della frontpage
const displayProducts = (data) => {
    // scrolla la pagina verso l'alto
    window.scrollTo(0, 0);
    let products = document.getElementById("products");
    products.innerHTML = "";
    // creo la card per ogni prodotto
    data.forEach(product => {
        let card = document.createElement("div");
        card.className = "card col-12 col-sm-5 col-md-3 col-lg-2";
        card.style.width = "18rem";
        card.innerHTML = `
        <img src="${product.imageUrl}" class="card-img-top p-2 h-100 mx-auto" alt="${product.name}">
            <div class="card-body d-flex flex-column justify-content-between">
                <div class="d-flex flex-column justify-content-between" style="height: 9rem;">
                    <h4 class="card-title">${product.name}</h4>
                    <p class="card-text text-muted text-decoration-underline">${product.brand}</p>
                    <hr>
                </div>
                
                <div>
                    <p class="card-text">Price: ${product.price.toFixed(2).replace('.', ',')} €</p>
                    <div class="mt-3">
                        <a href="productPage.html?id=${product._id}" class="btn btn-outline-danger">dettagli</a>
                        <a href="#" class="btn btn-outline-dark justify-content-center align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                        </a>
                    </div>
                </div>
            </div>`;
        products.appendChild(card);
    });
}