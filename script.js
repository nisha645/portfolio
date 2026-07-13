/*=========================================
            PORTFOLIO SCRIPT
            PART 1
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
                ELEMENTS
    =========================================*/

    const header = document.querySelector("header");

    const menuBtn = document.querySelector(".menu-btn");

    const navMenu = document.querySelector(".nav-links");

    const navLinks = document.querySelectorAll(".nav-links a");

    const loader = document.getElementById("loader");

    const progressBar = document.getElementById("progress-bar");

    const topBtn = document.getElementById("topBtn");

    const typing = document.getElementById("typing");



    /*=========================================
                LOADER
    =========================================*/

    window.addEventListener("load", () => {

        if (!loader) return;

        loader.style.opacity = "0";

        loader.style.pointerEvents = "none";

        setTimeout(() => {

            loader.style.display = "none";

        }, 600);

    });



    /*=========================================
            STICKY NAVBAR
    =========================================*/

    function stickyNavbar() {

        if (!header) return;

        if (window.scrollY > 60) {

            header.classList.add("sticky");

        }

        else {

            header.classList.remove("sticky");

        }

    }

    stickyNavbar();



    /*=========================================
            MOBILE MENU
    =========================================*/

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            navMenu.classList.toggle("active");

        });

    }



    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (navMenu) {

                navMenu.classList.remove("active");

            }

        });

    });



    /*=========================================
            TYPING EFFECT
    =========================================*/

    if (typing) {

        const roles = [

            "Software Developer",

            "Python Developer",

            "Data Analyst",

            "Full Stack Developer",

            "Problem Solver"

        ];



        let roleIndex = 0;

        let charIndex = 0;

        let deleting = false;



        function typeEffect() {

            const current = roles[roleIndex];



            if (!deleting) {

                typing.textContent = current.substring(0, charIndex);

                charIndex++;

            }

            else {

                typing.textContent = current.substring(0, charIndex);

                charIndex--;

            }



            let speed = deleting ? 60 : 120;



            if (!deleting && charIndex > current.length) {

                deleting = true;

                speed = 1400;

            }



            if (deleting && charIndex < 0) {

                deleting = false;

                roleIndex++;

                if (roleIndex >= roles.length)

                    roleIndex = 0;

            }



            setTimeout(typeEffect, speed);

        }



        typeEffect();

    }



    /*=========================================
            SMOOTH SCROLL
    =========================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });



    /*=========================================
            SCROLL PROGRESS
    =========================================*/

    function updateProgress() {

        if (!progressBar) return;

        const scrollTop = document.documentElement.scrollTop;

        const scrollHeight = document.documentElement.scrollHeight -

            document.documentElement.clientHeight;

        const progress = (scrollTop / scrollHeight) * 100;

        progressBar.style.width = progress + "%";

    }



    /*=========================================
            BACK TO TOP
    =========================================*/

    if (topBtn) {

        topBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }



    function toggleTopButton() {

        if (!topBtn) return;

        if (window.scrollY > 400) {

            topBtn.style.display = "flex";

        }

        else {

            topBtn.style.display = "none";

        }

    }



    /*=========================================
            WINDOW SCROLL
    =========================================*/

    window.addEventListener("scroll", () => {

        stickyNavbar();

        updateProgress();

        toggleTopButton();

    });

});

/*=========================================
        ACTIVE NAVIGATION
=========================================*/

const sections = document.querySelectorAll("section");

function activeNavigation() {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

}

/*=========================================
        SCROLL REVEAL
=========================================*/

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {

    const trigger = window.innerHeight - 100;

    revealElements.forEach(element => {

        const top = element.getBoundingClientRect().top;

        if (top < trigger) {

            element.classList.add("active");

        }

    });

}

/*=========================================
        COUNTER ANIMATION
=========================================*/

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function animateCounters() {

    if (counterStarted) return;

    const stats = document.querySelector(".stats");

    if (!stats) return;

    const statsTop = stats.getBoundingClientRect().top;

    if (statsTop > window.innerHeight - 100) return;

    counterStarted = true;

    counters.forEach(counter => {

        const target = parseInt(counter.dataset.target);

        if (isNaN(target)) return;

        let current = 0;

        const increment = Math.max(1, Math.ceil(target / 80));

        const timer = setInterval(() => {

            current += increment;

            if (current >= target) {

                current = target;

                clearInterval(timer);

            }

            counter.textContent = current;

        }, 20);

    });

}

/*=========================================
        CONTACT FORM
=========================================*/

const form = document.querySelector(".contact-form");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        emailjs.sendForm(

            "service_auf45v9",
            "template_qwde2wa",
            this

        ).then(() => {

            alert("✅ Message sent successfully!");

            form.reset();

        }).catch((error) => {

            console.error(error);

            alert("❌ Failed to send message.");

        });

    });

}

/*=========================================
        FOOTER YEAR
=========================================*/

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}

/*=========================================
        INITIAL CALLS
=========================================*/

activeNavigation();

revealOnScroll();

animateCounters();

/*=========================================
        WINDOW SCROLL
=========================================*/

window.addEventListener("scroll", () => {

    activeNavigation();

    revealOnScroll();

    animateCounters();

});

/*=========================================
        END
=========================================*/




