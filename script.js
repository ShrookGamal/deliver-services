window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1200,
        once: true,
        offset: 100
    });
}

const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const menuBtn = document.querySelector('.menu-toggle');
const sideMenu = document.querySelector('.nav-links');
const allNavLinks = document.querySelectorAll('.nav-links li a');
const counters = document.querySelectorAll('.counter');
let counterStarted = false;

window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (current && link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });

    const statsSection = document.querySelector('.stats');
    if (statsSection && !counterStarted) {
        const sectionTop = statsSection.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const updateCount = () => {
                    const count = +counter.innerText.replace('+', '');
                    const increment = target / 100;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target + "+";
                    }
                };
                updateCount();
            });
            counterStarted = true;
        }
    }
});

if (menuBtn && sideMenu) {
    menuBtn.addEventListener('click', () => {
        sideMenu.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            sideMenu.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
}

document.querySelectorAll('.acc-header').forEach(header => {
    header.addEventListener('click', () => {
        const body = header.nextElementSibling;
        const icon = header.querySelector('i');
        if (body) {
            if (body.style.display === "block") {
                body.style.display = "none";
                if (icon) icon.style.transform = "rotate(0deg)";
            } else {
                document.querySelectorAll('.acc-body').forEach(b => b.style.display = "none");
                document.querySelectorAll('.acc-header i').forEach(i => i.style.transform = "rotate(0deg)");
                body.style.display = "block";
                if (icon) icon.style.transform = "rotate(180deg)";
            }
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});