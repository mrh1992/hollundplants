const url = "https://www.hollundflowerpower.one/wp-json/wp/v2/posts?_embed&per_page=12";
const postsContainer = document.querySelector(".posts-container");
const loadMore = document.querySelector(".load-more");
const breadcrumb = document.querySelector(".breadcrumbs");

async function getPosts() {
    try {
        const response = await fetch(url);

        const results = await response.json();

        breadcrumb.innerHTML = "";
        postsContainer.innerHTML = "";
        

        for (let i = 0; i < results.length; i++) {

            const convertDate = new Date (results[i].date).toLocaleString("en-GB", {day: "numeric", month: "long", year: "numeric",});

            breadcrumb.innerHTML = `<li><a href="index.html">Home</a></li>
                                    <li>Blog</li>`;

            postsContainer.innerHTML += `<div class="post-card">
                                            <a href="blogdetails.html?id=${results[i].id}">
                                                <img src=${results[i]._embedded['wp:featuredmedia']['0'].source_url} alt="${results[i].name}" class="blog-img">
                                            </a>
                                            <h3>${results[i].title.rendered}</h3>
                                            <p>By: ${results[i]._embedded.author[0].name}</p>
                                            <a href="blogdetails.html?id=${results[i].id}">
                                                <button class="read-button">Read Post</button>
                                            </a>
                                        </div>`;

        loadMore.style.display = "block";
        }

    } catch(error){
        console.log(error);
    }
}

getPosts();

// load more posts

let defaultPosts = 9;

loadMore.addEventListener("click", (e) => {

    const morePost = document.querySelectorAll(".post-card");

    for (let i = defaultPosts; i < defaultPosts + 3; i++) {
        if (defaultPosts < morePost.length) {
            morePost[i].style.display = "block";
        }
    }

    defaultPosts += 3;

    if (defaultPosts >= morePost.length) {
        loadMore.style.display = "none";
    }
})


