/**
 * City Events Guide - Main JavaScript File
 * Handles all interactive features including sliders, filters, form validation, and animations
 * Designed for Arabic RTL website with modern ES6+ JavaScript
 */

// Sample Events Data - In a real application, this would come from an API or database
const eventsData = [
    {
        id: 1,
        title: "مهرجان الموسيقى الصيفي",
        category: "music",
        date: "2024-08-15",
        location: "حديقة المدينة المركزية",
        area: "center",
        price: "مجاني",
        description: "استمتع بأمسيات موسيقية رائعة مع أفضل الفرق الموسيقية المحلية والعالمية",
        image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600",
        featured: true
    },
    {
        id: 2,
        title: "معرض الفنون والحرف",
        category: "culture",
        date: "2024-08-20",
        location: "المركز الثقافي",
        area: "center",
        price: "20 ريال",
        description: "اكتشف الثقافة المحلية من خلال معرض يضم أعمال الحرفيين والفنانين المحليين",
        image: "https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=600",
        featured: true
    },
    {
        id: 3,
        title: "ماراثون المدينة السنوي",
        category: "sports",
        date: "2024-09-05",
        location: "شارع الكورنيش",
        area: "north",
        price: "50 ريال",
        description: "شارك في الماراثون السنوي واستمتع بالجري عبر أجمل شوارع المدينة",
        image: "https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=600",
        featured: true
    },
    {
        id: 4,
        title: "مهرجان الطعام العالمي",
        category: "family",
        date: "2024-08-25",
        location: "حديقة الملك عبدالله",
        area: "south",
        price: "دخول مجاني",
        description: "تذوق أشهى المأكولات من مختلف دول العالم في جو عائلي رائع",
        image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=600",
        featured: false
    },
    {
        id: 5,
        title: "بطولة كرة القدم للناشئين",
        category: "sports",
        date: "2024-09-10",
        location: "ملعب الأمير فيصل",
        area: "east",
        price: "10 ريال",
        description: "شاهد مباريات مثيرة لأفضل الفرق الناشئة في المدينة",
        image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=600",
        featured: false
    },
    {
        id: 6,
        title: "أمسية شعرية",
        category: "culture",
        date: "2024-09-15",
        location: "دار الثقافة",
        area: "west",
        price: "مجاني",
        description: "أمسية شعرية مع نخبة من الشعراء المعاصرين",
        image: "https://images.pexels.com/photos/1010519/pexels-photo-1010519.jpeg?auto=compress&cs=tinysrgb&w=600",
        featured: false
    },
    {
        id: 7,
        title: "حفلة موسيقية كلاسيكية",
        category: "music",
        date: "2024-09-20",
        location: "قاعة الملك فهد",
        area: "center",
        price: "100 ريال",
        description: "حفلة موسيقية كلاسيكية مع الفرقة السيمفونية الوطنية",
        image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600",
        featured: false
    },
    {
        id: 8,
        title: "يوم ترفيهي للعائلات",
        category: "family",
        date: "2024-09-01",
        location: "منتزه الحبيب",
        area: "south",
        price: "25 ريال للعائلة",
        description: "يوم مليء بالأنشطة الترفيهية للأطفال والعائلات",
        image: "https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=600",
        featured: false
    }
];

// DOM Elements
const elementsCache = new Map();

// Utility function to get cached DOM elements
function getElement(selector) {
    if (!elementsCache.has(selector)) {
        elementsCache.set(selector, document.querySelector(selector));
    }
    return elementsCache.get(selector);
}

// Utility function to get multiple cached DOM elements
function getElements(selector) {
    if (!elementsCache.has(selector)) {
        elementsCache.set(selector, document.querySelectorAll(selector));
    }
    return elementsCache.get(selector);
}

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeHomePage();
    initializeEventsPage();
    initializeEventDetailsPage();
    initializeContactForm();
    initializeGeneralFeatures();
});

/**
 * Home Page Initialization
 * Sets up featured events carousel and latest events grid
 */
