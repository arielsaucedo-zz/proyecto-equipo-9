window.onload = function () {

    let nameDefault = document.getElementById('nameDefault_id');
    let nameDefaultMsg = document.getElementById('nameDefault_msg');

    let productCategory = document.getElementById('product_category_id');
    let productCategoryMsg = document.getElementById('product_category_msg');

    let productQuantity = document.getElementById('product_quantity_id');
    let productQuantityMsg = document.getElementById('product_quantity_msg');

    let productPrice = document.getElementById('product_price_id');
    let productPriceMsg = document.getElementById('product_price_msg');

    let productDiscount = document.getElementById('product_discount_id');
    let productDiscountMsg = document.getElementById('product_discount_msg');

    let productImage = document.getElementById('product_image_id')
    let productImageMsg = document.getElementById('product_image_msg')



    const errNameDefault = 'La longitud del nombre debe ser como mínimo de 5 letras.';
    const errProductCategory = 'La longitud de la categoría debe ser como mínimo de 1 letra.';
    const errProductQuantity = 'El valor de cantidad debe ser mayor o igual a 1 y menor o igual a 99.999.999.999.999.999.999';
    const errProductPrice = 'El valor del precio debe ser mayor o igual a 0,01 y menor o igual a 9.999.999.999,99';
    const errProductDiscount = 'El valor del descuento debe ser mayor o igual a 0 y menor o igual a 100';
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif']

    function getFileExtension(filename) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    }

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
        image : '',
        category : '',
        quantity : '',
        price : '',
        discount : ''
    }

    function setValidationResult(element, status, elementMsg, errMsg){
        if(status === 'OK'){
            element.classList.remove('border-nok')
            element.classList.add('border-ok')
            console.log(element.keyName);
            if(elementMsg.classList){
                elementMsg.classList.remove('span_errors')
                elementMsg.innerHTML = ''
            }
            console.log(errors);
        } else {
            element.classList.remove('border-ok')
            element.classList.add('border-nok')
            if(elementMsg.classList){
                elementMsg.classList.add('span_errors')
                elementMsg.innerHTML = errMsg
            }
        }
    }

    nameDefault.addEventListener('keyup', function(){
        if(validator.isLength(nameDefault.value, { min : 5 } )){
            delete errors.name
            product.name = this.value
            setValidationResult(nameDefault, 'OK', nameDefaultMsg, '')
        }else{
            errors.name = errNameDefault
            product.name = ''
            setValidationResult(nameDefault, 'NOK', nameDefaultMsg, errNameDefault)
        }
    })

    nameDefault.addEventListener('blur', function(){
        if(validator.isLength(nameDefault.value, { min : 5 } )){
            delete errors.name
            product.name = this.value
            setValidationResult(nameDefault, 'OK', nameDefaultMsg, '')
        }else{
            errors.name = errNameDefault
            product.name = ''
            setValidationResult(nameDefault, 'NOK', nameDefaultMsg, errNameDefault)
        }
    })

    productQuantity.addEventListener('keyup', function(){
        if(validator.isLength(productQuantity.value, { min : 5 } )){
            delete errors.name
            product.name = this.value
            setValidationResult(productQuantity, 'OK', productQuantityMsg, '')
        }else{
            errors.name = errNameDefault
            product.name = ''
            setValidationResult(productQuantity, 'NOK', productQuantityMsg, errProductQuantity)
        }
    })

    productQuantity.addEventListener('blur', function(){
        if(validator.isLength(productQuantity.value, { min : 1, max: 99999999999999999999} )){
            delete errors.name
            product.name = this.value
            setValidationResult(productQuantity, 'OK', productQuantityMsg, '')
        }else{
            errors.name = errNameDefault
            product.name = ''
            setValidationResult(productQuantity, 'NOK', productQuantityMsg, errProductQuantity)
        }
    })

    productPrice.addEventListener('keyup', function(){
        if(validator.isFloat(productPrice.value, { min: 0.01, max: 9999999999.99 } )){
            delete errors.price
            product.price = this.value
            setValidationResult(productPrice, 'OK', productPriceMsg, '')
        } else {
            errors.price = errProductPrice
            product.price = ''
            setValidationResult(productPrice, 'NOK', productPriceMsg, errProductPrice)
        }
    })

    productPrice.addEventListener('blur', function(){
        if(validator.isFloat(productPrice.value, { min: 0.01, max: 9999999999.99 } )){
            delete errors.price
            product.price = this.value
            setValidationResult(productPrice, 'OK', productPriceMsg, '')
        } else {
            errors.price = errProductPrice
            product.price = ''
            setValidationResult(productPrice, 'NOK', productPriceMsg, errProductPrice)
        }
    })

    productDiscount.addEventListener('keyup', function(){
        if(validator.isInt(productDiscount.value, { min: 0, max: 100 } )){
            delete errors.discount
            product.discount = this.value
            setValidationResult(productDiscount, 'OK', productDiscountMsg, '')
        } else {
            errors.discount = errProductDiscount
            product.discount = ''
            setValidationResult(productDiscount, 'NOK', productDiscountMsg, errProductDiscount)
        }
    })

    productDiscount.addEventListener('blur', function(){
        if(validator.isInt(productDiscount.value, { min: 0, max: 100 } )){
            delete errors.discount
            product.discount = this.value
            setValidationResult(productDiscount, 'OK', productDiscountMsg, '')
        } else {
            errors.discount = errProductDiscount
            product.discount = ''
            setValidationResult(productDiscount, 'NOK', productDiscountMsg, errProductDiscount)
        }
    })

    productImage.addEventListener('change', function(){
        let imageExtension = getFileExtension(productImage.value)
        let flag = false
        for (let i = 0; i < allowedExtensions.length; i++) {
            if(allowedExtensions[i] == imageExtension){
                flag = true
                break
            } else {
                flag = false
            }
        }
        if(flag){
            delete errors.image
            product.image = this.value
            setValidationResult(productImage, 'OK', productImageMsg, '')
        } else {
            errors.image = errProductImage
            product.image = ''
            setValidationResult(productImage, 'NOK', productImageMsg, errProductImage)
        }
    })

}