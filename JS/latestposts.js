const url = "https://hollundflowerpower.one/wp-json/wp/v2/posts?_embed";
const latestContainer = document.querySelector(".latest-container");

async function getLatestPosts() {
    try {
        const response = await fetch(url);

        const results = await response.json();

        for(let i = 0; i < results.length; i++) {

            if (i === 4) {
                break;
            }

            latestContainer.innerHTML += `<div class="latest-card">
                                             <a href="blogdetails.html?id=${results[i].id}">
                                                <img src=${results[i]._embedded['wp:featuredmedia']['0'].source_url} alt="${results[i].name}" class="blog-img">
                                            </a>
                                            <h3>${results[i].title.rendered}</h3>
                                            <p>By: ${results[i]._embedded.author[0].name}</p>
                                            <a href="blogdetails.html?id=${results[i].id}">
                                                <button class="read-button">Read Post</button>
                                            </a>
                                        </div>`;
        }

    } catch (error) {
        console.log(error);
    }
}

getLatestPosts();