const CustomError = require('../errors/customError');

class OrderService {
    constructor(OrderModel) {
        this.Order = OrderModel;
    }

    async createOrder(data) {
        const order = new this.Order(data);
        return await order.save();
    }

    async getAllOrders() {
        return await this.Order.find({}).select('-__v').lean();
    }

    async getOrdersByEmail(email) {
        return await this.Order.find({ email }).select('-__v').lean();
    }

    async updateOrderStatus(id) {
        const order = await this.Order.findByIdAndUpdate(
            id,
            { status: 'Shipped' },
            { new: true, runValidators: true }
        );
        if (!order) {
            throw new CustomError('Order not found', 404);
        }
        return order;
    }

    async deleteOrder(id) {
        const result = await this.Order.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            throw new CustomError('Order not found', 404);
        }
        return result;
    }
}

module.exports = OrderService;