function initializeHomePage() {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        loadLatestEvents();
        setupCategoryFilters();
        setupFeaturedEventsCarousel();
    }
}

/**
 * Load and display latest events on homepage
 */
function loadLatestEvents() {
    const latestEventsContainer = getElement('#latestEvents');
    if (!latestEventsContainer) return;

    // Get latest 6 events
    const latestEvents = eventsData.slice(0, 6);
    
    latestEventsContainer.innerHTML = '';
    
    latestEvents.forEach(event => {
        const eventCard = createEventCard(event);
        latestEventsContainer.appendChild(eventCard);
    });

    // Add loading animation
    latestEventsContainer.style.opacity = '0';
    setTimeout(() => {
        latestEventsContainer.style.transition = 'opacity 0.5s ease-in';
        latestEventsContainer.style.opacity = '1';
    }, 100);
}

/**
 * Setup category filter functionality
 */
function setupCategoryFilters() {
    const categoryCards = getElements('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            // Redirect to events page with category filter
            window.location.href = `events.html?category=${category}`;
        });
    });
}

/**
 * Setup featured events carousel auto-play and controls
 */
function setupFeaturedEventsCarousel() {
    const carousel = getElement('#featuredEventsCarousel');
    if (!carousel) return;

    // Auto-advance carousel every 8 seconds
    setInterval(() => {
        const nextButton = carousel.querySelector('[data-bs-slide="next"]');
        if (nextButton) nextButton.click();
    }, 8000);
}

/**
 * Events Page Initialization
 * Sets up event filtering, searching, and pagination
 */
function initializeEventsPage() {
    if (window.location.pathname.includes('events.html')) {
        loadAllEvents();
        setupEventFilters();
        setupEventSearch();
        applyUrlFilters();
    }
}

/**
 * Load and display all events with filtering
 */
