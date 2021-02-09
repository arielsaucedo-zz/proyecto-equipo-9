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

    let productDescription = document.getElementById('product_description_id')
    let productDescriptionMsg = document.getElementById('product_description_msg')

    let form = document.getElementById('productEditForm')

    const errNameDefault = 'La longitud del nombre debe ser como mínimo de 5 letras.';
    const errProductCategory = 'La longitud de la categoría debe ser como mínimo de 1 letra.';
    const errProductQuantity = 'El valor de cantidad debe ser mayor o igual a 1 y menor o igual a 99.999.999.999.999.999.999';
    const errProductPrice = 'El valor del precio debe ser mayor o igual a 0,01 y menor o igual a 9.999.999.999,99';
    const errProductDiscount = 'El valor del descuento debe ser mayor o igual a 0 y menor o igual a 100';
    const errProductDescription = 'La longitud de la descripción debe ser como mínimo de 20 letras.'
    const errProductImage = 'Debe adjuntar una imagen del producto'
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

    const errors = {}

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

    productCategory.addEventListener('keyup', function(){
        if(validator.isLength(productCategory.value, { min : 1 } )){
            delete errors.category
            product.category = this.value
            setValidationResult(productCategory, 'OK', productCategoryMsg, '')
        } else {
            errors.category = errProductCategory
            product.category = ''
            setValidationResult(productCategory, 'NOK', productCategoryMsg, errProductCategory)
        }
    })

    productCategory.addEventListener('blur', function(){
        if(validator.isLength(productCategory.value, { min : 1 } )){
            delete errors.category
            product.category = this.value
            setValidationResult(productCategory, 'OK', productCategoryMsg, '')
        } else {
            errors.category = errProductCategory
            product.category = ''
            setValidationResult(productCategory, 'NOK', productCategoryMsg, errProductCategory)
        }
    })

    productQuantity.addEventListener('keyup', function(){
        if(validator.isInt(productQuantity.value, { min: 1, max: 99999999999999999999 } )){
            delete errors.quantity
            product.quantity = this.value
            setValidationResult(productQuantity, 'OK', productQuantityMsg, '')
        } else {
            errors.quantity = errProductQuantity
            product.quantity = ''
            setValidationResult(productQuantity, 'NOK', productQuantityMsg, errProductQuantity)
        }
    })

    productQuantity.addEventListener('blur', function(){
        if(validator.isInt(productQuantity.value, { min: 1, max: 99999999999999999999 } )){
            delete errors.quantity
            product.quantity = this.value
            setValidationResult(productQuantity, 'OK', productQuantityMsg, '')
        } else {
            errors.quantity = errProductQuantity
            product.quantity = ''
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

    productDescription.addEventListener('keyup', function(){
        if(validator.isLength(productDescription.value, { min : 20 } )){
            delete errors.description
            product.description = this.value
            setValidationResult(productDescription, 'OK', productDescriptionMsg,'')
        } else {
            product.description = ''
            errors.description = errProductDescription
            setValidationResult(productDescription, 'NOK', productDescriptionMsg, errProductDescription)
        }
    })

    productDescription.addEventListener('blur', function(){
        if(validator.isLength(productDescription.value, { min : 20 } )){
            delete errors.description
            product.description = this.value
            setValidationResult(productDescription, 'OK', productDescriptionMsg,'')
        } else {
            errors.description = errProductDescription
            product.description = ''
            setValidationResult(productDescription, 'NOK', productDescriptionMsg, errProductDescription)
        }
    })

    productImage.addEventListener('change', function(){
        let imageExtension = getFileExtension(productImage.defaultValue)
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
            product.image = this.defaultValue
            setValidationResult(productImage, 'OK', productImageMsg, '')
        } else {
            errors.image = errProductImage
            product.image = ''
            setValidationResult(productImage, 'NOK', productImageMsg, errProductImage)
        }
    })

    form.addEventListener('submit', function(e){
        if(Object.keys(errors).length > 0){
            console.log('no se envía');
            e.preventDefault()
            console.log(Object.keys(errors));
            for(i=0;i<Object.keys(errors).length;i++){
                switch (Object.keys(errors)[i]) {
                    case 'name':
                        errors.name = errNameDefault
                        nameDefault.classList.remove('border-ok')
                        nameDefault.classList.add('border-nok')
                        if(nameDefaultMsg.classList){
                            nameDefaultMsg.classList.add('span_errors')
                            nameDefaultMsg.innerHTML = errProductName
                        }
                        break;
                    case 'description':
                        errors.description = errProductDescription
                        productDescription.classList.remove('border-ok')
                        productDescription.classList.add('border-nok')
                        if(productDescriptionMsg.classList){
                            productDescriptionMsg.classList.add('span_errors')
                            productDescriptionMsg.innerHTML = errProductDescription
                        }
                        break;
                    case 'image':
                        errors.image = errProductImage
                        productImage.classList.remove('border-ok')
                        productImage.classList.add('border-nok')
                        if(productImageMsg.classList){
                            productImageMsg.classList.add('span_errors')
                            productImageMsg.innerHTML = errProductImage
                        }
                        break;
                    case 'category':
                        errors.category = errProductCategory
                        productCategory.classList.remove('border-ok')
                        productCategory.classList.add('border-nok')
                        if(productCategoryMsg.classList){
                            productCategoryMsg.classList.add('span_errors')
                            productCategoryMsg.innerHTML = errProductCategory
                        }
                        break;
                    case 'quantity':
                        errors.quantity = errProductQuantity
                        productQuantity.classList.remove('border-ok')
                        productQuantity.classList.add('border-nok')
                        if(productQuantityMsg.classList){
                            productQuantityMsg.classList.add('span_errors')
                            productQuantityMsg.innerHTML = errProductQuantity
                        }
                        break;
                    case 'price':
                        errors.price = errProductPrice
                        productPrice.classList.remove('border-ok')
                        productPrice.classList.add('border-nok')
                        if(productPriceMsg.classList){
                            productPriceMsg.classList.add('span_errors')
                            productPriceMsg.innerHTML = errProductPrice
                        }
                        break;
                    case 'discount':
                        errors.discount = errProductDiscount
                        productDiscount.classList.remove('border-ok')
                        productDiscount.classList.add('border-nok')
                        if(productDiscountMsg.classList){
                            productDiscountMsg.classList.add('span_errors')
                            productDiscountMsg.innerHTML = errProductDiscount
                        }
                        break;
                    default:
                        break;
                }
            }
        } else {
            console.log('se puede enviar');
        }
    })
}
