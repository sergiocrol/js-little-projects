const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

// Unsplash API
let count = 5;
const apiKey = '-0teQUVW-zAPrOHxuTgGL_UWnZkCfLGWMK8TL55Ij80';
let apiUrl = `https://api.unsplash.com/photos/random?count=${count}&client_id=${apiKey}`;

function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?count=${picCount}&client_id=${apiKey}`;
}

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links & photos, add to DOM
function displayPhotos() {
    totalImages = photosArray.length;
    imagesLoaded = 0;
    // Run function for each object in photosArray
    photosArray.forEach(photo => {
        // Create an anchor element to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> per photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event Listener, check when each one is finished loading
        img.addEventListener('load', imageLoaded);
        // Put img an a inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unslapsh API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if(isInitialLoad) {
            updateAPIURLWithNewCount(30);
            isInitialLoad = false;
        }
    }catch(error) {
        // catch error
    }
}

// Check to see if scrolling near bottom of page, Load More photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On load
getPhotos();