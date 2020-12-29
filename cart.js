let carts =  document.querySelectorAll('.buy');

let products = [
    {
        name: 'Football Maniac',
        tag: 'fm',
        price: 5,
        incart: 0
    },
    {
        name: 'Mystic Shadow (horor)',
        tag: 'ms',
        price: 5,
        incart: 0
    },
    {
        name: 'Politic Crisis',
        tag: 'pc',
        price: 5,
        incart: 0
    },
    {
        name: 'Mysterious Incidence',
        tag: 'mi',
        price: 5,
        incart: 0
    },
    {
        name: 'Dont Giveup',
        tag: 'dg',
        price: 5,
        incart: 0
    },
    {
        name: 'Crime Revealed',
        tag: 'cr',
        price: 5,
        incart: 0
    },
    {
        name: 'Spiritual Guidance',
        tag: 'sg',
        price: 5,
        incart: 0
    },
    {
        name: 'Secret of the World',
        tag: 'sotw',
        price: 5,
        incart: 0
    }
   
]
for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    console.log("The product clicked is ", product)
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;

    } else {
        localStorage.setItem('cartNumbers' , 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product) ;
}

function setItems(product) {
  
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].incart += 1;
    } else {
        product.incart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems ));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    
    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost" , cartCost + product.price);
    } else {
        localStorage.setItem("totalCost" , product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart") ;
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".cartNav");

    if(cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
            <a class="container-title" style="color: rgb(255, 255, 255);">Your Cart</a>
            <div class="container-purchase">
                <div class="image-purchase">
                    <img src="logo/${item.tag}.png">
                </div>

                <div class="text-purchase">
                    <a href="">${item.name}</a>
                    <p>RM${item.price}</p>
                    <a class="symbol" href="javascript:closeNav();" style="display:inline-block; color:rgb(12, 209, 183); margin-left:20%;">-</a>
                    <p style="float:center;">${item.incart}</p>
                    <a class="symbol" href="javascript:closeNav();" style="display:inline-block; color:rgb(12, 209, 183);">+</a>
                </div>
            </div>
            `
        });
    }
}

onLoadCartNumbers();
displayCart();