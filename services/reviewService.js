class ReviewService {
    constructor(ReviewModel) {
        this.Review = ReviewModel;
    }

    async getAllReviews() {
        return await this.Review.find({}).select('-__v').lean();
    }

    async createReview(data) {
        const review = new this.Review(data);
        return await review.save();
    }

    async createMultipleReviews(data) {
        return await this.Review.insertMany(data);
    }
}

module.exports = ReviewService;