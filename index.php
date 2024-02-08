<?php
include "blog.php";
?>
<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv='cache-control' content='no-cache'>
    <meta http-equiv='expires' content='0'>
    <meta http-equiv='pragma' content='no-cache'>
    <link rel="stylesheet" href="css/style.css">

    <title>Adam's Portfolio</title>
</head>

<body>
    <header>
        <h2 class="logo">Adam's Portfolio</h2>
    </header>

    <!-- Inner Container -->
    <section id="slider" class="showcase">

        <!-- Home Section -->
        <div id="Home" class="text">
            <h3>Welcome</h3>
            <h4>To My Portfolio Website</h4>
            <p>
                Hi, I'm Adam, a junior software developer. I'll be using this website to work on development with HTML, CSS, JavaScript, and PHP. My aim is to keep it lightweight and use it to play with the basic tools. This website will be responsive and capable of offering an optimized view on all devices. This is also a space for me to blog about my learning journey, which will allow me to learn and play with PHP and a little bit of SQL. Lastly, I plan to showcase past projects as well as those I have planned for the future.<br><br>

                I am enthusiastic to earn while I learn and<br>
                am currently open to employment opportunities.
            </p>
            <a href="ADAM_BOTENS_RESUME.pdf" download="Adam_Resume">Download Resume</a>
            <ul class="social">
                <li><a href="https://github.com/adamB6" target="_blank"><img src="images/github.png" alt="Github"></a></li>
                <li><a href="https://www.linkedin.com/in/adam-botens/" target="_blank"><img src="images/linkedin.png" alt="Github"></a></li>
            </ul>

        </div>

        <!-- About Section -->
        <div id="About" class="text">
            <h3>About Me</h3>
            <h4>Always Under Construction</h4>
            <p>
                After 12 years of dedicated service, I concluded my military career and began pursuing my life long dream of working with computers and building cool things as a job occupation. In the Army, I specialized in artillery, a role markedly different from my current pursuit in the tech industry. My interest in technology has deep roots, sparked in childhood by gaming and early experiments with computers and coding. My interest in these subjects has led to a healthy/unhealthy relationship with optimization and user experience.<br><br>

                At home, I am blessed with a wonderful family. My wife and I are proud parents of two incredible daughters. These days, my free time is less about gaming and more about spending time with my family. While I am naturally reserved in my personal life, I thrive on collaboration in professional settings, finding great satisfaction in achieving milestones as a team.<br><br>

                I try to learn new things everyday, and have a legimate desire to program cool things. I tend to enjoying solving problems, and find great satisfaction in watching a project evolve over time through effort and planning. As I become more experienced as a professional developer, I hope to find ways to leverage Machine Learning as well. <br><br>
            </p>
        </div>

        <!-- Blog Section -->
        <div id="Blog" class="text">
            <h3>Blog</h3>
            <h4>In case you're bored...</h4>
            <?php foreach ($blogPosts as $blogPost) : ?>
                <div class="blog-post">
                    <h4><?php echo htmlspecialchars($blogPost->getTitle()); ?></h4>
                    <p><?php echo htmlspecialchars(substr($blogPost->getContent(), 0, 200)); ?>...</p>
                    <!-- Assuming you have a way to link to the full blog post, for example with an id -->
                    <a href="#" class="read-more" onclick="loadPost(<?php echo $blogPost->getId(); ?>)">Read More</a>
                </div>
            <?php endforeach; ?>
        </div>

        <div id="PostView" class="text">
        </div>
        
    </section>
    <footer class="navbar">
        <ul>
            <li><a href="#" class="tablinks" data-tab="Home" onclick="openTab(event, 'Home')">Home</a></li>
            <li><a href="#" class="tablinks" data-tab="About" onclick="openTab(event, 'About')">About</a></li>
            <li><a href="#" class="tablinks" data-tab="Blog" onclick="openTab(event, 'Blog')">Blog</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </footer>
    <script src="main.js"></script>
</body>

</html>