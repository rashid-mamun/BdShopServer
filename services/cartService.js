const CustomError = require('../errors/customError');

class CartService {
    constructor(CartModel) {
        this.Cart = CartModel;
    }

    async createCart(data) {
        const cart = new this.Cart(data);
        return await cart.save();
    }

    async getCartsByEmail(email) {
        return await this.Cart.find({ email }).select('-__v').lean();
    }

    async deleteCart(itemId) {
        const result = await this.Cart.deleteOne({ itemId });
        if (result.deletedCount === 0) {
            throw new CustomError('Cart item not found', 404);
        }
        return result;
    }
}

module.exports = CartService;