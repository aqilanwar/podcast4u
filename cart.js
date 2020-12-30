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
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
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
    let totalCost = localStorage.getItem("totalCost") ;

    console.log(totalCost);
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".cartNav");

    if(cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            
            <div class="container-purchase">
                <div class="image-purchase">
                    <img src="logo/${item.tag}.png">
                </div>

                <div class="text-purchase">
                    <a href="" id="${item.tag}">${item.name}</a>
                    <p>RM${item.price}</p>
                    <a class="symbolminus" href="javascript:openNav();" style="display:inline-block; color:rgb(12, 209, 183); margin-left:20%;">-</a>
                    <p style="float:center;">${item.incart}</p>
                    <a class="symbolplus" href="javascript:openNav();" style="display:inline-block; color:rgb(12, 209, 183);">+</a>
                </div>
            </div>
            `;
        });
        productContainer.innerHTML += `
   
        <div class="checkout">
            <button type="button" onclick="location.href='process-payment/cart.html';"class="btn btn-outline-info"><svg
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-cart" viewBox="0 0 16 16">
                <path
                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg></a>Pay Now
              </button>
        </div>
        </div>
        `;
    }
}



//delete cart
$(document).on("click", ".symbol", function() { 
    $(this).parent().parent().remove(); 
});

//add or minus cart

//$(document).on("click", ".symbol", function() { 
 //   $(this).parent().parent().remove(); 
//});




$(document).ready(function(){
    $(".symbolplus").click(function() {
        alert("-");
    });

    $(".symbolminus").click(function() {
        alert("-");
    });

 });

onLoadCartNumbers();
displayCart();