$(document).on('keyup mouseup','input[type=number]',function(){

    var arrayFromLocal=localStorage.getObj('product');
    setQuantityAndTotalPrice(arrayFromLocal,$(this).attr('updateItemid'),$(this).val());
    localStorage.setObj('product', arrayFromLocal);
    loadBasketFromLocalStorageAndRender();
  });
  
  function setQuantityAndTotalPrice(array,id,quantity) {
  
    array.forEach(function(result, index) {
      if(result.id === id) {
        result.quantity=quantity;
        result.total=(quantity*result.price);
      }    
    });
  
  }