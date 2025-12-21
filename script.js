document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    // Toggle Menu
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle Icon between Bars and Times (X)
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Navbar Scroll Effect
    const nav = document.querySelector('nav');
    // Navbar Scroll & Scroll Spy
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        // 1. Navbar Glass Effect
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // 2. Scroll Spy: Highlight Links based on Section
        let current = 'home'; // Default to home
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Trigger when section is near top of viewport (-150px offset)
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    // Contact Form Handling
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(form);

            // UI Enhancement: Loading State
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            submitBtn.classList.add('sending');

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    formStatus.textContent = "Message sent successfully!";
                    formStatus.classList.add('success');
                    formStatus.classList.remove('error');
                    form.reset();
                } else {
                    // Error from server
                    const result = await response.json();
                    if (Object.hasOwn(result, 'errors')) {
                        formStatus.textContent = result.errors.map(error => error["message"]).join(", ");
                    } else {
                        formStatus.textContent = "Oops! There was a problem submitting your form";
                    }
                    formStatus.classList.add('error');
                    formStatus.classList.remove('success');
                }
            } catch (error) {
                // Network Error
                formStatus.textContent = "Oops! There was a problem submitting your form";
                formStatus.classList.add('error');
                formStatus.classList.remove('success');
            } finally {
                // Reset Button State
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                submitBtn.classList.remove('sending');
                
                // Clear status after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = "";
                    formStatus.classList.remove('success', 'error');
                }, 5000);
            }
        });
    }

    // ===========================
    // SCROLL REVEAL ANIMATIONS
    // ===========================
    // Select elements to animate
    const revealTargets = document.querySelectorAll('section > *, .bento-item, .project-card');

    // Add initial hidden state class
    revealTargets.forEach(el => {
        el.classList.add('reveal-element');
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        root: null,
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before bottom
    });

    revealTargets.forEach(el => {
        revealObserver.observe(el);
    });
});
