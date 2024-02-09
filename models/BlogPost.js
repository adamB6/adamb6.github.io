class BlogPost {
    constructor(id, title, content, created_on) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdOn = created_on; // Assuming there's a createdOn field
    }

    getSummaryHTML() {
        // Method to generate HTML for the post summary
        return `
            <div class="blog-post">
                <h4>${this.title}</h4>
                <p>${this.content.substring(0, 200)}...</p>
                <a href="#" class="read-more">Read More</a>
            </div>
        `;
    }

    getFullHTML() {
        // Method to generate HTML for the full post view
        return `
            <h3>${this.title}</h3>
            <p>${this.content}</p>
            <small>Posted on: ${this.createdOn}</small>
        `;
    }
}

export default BlogPost;