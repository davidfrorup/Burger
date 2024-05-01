// Variabler til at holde styr på bestilling og omsætning
let bestillingsnummer = 1;
let omsætning = 0;

// Funktion til at tilføje en vare til kurven
function addToCart(item) {
    const cartItems = document.getElementById('kurv-elementer');
    const total = document.getElementById('total-pris');

    const newItem = document.createElement('li');
    newItem.textContent = item.textContent + ' (' + item.dataset.pris + ' kr.)';
    cartItems.appendChild(newItem);

    total.textContent = parseInt(total.textContent) + parseInt(item.dataset.pris);
}

// Funktion til at fjerne en vare fra kurven
function removeFromCart(item) {
    const cartItems = document.getElementById('kurv-elementer');
    const total = document.getElementById('total-pris');

    cartItems.removeChild(item);

    total.textContent = parseInt(total.textContent) - parseInt(item.dataset.pris);
}

// Funktion til at afslutte en bestilling
function completeOrder() {
    // Hent kurvens indhold og saml totalpris
    const cartItems = document.getElementById('kurv-elementer');
    let orderTotal = 0;
    for (const item of cartItems.children) {
        orderTotal += parseInt(item.dataset.pris);
    }

    // Opdater omsætning
    omsætning += orderTotal;
    document.getElementById('omsætning-beløb').textContent = omsætning + ' kr.';

    // Vis bestillingsseddel
    document.getElementById('bestillingsseddel').style.display = 'block';
    document.getElementById('seddel-bestillingsnummer').textContent = bestillingsnummer;
    document.getElementById('seddel-total-pris').textContent = orderTotal + ' kr.';

    // Nulstil kurv og klargør til ny bestilling
    cartItems.innerHTML = '';
    document.getElementById('total-pris').textContent = '0 kr.';

    // Opdater bestillingsnummer
    bestillingsnummer++;
    document.getElementById('bestillingsnummer').textContent = bestillingsnummer;
}

// Funktion til at annullere en bestilling
function cancelOrder() {
    // Nulstil kurv og klargør til ny bestilling
    const cartItems = document.getElementById('kurv-elementer');
    cartItems.innerHTML = '';
    document.getElementById('total-pris').textContent = '0 kr.';
}

// Funktion til at lukke bestillingsseddel
function closeOrderReceipt() {
    document.getElementById('bestillingsseddel').style.display = 'none';
}

// Tilføj eventlisteners til menupunkter
const menuItems = document.querySelectorAll('.menu li');
for (const item of menuItems) {
    item.addEventListener('click', () => addToCart(item));
}

// Tilføj eventlisteners til "Fjern"-knapper i kurven
const cartItems = document.getElementById('kurv-elementer');
cartItems.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        removeFromCart(event.target);
    }
});

// Tilføj eventlisteners til "Bestil"- og "Annuller"-knapper
document.getElementById('bestil').addEventListener('click', completeOrder);
document.getElementById('annuller').addEventListener('click', cancelOrder);

// Tilføj eventlistener til "Luk"-knap på bestillingsseddel
document.getElementById('luk-seddel').addEventListener('click', closeOrderReceipt);
