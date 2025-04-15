const CustomError = require('../errors/customError');

class UserService {
    constructor(UserModel) {
        this.User = UserModel;
    }

    async getUserByEmail(email) {
        const user = await this.User.findOne({ email }).select('-__v').lean();
        return { admin: user?.role === 'admin' };
    }

    async createUser(data) {
        const user = new this.User(data);
        return await user.save();
    }

    async updateUser(email, data) {
        const result = await this.User.updateOne(
            { email },
            { $set: data },
            { upsert: true, runValidators: true }
        );
        return result;
    }

    async makeAdmin(email) {
        const result = await this.User.updateOne(
            { email },
            { $set: { role: 'admin' } },
            { runValidators: true }
        );
        if (result.matchedCount === 0) {
            throw new CustomError('User not found', 404);
        }
        return result;
    }
}

module.exports = UserService;