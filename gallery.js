// Gallery JavaScript - Image Loading and Modal Functionality

// Gallery configuration
const galleryConfig = {
  awards: {
    folder: 'Gallery/Awards/',
    container: 'awards-gallery',
    color: '#ffbe0b'
  },
  events: {
    folder: 'Gallery/Events/',
    container: 'events-gallery',
    color: '#3a86ff'
  },
  hackathons: {
    folder: 'Gallery/Hackathons/',
    container: 'hackathons-gallery',
    color: '#ff006e'
  },
  talks: {
    folder: 'Gallery/Talks/',
    container: 'talks-gallery',
    color: '#8338ec'
  }
};

// Store all loaded images
let allImages = {
  awards: [],
  events: [],
  hackathons: [],
  talks: []
};

let currentCategory = '';
let currentImageIndex = 0;

// Image file extensions to look for
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

// Function to extract caption from filename
function extractCaption(filename) {
  // Remove extension
  let caption = filename.replace(/\.[^/.]+$/, '');
  
  // Replace underscores and hyphens with spaces
  caption = caption.replace(/[_-]/g, ' ');
  
  // Capitalize first letter of each word
  caption = caption.replace(/\b\w/g, char => char.toUpperCase());
  
  return caption;
}

// Function to create image element
function createImageElement(imagePath, imageData, category) {
  const bentoItem = document.createElement('div');
  bentoItem.className = 'bento-item glass-card';
  
  const img = document.createElement('img');
  img.src = imagePath;
  img.alt = imageData.caption || imageData.description || extractCaption(imageData.filename);
  img.loading = 'lazy';
  
  const caption = document.createElement('div');
  caption.className = 'bento-caption';
  caption.textContent = imageData.caption || extractCaption(imageData.filename);
  
  bentoItem.appendChild(img);
  bentoItem.appendChild(caption);
  
  // Add click event to open modal
  bentoItem.addEventListener('click', () => {
    openModal(imagePath, imageData.caption || extractCaption(imageData.filename), category);
  });
  
  return bentoItem;
}

// Function to load images from a directory
async function loadGalleryImages() {
  // Since we can't actually scan directories in the browser,
  // we'll provide a way for images to be manually registered
  // or loaded via a JSON manifest file
  
  // For now, let's try to load a manifest.json file for each category
  for (const [category, config] of Object.entries(galleryConfig)) {
    try {
      const response = await fetch(`${config.folder}manifest.json`);
      if (response.ok) {
        const data = await response.json();
        allImages[category] = data.images || [];
        displayImages(category, config);
      } else {
        // If no manifest, show placeholder
        console.log(`No manifest found for ${category}`);
      }
    } catch (error) {
      console.log(`Could not load images for ${category}:`, error);
      // Placeholder is already in HTML
    }
  }
}

// Function to display images in a gallery section
function displayImages(category, config) {
  const container = document.getElementById(config.container);
  if (!container || allImages[category].length === 0) return;
  
  // Remove placeholder
  const placeholder = container.querySelector('.bento-placeholder');
  if (placeholder) {
    placeholder.remove();
  }
  
  // Add images
  allImages[category].forEach((imageData) => {
    // Handle both string filenames and object format
    const filename = typeof imageData === 'string' ? imageData : imageData.filename;
    const imagePath = `${config.folder}${filename}`;
    const imageElement = createImageElement(imagePath, typeof imageData === 'string' ? {filename: imageData} : imageData, category);
    container.appendChild(imageElement);
  });
}

// Modal functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeBtn = document.querySelector('.modal-close');
const prevBtn = document.getElementById('modalPrev');
const nextBtn = document.getElementById('modalNext');

