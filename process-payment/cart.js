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
            <button type="button" class="btn btn-outline-info">${totalCost}</button>
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
function onLoadtotal(){
    let productNumbers = localStorage.getItem('totalCost');
    if(productNumbers){
        document.querySelector('.checkout button').textContent = productNumbers;
    }
    
}


$(document).ready(function(){
    $(".symbolplus").click(function() {
        alert("-");
    });

    $(".symbolminus").click(function() {
        alert("-");
    });

 });

onLoadtotal();
onLoadCartNumbers();
displayCart();