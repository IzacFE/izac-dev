(function () {
  // Fetch data from Medium API
  fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@izacaqsha"
  )
    .then((response) => response.json())
    .then((data) => {
      // Initialize HTML strings
      let introHtml = ""; // HTML for intro section
      let blogsHTML = ""; // HTML for blog posts

      // Construct HTML for introduction section
      introHtml = `
        <div class="left">
          <h2>I'm on Medium</h2>
          <p>${data.feed.description}</p>
          <a href="${data.feed.link}" target="_blank">Learn more....</a>
        </div>
        <div class="right">
          <div class="intro-img">
            <img src="${data.feed.image}" alt="${data.feed.title}" />
          </div>
        </div>
      `;

      // Loop through fetched blog data to construct HTML for each blog post
      data.items.forEach((blog) => {
        const blogHTML = `
          <div class="blog">
            <div class="blog-text">
              <a href="${blog.link}" target="_blank">
                <h4>${blog.title}</h4>
                <p>${blog.pubDate}</p>
              </a>
            </div>
          </div>
        `;
        // Append HTML for current blog post to blogsHTML string
        blogsHTML += blogHTML;
      });

      // Create DOMParser instance
      const parser = new DOMParser();

      // Parse HTML strings into DocumentFragments
      const introFragment = parser.parseFromString(introHtml, "text/html");
      const blogsFragment = parser.parseFromString(blogsHTML, "text/html");

      // Get references to the intro and blogs container elements
      const introContainer = document.getElementById("introBlogs");
      const blogsContainer = document.getElementById("showBlogsResult");

      // Append parsed HTML fragments to their respective containers
      introContainer.appendChild(introFragment.body);
      blogsContainer.appendChild(blogsFragment.body);
    })
    .catch((error) => {
      // Handle errors if data fetching fails
      console.error("Error fetching data:", error);
    });
})();
