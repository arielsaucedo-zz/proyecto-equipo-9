const db = require('../database/models');

module.exports = async (req, res, next) => {
   if (req.session.userId) {
      db.ShoppingCarts.findOne({
         where: {
            user_id: req.session.userId,
            order_number: null,
         },
         include : [{
            model : db.Products,
            as: "products",     
            through : {
                attributes: ['id', 'quantity', 'subtotal', 'shopping_cart_id', 'product_id'],
            }
            }],
         force: true
      })
         .then(cart => {
            if (cart) {
               res.locals.cartQty = cart.products.length
               return next()
            } else {
               res.locals.cartQty = 0;
               return next()
            }
         })
   }  else {
      return next()
   }
}