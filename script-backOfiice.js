// fa apartire la funzione backoffice al caricamento della pagina

document.addEventListener("DOMContentLoaded", () => {
    backoffice()
})


// --------------------------------- BACKOFFICE ---------------------------------


// funzione per mostrare il form di creazione di un prodotto nella backoffice
const backoffice = () => {
    /* let hero = document.getElementById("hero");
    hero.classList.add("d-none"); */
    history.replaceState(null, '', window.location.pathname);
    let footer = document.getElementsByTagName("footer")[0];
    footer.classList.add("d-none");
    let product = document.getElementById("add-product");
    console.log(product);
    /* product.classList.remove("d-flex", "justify-content-center", "flex-wrap", "gap-3", "p-0"); */
    product.innerHTML = "";
    product.innerHTML = `
        <h3 class="mb-3 text-danger">ADD NEW PRODUCT</h3>
        <div id="form-create-product" class="d-flex flex-column">
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
        console.log(data[0]._id);
        let products = document.getElementById("add-product");
        products.innerHTML += `
            <div class="d-flex justify-content-between align-items-center border-top mt-5">
                <h1 class="my-4">Product List</h1>
                <h4 class="my-4 pe-2"> Prodotti caricati: <span class="rounded-pill bg-dark text-white px-3 py-2">${data.length}</span></h4>
            </div>
        `;
        data.forEach(product => {
            products.innerHTML += `
                <div class="d-flex align-items-center justify-content-center gap-2 border-bottom product">
                    <img src="${product.imageUrl}" alt="${product.name}" class="col w-25">
                    <h6 class="col col-lg-2  text-center">${product.name}</h6>
                    <p class="m-0 col col-lg-3 d-none d-lg-block">${product.description}</p>
                    <p class="m-0 col d-none d-lg-block text-center">${product.brand}</p>
                    <p class="m-0 col d-none d-lg-block text-center">${product.price.toFixed(2).replace('.', ',')} €</p>
                    <div class="d-flex gap-1 gap-lg-3 col flex-column align-items-center">
                        <a href="#?id=${product._id}" class="btn btn-outline-dark" type="button" onclick="modifyProduct()">Modify</a>
                        <a href="#?id=${product._id}" class="btn btn-danger" type="button" onclick="deleteProduct()">Delete</a>
                    </div>
                </div>
                `;
        });
    }).catch(error => {
        console.error(error);
    });
};


document.getElementById("backoffice-button").addEventListener("click", (event) => {
    event.preventDefault();
    // scrolla la pagina verso l'alto
    window.scrollTo(0, 0);
    backoffice()
});


// -------------------------------------AGGIUNGI PRODOTTO ALL'API-------------------------------------


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
            alert("I campi son tutti obbligatori: inserisci TUTTI i dati")
            throw new Error("Errore nella richiesta (mancano dei dati): stato" + response.status);
        }).then(data => {
            console.log(data);
            return data;
        }).catch(error => {
            console.error(error);
        });
}


// -------------------------------------CREA PRODOTTO-------------------------------------


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
    let products = document.getElementById("add-product");
    products.innerHTML += `
            <div class="d-flex align-items-center justify-content-center gap-2 border-bottom product">
                <img src="${image}" alt="${name}" class="col w-25">
                <h6 class="col col-lg-2 text-center">${name}</h6>
                <p class="m-0 col col-lg-3 d-none d-lg-block">${description}</p>
                <p class="m-0 col d-none d-lg-block text-center">${brand}</p>
                <p class="m-0 col text-center">${price.toFixed(2).replace('.', ',')} €</p>
                <div class="d-flex gap-1 gap-lg-3 col flex-column align-items-center">
                    <a href="#" class="btn btn-outline-dark" type="button" onclick="modifyProduct()">Modify</a>
                    <a href="#" class="btn btn-danger" type="button" onclick="deleteProduct()">Delete</a>
                </div>
            </div>
            `;
    alert(`product successfully added: ${name}`)
    backoffice()
};


// -------------------------------------MODIFICA PRODOTTO-------------------------------------


// funzione per modificare un prodotto
const modifyProduct = () => {
    // scrolla la pagina verso l'alto
    window.scrollTo(0, 0);

    let product = document.getElementById("add-product");
    product.innerHTML = "";
    product.innerHTML = `
        <h3 class="mb-3 text-danger">MODIFY PRODUCT</h3>
        <div id="form-create-product" class="d-flex flex-column">
            <div class="d-flex flex-column">
                <label for="name" class="form-label ps-1">Product ID</label>
                <input class="form-control mb-4" type="text" name="name" id="id" required>
            </div>
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
                <button id="modify-product-button" class="btn btn-success" type="button" onclick="modifyProduct()">Modify Product</button>
            </div>
        </div>
    `;

    // Attende l'aggiornamento dell'URL della pagina con l'ID e per poi prenderlo e metterlo nel campo Product ID
    setTimeout(() => {
        const params = new URLSearchParams(window.location.hash.slice(1));
        const id = params.get("id");
        console.log("ID trovato:", id);

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
            console.log(data[0]._id);
            let products = document.getElementById("add-product");
            products.innerHTML += `
                <div class="d-flex justify-content-between align-items-center border-top mt-5">
                    <h1 class="my-4">Product List</h1>
                    <h4 class="my-4 pe-2"> Prodotti caricati: <span class="rounded-pill bg-dark text-white px-3 py-2">${data.length}</span></h4>
                </div>
              `;
            data.forEach(product => {
                if (product._id === id) {
                    products.innerHTML += `
                        <div class="d-flex align-items-center justify-content-center gap-2 border-bottom product">
                            <img src="${product.imageUrl}" alt="${product.name}" class="col w-25">
                            <h6 class="col col-lg-2 text-center">${product.name}</h6>
                            <p class="m-0 col col-lg-3 d-none d-lg-block">${product.description}</p>
                            <p class="m-0 col d-none d-lg-block text-center">${product.brand}</p>
                            <p class="m-0 col d-none d-lg-block text-center">${product.price.toFixed(2).replace('.', ',')} €</p>
                            <div class="d-flex gap-1 gap-lg-3 col flex-column align-items-center">
                            <a href="#?id=${product._id}" class="btn btn-outline-dark" type="button" onclick="modifyProduct()">Modify</a>
                            <a href="#?id=${product._id}" class="btn btn-danger" type="button" onclick="deleteProduct()">Delete</a>
                            </div>
                        </div>
                        `;

                    // Popola automaticamente il campo Product ID se disponibile
                    if (id) {
                        document.getElementById("id").value = id;
                        document.getElementById("name").value = product.name;
                        document.getElementById("description").value = product.description;
                        document.getElementById("image").value = product.imageUrl;
                        document.getElementById("brand").value = product.brand;
                        document.getElementById("price").value = product.price;
                    } else {
                        console.warn("Nessun ID trovato nell'URL");
                    }
                }
            });
        }).catch(error => {
            console.error(error);
        });

    }, 100);
};


// -------------------------------------ELIMINA PRODOTTO-------------------------------------


// delete product   
const deleteProduct = () => {
    // Attende l'aggiornamento dell'URL della pagina con l'ID e per poi prenderlo e metterlo nel campo Product ID
    setTimeout(() => {
        const params = new URLSearchParams(window.location.hash.slice(1));
        const id = params.get("id");
        console.log("ID trovato:", id);

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
            const deleteProduct = data.find(product => product._id === id)
            console.log(deleteProduct)
            fetch(url + id, {
                method: "DELETE",
                headers: {
                    "Authorization": token
                }
            }).then(response => {
                console.log(data);
                
                alert(`Product succesfully removed: ${deleteProduct.name}`)
                backoffice()
            })
        }).catch(error => {
            console.error(error);
        });

    }, 100);
};