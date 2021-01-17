window.onload = function(){
    let productName = document.getElementById('product_name_id')
    let productNameMsg = document.getElementById('product_name_msg')
    let productDescription = document.getElementById('product_description_id')
    let productImage = document.getElementById('product_image_id')
    let productCategory = document.getElementById('product_category_id')
    let productQuantity = document.getElementById('product_quantity_id')
    let productPrice = document.getElementById('product_price_id')
    let productDiscount = document.getElementById('product_discount_id')

    let form = document.getElementById('productCreateForm')

    const product = {
        name : '',
        description : '',
        image : '',
        category : '',
        quantity : '',
        price : '',
        discount : ''
    }


    const errors = {
        name : '',
        description : '',
        //image : '',
        category : '',
        quantity : '',
        price : '',
        discount : ''
    }


    productName.addEventListener('keyup', function(){
        if(validator.isLength(productName.value, { min : 5 } )){
            productName.classList.remove('border-nok')
            productName.classList.add('border-ok')
            product.name = this.value
            delete errors.name
            productNameMsg.innerHTML = ''
        }else{
            productName.classList.remove('border-ok')
            productName.classList.add('border-nok')
            errors.name = 'El nombre debe ser de al menos 5 letras'
            productNameMsg.classList.remove('span_errors')
        }
    })

    productDescription.addEventListener('keyup', function(){
        if(validator.isLength(productDescription.value, { min : 20 } )){
            productDescription.classList.remove('border-nok')
            productDescription.classList.add('border-ok')
            product.description = this.value
            delete errors.description
        } else {
            productDescription.classList.remove('border-ok')
            productDescription.classList.add('border-nok')
            errors.description = 'La descripción debe ser de al menos 20 letras'
        }
    })

    productCategory.addEventListener('keyup', function(){
        if(validator.isLength(productCategory.value, { min : 1 } )){
            productCategory.classList.remove('border-nok')
            productCategory.classList.add('border-ok')
            product.category = this.value
            delete errors.category
        } else {
            productCategory.classList.remove('border-ok')
            productCategory.classList.add('border-nok')
            errors.category = 'La catagoría debe ser de al menos 1 caracter'
        }
    })

    productQuantity.addEventListener('keyup', function(){
        if(validator.isInt(productQuantity.value, { min: 1, max: 99999999999999999999 } )){
            productQuantity.classList.remove('border-nok')
            productQuantity.classList.add('border-ok')
            product.quantity = this.value
            delete errors.quantity
        } else {
            productQuantity.classList.remove('border-ok')
            productQuantity.classList.add('border-nok')
            errors.quantity = 'La cantidad no puede ser menor a 1 y debe ser menor o igual que 99.999.999.999.999.999.999'
        }
    })

    productPrice.addEventListener('keyup', function(){
        if(validator.isFloat(productPrice.value, { min: 0.01, max: 9999999999.99 } )){
            productPrice.classList.remove('border-nok')
            productPrice.classList.add('border-ok')
            product.price = this.value
            delete errors.price
        } else {
            productPrice.classList.remove('border-ok')
            productPrice.classList.add('border-nok')
            errors.price = 'El precio no puede ser menor que 0,01 y debe ser menor o igual que 9.999.999.999,99'
        }
    })

    productDiscount.addEventListener('keyup', function(){
        if(validator.isInt(productDiscount.value, { min: 0, max: 100 } )){
            productDiscount.classList.remove('border-nok')
            productDiscount.classList.add('border-ok')
            product.discount = this.value
            delete errors.discount
        } else {
            productDiscount.classList.remove('border-ok')
            productDiscount.classList.add('border-nok')
            errors.discount = 'El descuento debe ser mayor o igual a 0 y menor o igual que 100'
        }
    })

    form.addEventListener('submit', function(e){
        console.log('llego al submit');
        if(Object.keys(errors).length > 0){
            console.log('no se envía');
            e.preventDefault()
            productNameMsg.innerHTML = errors.name
            productNameMsg.classList.add('span_errors')
            productDescriptionMsg.innerHTML = errors.description
            productImageMsg.innerHTML = errors.image
            productCategoryMsg.innerHTML = errors.category
            productQuantityMsg.innerHTML = errors.quantity
            productPriceMsg.innerHTML = errors.price
            productDiscountMsg.innerHTML = errors.discount
        } else {
            console.log('se puede enviar');
        }
    })

}

