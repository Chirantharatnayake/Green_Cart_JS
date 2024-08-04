// Order Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');
    const saveFavouritesButton = document.getElementById('saveFavourites');
    const applyFavouritesButton = document.getElementById('applyFavourites');
    const orderTableBody = document.querySelector('#orderTable tbody');
    const totalPriceElement = document.getElementById('totalPrice');

    const addToFavourites = () => {
        const formData = new FormData(orderForm);
        const favouriteOrder = {};
        formData.forEach((value, key) => {
            if (value && value > 0) {
                favouriteOrder[key] = value;
            }
        });
        localStorage.setItem('favouriteOrder', JSON.stringify(favouriteOrder));
        alert('Order saved to favourites!');
    };

    const applyFavourites = () => {
        const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));
        if (favouriteOrder) {
            for (const key in favouriteOrder) {
                if (favouriteOrder.hasOwnProperty(key)) {
                    document.getElementById(key).value = favouriteOrder[key];
                }
            }
            updateOrderTable();
            alert('Favourite order applied!');
        } else {
            alert('No favourite order found.');
        }
    };

    const updateOrderTable = () => {
        const formData = new FormData(orderForm);
        let totalPrice = 0;
        orderTableBody.innerHTML = '';
        formData.forEach((value, key) => {
            if (value && value > 0) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${key}</td>
                    <td>${value}</td>
                    <td>${calculatePrice(key, value)}</td>
                `;
                totalPrice += calculatePrice(key, value);
                orderTableBody.appendChild(row);
            }
        });
        totalPriceElement.textContent = totalPrice.toFixed(2);
    };

    const calculatePrice = (key, quantity) => {
        const prices = {
            apple: 100,
            banana: 50,
            papaya: 80,
            mango: 40,
            grapes: 45,
            oranges: 30,
            carrot: 70,
            potato: 80,
            pumpkin: 150,
            bitter_gourd: 120,
            beans: 100,
            egg_plant: 75,
            milk: 400,
            cheese: 800,
            milk_maid: 600,
            ice_cream: 1400,
            yoghurt: 70,
            milk_powder: 450,
            chicken: 1100,
            fish: 1000,
            cuttle_fish: 1800,
            lamb: 2500,
            bread: 350,
            cake: 250,
            buns: 50,
            coconut_oil: 900,
            flour: 420,
            sugar: 130
        };
        return prices[key] * quantity;
    };

    saveFavouritesButton.addEventListener('click', addToFavourites);
    applyFavouritesButton.addEventListener('click', applyFavourites);
    orderForm.addEventListener('input', updateOrderTable);
});

// Payment Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.querySelector('form[action="/action_page.php"]');
    
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(paymentForm);
        const requiredFields = ['firstname', 'email', 'address', 'city', 'state', 'zip', 'cardname', 'cardnumber', 'expmonth', 'expyear', 'cvv'];
        let allFieldsFilled = true;
        
        requiredFields.forEach(field => {
            if (!formData.get(field)) {
                allFieldsFilled = false;
                alert(`${field} is required`);
            }
        });
        
        if (allFieldsFilled) {
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 5);
            alert(`Thank you for your purchase! Your order will be delivered on ${deliveryDate.toDateString()}.`);
        }
    });
});

// JavaScript to toggle the navbar on mobile
document.getElementById('menu-toggle').addEventListener('click', function () {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
});