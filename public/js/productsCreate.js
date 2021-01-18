window.onload = function(){
    let productName = document.getElementById('product_name_id')
    let productNameMsg = document.getElementById('product_name_msg')

    let productDescription = document.getElementById('product_description_id')
    let productDescriptionMsg = document.getElementById('product_description_msg')

    let productImage = document.getElementById('product_image_id')
    let productImageMsg = document.getElementById('product_image_msg')

    let productCategory = document.getElementById('product_category_id')
    let productCategoryMsg = document.getElementById('product_category_msg')

    let productQuantity = document.getElementById('product_quantity_id')
    let productQuantityMsg = document.getElementById('product_quantity_msg')

    let productPrice = document.getElementById('product_price_id')
    let productPriceMsg = document.getElementById('product_price_msg')

    let productDiscount = document.getElementById('product_discount_id')
    let productDiscountMsg = document.getElementById('product_discount_msg')

    let form = document.getElementById('productCreateForm')

    const errProductName = 'La longitud del nombre debe ser como mínimo de 5 letras.'
    const errProductDescription = 'La longitud de la descripción debe ser como mínimo de 20 letras.'
    const errProductImage = 'Debe adjuntar una imagen del producto'
    const errProductCategory = 'La longitud de la categoría debe ser como mínimo de 1 letra.'
    const errProductQuantity = 'El valor de cantidad debe ser mayor o igual a 1 y menor o igual a 99.999.999.999.999.999.999'
    const errProductPrice = 'El valor del precio debe ser mayor o igual a 0,01 y menor o igual a 9.999.999.999,99'
    const errProductDiscount = 'El valor del descuento debe ser mayor o igual a 0 y menor o igual a 100'
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

    function setValidationResult(element, keyName, keyNameU, status, elementMsg, errMsg){
        if(status === 'OK'){
            element.classList.remove('border-nok')
            element.classList.add('border-ok')
            element.keyName = this.value
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


    productName.addEventListener('keyup', function(){
        if(validator.isLength(productName.value, { min : 5 } )){
            delete errors.name
            setValidationResult(productName, 'name', 'Name', 'OK', productNameMsg, '')
        }else{
            errors.name = errProductName
            setValidationResult(productName, 'name', 'Name', 'NOK', productNameMsg, errProductName)
        }
    })
    productName.addEventListener('blur', function(){
        if(validator.isLength(productName.value, { min : 5 } )){
            delete errors.name
            setValidationResult(productName, 'name', 'Name', 'OK', productNameMsg, '')
        }else{
            errors.name = errProductName
            setValidationResult(productName, 'name', 'Name', 'NOK', productNameMsg, errProductName)
        }
    })

    productDescription.addEventListener('keyup', function(){
        if(validator.isLength(productDescription.value, { min : 20 } )){
            delete errors.description
            setValidationResult(productDescription, 'description', 'Description', 'OK', productDescriptionMsg,'')
        } else {
            errors.description = errProductDescription
            setValidationResult(productDescription, 'description', 'Description', 'NOK', productDescriptionMsg, errProductDescription)
        }
    })

    productDescription.addEventListener('blur', function(){
        if(validator.isLength(productDescription.value, { min : 20 } )){
            delete errors.description
            setValidationResult(productDescription, 'description', 'Description', 'OK', productDescriptionMsg,'')
        } else {
            errors.description = errProductDescription
            setValidationResult(productDescription, 'description', 'Description', 'NOK', productDescriptionMsg, errProductDescription)
        }
    })

    productCategory.addEventListener('keyup', function(){
        if(validator.isLength(productCategory.value, { min : 1 } )){
            delete errors.category
            setValidationResult(productCategory, 'category', 'Category', 'OK', productCategoryMsg, '')
        } else {
            errors.category = errProductCategory
            setValidationResult(productCategory, 'category', 'Category', 'NOK', productCategoryMsg, errProductCategory)
        }
    })

    productCategory.addEventListener('blur', function(){
        if(validator.isLength(productCategory.value, { min : 1 } )){
            delete errors.category
            setValidationResult(productCategory, 'category', 'Category', 'OK', productCategoryMsg, '')
        } else {
            errors.category = errProductCategory
            setValidationResult(productCategory, 'category', 'Category', 'NOK', productCategoryMsg, errProductCategory)
        }
    })

    productQuantity.addEventListener('keyup', function(){
        if(validator.isInt(productQuantity.value, { min: 1, max: 99999999999999999999 } )){
            delete errors.quantity
            setValidationResult(productQuantity, 'quantity', 'Quantity', 'OK', productQuantityMsg, '')
        } else {
            errors.quantity = errProductQuantity
            setValidationResult(productQuantity, 'quantity', 'Quantity', 'NOK', productQuantityMsg, errProductQuantity)
        }
    })

    productQuantity.addEventListener('blur', function(){
        if(validator.isInt(productQuantity.value, { min: 1, max: 99999999999999999999 } )){
            delete errors.quantity
            setValidationResult(productQuantity, 'quantity', 'Quantity', 'OK', productQuantityMsg, '')
        } else {
            errors.quantity = errProductQuantity
            setValidationResult(productQuantity, 'quantity', 'Quantity', 'NOK', productQuantityMsg, errProductQuantity)
        }
    })

    productPrice.addEventListener('keyup', function(){
        if(validator.isFloat(productPrice.value, { min: 0.01, max: 9999999999.99 } )){
            delete errors.price
            setValidationResult(productPrice, 'price', 'Price', 'OK', productPriceMsg, '')
        } else {
            errors.price = errProductPrice
            setValidationResult(productPrice, 'price', 'Price', 'NOK', productPriceMsg, errProductPrice)
        }
    })

    productPrice.addEventListener('blur', function(){
        if(validator.isFloat(productPrice.value, { min: 0.01, max: 9999999999.99 } )){
            delete errors.price
            setValidationResult(productPrice, 'price', 'Price', 'OK', productPriceMsg, '')
        } else {
            errors.price = errProductPrice
            setValidationResult(productPrice, 'price', 'Price', 'NOK', productPriceMsg, errProductPrice)
        }
    })


    productDiscount.addEventListener('keyup', function(){
        if(validator.isInt(productDiscount.value, { min: 0, max: 100 } )){
            delete errors.discount
            setValidationResult(productDiscount, 'discount', 'Discount', 'OK', productDiscountMsg, '')
        } else {
            errors.discount = errProductDiscount
            setValidationResult(productDiscount, 'discount', 'Discount', 'NOK', productDiscountMsg, errProductDiscount)
        }
    })

    productDiscount.addEventListener('blur', function(){
        if(validator.isInt(productDiscount.value, { min: 0, max: 100 } )){
            delete errors.discount
            setValidationResult(productDiscount, 'discount', 'Discount', 'OK', productDiscountMsg, '')
        } else {
            errors.discount = errProductDiscount
            setValidationResult(productDiscount, 'discount', 'Discount', 'NOK', productDiscountMsg, errProductDiscount)
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
            setValidationResult(productImage, 'image', 'Image', 'OK', productImageMsg, '')
        } else {
            errors.image = errProductImage
            setValidationResult(productImage, 'image', 'Image', 'NOK', productImageMsg, errProductImage)
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
                        productName.classList.remove('border-ok')
                        productName.classList.add('border-nok')
                        if(productNameMsg.classList){
                            productNameMsg.classList.add('span_errors')
                            productNameMsg.innerHTML = errProductName
                        }
                        break;
                    case 'description':
                        productDescription.classList.remove('border-ok')
                        productDescription.classList.add('border-nok')
                        if(productDescriptionMsg.classList){
                            productDescriptionMsg.classList.add('span_errors')
                            productDescriptionMsg.innerHTML = errProductDescription
                        }
                        break;
                    case 'image':
                        productImage.classList.remove('border-ok')
                        productImage.classList.add('border-nok')
                        if(productImageMsg.classList){
                            productImageMsg.classList.add('span_errors')
                            productImageMsg.innerHTML = errProductImage
                        }
                        break;
                    case 'category':
                        productCategory.classList.remove('border-ok')
                        productCategory.classList.add('border-nok')
                        if(productCategoryMsg.classList){
                            productCategoryMsg.classList.add('span_errors')
                            productCategoryMsg.innerHTML = errProductCategory
                        }
                        break;
                    case 'quantity':
                        productQuantity.classList.remove('border-ok')
                        productQuantity.classList.add('border-nok')
                        if(productQuantityMsg.classList){
                            productQuantityMsg.classList.add('span_errors')
                            productQuantityMsg.innerHTML = errProductQuantity
                        }
                        break;
                    case 'price':
                        productPrice.classList.remove('border-ok')
                        productPrice.classList.add('border-nok')
                        if(productPriceMsg.classList){
                            productPriceMsg.classList.add('span_errors')
                            productPriceMsg.innerHTML = errProductPrice
                        }
                        break;
                    case 'discount':
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

