document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;
    const scrollTopBtn = document.querySelector(".scroll-top");

    // Hamburger Menu
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuBtn.innerHTML = navLinks.classList.contains("active") ?
            '<i class="fas fa-times"></i>' :
            '<i class="fas fa-bars"></i>';
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Dark Mode Toggle
    // Function to set theme
    const setTheme = (theme) => {
        if (theme === "dark") {
            body.classList.add("dark-mode");
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.remove("dark-mode");
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem("theme", "light");
        }
        // Update particles color after theme change
        updateParticlesColor();
    };

    // Toggle event listener
    darkModeToggle.addEventListener("click", () => {
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    });

    // Load saved theme on page load
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);


    // Scroll to Top Button
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("active");
        } else {
            scrollTopBtn.classList.remove("active");
        }
    });

    // Particle Background Initialization
    const particleConfig = {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#007bff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#007bff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "bounce" }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    };
    
    particlesJS("particles-js", particleConfig);

    // Function to update particle colors based on theme
    function updateParticlesColor() {
        const isDarkMode = body.classList.contains("dark-mode");
        const newColor = isDarkMode ? "#FFFFFF" : "#007bff";

        // Check if pJS is initialized and has particles array
        if (typeof pJSDom !== 'undefined' && pJSDom.length > 0 && pJSDom[0].pJS.particles) {
            // Update the color for future particles
            pJSDom[0].pJS.particles.color.value = newColor;
            pJSDom[0].pJS.particles.line_linked.color = newColor;

            // Update the color for existing particles
            pJSDom[0].pJS.particles.array.forEach(particle => {
                particle.color.value = newColor;
            });
            // Redraw particles
            pJSDom[0].pJS.fn.particlesDraw();
        }
    }
});