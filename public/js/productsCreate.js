window.onload = function(){
    let productName = document.getElementById('product_name_id')
    let productDescription = document.getElementById('product_description_id')
    let productImage = document.getElementById('product_image_id')
    let productCategory = document.getElementById('product_category_id')
    let productQuantity = document.getElementById('product_quantity_id')
    let productPrice = document.getElementById('product_price_id')
    let productDiscount = document.getElementById('product_discount_id')

    productName.addEventListener('blur', function(){
        if(validator.isLength(productName.value,{min:5})){

            alert('peola');
            console.log('hola');
        }else{
            alert('culosucio');
            console.log('chau');
        }
    })
}