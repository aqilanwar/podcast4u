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
        cartNumbers();
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;

    } else {
        localStorage.setItem('cartNumbers' , 1);
        document.querySelector('.cart span').textContent = 1;
    }

}

onLoadCartNumbers();
