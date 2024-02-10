class BlogPost {
    constructor(id, title, content, created_on) {
        this.id = id;
        this.title = this.sanitize(title);
        this.content = this.sanitize(content);
        this.createdOn = created_on; // Assuming there's a createdOn field
    }

    // Basic HTML sanitization function to prevent XSS
    sanitize(input) {
        return input.replace(/&/g, '&amp;')
                     .replace(/</g, '&lt;')
                     .replace(/>/g, '&gt;')
                     .replace(/"/g, '&quot;')
                     .replace(/'/g, '&#039;');
    }

    getSummaryHTML() {
        // Method to generate HTML for the post summary
        // Ensures content is sanitized before insertion
        return `
            <div class="blog-post">
                <h4>${this.title}</h4>
                <p>${this.content.substring(0, 200)}...</p>
                <a href="#" class="read-more" >Read More</a>
            </div>
        `;
    }

    getFullHTML() {
        // Method to generate HTML for the full post view
        // Ensures content is sanitized before insertion
        return `
            <h3>${this.title}</h3>
                <br>
                <br>
            <p>${this.content}</p>
            <small>Posted on: ${this.sanitize(this.createdOn)}</small>
        `;
    }
}

export default BlogPost;
