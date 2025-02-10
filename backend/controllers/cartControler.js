const Cart = require('../models/cartModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorhandler');

// add products to cart
exports.addProduct = catchAsyncErrors(async (req, res, next) => {
    const {
        userId,
        productId,
        quantity
    } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart)
        cart = new Cart({ userId, products: [] });

    const existingProduct = cart.products.find(product => product.productId.toString() === productId);
    if (existingProduct)
        existingProduct.quantity += quantity;
    else
        cart.products.push({ productId, quantity });
    await cart.save();
    res.status(200).json({
        success: true,
        message: 'Product added to the cart successfully',
        cart
    });
});

exports.clearCart = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });
    if (cart) {
        cart.products = [];
        await cart.save();
    }
    res.status(200).json({
        success: true,
        message: 'Cart cleared successfully',
    });
});


// remove product
exports.removeProduct = catchAsyncErrors(async (req, res, next) => {
    userId = req.user._id;
    const {
        productId
    } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        return next(new ErrorHandler("Cart not find for the User", 404));
    }
    const productIndex = cart.products.findIndex(product => product.productId.toString() === productId);
    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Product not found in the cart',
        });
    }
    cart.products.splice(productIndex, 1);
    await cart.save();
    res.status(200).json({
        success: true,
        message: 'Product removed from the cart successfully',
    });
});
// get getCartProducts
exports.getCartProducts = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id;
    try {
        const cart = await Cart.findOne({ userId }).populate('products.productId');
        if (!cart) {
            return next(new ErrorHandler('Cart not found for the specified user', 404));
        }
        let totalPrice = 0;
        const cartProducts = cart.products.map(cartProduct => {
            const { productId, quantity } = cartProduct;
            const { _id, name, price, images } = productId;
            totalPrice += price;
            return {
                productId: _id,
                name,
                price,
                image: images[0].url,
                quantity,
            };
        });

        res.status(200).json({
            success: true,
            cart: cartProducts,
            totalPrice,
        });
    } catch (error) {
        console.error('Error retrieving cart products:', error);
        return next(new ErrorHandler('Internal Server Error', 500));
    }
});