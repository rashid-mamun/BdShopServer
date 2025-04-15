class PublicService {
    constructor(BlogModel, OurTeamModel) {
        this.Blog = BlogModel;
        this.OurTeam = OurTeamModel;
    }

    async getAllTeamMembers() {
        return await this.OurTeam.find({}).select('-__v').lean();
    }

    async getAllBlogs() {
        return await this.Blog.find({}).select('-__v').lean();
    }

    async createBlog(data) {
        const blog = new this.Blog(data);
        return await blog.save();
    }

    async createMultipleBlogs(data) {
        return await this.Blog.insertMany(data);
    }
}

module.exports = PublicService;