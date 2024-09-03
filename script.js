let cart = [];
let total = 0;

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total');
    cartItems.innerHTML = '';
    cart.forEach((cartItem, index) => {
        cartItems.innerHTML += `<li>${cartItem.item} - R$ ${cartItem.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remover</button></li>`;
    });
    totalDisplay.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function checkout() {
    document.getElementById('checkout').style.display = 'block';
}

function checkPaymentMethod() {
    const paymentMethod = document.getElementById('payment-method').value;
    const pixMessage = document.getElementById('pix-message');

    if (paymentMethod === 'pix') {
        pixMessage.style.display = 'block';
    } else {
        pixMessage.style.display = 'none';
    }

    const cashOptions = document.getElementById('cash-options');
    cashOptions.style.display = paymentMethod === 'dinheiro' ? 'block' : 'none';
    if (paymentMethod !== 'dinheiro') {
        document.getElementById('change-needed').checked = false;
        document.getElementById('change-amount').style.display = 'none';
    }
}

function toggleChangeInput() {
    const changeNeeded = document.getElementById('change-needed').checked;
    const changeAmount = document.getElementById('change-amount');
    changeAmount.style.display = changeNeeded ? 'block' : 'none';
    if (!changeNeeded) {
        document.getElementById('cash-amount').value = '';
        document.getElementById('change').textContent = '0.00';
    }
}

function calculateChange() {
    const cashAmount = parseFloat(document.getElementById('cash-amount').value);
    const changeDisplay = document.getElementById('change');
    if (!isNaN(cashAmount) && cashAmount >= total) {
        const change = cashAmount - total;
        changeDisplay.textContent = change.toFixed(2);
    } else {
        changeDisplay.textContent = '0.00';
    }
}

function checkDeliveryOption() {
    const deliveryOption = document.getElementById('delivery-option').value;
    const deliveryInfo = document.getElementById('delivery-info');
    deliveryInfo.style.display = deliveryOption === 'entrega' ? 'block' : 'none';
}

function confirmOrder() {
    const orderSummary = document.getElementById('order-summary');
    const orderDetails = document.getElementById('order-details');
    orderSummary.style.display = 'block';

    let summaryText = 'Pedido Confirmado:\n\n';
    cart.forEach((cartItem, index) => {
        summaryText += `${index + 1}. ${cartItem.item} - R$ ${cartItem.price.toFixed(2)}\n`;
    });
    summaryText += `\nTotal: R$ ${total.toFixed(2)}\n\n`;
    summaryText += `Método de Pagamento: ${document.getElementById('payment-method').value}\n`;
    summaryText += `Precisa de Troco: ${document.getElementById('change-needed').checked ? 'Sim' : 'Não'}\n`;
    if (document.getElementById('change-needed').checked) {
        summaryText += `Valor da Nota: R$ ${parseFloat(document.getElementById('cash-amount').value).toFixed(2)}\n`;
        summaryText += `Troco: R$ ${document.getElementById('change').textContent}\n`;
    }
    summaryText += `Retirada ou Entrega: ${document.getElementById('delivery-option').value}\n`;
    if (document.getElementById('delivery-option').value === 'entrega') {
        summaryText += `Endereço: ${document.getElementById('address').value}\n`;
        summaryText += `Nome: ${document.getElementById('name').value}\n`;
    }

    const observations = document.getElementById('observations').value;
    if (observations) {
        summaryText += `\nObservações: ${observations}\n`;
    }

    orderDetails.textContent = summaryText;
}

function copyOrderDetails() {
    const orderDetails = document.getElementById('order-details');
    navigator.clipboard.writeText(orderDetails.textContent).then(() => {
        alert('Seu Pedido foi copiado, Cole na caixa de mensagem Para enviar!');
    });
}