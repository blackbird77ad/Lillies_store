document.addEventListener('DOMContentLoaded', function () {
	console.log('DOM loaded');
	// ... rest of your code
});

$(document).ready(function(){
    // Initialize Slick first
    $('.customer_category_slide').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 1500,
        arrows: true,
        prevArrow: $('.custom-prev-arrow'),
        nextArrow: $('.custom-next-arrow'),
        dots: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 2
            }
        }]
    });
    
    // Refresh AOS after Slick is initialized
    AOS.refresh();
});

// Move AOS initialization to after DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 600,
        once: true,
        offset: 100,
    });
});


$(document).ready(function(){
// Initialize slick slider for reviews
$('.rating_slider').slick({
    dots: false,
    infinite: true,
    speed: 500,
    fade: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
});

// Handle next review button click
$('.next-review').click(function(){
    $('.rating_slider').slick('slickNext');
});
});


// Mobile Menu Toggle
document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
document.querySelector('.mobile-nav').classList.toggle('active');
});

// Mobile Search Toggle
document.querySelector('.mobile-search').addEventListener('click', function() {
document.querySelector('.mobile-search-overlay').classList.add('active');
});

document.querySelector('.close-search').addEventListener('click', function() {
document.querySelector('.mobile-search-overlay').classList.remove('active');
});

// Mobile Dropdown Toggle
document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
dropdown.addEventListener('click', function() {
    this.classList.toggle('active');
});
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
if (!event.target.closest('.mobile-nav') && !event.target.closest('.mobile-menu-toggle')) {
    document.querySelector('.mobile-nav').classList.remove('active');
}
});



// progress bar animation 

// Cart functionality

