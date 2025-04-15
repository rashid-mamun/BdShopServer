const CustomError = require('../errors/customError');

class ServiceService {
    constructor(ServiceModel) {
        this.Service = ServiceModel;
    }

    async getAllServices() {
        return await this.Service.find({}).select('-__v').lean();
    }

    async getServiceById(id) {
        const service = await this.Service.findById(id).select('-__v').lean();
        if (!service) {
            throw new CustomError('Service not found', 404);
        }
        return service;
    }

    async createService(data) {
        const service = new this.Service(data);
        return await service.save();
    }

    async createMultipleServices(data) {
        return await this.Service.insertMany(data);
    }

    async deleteService(id) {
        const result = await this.Service.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            throw new CustomError('Service not found', 404);
        }
        return result;
    }
}

module.exports = ServiceService;