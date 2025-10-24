// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize all functionality
    initializeHeader()
    initializeMobileMenu()
    initializeTestimonialGrid() // Updated from slider to grid
    initializeForms()
    initializeLazyLoading()
    initializeSmoothScrolling()
    initializeHeroBackgroundAnimation() // New function for animated hero background

    console.log("[v0] Devmocks website initialized successfully")
})

// Header scroll effect
function initializeHeader() {
    const header = document.getElementById("header")
    let lastScrollY = window.scrollY

    function updateHeader() {
        const currentScrollY = window.scrollY

        if (currentScrollY > 100) {
            header.classList.add("header-scrolled")
        } else {
            header.classList.remove("header-scrolled")
        }

        // Hide header on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = "translateY(-100%)"
        } else {
            header.style.transform = "translateY(0)"
        }

        lastScrollY = currentScrollY
    }

    // Throttle scroll events for performance
    let ticking = false
    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeader()
                ticking = false
            })
            ticking = true
        }
    })
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn")
    const mobileMenu = document.getElementById("mobile-menu")

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden")
            mobileMenu.classList.toggle("show")

            // Update button icon
            const icon = mobileMenuBtn.querySelector("svg path")
            if (mobileMenu.classList.contains("show")) {
                icon.setAttribute("d", "M6 18L18 6M6 6l12 12") // X icon
            } else {
                icon.setAttribute("d", "M4 6h16M4 12h16M4 18h16") // Hamburger icon
            }
        })

        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll("a")
        mobileLinks.forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden")
                mobileMenu.classList.remove("show")
                const icon = mobileMenuBtn.querySelector("svg path")
                icon.setAttribute("d", "M4 6h16M4 12h16M4 18h16")
            })
        })
    }
}

// Testimonial grid with blur reveal
function initializeTestimonialGrid() {
    const hiddenTestimonials = document.querySelectorAll(".testimonial-hidden")

    if (!hiddenTestimonials.length) return

    hiddenTestimonials.forEach((testimonial) => {
        testimonial.addEventListener("click", () => {
            // Remove blur and opacity effects
            testimonial.classList.remove("blur-sm", "opacity-60", "testimonial-hidden")
            testimonial.classList.add("opacity-100")

            // Remove cursor pointer since it's now revealed
            testimonial.classList.remove("cursor-pointer")

            // Add a subtle animation
            testimonial.style.transform = "scale(1.02)"
            setTimeout(() => {
                testimonial.style.transform = "scale(1)"
            }, 200)

            console.log("[v0] Testimonial revealed")
        })
    })
}

// Form handling
function initializeForms() {
    const contactForm = document.getElementById("contact-form")

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault()

            const formData = new FormData(contactForm)
            const data = Object.fromEntries(formData.entries())

            console.log("[v0] Contact form submitted:", data)

            // Validate required fields
            const requiredFields = contactForm.querySelectorAll("[required]")
            let isValid = true

            requiredFields.forEach((field) => {
                if (!field.value.trim()) {
                    isValid = false
                    field.classList.add("border-red-500")
                } else {
                    field.classList.remove("border-red-500")
                }
            })

            if (!isValid) {
                showNotification("Please fill in all required fields.", "error")
                return
            }

            // Validate email
            const email = contactForm.querySelector('input[name="email"]')
            if (email && !isValidEmail(email.value)) {
                showNotification("Please enter a valid email address.", "error")
                email.classList.add("border-red-500")
                return
            }

            // Show success message
            showNotification("Message sent successfully! We'll get back to you soon.", "success")

            // Reset form
            contactForm.reset()
        })
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

