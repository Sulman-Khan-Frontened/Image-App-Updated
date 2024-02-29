var NavBtn = document.querySelector(".toggle-nav");
var Navbar = document.querySelector(".nav");
NavBtn.addEventListener("click", () => {
    Navbar.classList.toggle("on");
    if (Navbar.classList.contains("on")) {
        NavBtn.querySelector("i").classList.remove('fa-bars');
        NavBtn.querySelector("i").classList.add('fa-times');
    } else {
        NavBtn.querySelector("i").classList.add('fa-bars');
        NavBtn.querySelector("i").classList.remove('fa-times');
    }
});


const slidesContainer = document.querySelector(".slides");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.left = "0";
        } else if (i < index) {
            slide.style.left = "-100%";
        } else {
            slide.style.left = "100%";
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

document.querySelector(".left-btn").addEventListener("click", prevSlide);
document.querySelector(".right-btn").addEventListener("click", nextSlide);

showSlide(currentSlide);




const li = document.querySelectorAll(".category-container > li");
li.forEach(e => {
    e.addEventListener("click", link => {
        li.forEach(e => e.classList.remove("active-category"));
        link.currentTarget.classList.add("active-category");
        const LinkTXT = link.currentTarget.textContent.toLowerCase();
        const resultContainer = document.querySelector('.result-container');
        resultContainer.innerHTML = '';
        term = LinkTXT;
        LoadImages(term);

    })
})

var term = 'random';
var loader = document.querySelector(".loader");
async function LoadImages(term) {
    const Url = `https://api.unsplash.com/photos/random?client_id=BqoXmsdyopplCo2ynDt5PqUO0-o2XVJZ2CWdELOilx0&query=${term}&count=6
    `;
    loader.classList.add('on');
    const result = await fetch(Url).then(res => res.json()).then(result => result);
    FetchImages(result);
}
LoadImages(term);

function FetchImages(images) {
    const resultContainer = document.querySelector('.result-container');

    images.forEach((image, index) => {
        loader.classList.remove('on');
        resultContainer.innerHTML += `  <article class="card parent-${index}" data-user-id='${image.user.id}'>
                    <label class="options" for='check-${index}'>
                        <label for="check"><i class="fa-solid fa-ellipsis-v"></i>
                        </label>
                        <input type="checkbox" class="check" name="" id="check-${index}">
                        <ul class="list">
                            <li><a href="${image.user.links.html}">Go To Profile</a></li>
                            <li onclick="addToFav(${index})">Add To Favorite List</li>
                            <li class='remove-image' data-id='parent-${index}' onclick='remove(${parent - index})'>Remove Image</li>
                        </ul>

                    </label>
                    <div class="image-container">
                         <img src="${image.urls.raw}" alt=""> 
                    </div>
                    <div class="info">
                        <div class="txt-container">
                            <div class="txt">
                                <p>Creater Name: </p>
                                <p>${image.user.username}</p>
                            </div>
                            <div class="txt">
                                <p>Website:</p>
                                <p>Unsplassh</p>
                            </div>
                        </div>
                        <div class="button-container">
                            <button>
                                <a target="_blank" href='${image.links.download}'><i class="fa-solid fa-download"></i></a>
                            </button>
                        </div>
                    </div>
                </article>
                
                <button class='loadmore' onclick='loadmore()'>Load More</button>
                `
    })
}


function remove(id) {
    var parent = document.querySelector(`.${id}`);
    parent.remove()
};

async function fetchRandomImage() {
    try {
        // const response = await fetch('https://source.unsplash.com/random');
        const imageUrl = response.url;
        return imageUrl;
    } catch (error) {
        console.error('Error fetching random image:', error);
    }
}

async function updateSlideImages() {
    var slide = document.querySelectorAll('.slide');
    slide.forEach(async (e, index) => {
        const randomImageUrl = await fetchRandomImage();
        e.setAttribute('src', randomImageUrl);
    });
}

updateSlideImages();





function search() {
    var searchVal = document.getElementById("text").value.toLowerCase();
    term = searchVal;
    const resultContainer = document.querySelector('.result-container');
    resultContainer.innerHTML = '';
    loader.classList.add('on')
    LoadImages(term);
}

function loadmore() {
    loader.classList.add('on')

    term = term;
    LoadImages(term);
}


// function addToFav(select) {
//     var selecter = document.querySelector(`.parent-${select}`);
//     var id = selecter.dataset.userId;
//     const cateforyList = document.querySelector('.category-container');
//     cateforyList.innerHTML += `
//         <li><a href=https://api.unsplash.com/users/${id}/photos>${id}</a></li>
//     `

// }
