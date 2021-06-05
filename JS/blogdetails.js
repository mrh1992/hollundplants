const detailContainer = document.querySelector(".blogdetail-container");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const url ="https://www.hollundflowerpower.one/wp-json/wp/v2/posts/" + id + "?_embed";

async function fetchBlogPost() {

    try {
        const response = await fetch(url);
        const details = await response.json();


        const convertDate = new Date (details.date).toLocaleString("en-GB", {day: "numeric", month: "long", year: "numeric",});

        detailContainer.innerHTML += `<div class="content-container">
                                        <h1>${details.title.rendered}</h1>
                                        <div class="author-info">
                                            <p class="posted-date">Posted: ${convertDate}<p>
                                            <p>Written by: ${details._embedded.author[0].name}</p>
                                        </div>
                                        <div class="blog-content">${details.content.rendered}
                                            <img src=${details._embedded['wp:featuredmedia']['0'].source_url} alt="${details.name}" class="blog-img">
                                            <div class="modal-container">
                                                <span class="close">&times;</span>
                                                <img class="modal-image">
                                            </div>
                                        </div>
                                    </div>`;
        //Modal Image

        const modal = document.querySelector(".modal-container");
        const img = document.querySelector(".blog-img");
        const modalImage = document.querySelector(".modal-image");

        img.onclick = function() {
            modal.style.display = "block";
            modalImage.src = this.src;
        };

        modal.onclick = function() {
            modal.style.display = "none";
        }

                        
    } 
    catch(error) {
        console.log();
    }
}

fetchBlogPost();

