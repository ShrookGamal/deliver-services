// 1. إزالة اللودر عند تحميل الصفحة
window.addEventListener('load', () => {
    document.getElementById('loader').style.display = 'none';
});

// 2. تهيئة مكتبة الأنميشن AOS
AOS.init({
    duration: 1200,
    once: true,
    offset: 100
});

// 3. التحكم في الناف بار عند التمرير + تفعيل الـ Active Link
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // تغيير لون الناف بار
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // ScrollSpy: تحديد اللينك النشط بناءً على السكرول
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// 4. برمجة المنيو للموبايل
const menuBtn = document.querySelector('.menu-toggle');
const sideMenu = document.querySelector('.nav-links');
const allNavLinks = document.querySelectorAll('.nav-links li a');

menuBtn.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
    // تغيير الأيقونة
    const icon = menuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// إغلاق المنيو عند الضغط على أي لينك (مهم للموبايل)
allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        sideMenu.classList.remove('active');
        menuBtn.querySelector('i').classList.add('fa-bars');
        menuBtn.querySelector('i').classList.remove('fa-times');
    });
});

// 5. عداد الأرقام (Counter Animation)
const counters = document.querySelectorAll('.counter');
let counterStarted = false;

function startCounter() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;

        const updateCount = () => {
            const currentCount = +counter.innerText;
            if (currentCount < target) {
                counter.innerText = Math.ceil(currentCount + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });
}

// تشغيل العداد فقط عند الوصول لقسم الإحصائيات
window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const sectionTop = statsSection.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight && !counterStarted) {
            startCounter();
            counterStarted = true;
        }
    }
});

// 6. برمجة الأكورديون (الأسئلة الشائعة)
document.querySelectorAll('.acc-header').forEach(header => {
    header.addEventListener('click', () => {
        const body = header.nextElementSibling;
        const icon = header.querySelector('i');
        
        if (body.style.display === "block") {
            body.style.display = "none";
            icon.style.transform = "rotate(0deg)";
        } else {
            // إغلاق أي سؤال آخر مفتوح
            document.querySelectorAll('.acc-body').forEach(b => b.style.display = "none");
            document.querySelectorAll('.acc-header i').forEach(i => i.style.transform = "rotate(0deg)");
            
            body.style.display = "block";
            icon.style.transform = "rotate(180deg)";
        }
    });
});