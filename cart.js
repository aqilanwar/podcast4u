let carts =  document.querySelectorAll('.buy');
let products = [
    {
        name: 'Football Maniac',
        tag: 'fm',
        price: 5,
        incart: 0,
        genre: 'Sports'
    },
    {
        name: 'Mystic Shadow',
        tag: 'ms',
        price: 5,
        incart: 0,
        genre: 'Horror'

    },
    {
        name: 'Political Crisis',
        tag: 'pc',
        price: 5,
        incart: 0,
        genre: 'News and Politic'

    },
    {
        name: 'Mysterious Incidence',
        tag: 'mi',
        price: 5,
        incart: 0,
        genre: 'Mystery'

    },
    {
        name: 'Never Giveup',
        tag: 'dg',
        price: 5,
        incart: 0,
        genre: 'Motivation'

    },
    {
        name: 'Crime Revealed',
        tag: 'cr',
        price: 5,
        incart: 0,
        genre: 'True Crime'
    },
    {
        name: 'Spiritual Guidance',
        tag: 'sg',
        price: 5,
        incart: 0,
        genre: 'Inspirational'
    },
    {
        name: 'Secret of the World',
        tag: 'sotw',
        price: 5,
        incart: 0,
        genre: 'Reality'
    }
]
for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i]);
        displayCart();
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
            cartItems[product.tag].incart = 0;
        }
        cartItems[product.tag].incart += 1;

    } else if(cartItems == null){

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

    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".cartNav");

    if(cartItems && productContainer ) {

        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            
            <div class="container-purchase">
                <div class="image-purchase">
                    <img  data-aos="zoom-in" data-aos-duration="400" data-aos-once="true" src="logo/${item.tag}.png">
                </div>

                <div class="text-purchase">
                    <a  data-aos="zoom-in" data-aos-duration="400" data-aos-once="true" id="${item.tag}">${item.name}</a>
                    <p  data-aos="zoom-in" data-aos-duration="400" data-aos-once="true" >RM${item.price}</p>
                    <a  data-aos="zoom-in" data-aos-duration="400" data-aos-once="true" class="symbolminus" id="${item.tag}" href="javascript:openNav();" style="display:inline-block; color:rgb(12, 209, 183); margin-left:20%;">-</a>
                    <p  data-aos="zoom-in" data-aos-duration="400" data-aos-once="true" class="quan" style="float:center;">${item.incart}</p>
                    <a  data-aos="zoom-in" data-aos-duration="400" data-aos-once="true" class="symbolplus" id="${item.tag}" href="javascript:openNav();" style="display:inline-block; color:rgb(12, 209, 183);">+</a>
                </div>
            </div>
            `;
        });


        productContainer.innerHTML += `
   
        <div class="checkout">
          <a class="btn btn-success btn-xl sr-button" role="button" data-aos="zoom-in" data-aos-duration="400" data-aos-once="true" href="payment/payment.html">PAY NOW</a>
        </div>
        </div>
        `;
    }
}

//plus cart
$(document).on("click", ".symbolplus", function() { 

    let totalCart = localStorage.getItem("cartNumbers");
    totalCart = parseInt(totalCart);
    totalCart += 1;
    localStorage.setItem('cartNumbers',totalCart);
    
    //update totalCost in local storage
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);

    let cart = localStorage.getItem("productsInCart");
    cart = JSON.parse(cart);
    let x = Object.values(cart).map(item => {
        if(item.tag == this.id){
            item.incart += 1;
            localStorage.setItem("productsInCart", JSON.stringify(cart));
            localStorage.setItem("totalCost" , cartCost + item.price);
            displayCart();
            onLoadCartNumbers();
        }
    })
});

//delete cart
$(document).on("click", ".symbolminus", function() { 

    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);
    
    let cart = localStorage.getItem("productsInCart");
    cart = JSON.parse(cart);  

    let x = Object.values(cart).map(item => {
        if(item.incart > 1){
            if(item.tag == this.id){
                //update product container
                item.incart -= 1;
                localStorage.setItem("productsInCart", JSON.stringify(cart));
                displayCart();
                //update cart numbers
                let totalCart = localStorage.getItem("cartNumbers");
                totalCart = parseInt(totalCart);
                totalCart -= 1;
                localStorage.setItem('cartNumbers',totalCart);
                localStorage.setItem('totalCost' , cartCost - item.price);
                onLoadCartNumbers();


            }
        }else if(item.incart == 1){
            if(item.tag == this.id){
               //update quantity containerd
               cart[this.id].incart -= 1;
               delete cart[this.id];

               //update cart numbers
               let totalCart = localStorage.getItem("cartNumbers");
               totalCart = parseInt(totalCart);
               totalCart -= 1;
               localStorage.setItem('cartNumbers',totalCart);
               onLoadCartNumbers();
               deletePayNow();
               localStorage.setItem('productsInCart', JSON.stringify(cart));
               localStorage.setItem('totalCost' , cartCost - item.price);

               $(this).parent().parent().remove(); 
            }
        }

    })
});

function deletePayNow(){
    let y = document.querySelector(".container-purchase");
    if(y == null){
        document.querySelector(".cartNav").innerHTML = "";

    }
}

//add or minus cart
//$(document).on("click", ".symbol", function() { 
 //   $(this).parent().parent().remove(); 
//});
//
onLoadCartNumbers();
displayCart();