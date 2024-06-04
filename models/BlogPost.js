class BlogPost {
    constructor(id, title, content, created_on) {
        this.id = id;
        this.title = this.sanitize(title);
        this.content = this.sanitize(content);
        console.log(`Raw date string: ${created_on}`);
        this.createdOn = new Date(created_on); // Use 'new' keyword
        console.log(`Parsed date object: ${this.createdOn}`);
    }

    // Basic HTML sanitization function to prevent XSS
    sanitize(input) {
        return input.replace(/&/g, '&amp;')
                     .replace(/</g, '&lt;')
                     .replace(/>/g, '&gt;')
                     .replace(/"/g, '&quot;')
                     .replace(/'/g, '&#039;');
    }

    // Format date to a readable string
    formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    getSummaryHTML() {
        // Method to generate HTML for the post summary
        // Ensures content is sanitized before insertion
        return `
            <div class="blog-post">
                <small class="blog-date">Posted on: ${this.sanitize(this.formatDate(this.createdOn))}</small>
                <h4>${this.title}</h4>
                <p>${this.content.substring(0, 200)}...</p>
                <a href="#" class="read-more">Read More</a>
            </div>
        `;
    }

    getFullHTML() {
        // Method to generate HTML for the full post view
        // Ensures content is sanitized before insertion
        return `
            <h3>${this.title}</h3>
            <p>${this.content}</p>
            <small>Posted on: ${this.sanitize(this.formatDate(this.createdOn))}</small>
        `;
    }
}

export default BlogPost;