function openModal(imageSrc, caption, category) {
  modal.classList.add('active');
  modalImg.src = imageSrc;
  modalCaption.textContent = caption;
  currentCategory = category;
  
  // Find current image index
  const filename = imageSrc.split('/').pop();
  currentImageIndex = allImages[category].findIndex(img => {
    const imgFilename = typeof img === 'string' ? img : img.filename;
    return imgFilename === filename;
  });
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function showNextImage() {
  if (currentCategory && allImages[currentCategory].length > 0) {
    currentImageIndex = (currentImageIndex + 1) % allImages[currentCategory].length;
    const imageData = allImages[currentCategory][currentImageIndex];
    const filename = typeof imageData === 'string' ? imageData : imageData.filename;
    const caption = typeof imageData === 'string' ? extractCaption(imageData) : (imageData.caption || extractCaption(imageData.filename));
    const imagePath = `${galleryConfig[currentCategory].folder}${filename}`;
    modalImg.src = imagePath;
    modalCaption.textContent = caption;
  }
}

function showPrevImage() {
  if (currentCategory && allImages[currentCategory].length > 0) {
    currentImageIndex = (currentImageIndex - 1 + allImages[currentCategory].length) % allImages[currentCategory].length;
    const imageData = allImages[currentCategory][currentImageIndex];
    const filename = typeof imageData === 'string' ? imageData : imageData.filename;
    const caption = typeof imageData === 'string' ? extractCaption(imageData) : (imageData.caption || extractCaption(imageData.filename));
    const imagePath = `${galleryConfig[currentCategory].folder}${filename}`;
    modalImg.src = imagePath;
    modalCaption.textContent = caption;
  }
}

// Event listeners
closeBtn.addEventListener('click', closeModal);
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('active')) return;
  
  switch(e.key) {
    case 'Escape':
      closeModal();
      break;
    case 'ArrowLeft':
      showPrevImage();
      break;
    case 'ArrowRight':
      showNextImage();
      break;
  }
});

// Alternative: Manual image registration function
// Call this function from the console to manually add images
window.registerGalleryImages = function(category, images) {
  if (galleryConfig[category] && Array.isArray(images)) {
    allImages[category] = images;
    displayImages(category, galleryConfig[category]);
  }
};

// Helper function to scan for images (for testing purposes)
// This creates a simple interface to add images
window.addGalleryImage = function(category, filename) {
  if (galleryConfig[category]) {
    if (!allImages[category]) {
      allImages[category] = [];
    }
    allImages[category].push(filename);
    
    const config = galleryConfig[category];
    const container = document.getElementById(config.container);
    
    if (container) {
      // Remove placeholder if it exists
      const placeholder = container.querySelector('.bento-placeholder');
      if (placeholder && allImages[category].length === 1) {
        placeholder.remove();
      }
      
      const imagePath = `${config.folder}${filename}`;
      const imageElement = createImageElement(imagePath, filename, category);
      container.appendChild(imageElement);
    }
  }
};

// Load images on page load
document.addEventListener('DOMContentLoaded', () => {
  loadGalleryImages();
  
  // Display helpful message in console
  console.log('%cGallery System Ready!', 'color: #3a86ff; font-size: 16px; font-weight: bold;');
  console.log('%cTo add images manually, use:', 'color: #8338ec; font-size: 14px;');
  console.log('%caddGalleryImage("category", "filename.jpg")', 'color: #ff006e; font-size: 12px; font-family: monospace;');
  console.log('%cCategories: awards, events, hackathons, talks', 'color: #ffbe0b; font-size: 12px;');
  console.log('%c\nOr bulk register:', 'color: #8338ec; font-size: 14px;');
  console.log('%cregisterGalleryImages("awards", ["image1.jpg", "image2.jpg"])', 'color: #ff006e; font-size: 12px; font-family: monospace;');
  console.log('%c\nTo use manifest files, create Gallery/[Category]/manifest.json with:', 'color: #8338ec; font-size: 14px;');
  console.log('%c{"images": ["image1.jpg", "image2.jpg"]}', 'color: #ff006e; font-size: 12px; font-family: monospace;');
});

// Functions are available globally via window object
