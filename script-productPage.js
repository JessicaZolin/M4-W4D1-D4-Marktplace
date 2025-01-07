// -------------------------------------cerca ID prodotto nella url dopo click su bottone dettagli-------------------------------------


const params = new URLSearchParams(window.location.search);
console.log(params);
const id = params.get("id");
console.log(id);


// -------------------------------------ottieni dettagli prodotto -------------------------------------


fetch(url + id, {
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
    displayProductDetails(data);
}).catch(error => {
    console.error("Errore nella richiesta:", error);
});


// -------------------------------------visualizza dettagli prodotto -------------------------------------


const displayProductDetails = (product) => {
    let product2 = document.getElementById("products2");
    product2.innerHTML = `
    <div class="card mb-3 col-12">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${product.imageUrl}"
                            class="img-fluid rounded-start h-100 object-fit-cover" alt="${product.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body d-flex flex-column gap-3">
                            <h2 class="card-title">${product.name}</h2>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text">Price: <span class="fw-bold">${product.price.toFixed(2).replace('.', ',')} €</span></p>
                            <div class="d-flex gap-2">
                                <button class="btn btn-outline-success">Add to cart</button>
                                <a href="frontpage.html" class="btn btn-outline-dark">Back to products</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `;
}

