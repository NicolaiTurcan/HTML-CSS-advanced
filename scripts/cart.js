"use strict";

let addCart = document.querySelectorAll(".content_button_link");
let cartCounter = document.querySelector(".counter > span");
let cartLoc = document.querySelector(".cart_info_bottom");


let products = {
    1: { name: "ELLERY X M", price: 50.25, count: 0 },
    2: { name: "ELLERY X M'O CAPSULE", price: 52.50, count: 0 },
    3: { name: "ELLERY", price: 48.99, count: 0 },
    4: { name: "CAPSULE", price: 35.99, count: 0 },
    5: { name: "M'O CAPSULE", price: 62.25, count: 0 },
    6: { name: "ELLERY MS", price: 75, count: 0 }
};



addCart.forEach(function (link) {
    link.addEventListener('click', clickHandler);
});


function clickHandler(event) {
    counter();
    itemCounter(event);
}


let count = 0;
/**
 * Calculate total count of products in cart and shows that number in red circle.
 */
function counter() {
    count = count + 1;
    cartCounter.innerHTML = '';
    cartCounter.insertAdjacentText('afterbegin', count);
}

/**
 * on click on "add button" to cart calculate and show count of products by type.
 * @param {click} event
 */
function itemCounter(event) {
    let item = event.currentTarget.dataset.type;
    products[item].count++;

    if (products[item].count == 1) {
        let markup = getMarkup(products[item], item);
        cartLoc.insertAdjacentHTML('beforebegin', markup);
    }
    else {
        increaseProductCount(products[item], item);
    }

    getTotalCartSum();
}

/**
 * generate markup for one product in ".cart".
 * @param {*} product array object
 * @param {*} item array key
 * @returns html markup
 */
function getMarkup(product, item) {
    return `<div class="cart_info_main"><div class="cart_items"><span>${product.name}</span></div>
    <div class="cart_items"><span class="scount" data-type="${item}">${product.count} Item</span></div>
    <div class="cart_items"><span>${product.price}.00$</span></div>
    <div class="cart_items"><span class="totalCount" data-type="${item}">${(product.price * product.count).toFixed(2)}$</span></div></div>`
}

/**
 * Calculate qunatity of products and total sume of this product.
 * @param {*} product array object
 * @param {*} item array key
 */
function increaseProductCount(product, item) {
    let spansCount = document.querySelectorAll(".scount");
    let spansTotal = document.querySelectorAll(".totalCount");

    let spanCount;
    spansCount.forEach((span) => {
        if (span.getAttribute("data-type") == item) {
            spanCount = span;
        }
    });

    let spanTotal;
    spansTotal.forEach((span) => {
        if (span.getAttribute("data-type") == item) {
            spanTotal = span;
        }
    });

    spanCount.innerText = `${product.count} Items`;
    spanTotal.innerText = `${(product.count * product.price).toFixed(2)}$`;

}

/**
 * Count Total summe in cart
 */
function getTotalCartSum() {
    let summ = 0;
    let spanList = document.querySelectorAll(".totalCount");
    spanList.forEach((span) => {
        let spanText = span.innerText.replace("$", "");
        summ += (+spanText);
    });
    let totalSummSpan = document.querySelector(".cart_info_bottom span");
    totalSummSpan.innerText = `${summ.toFixed(2)}$`;
}