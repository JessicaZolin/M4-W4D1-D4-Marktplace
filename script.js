// variabili globali
let url = "https://striveschool-api.herokuapp.com/api/product/"
let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYzNGYxNzk5MDYxMDAwMTViNjc3YWEiLCJpYXQiOjE3MzQ1NjMwOTMsImV4cCI6MTczNTc3MjY5M30.L1m8gbLoPM1-bBITECcvMgiwrUcmCBi_A1QWgifXpiw"

// funzioni da far girare all'apertura della pagina
document.addEventListener("DOMContentLoaded", () => {
    datiNegozio();
    getProducts();
});


// funzione per aggiornare i dati del negozio nel footer delle pagine
const datiNegozio = () => {
    document.getElementById("nomeNegozio").innerHTML = negozio.nomeNegozio;
    document.getElementById("indirizzo").innerHTML = negozio.indirizzo;
    document.getElementById("metodiPagamento").innerHTML = negozio.metodiPagamento.join('<br>');
    document.getElementById("speseSpedizione").innerHTML = `Shipping cost: ${(negozio.speseSpedizione.toFixed(2)).replace('.', ',')} € <br>
    Free shipping from: ${(negozio.sogliaSpedizioneGratuita.toFixed(2)).replace('.', ',')} €`;
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

// funzione per visualizzare i prodotti nella sezione products della frontpage
const displayProducts = (data) => {
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
                        <a href="#" class="btn btn-outline-danger">dettagli</a>
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


// --------------------------------- BACKOFFICE ---------------------------------

// funzione per mostrare il form di creazione di un prodotto nella backoffice
const backoffice = () => {
    let hero = document.getElementById("hero");
    hero.classList.add("d-none");
    let footer = document.getElementsByTagName("footer")[0];
    footer.classList.add("d-none");
    let productsSection = document.getElementById("products-section");
    productsSection.classList.add("backofficePage");
    productsSection.id = ("product-section");
    let product = document.getElementById("products");
    console.log(product);
    product.classList.remove("d-flex", "justify-content-center", "flex-wrap", "gap-3", "p-0");
    product.innerHTML = "";
    product.innerHTML = `
        <div id="form-create-product" class="d-flex flex-column pt-4">
            <div class="d-flex flex-column">
                <label for="name" class="form-label ps-1">Product Name</label>
                <input class="form-control mb-4" type="text" name="name" id="name" required>
            </div>
            <div class="d-flex flex-column">
                <label for="description" class="form-label ps-1">Description</label>
                <textarea class="form-control mb-4" type="text" name="description" id="description" required></textarea>
            </div>
            <div class="d-flex flex-column">
                <label for="image" class="form-label ps-1">Image</label>
                <input class="form-control mb-4" type="text" name="image" id="image" required>
            </div>
            <div class="d-flex gap-5">
                <div class="d-flex flex-column">
                    <label for="brand" class="form-label ps-1">Brand</label>
                    <input class="form-control mb-4" type="text" name="brand" id="brand" required>
                </div>
                <div class="d-flex flex-column">
                    <label for="price" class="form-label ps-1">Price</label>
                    <input class="form-control mb-4" type="number" name="price" id="price" required>
                </div>
            </div>
            <div class="d-flex gap-2">
                <button id="create-product-button" class="btn btn-success" type="button" onclick="createProduct()">Create Product</button>
            </div>
        </div>
    `;
};


document.getElementById("backoffice-button").addEventListener("click", (event) => {
    event.preventDefault();
    backoffice();
});



// funzione per aggiungere un prodotto all'API (POST)
const addProduct = (name, description, image, brand, price) => {

    // creo il nuovo prodotto
    let newProduct = {
        name: name,
        description: description,
        brand: brand,
        imageUrl: image,
        price: price,
    }

    // aggiungo il prodotto all'API
    fetch(url, {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
            "Content-type": "application/json",
            "Authorization": token
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Errore nella richiesta: stato " + response.status);
        }).then(data => {
            console.log(data);
            return data;
        }).catch(error => {
            console.error(error);
        });
}

// funzione per aggiungere un prodotto all'API (POST)
/* let createButton = document.getElementById("create-product-button");
console.log(createButton); */


// funzione per creare un prodotto
const createProduct = () => {

    // prendo i valori dei campi
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let image = document.getElementById("image").value;
    let brand = document.getElementById("brand").value;
    let price = parseFloat(document.getElementById("price").value);

    // aggiungo il prodotto all'API
    addProduct(name, description, image, brand, price);

    // pulisco i campi
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("image").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("price").value = "";
    console.log(typeof name, typeof description, typeof image, typeof brand, typeof price);

    // crea lista con i prodotti nella backoffice

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
        let products = document.getElementById("products");
        products.innerHTML += `
        <h1 class="mt-4">Product List</h1>
        `;
        data.forEach(product => {
            products.innerHTML += `
            <div id="product-list" class="d-flex align-items-center justify-content-center gap-4 border-bottom">
                <img src="${product.imageUrl}" alt="${product.name}" class="w-25">
            <h5 class="col-lg-2">${product.name}</h5>
            <p class="m-0 col-lg-3">${product.description}</p>
            <p class="m-0 col">${product.brand}</p>
            <p class="m-0 col">${product.price} €</p>
            <div class="d-flex gap-3 col">
                <button class="btn btn-outline-dark" type="button">Modify</button>
                <button class="btn btn-danger" type="button">Delete</button>
            </div>
            </div>
            `;
        });
    }).catch(error => {
        console.error(error);
    });
};


// delete product   
/* document.getElementById("delete-product").addEventListener("click", () => {
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
        for (let i = 0; i < data.length; i++) {
            let id = data[i]._id;
            fetch(url + id, {
                method: "DELETE",
                headers: {
                    "Authorization": token
                }
            });
        }
    }).then(data => {
        console.log(data);
    });
});
 */