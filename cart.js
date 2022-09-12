'use strict'

const cartEl = document.querySelector('.order');
const cartCount = document.querySelector('.cart__icon_block span');
const cartTotal = document.querySelector('.order__total');
const cartTotalCount = document.querySelector('.order__total__span');

document.querySelector('.cart__icon_block')
    .addEventListener('click', () => {
        cartEl.classList.toggle('hidden');
    });
const goods = {};

document.querySelector('.products__items')
    .addEventListener('click', event => {
        if (!event.target.closest('.product__add')) {
            return;
        }
        const productEl = event.target.closest('.product');
        const rn = +productEl.dataset.id;
        const name = productEl.dataset.name;
        const price = +productEl.dataset.price;

        addToCart(rn, name, price);
    });

function addToCart(rn, name, price) {
    if (!(rn in goods)) {
        goods[rn] = { rn, name, price, count: 0 };
    }
    goods[rn].count++;
    cartCount.textContent = getTotalCartCount().toString();
    cartTotalCount.textContent = getTotalCartPrice().toFixed(2);
    addProductInCart(rn);
}

function getTotalCartCount() {
    return Object.values(goods).reduce(
        (acc, product) => acc + product.count, 0);
}

function getTotalCartPrice() {
    return Object
        .values(goods).reduce((acc, product) =>
            acc + product.price * product.count, 0);
}

function addProductInCart(rn) {
    const rowEl = cartEl.querySelector(`.order__heading[data-id="${rn}"]`);
    if (!rowEl) {
        addRowCart(rn);
        return;
    }
    const productEl = goods[rn];
    rowEl.querySelector('.product__Count').textContent = productEl.count;
    rowEl.querySelector('.product__Total__Row')
        .textContent = (productEl.price * productEl.count).toFixed(2);
}

function addRowCart(rn) {
    const row = `
    <div class="order__heading order__product" data-id="${rn}">
        <div>${goods[rn].name}</div>
        <div>
            <span class="product__Count">${goods[rn].count}</span> шт.
        </div>
        <div>$${goods[rn].price}</div>
        <div>
            $<span class="product__Total__Row">${(goods[rn]
            .price * goods[rn].count).toFixed(2)}</span>
        </div>
    </div>`;
    cartTotal.insertAdjacentHTML("beforebegin", row);
}