function loadAllEvents(filteredEvents = null) {
    const eventsContainer = getElement('#eventsGrid');
    const eventsCount = getElement('#eventsCount');
    
    if (!eventsContainer) return;

    const events = filteredEvents || eventsData;
    
    eventsContainer.innerHTML = '';
    
    if (events.length === 0) {
        eventsContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-calendar-x text-muted" style="font-size: 4rem;"></i>
                <h4 class="mt-3 text-muted">لم يتم العثور على فعاليات</h4>
                <p class="text-muted">جرب تعديل معايير البحث أو الفلترة</p>
            </div>
        `;
        if (eventsCount) eventsCount.textContent = 'لم يتم العثور على فعاليات';
        return;
    }
    
    events.forEach(event => {
        const eventCard = createEventCard(event, true);
        eventsContainer.appendChild(eventCard);
    });

    // Update events count
    if (eventsCount) {
        eventsCount.textContent = `عرض ${events.length} من ${eventsData.length} فعالية`;
    }

    // Add staggered animation
    const cards = eventsContainer.querySelectorAll('.col-lg-4');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

/**
 * Setup event filtering functionality
 */
function setupEventFilters() {
    const categoryFilter = getElement('#categoryFilter');
    const dateFilter = getElement('#dateFilter');
    const locationFilter = getElement('#locationFilter');
    const clearFiltersBtn = getElement('#clearFilters');
    const sortDropdown = getElements('[data-sort]');

    // Category filter
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }

    // Date filter
    if (dateFilter) {
        dateFilter.addEventListener('change', applyFilters);
    }

    // Location filter
    if (locationFilter) {
        locationFilter.addEventListener('change', applyFilters);
    }

    // Clear filters
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            if (categoryFilter) categoryFilter.value = '';
            if (dateFilter) dateFilter.value = '';
            if (locationFilter) locationFilter.value = '';
            const searchInput = getElement('#searchInput');
            if (searchInput) searchInput.value = '';
            loadAllEvents();
        });
    }

    // Sort functionality
    sortDropdown.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sortType = this.dataset.sort;
            sortEvents(sortType);
        });
    });
}

/**
 * Setup event search functionality
 */
function setupEventSearch() {
    const searchInput = getElement('#searchInput');
    const searchBtn = getElement('#searchBtn');

    if (searchInput) {
        // Search on input with debounce
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                applyFilters();
            }, 300);
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', applyFilters);
    }
}

/**
 * Apply all filters and search
 */
function applyFilters() {
    const categoryFilter = getElement('#categoryFilter');
    const dateFilter = getElement('#dateFilter');
    const locationFilter = getElement('#locationFilter');
    const searchInput = getElement('#searchInput');

    let filteredEvents = [...eventsData];

    // Apply category filter
    if (categoryFilter && categoryFilter.value) {
        filteredEvents = filteredEvents.filter(event => 
            event.category === categoryFilter.value
        );
    }

    // Apply date filter
    if (dateFilter && dateFilter.value) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        switch (dateFilter.value) {
            case 'today':
                filteredEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate.toDateString() === today.toDateString();
                });
                break;
            case 'tomorrow':
                filteredEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate.toDateString() === tomorrow.toDateString();
                });
                break;
            case 'week':
                const weekFromNow = new Date(today);
                weekFromNow.setDate(weekFromNow.getDate() + 7);
                filteredEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate >= today && eventDate <= weekFromNow;
                });
                break;
            case 'month':
                const monthFromNow = new Date(today);
                monthFromNow.setMonth(monthFromNow.getMonth() + 1);
                filteredEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate >= today && eventDate <= monthFromNow;
                });
                break;
        }
    }

    // Apply location filter
    if (locationFilter && locationFilter.value) {
        filteredEvents = filteredEvents.filter(event => 
            event.area === locationFilter.value
        );
    }

    // Apply search filter
    if (searchInput && searchInput.value.trim()) {
        const searchTerm = searchInput.value.trim().toLowerCase();
        filteredEvents = filteredEvents.filter(event => 
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm) ||
            event.location.toLowerCase().includes(searchTerm)
        );
    }

    loadAllEvents(filteredEvents);
}

/**
 * Sort events by different criteria
 */
function sortEvents(sortType) {
    let sortedEvents = [...eventsData];

    switch (sortType) {
        case 'date':
            sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'name':
            sortedEvents.sort((a, b) => a.title.localeCompare(b.title, 'ar'));
            break;
        case 'popularity':
            sortedEvents.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
            break;
    }

    loadAllEvents(sortedEvents);
}

/**
 * Apply filters from URL parameters
 */
function applyUrlFilters() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category) {
        const categoryFilter = getElement('#categoryFilter');
        if (categoryFilter) {
            categoryFilter.value = category;
            applyFilters();
        }
    }
}

/**
 * Event Details Page Initialization
 */
function initializeEventDetailsPage() {
    if (window.location.pathname.includes('event.html')) {
        setupEventDetailsFeatures();
        loadRelatedEvents();
    }
}

/**
 * Setup event details page features
 */
function setupEventDetailsFeatures() {
    // Add to calendar functionality
    const addToCalendarBtn = getElement('#addToCalendarBtn');
    if (addToCalendarBtn) {
        addToCalendarBtn.addEventListener('click', function() {
            // Create calendar event data
            const eventData = {
                title: 'مهرجان الموسيقى الصيفي',
                start: '2024-08-15T19:00:00',
                end: '2024-08-15T23:00:00',
                location: 'حديقة المدينة المركزية',
                description: 'استمتع بأمسيات موسيقية رائعة'
            };
            
            addToCalendar(eventData);
        });
    }

    // Share functionality
    const shareBtn = getElement('#shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareEvent);
    }

    // Image gallery modal
    setupImageGallery();
}

/**
 * Load related events
 */
function loadRelatedEvents() {
    const relatedEventsContainer = getElement('#relatedEvents');
    if (!relatedEventsContainer) return;

    // Get 3 random related events (same category or featured)
    const relatedEvents = eventsData
        .filter(event => event.category === 'music' || event.featured)
        .slice(1, 4);

    relatedEventsContainer.innerHTML = '';
    
    relatedEvents.forEach(event => {
        const eventCard = createEventCard(event);
        relatedEventsContainer.appendChild(eventCard);
    });
}

/**
 * Setup image gallery modal functionality
 */
function setupImageGallery() {
    const galleryImages = getElements('.gallery-img');
    const modal = getElement('#imageModal');
    const modalImage = getElement('#modalImage');

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            if (modalImage) {
                modalImage.src = this.src;
                modalImage.alt = this.alt;
            }
        });
    });
}

/**
 * Contact Form Initialization and Validation
 */
function initializeContactForm() {
    if (window.location.pathname.includes('contact.html')) {
        setupFormValidation();
    }
}

/**
 * Setup comprehensive form validation
 */
function setupFormValidation() {
    const contactForm = getElement('#contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error state on input
            this.classList.remove('is-invalid');
        });
    });
}

/**
 * Validate entire form
 */
function validateForm() {
    const form = getElement('#contactForm');
    const firstName = getElement('#firstName');
    const lastName = getElement('#lastName');
    const email = getElement('#email');
    const subject = getElement('#subject');
    const message = getElement('#message');

    let isValid = true;

    // Validate required fields
    const requiredFields = [firstName, lastName, email, subject, message];
    requiredFields.forEach(field => {
        if (field && !validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

/**
 * Validate individual field
 */
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    // Remove existing validation classes
    field.classList.remove('is-valid', 'is-invalid');

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        field.classList.add('is-invalid');
        isValid = false;
    }
    // Email validation
    else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('is-invalid');
            isValid = false;
        }
    }
    // Phone validation (optional)
    else if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            field.classList.add('is-invalid');
            isValid = false;
        }
    }

    if (isValid && value) {
        field.classList.add('is-valid');
    }

    return isValid;
}

/**
 * Submit form with loading state and feedback
 */
function submitForm() {
    const submitBtn = getElement('button[type="submit"]');
    const successAlert = getElement('#successAlert');
    const errorAlert = getElement('#errorAlert');

    // Hide previous alerts
    if (successAlert) successAlert.classList.add('d-none');
    if (errorAlert) errorAlert.classList.add('d-none');

    // Show loading state
    if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>جاري الإرسال...';
    }

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset button state
        if (submitBtn) {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bi bi-send me-2"></i>إرسال الرسالة';
        }

        // Show success message
        if (successAlert) {
            successAlert.classList.remove('d-none');
            successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Reset form
        const form = getElement('#contactForm');
        if (form) {
            form.reset();
            // Remove validation classes
            form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                el.classList.remove('is-valid', 'is-invalid');
            });
        }
    }, 2000);
}

/**
 * General Features Initialization
 * Features that work across all pages
 */
function initializeGeneralFeatures() {
    setupScrollAnimations();
    setupSmoothScrolling();
    setupNavbarBehavior();
    setupImageLazyLoading();
}

/**
 * Setup scroll-triggered animations
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = getElements('.card, .category-card, .team-member, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    const anchorLinks = getElements('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Setup navbar scroll behavior
 */
function setupNavbarBehavior() {
    const navbar = getElement('.navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add background when scrolled
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    });
}

/**
 * Setup lazy loading for images
 */
function setupImageLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy-loading');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = getElements('img[data-src]');
        lazyImages.forEach(img => {
            img.classList.add('lazy-loading');
            imageObserver.observe(img);
        });
    }
}

/**
 * Utility Functions
 */

/**
 * Create event card HTML element
 */
function createEventCard(event, showDetailsButton = false) {
    const cardCol = document.createElement('div');
    cardCol.className = 'col-lg-4 col-md-6 mb-4';
    
    const categoryColors = {
        music: 'warning',
        culture: 'info',
        sports: 'success',
        family: 'primary'
    };

    const categoryIcons = {
        music: 'bi-music-note-beamed',
        culture: 'bi-palette-fill',
        sports: 'bi-trophy-fill',
        family: 'bi-people-fill'
    };

    const eventDate = new Date(event.date).toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    cardCol.innerHTML = `
        <div class="card event-card h-100">
            <div class="position-relative">
                <img src="${event.image}" class="card-img-top" alt="${event.title}">
                <div class="position-absolute top-0 start-0 m-3">
                    <span class="badge bg-${categoryColors[event.category]} text-dark">
                        <i class="bi ${categoryIcons[event.category]} me-1"></i>
                        ${getCategoryName(event.category)}
                    </span>
                </div>
                ${event.featured ? '<div class="position-absolute top-0 end-0 m-3"><span class="badge bg-danger"><i class="bi bi-star-fill me-1"></i>مميز</span></div>' : ''}
            </div>
            <div class="card-body d-flex flex-column">
                <h5 class="card-title fw-bold">${event.title}</h5>
                <p class="card-text text-muted flex-grow-1">${event.description}</p>
                <div class="event-meta mb-3">
                    <div class="d-flex align-items-center mb-2">
                        <i class="bi bi-calendar-event text-primary me-2"></i>
                        <span class="small">${eventDate}</span>
                    </div>
                    <div class="d-flex align-items-center mb-2">
                        <i class="bi bi-geo-alt text-danger me-2"></i>
                        <span class="small">${event.location}</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <i class="bi bi-ticket text-success me-2"></i>
                        <span class="small fw-bold">${event.price}</span>
                    </div>
                </div>
                ${showDetailsButton ? 
                    '<a href="event.html" class="btn btn-primary"><i class="bi bi-info-circle me-2"></i>التفاصيل</a>' : 
                    '<div class="d-flex gap-2"><a href="event.html" class="btn btn-outline-primary btn-sm flex-fill">التفاصيل</a><button class="btn btn-primary btn-sm flex-fill"><i class="bi bi-heart"></i></button></div>'
                }
            </div>
        </div>
    `;

    return cardCol;
}

/**
 * Get Arabic category name
 */
function getCategoryName(category) {
    const categoryNames = {
        music: 'موسيقى',
        culture: 'ثقافة',
        sports: 'رياضة',
        family: 'عائلي'
    };
    return categoryNames[category] || category;
}

/**
 * Add event to calendar
 */
function addToCalendar(eventData) {
    // Create calendar URL (Google Calendar format)
    const startDate = new Date(eventData.start).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDate = new Date(eventData.end).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&dates=${startDate}/${endDate}&location=${encodeURIComponent(eventData.location)}&details=${encodeURIComponent(eventData.description)}`;
    
    window.open(calendarUrl, '_blank');
}

/**
 * Share event functionality
 */
function shareEvent() {
    const eventTitle = 'مهرجان الموسيقى الصيفي';
    const eventUrl = window.location.href;
    
    if (navigator.share) {
        // Use native share API if available
        navigator.share({
            title: eventTitle,
            text: 'تعرف على هذه الفعالية الرائعة',
            url: eventUrl
        });
    } else {
        // Fallback to copy URL
        navigator.clipboard.writeText(eventUrl).then(() => {
            // Show toast notification
            showToast('تم نسخ رابط الفعالية إلى الحافظة');
        });
    }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'success') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0 position-fixed top-0 start-50 translate-middle-x`;
    toast.style.zIndex = '9999';
    toast.style.marginTop = '100px';
    toast.setAttribute('role', 'alert');
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="bi bi-check-circle-fill me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Initialize and show toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    // Remove toast element after hiding
    toast.addEventListener('hidden.bs.toast', () => {
        document.body.removeChild(toast);
    });
}

/**
 * Error handling for failed operations
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Could send error reports to analytics service
});

/**
 * Performance monitoring
 */
window.addEventListener('load', function() {
    // Monitor page load performance
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        eventsData,
        createEventCard,
        validateForm,
        addToCalendar,
        shareEvent
    };
}