// Notification system
function showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(".notification")
    existingNotifications.forEach((notification) => notification.remove())

    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`

    // Set colors based on type
    if (type === "success") {
        notification.classList.add("bg-green-600", "text-white")
    } else if (type === "error") {
        notification.classList.add("bg-red-600", "text-white")
    } else {
        notification.classList.add("bg-blue-600", "text-white")
    }

    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <p class="text-sm font-medium">${message}</p>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
        notification.classList.remove("translate-x-full")
    }, 100)

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add("translate-x-full")
        setTimeout(() => notification.remove(), 300)
    }, 5000)
}

// Lazy loading for images
function initializeLazyLoading() {
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target
                    img.src = img.dataset.src || img.src
                    img.classList.remove("opacity-0")
                    img.classList.add("opacity-100")
                    observer.unobserve(img)
                }
            })
        })

        const images = document.querySelectorAll('img[loading="lazy"]')
        images.forEach((img) => {
            img.classList.add("opacity-0", "transition-opacity", "duration-300")
            imageObserver.observe(img)
        })
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]')

    links.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href").substring(1)
            const targetElement = document.getElementById(targetId)

            if (targetElement) {
                const headerHeight = document.getElementById("header").offsetHeight
                const targetPosition = targetElement.offsetTop - headerHeight - 20

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                })
            }
        })
    })
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ("web-vitals" in window) {
        // This would typically use the web-vitals library
        console.log("[v0] Performance monitoring initialized")
    }

    // Log page load time
    window.addEventListener("load", () => {
        const loadTime = performance.now()
        console.log("[v0] Page loaded in:", Math.round(loadTime), "ms")
    })
}

// Initialize performance monitoring
initializePerformanceMonitoring()

// Error handling
window.addEventListener("error", (e) => {
    console.error("[v0] JavaScript error:", e.error)
})

// Service Worker registration for PWA capabilities
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        // Uncomment to register service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('[v0] SW registered:', registration))
        //     .catch(error => console.log('[v0] SW registration failed:', error));
    })
}

// Animated hero background particles + connecting lines
function initializeHeroBackgroundAnimation() {
    const canvas = document.getElementById("hero-canvas")
    if (!canvas) return

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (prefersReducedMotion.matches) return
    prefersReducedMotion.addEventListener?.("change", (e) => {
        if (e.matches) {
            cancelAnimationFrame(rafId)
            const ctx = canvas.getContext("2d")
            ctx && ctx.clearRect(0, 0, canvas.width, canvas.height)
        } else {
            start()
        }
    })

    const ctx = canvas.getContext("2d", { alpha: true })
    let width = 0
    let height = 0
    let particles = []
    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    let rafId = 0

    function resize() {
        const hero = canvas.closest("section")
        if (!hero) return
        width = hero.clientWidth
        height = hero.clientHeight
        canvas.width = Math.max(1, Math.floor(width * DPR))
        canvas.height = Math.max(1, Math.floor(height * DPR))
        canvas.style.width = width + "px"
        canvas.style.height = height + "px"
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
        initParticles()
    }

    function initParticles() {
        const count = Math.min(90, Math.max(40, Math.floor((width * height) / 14000)))
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            r: Math.random() * 1.6 + 0.6,
        }))
    }

    function step() {
        ctx.clearRect(0, 0, width, height)

        // Draw particles
        ctx.fillStyle = "rgba(0,255,136,0.65)" // primary accent
        const linkDist = 120

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i]
            p.x += p.vx
            p.y += p.vy

            // bounce at edges
            if (p.x <= 0 || p.x >= width) p.vx *= -1
            if (p.y <= 0 || p.y >= height) p.vy *= -1

            ctx.beginPath()
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
            ctx.fill()
        }

        // Connect nearby particles
        ctx.strokeStyle = "rgba(0,255,136,0.15)"
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x
                const dy = particles[i].y - particles[j].y
                const dist = Math.hypot(dx, dy)
                if (dist < linkDist) {
                    ctx.globalAlpha = 1 - dist / linkDist
                    ctx.beginPath()
                    ctx.moveTo(particles[i].x, particles[i].y)
                    ctx.lineTo(particles[j].x, particles[j].y)
                    ctx.stroke()
                    ctx.globalAlpha = 1
                }
            }
        }

        rafId = requestAnimationFrame(step)
    }

    function debounce(fn, wait) {
        let t
        return (...args) => {
            clearTimeout(t)
            t = setTimeout(() => fn.apply(null, args), wait)
        }
    }

    const onResize = debounce(resize, 150)

    function start() {
        cancelAnimationFrame(rafId)
        resize()
        rafId = requestAnimationFrame(step)
    }

    start()
    window.addEventListener("resize", onResize)
}


// Send Request to Send Email

document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = { contact: Object.fromEntries(formData.entries()) };

    try {
        const response = await fetch('/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        const statusDiv = document.getElementById('form-status');

        if (response.ok) {
            statusDiv.textContent = result.message;
            this.reset();
        } else {
            statusDiv.textContent = "Error: " + (result.errors || "Something went wrong");
        }
    } catch (error) {
        document.getElementById('form-status').textContent = "Server error. Please try again later.";
    }
});