// Create a cart object to manage shopping cart functionality
// Cart functionality
const cart = {
    items: [],

    // Initialize cart from localStorage
    init() {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
            this.updateCartUI();
            this.updateCartCount();
        }
    },

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    },

    addItem(product) {
        // Check if product already exists in cart
        const existingItem = this.items.find(item => 
            item.title === product.title && item.color === product.color
        );
        
        if (existingItem) {
            existingItem.quantity += 1;
            this.updateItemQuantity(existingItem);
        } else {
            product.quantity = 1;
            this.items.push(product);
            this.addItemToUI(product);
        }
        
        this.updateCartCount();
        this.saveCart();
        this.showToast();
    },

    addItemToUI(product) {
        const cartBody = document.querySelector('.offcanvas-body');
        if (!cartBody) return;
        
        const itemHTML = `
            <div class="cart-item" data-product-id="${product.title}">
                <img src="${product.image}" alt="${product.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="d-flex justify-content-between align-items-center">
                        <h6 class="item-title">${product.title}</h6>
                        <div class="item-price">${product.price}</div>
                    </div>
                    <p class="item-color">Color: <span>${product.color}</span></p>
                    <div class="d-flex gap-2">
                        <p class="item-subscription">Subscription: </p>
                        <span>
                            <div class="select-wrapper new_select_wrapper">
                                <div class="custom-select">
                                    <div class="select-selected">
                                        <span class="selected-text">None</span>
                                        <img class="dropdown-icon" src="./images/down.svg" alt="dropdown">
                                    </div>
                                    <div class="select-items select-hide">
                                    <div data-value="none">None</div>
                                    <div data-value="weekly">Weekly</div>
                                    <div data-value="monthly">Monthly</div>
                                   </div>
                                </div>
                            </div>
                        </span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="quantity-selector">
                            <button class="quantity-btn minus"><i class="fas fa-minus"></i></button>
                            <input type="text" class="quantity-input" value="${product.quantity}" readonly>
                            <button class="quantity-btn plus"><i class="fas fa-plus"></i></button>
                            <a href="#" class="remove-link">Remove</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        cartBody.insertAdjacentHTML('beforeend', itemHTML);
        this.initializeCartItemControls(cartBody.lastElementChild);
    },

    updateCartUI() {
        const cartBody = document.querySelector('.offcanvas-body');
        if (!cartBody) return;

        // Clear existing items
        cartBody.innerHTML = '';

        // Add all items from cart
        this.items.forEach(item => this.addItemToUI(item));
    },

    removeItem(productId) {
        this.items = this.items.filter(item => item.title !== productId);
        this.saveCart();
        this.updateCartUI();
        this.updateCartCount();
    },

    updateItemQuantityInArray(productId, quantity) {
        const item = this.items.find(item => item.title === productId);
        if (item) {
            item.quantity = quantity;
            this.saveCart();
            this.updateCartCount();
        }
    },

    showToast() {
        const toastElement = document.getElementById('addToCartToast');
        if (toastElement) {
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
        }
    },

    initializeCartItemControls(cartItem) {
        const minusBtn = cartItem.querySelector('.minus');
        const plusBtn = cartItem.querySelector('.plus');
        const input = cartItem.querySelector('.quantity-input');
        const removeLink = cartItem.querySelector('.remove-link');
        const productId = cartItem.dataset.productId;
        
        minusBtn?.addEventListener('click', () => {
            let quantity = parseInt(input.value);
            if (quantity > 1) {
                quantity--;
                input.value = quantity;
                this.updateItemQuantityInArray(productId, quantity);
            }
        });
        
        plusBtn?.addEventListener('click', () => {
            let quantity = parseInt(input.value);
            quantity++;
            input.value = quantity;
            this.updateItemQuantityInArray(productId, quantity);
        });
        
        removeLink?.addEventListener('click', (e) => {
            e.preventDefault();
            this.removeItem(productId);
        });
    },

    updateCartCount() {
        const badges = document.querySelectorAll('.badge_number');
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        badges.forEach(badge => {
            badge.textContent = totalItems;
        });
    }
};

// Initialize cart functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart
    cart.init();

    // Add click handlers for all "Add to Cart" buttons
    document.querySelectorAll('.cart-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the product card element
            const productCard = this.closest('.product-card');
            if (!productCard) return;
            
            // Get product details
            const product = {
                title: productCard.querySelector('.product-title').textContent,
                price: productCard.querySelector('.product-price').textContent,
                image: productCard.querySelector('.product-image img').src,
                color: productCard.querySelector('.color-options .color-option').style.backgroundColor || 'Default'
            };
            
            // Add the product to cart
            cart.addItem(product);
        });
    });

    // Handle single product page "Add to Cart" button
    const singleProductAddToCartBtn = document.getElementById('addToCartBtn');
    if (singleProductAddToCartBtn) {
        singleProductAddToCartBtn.addEventListener('click', function() {
            const product = {
                title: document.querySelector('.singal_product_details h1').textContent,
                price: document.querySelector('.pricing .h3').textContent,
                image: document.querySelector('.main_product_image img').src,
                color: document.querySelector('.color-circle.active')?.style.backgroundColor || 'Default',
                size: document.querySelector('.button-circle.active')?.textContent || 'Default'
            };
            
            cart.addItem(product);
        });
    }
});




// Initialize cart functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
// Add click handlers for all "Add to Cart" buttons
document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the product card element
        const productCard = this.closest('.product-card');
        if (!productCard) return;
        
        // Get product details
        const product = {
            title: productCard.querySelector('.product-title').textContent,
            price: productCard.querySelector('.product-price').textContent,
            image: productCard.querySelector('.product-image img').src,
            color: productCard.querySelector('.color-options .color-option').style.backgroundColor || 'Default'
        };
        
        // Add the product to cart
        cart.addItem(product);
        
        // Show toast notification
        const toastElement = document.getElementById('addToCartToast');
        if (toastElement) {
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
        }
    });
});
});


// Create a broadcast channel for cross-tab communication
const announcementChannel = new BroadcastChannel('announcement_channel');

// Function to close announcement
function closeAnnouncement() {
// Hide on current page
hideAnnouncement();
// Send message to other tabs
announcementChannel.postMessage('close');
}

// Function to hide announcement
function hideAnnouncement() {
const announcementBar = document.getElementById('announcement_bar');
if (announcementBar) {
    announcementBar.classList.add('hidden');
}
}

// Listen for messages from other tabs
announcementChannel.onmessage = (event) => {
if (event.data === 'close') {
    hideAnnouncement();
}
};

// When page loads/refreshes, make sure announcement is visible
document.addEventListener('DOMContentLoaded', function() {
const announcementBar = document.getElementById('announcement_bar');
if (announcementBar) {
    announcementBar.classList.remove('hidden');
}
});



// shop filter 

document.addEventListener('DOMContentLoaded', function() {
    const filterHeaders = document.querySelectorAll('.filter-header');
    
    filterHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.toggle-icon');
            
            // Toggle the collapsed class
            content.classList.toggle('collapsed');
            icon.classList.toggle('rotated');
            
            // Removed the code that closes other filters
        });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const filterToggle = document.querySelector('.filter-toggle');
    const filterSection = document.querySelector('.filter-section');
    const filterHeader = document.querySelector('.filter-header-mobile');
    const closeFilter = document.querySelector('.close-filter');
    
    // Open filter
    if (filterToggle) {
        filterToggle.addEventListener('click', function() {
            filterSection.classList.add('active');
            filterHeader.classList.add('active');
        });
    }

    // Close filter
    if (closeFilter) {
        closeFilter.addEventListener('click', function() {
            filterSection.classList.remove('active');
            filterHeader.classList.remove('active');
        });
    }

    // Close filter when clicking outside
    document.addEventListener('click', function(e) {
        if (!filterSection.contains(e.target) && 
            !filterToggle.contains(e.target)) {
            filterSection.classList.remove('active');
            filterHeader.classList.remove('active');
        }
    });
});



// single product filter 
document.addEventListener('DOMContentLoaded', function() {
    const filterHeaders = document.querySelectorAll('.filter-header');
    
    filterHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.toggle-icon');
            
            // Toggle the collapsed class
            content.classList.toggle('collapsed');
            icon.classList.toggle('rotated');
            
            // Removed the code that closes other filters
        });
            });
        });



document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const addToCartBtn = document.getElementById('addToCartBtn');
    const colorCircles = document.querySelectorAll('.color-circle');
    const sizeButtons = document.querySelectorAll('.button-circle');
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    const quantityInput = document.querySelector('.quantity-input');
    
    // Initialize toast
    const toastElement = document.getElementById('addToCartToast');
    const toast = new bootstrap.Toast(toastElement, {
        delay: 3000
    });

    // Handle color selection
    colorCircles.forEach(circle => {
        circle.addEventListener('click', () => {
            colorCircles.forEach(c => c.classList.remove('active'));
            circle.classList.add('active');
        });
    });

    // Handle size selection
    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            sizeButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Handle quantity changes
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (btn.textContent === '+') {
                quantityInput.value = currentValue + 1;
            } else if (btn.textContent === '-' && currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    });

    // Handle Add to Cart
    addToCartBtn.addEventListener('click', () => {
        const selectedColor = document.querySelector('.color-circle.active').style.backgroundColor;
        const selectedSize = document.querySelector('.button-circle.active').textContent;
        const quantity = quantityInput.value;
        const isSubscribed = document.getElementById('subscribe').checked;

        // Create cart item object
        const cartItem = {
            name: document.querySelector('.singal_product_details h1').textContent,
            color: selectedColor,
            size: selectedSize,
            quantity: quantity,
            subscribed: isSubscribed,
            price: document.querySelector('.pricing .h3').textContent
        };

        // Add to cart (you can implement your cart logic here)
        console.log('Added to cart:', cartItem);
        
        // Show toast
        toast.show();
    });
});

// Add click event listener to wishlist icons
document.querySelectorAll('.wishlist-icon').forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.preventDefault();
        // Toggle between regular and solid heart icons
        if (this.classList.contains('fa-regular')) {
            this.classList.remove('fa-regular');
            this.classList.add('fa-solid');
            this.style.color = '#ff0000'; // Change to red when filled
        } else {
            this.classList.remove('fa-solid');
            this.classList.add('fa-regular');
            this.style.color = ''; // Reset to default color
        }
    });
});




const headings = [
    "FREE UK STANDARD DELIVERY",
    "WORLDWIDE DELIVERY",
];

let currentIndex = 0;

function changeHeading() {
    const headingElement = document.getElementById("changing-heading");
    currentIndex = (currentIndex + 1) % headings.length;
    headingElement.textContent = headings[currentIndex];
}
setInterval(changeHeading, 2000);


// Color option selection
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
        const parentProduct = this.closest('.product-info');
        parentProduct.querySelectorAll('.color-option').forEach(opt => {
            opt.classList.remove('active');
            opt.style.borderColor = '#ddd'; 
        });
       
        this.classList.add('active');
        this.style.borderColor = '#000'; 
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // Function to initialize custom select
    function initializeCustomSelect(customSelect) {
        const selectSelected = customSelect.querySelector('.select-selected');
        const selectItems = customSelect.querySelector('.select-items');

        // Toggle dropdown
        selectSelected.addEventListener('click', function (e) {
            e.stopPropagation();

            // Close all other dropdowns first
            document.querySelectorAll('.custom-select').forEach(otherSelect => {
                if (otherSelect !== customSelect) {
                    otherSelect.querySelector('.select-items').classList.add('select-hide');
                    otherSelect.querySelector('.dropdown-icon')?.classList.remove('rotate');
                }
            });

            // Toggle current dropdown
            selectItems.classList.toggle('select-hide');
            this.querySelector('.dropdown-icon')?.classList.toggle('rotate');
        });

        // Handle option selection
        const options = selectItems.querySelectorAll('div');
        options.forEach(option => {
            option.addEventListener('click', function () {
                // Update selected text
                selectSelected.querySelector('.selected-text').textContent = this.textContent;
                selectItems.classList.add('select-hide');
                selectSelected.querySelector('.dropdown-icon')?.classList.remove('rotate');

                // Trigger custom event when value changes
                const event = new CustomEvent('change', {
                    detail: { value: this.dataset.value }
                });
                customSelect.dispatchEvent(event);
            });
        });
    }

    // Reinitialize custom selects
    function initializeAllCustomSelects() {
        document.querySelectorAll('.custom-select').forEach(customSelect => {
            // Check if already initialized
            if (!customSelect.hasAttribute('data-initialized')) {
                initializeCustomSelect(customSelect);
                customSelect.setAttribute('data-initialized', 'true'); // Mark as initialized
            }
        });
    }

    // Initialize on page load
    initializeAllCustomSelects();

    // Reinitialize dynamically created custom selects
    const observer = new MutationObserver(() => {
        initializeAllCustomSelects();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Close all dropdowns when clicking outside
    document.addEventListener('click', function () {
        document.querySelectorAll('.custom-select').forEach(select => {
            select.querySelector('.select-items').classList.add('select-hide');
            select.querySelector('.dropdown-icon')?.classList.remove('rotate');
        });
    });
});





    let page = 1;
    let isLoading = false;
    const productsPerPage = 6;
    const totalProducts = 72; // Update this with your actual total

    // Function to check if we've reached the bottom of the page
    function isNearBottom() {
        return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500;
    }

    // Function to load more products
    async function loadMoreProducts() {
        if (isLoading) return;
        
        const loadedProducts = document.querySelectorAll('.product-card').length;
        if (loadedProducts >= totalProducts) return;

        isLoading = true;
        document.getElementById('loading-spinner').classList.remove('d-none');

        // Simulate API call with setTimeout
        setTimeout(() => {
            const gridContainer = document.querySelector('.grid_shop_container');
            
            // Add 6 more products
            for (let i = 0; i < productsPerPage; i++) {
                // Fix the image path - use consistent naming
                const imageIndex = (page * productsPerPage + i) % 6 + 1;
                const imagePath = imageIndex === 1 ? './images/Silk_Exfoliation.png' : `./images/silk${imageIndex}.png`;
                
                const productCard = `
                    <div class="product-card product-card-shop" data-aos="fade-up" data-aos-delay="100">
                        <span class="sale-badge">hot</span>
                        <a href="singal_product.html" class="text-decoration-none">
                            <div class="product-image">
                                <img src="${imagePath}" alt="Product">
                            </div>
                        </a>
                        <div class="product-info">
                            <h3 class="product-title">Silk Product</h3>
                            <p class="product-price">19.99 <span>VND</span></p>
                            <div class="color-options">
                                <span class="color-option" style="background: #ffb6c1;"></span>
                                <span class="color-option" style="background: #fff;"></span>
                                <span class="color-option" style="background: #ddd;"></span>
                            </div>
                        </div>
                    </div>
                `;
                gridContainer.insertAdjacentHTML('beforeend', productCard);
            }

            page++;
            isLoading = false;
            document.getElementById('loading-spinner').classList.add('d-none');
            
            // Update the products count
            const loadedCount = document.querySelectorAll('.product-card').length;
            document.querySelector('.pagination_section_outer p').textContent = 
                `1 - ${loadedCount} of ${totalProducts} products`;
        }, 1000);
    }

    // Add scroll event listener
    window.addEventListener('scroll', () => {
        if (isNearBottom()) {
            loadMoreProducts();
        }
    });


    const rangeInput = document.getElementById('customRange1');

rangeInput.addEventListener('input', function() {
    const value = this.value;
    this.style.setProperty('--value', `${value}%`);
});

document.addEventListener('DOMContentLoaded', function() {
    // Close button functionality
    const closeButton = document.querySelector('.close-btn');
    const mobileNav = document.getElementById('mobile-nav');
    closeButton.addEventListener('click', function() {
        mobileNav.style.display = 'none';
    });

    // Search functionality
    const searchIcon = document.getElementById('mobile-search');
    searchIcon.addEventListener('click', function() {
        alert('Search functionality to be implemented');
    });

    // Select functionality
    const selectWrapper = document.getElementById('currency-select');
    selectWrapper.addEventListener('click', function() {
        const items = selectWrapper.querySelector('.select-items');
        items.classList.toggle('select-hide');
    });
});

function handleCategoryContentClass() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    if (window.innerWidth <= 1024) {
        categoryItems.forEach(item => {
            item.classList.remove('categery_content');
        });
    } else {
        categoryItems.forEach(item => {
            item.classList.add('categery_content');
        });
    }
}

// Run on page load
handleCategoryContentClass();

// Run on window resize
window.addEventListener('resize', handleCategoryContentClass);







