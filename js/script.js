document.addEventListener('DOMContentLoaded', () => {
    /* --- CONFIG & STATE --- */
    const STATE = {
        products: [],
        isLoading: true
    };

    /* --- FALLBACK DATA (Synced with JSON) --- */
    // Note: Reusing the same products array for simplicity
    const FALLBACK_DATA = [
        { "id": 101, "name": "MVP Official Hoodie - Black", "price": "1499", "currency": "₹", "category": "men", "tags": ["new", "bestseller"], "image": "https://images.pexels.com/photos/6311687/pexels-photo-6311687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { "id": 102, "name": "Kratex Signature Tee - Oversized", "price": "999", "currency": "₹", "category": "men", "tags": ["bestseller"], "image": "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { "id": 201, "name": "MVP Crop Top", "price": "899", "currency": "₹", "category": "women", "tags": ["new"], "image": "https://images.pexels.com/photos/19302633/pexels-photo-19302633/free-photo-of-woman-in-a-crop-top-mockup-posing.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { "id": 202, "name": "Neon Bass Jacket", "price": "2499", "currency": "₹", "category": "women", "tags": ["new"], "image": "https://images.pexels.com/photos/11035544/pexels-photo-11035544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { "id": 301, "name": "Little MVP Tee", "price": "599", "currency": "₹", "category": "kids", "tags": [], "image": "https://images.pexels.com/photos/1619655/pexels-photo-1619655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { "id": 302, "name": "Bass Drop Hoodie - Kids", "price": "1199", "currency": "₹", "category": "kids", "tags": ["bestseller"], "image": "https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { "id": 401, "name": "Kratex Snapback Cap", "price": "699", "currency": "₹", "category": "accessories", "tags": ["bestseller"], "image": "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { "id": 402, "name": "Festival Wristband Set", "price": "299", "currency": "₹", "category": "accessories", "tags": [], "image": "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { "id": 103, "name": "Soundwave Bomber Jacket In Black", "price": "3499", "currency": "₹", "category": "men", "tags": ["new"], "image": "https://images.pexels.com/photos/16170/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { "id": 203, "name": "Track Joggers - Reflective", "price": "1899", "currency": "₹", "category": "women", "tags": ["bestseller"], "image": "https://images.pexels.com/photos/15729792/pexels-photo-15729792/free-photo-of-brunette-woman-in-orange-jacket.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { "id": 403, "name": "MVP Tote Bag", "price": "799", "currency": "₹", "category": "accessories", "tags": ["new"], "image": "https://images.pexels.com/photos/934673/pexels-photo-934673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { "id": 104, "name": "Tour '25 Graphic Tee", "price": "899", "currency": "₹", "category": "men", "tags": [], "image": "https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }
    ];

    /* --- FAN ZONE DATA --- */
    const FAN_DATA = [
        { user: "Rana_Kholkar", handle: "@rana_k", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150", image: "https://images.pexels.com/photos/15729792/pexels-photo-15729792/free-photo-of-brunette-woman-in-orange-jacket.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { user: "Deep_Bass", handle: "@deepmusic", avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150", image: "https://images.pexels.com/photos/6311687/pexels-photo-6311687.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { user: "Techno_Queen", handle: "@techno_q", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150", image: "https://images.pexels.com/photos/11035544/pexels-photo-11035544.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { user: "Mumbai_Ravers", handle: "@mumbai_r", avatar: "https://images.pexels.com/photos/11293709/pexels-photo-11293709.jpeg?auto=compress&cs=tinysrgb&w=150", image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { user: "Bass_Head", handle: "@bass_head_99", avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150", image: "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { user: "Kratex_Fan_1", handle: "@fan_one", avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150", image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=800" },
    ];

    /* --- INITIALIZATION --- */
    init();

    async function init() {
        await fetchProducts();

        // Render Sections (Horizontal Scroll)
        renderSection('new', 'grid-new-content');
        renderSection('bestseller', 'grid-bestseller-content');
        renderSection('kids', 'grid-kids-content');
        renderSection('accessories', 'grid-accessories-content');

        // Render Fan Zone
        renderFanZone();

        setupEventListeners();

        // Simulating a smooth load delay
        setTimeout(() => {
            document.body.classList.add('loading-done');
            setTimeout(() => {
                document.body.classList.add('loaded');
            }, 500);
        }, 1200);
    }

    /* --- DATA FETCHING --- */
    async function fetchProducts() {
        try {
            const response = await fetch('assets/json/products.json');
            if (!response.ok) throw new Error('Network response was not ok');
            STATE.products = await response.json();
        } catch (error) {
            console.warn('Using fallback data');
            STATE.products = FALLBACK_DATA;
        }
    }

    /* --- RENDERING --- */
    function renderSection(filterType, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let filteredProducts = [];
        if (filterType === 'new') {
            filteredProducts = STATE.products.filter(p => p.tags.includes('new'));
        } else if (filterType === 'bestseller') {
            filteredProducts = STATE.products.filter(p => p.tags.includes('bestseller'));
        } else {
            filteredProducts = STATE.products.filter(p => p.category === filterType);
        }

        // Duplicate products to ensure at least 10 items to fill scroll view
        while (filteredProducts.length > 0 && filteredProducts.length < 10) {
            filteredProducts = [...filteredProducts, ...filteredProducts];
        }

        container.innerHTML = '';
        if (filteredProducts.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #999; width: 100%;">Coming Soon</p>';
            return;
        }

        filteredProducts.forEach(product => {
            container.appendChild(createProductCard(product));
        });
    }

    // Helper to create product card DOM element
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <a href="#">
                <div class="img-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                </div>
                <div class="product-info">
                    <div>
                        <div class="product-title">${product.name}</div>
                    </div>
                    <div class="product-price">${product.currency}${product.price}</div>
                </div>
            </a>
        `;
        return card;
    }

    /* --- FAN ZONE RENDER --- */
    function renderFanZone() {
        const track = document.getElementById('fan-marquee-track');
        if (!track) return;

        // Double data for seamless infinite loop
        const seamlessData = [...FAN_DATA, ...FAN_DATA, ...FAN_DATA];

        seamlessData.forEach(fan => {
            const card = document.createElement('div');
            card.className = 'fan-card';
            card.innerHTML = `
                <div class="fan-img-container">
                    <img src="${fan.image}" class="fan-img" alt="Fan Photo">
                </div>
                <div class="fan-user-info">
                    <img src="${fan.avatar}" class="fan-avatar" alt="User">
                    <div>
                        <div class="fan-username">${fan.user}</div>
                        <div class="fan-handle">${fan.handle}</div>
                    </div>
                </div>
            `;
            track.appendChild(card);
        });
    }

    /* --- SCROLL FUNCTIONALITY --- */
    function setupEventListeners() {
        const header = document.querySelector('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Search Toggles
        const searchPill = Array.from(document.querySelectorAll('.icon-pill')).find(el => el.textContent.includes('SEARCH'));
        const closeSearchBtn = document.getElementById('close-search');

        if (searchPill) searchPill.addEventListener('click', toggleSearch);
        if (closeSearchBtn) closeSearchBtn.addEventListener('click', toggleSearch);

        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => handleSearch(e.target.value.trim()));
        }

        // Horizontal Scroll Arrows Logic
        document.querySelectorAll('.scroll-arrow-right').forEach(arrow => {
            arrow.addEventListener('click', (e) => {
                const section = e.currentTarget.closest('.section-container');
                const scrollContainer = section.querySelector('.product-grid');
                if (scrollContainer) {
                    scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
                }
            });
        });
    }

    function toggleSearch() {
        document.getElementById('search-overlay').classList.toggle('active');
    }

    function handleSearch(query) {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = '';
        if (!query) return;

        const lowerQuery = query.toLowerCase();
        const results = STATE.products.filter(product =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery)
        );

        results.forEach(product => {
            resultsContainer.appendChild(createProductCard(product));
        });
    }
});
