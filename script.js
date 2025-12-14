// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Toggle icon
    const icon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Theme Switcher
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

// Close mobile menu when a link is clicked
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Typing Effect
const typeEffect = document.querySelector('.type-effect');
const words = ['Video Editor', 'Digital Marketer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typeEffect.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeEffect.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    type();
    setSkillBarWidths();
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Active Link on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// Reveal Animation on Scroll
const revealElements = document.querySelectorAll('.skill-bar, .project-card, .contact-item, .about-text');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initial styles for reveal elements
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);

// Skill Bar Width Animation
function setSkillBarWidths() {
    const skillMap = {
        html: '95%',
        css: '90%',
        js: '85%',
        react: '80%',
        php: '75%',
        comm: '90%',
        team: '85%',
        problem: '95%',
        create: '85%'
    };
    Object.entries(skillMap).forEach(([cls, width]) => {
        const el = document.querySelector(`.skill-bar .bar span.${cls}`);
        if (el) {
            el.style.width = width;
        }
    });
}
// Trigger once on load
revealOnScroll();

// Three.js 3D Background Animation
function initThreeJS() {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 400 : 1400;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
        new THREE.Color(0x8b5cf6), // violet
        new THREE.Color(0xec4899), // fuchsia
        new THREE.Color(0x22d3ee), // cyan
        new THREE.Color(0xf59e0b), // amber
        new THREE.Color(0x34d399)  // emerald
    ];
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 20;
        positions[i3 + 1] = (Math.random() - 0.5) * 12;
        positions[i3 + 2] = (Math.random() - 0.5) * 10;
        velocities[i3] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
        const base = palette[Math.floor(Math.random() * palette.length)].clone();
        base.offsetHSL((Math.random() - 0.5) * 0.04, 0, (Math.random() - 0.5) * 0.1);
        colors[i3] = base.r;
        colors[i3 + 1] = base.g;
        colors[i3 + 2] = base.b;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({ size: 0.06, sizeAttenuation: true, transparent: true, opacity: 0.85, vertexColors: true });
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    camera.position.z = 5;
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', e => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    function animate() {
        requestAnimationFrame(animate);
        const pos = geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            pos[i3] += velocities[i3] + mouseX * 0.003;
            pos[i3 + 1] += velocities[i3 + 1] - mouseY * 0.003;
            pos[i3 + 2] += velocities[i3 + 2];
            if (pos[i3] > 12 || pos[i3] < -12) velocities[i3] *= -1;
            if (pos[i3 + 1] > 8 || pos[i3 + 1] < -8) velocities[i3 + 1] *= -1;
            if (pos[i3 + 2] > 8 || pos[i3 + 2] < -8) velocities[i3 + 2] *= -1;
        }
        geometry.attributes.position.needsUpdate = true;
        points.rotation.y += 0.0006;
        renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}


document.addEventListener('DOMContentLoaded', initThreeJS);

// ============================================
// GSAP ANIMATIONS
// ============================================

// Initialize all GSAP animations
function initGSAPAnimations() {
    // Hero Section Animations - On Page Load
    const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTimeline
        .from('.hero-content .subtitle', {
            opacity: 0,
            y: 30,
            duration: 0.8
        })
        .from('.hero-content h1', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power4.out"
        }, "-=0.4")
        .from('.hero-content h3', {
            opacity: 0,
            y: 30,
            duration: 0.8
        }, "-=0.6")
        .from('.hero-content p', {
            opacity: 0,
            y: 30,
            duration: 0.8
        }, "-=0.5")
        /* .from('.hero-btns .btn', {
            opacity: 0,
            y: 20,
            stagger: 0.2,
            duration: 0.6
        }, "-=0.4") */
        .from('.social-links a', {
            opacity: 0,
            scale: 0,
            stagger: 0.1,
            duration: 0.5
        }, "-=0.3")
        .from('.hero-img .img-container', {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: "back.out(1.7)"
        }, "-=1");

    // Navbar Animation
    gsap.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // Section Title Animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title.querySelector('h2'), {
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from(title.querySelector('.line'), {
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            width: 0,
            duration: 0.8,
            delay: 0.3,
            ease: "power2.out"
        });
    });

    // About Section Animations
    gsap.from('.about-text h3', {
        scrollTrigger: {
            trigger: '.about-text',
            start: "top 75%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.8
    });

    gsap.from('.about-text p', {
        scrollTrigger: {
            trigger: '.about-text',
            start: "top 75%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.8,
        delay: 0.2
    });

    gsap.from('.info-item', {
        scrollTrigger: {
            trigger: '.info-list',
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        delay: 0.3
    });

    // Timeline Items Animation (Education & Experience)
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        const isEven = index % 2 === 0;

        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            x: isEven ? -100 : 100,
            duration: 1,
            ease: "power3.out"
        });

        // Animate timeline icon
        gsap.from(item.querySelector('.timeline-icon'), {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            scale: 0,
            duration: 0.5,
            delay: 0.3,
            ease: "back.out(2)"
        });

        // Animate timeline logo
        const logo = item.querySelector('.timeline-logo');
        if (logo) {
            gsap.from(logo, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                scale: 0,
                rotation: 360,
                duration: 0.8,
                delay: 0.5,
                ease: "back.out(1.7)"
            });
        }
    });

    // Skills Section Animations
    gsap.utils.toArray('.skills-column').forEach((column, index) => {
        gsap.from(column.querySelector('.skills-title'), {
            scrollTrigger: {
                trigger: column,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 30,
            duration: 0.8
        });

        const skillBars = column.querySelectorAll('.skill-bar');
        skillBars.forEach((bar, i) => {
            // Animate skill bar container
            gsap.from(bar, {
                scrollTrigger: {
                    trigger: bar,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                x: index === 0 ? -50 : 50,
                duration: 0.6,
                delay: i * 0.1
            });

            // Animate skill bar fill
            const barFill = bar.querySelector('.bar span');
            if (barFill) {
                gsap.from(barFill, {
                    scrollTrigger: {
                        trigger: bar,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    width: 0,
                    duration: 1.5,
                    delay: 0.3 + (i * 0.1),
                    ease: "power2.out"
                });
            }
        });
    });

    // Projects Section Animations
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out"
        });

        // Add hover animation enhancement
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -15,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    gsap.utils.toArray('.yt-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 40,
            duration: 0.7,
            delay: index * 0.1,
            ease: "power3.out"
        });
    });

    // Contact Section Animations
    gsap.from('.contact-item', {
        scrollTrigger: {
            trigger: '.contact-info',
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        x: -50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
    });

    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-form',
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from('.contact-map', {
        scrollTrigger: {
            trigger: '.contact-map',
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out"
    });

    // Form Fields Animation
    gsap.utils.toArray('.form-group').forEach((group, index) => {
        gsap.from(group, {
            scrollTrigger: {
                trigger: '.contact-form',
                start: "top 75%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 20,
            duration: 0.6,
            delay: 0.5 + (index * 0.1),
            ease: "power2.out"
        });
    });

    // Footer Animation
    gsap.from('footer', {
        scrollTrigger: {
            trigger: 'footer',
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.8
    });



    // Smooth scroll behavior
    gsap.utils.toArray('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 70
                    },
                    ease: "power3.inOut"
                });
            }
        });
    });
}

// Initialize GSAP animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initGSAPAnimations();
    const grid = document.querySelector('.projects-grid');
    if (grid) {
        let active = true;
        let raf;
        const speed = 0.6;
        function loop() {
            if (!active) return;
            grid.scrollLeft += speed;
            if (grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 1) {
                grid.scrollLeft = 0;
            }
            raf = requestAnimationFrame(loop);
        }
        grid.addEventListener('mouseenter', () => {
            active = false;
            if (raf) cancelAnimationFrame(raf);
        });
        grid.addEventListener('mouseleave', () => {
            if (!active) {
                active = true;
                loop();
            }
        });
        loop();
    }

    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeBtn = modal ? modal.querySelector('.modal-close') : null;
    const cardVideos = document.querySelectorAll('.project-img video');
    function openModal(src) {
        if (!modal || !modalVideo) return;
        modal.classList.add('open');
        modalVideo.src = src;
        modalVideo.muted = false;
        modalVideo.currentTime = 0;
        const g = document.querySelector('.projects-grid');
        if (g) g.dispatchEvent(new Event('mouseenter'));
        modalVideo.play().catch(() => { });
    }
    function closeModal() {
        if (!modal || !modalVideo) return;
        modal.classList.remove('open');
        modalVideo.pause();
        modalVideo.src = '';
        const g = document.querySelector('.projects-grid');
        if (g) g.dispatchEvent(new Event('mouseleave'));
    }
    cardVideos.forEach(v => {
        v.addEventListener('click', () => {
            const overlay = v.parentElement.querySelector('.project-overlay');
            if (overlay) overlay.classList.add('open');
        });
    });
    const viewButtons = document.querySelectorAll('.view-video-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            const src = btn.getAttribute('data-src');
            openModal(src);
        });
    });
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target === modal) closeModal();
        });
    }
    document.addEventListener('click', e => {
        if (!e.target.closest('.project-card')) {
            document.querySelectorAll('.project-overlay.open').forEach(o => o.classList.remove('open'));
        }
    });
    window.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeModal();
            closeYouTubeModal();
        }
    });



    // Force autoplay for project videos to ensure they play
    const projectVideos = document.querySelectorAll('.project-img video');
    projectVideos.forEach(video => {
        video.muted = true;
        video.play().catch(e => console.log("Autoplay failed:", e));
    });
});

// Resume Modal Functions
function openResumeModal(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeResumeModal() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Certificate Modal Functions
function openCertificateModal(imageSrc) {
    const modal = document.getElementById('certificateModal');
    const certImage = document.getElementById('certImage');
    const downloadBtn = document.getElementById('certDownloadBtn');

    if (modal && certImage && downloadBtn) {
        modal.style.display = 'flex';
        certImage.src = imageSrc;
        downloadBtn.href = imageSrc;
        document.body.style.overflow = 'hidden';
    }
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        setTimeout(() => {
            document.getElementById('certImage').src = '';
        }, 200);
    }
}


// YouTube Modal Functions
const ytProjects = [
    { id: 'OJIoOrVoy04', title: 'Daily Market Update Reel' },
    { id: '8XGDaQrdvUY', title: 'Finance Explainer Clip' },
    { id: 'oJ7tBc-AuLM', title: 'Social Campaign Highlight' },
    { id: 'tEc0hCQHxHw', title: 'Faceless YouTube Automation' }
];

function openYouTubeModal(videoId) {
    const modal = document.getElementById('youtubeModal');
    const iframe = document.getElementById('youtubeFrame');
    const watchBtn = document.getElementById('ytWatchBtn');

    if (modal && iframe && watchBtn) {
        modal.style.display = 'flex'; // Use flex to center content

        // Load passed video or default to first
        const currentId = videoId || ytProjects[0].id;
        loadVideo(currentId);
        renderPlaylist(currentId);
    }
}

function loadVideo(id) {
    const iframe = document.getElementById('youtubeFrame');
    const watchBtn = document.getElementById('ytWatchBtn');
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
    watchBtn.href = `https://www.youtube.com/watch?v=${id}`;

    // Update active class in playlist
    document.querySelectorAll('.playlist-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.id === id) item.classList.add('active');
    });
}

function renderPlaylist(activeId) {
    const container = document.getElementById('ytPlaylist');
    if (!container) return;

    container.innerHTML = ytProjects.map(video => `
        <div class="playlist-item ${video.id === activeId ? 'active' : ''}" 
             onclick="loadVideo('${video.id}')" 
             data-id="${video.id}">
            <div class="playlist-thumb">
                <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="Thumb">
            </div>
            <div class="playlist-meta">
                <h4>${video.title}</h4>
            </div>
        </div>
    `).join('');
}

function closeYouTubeModal() {
    const modal = document.getElementById('youtubeModal');
    const iframe = document.getElementById('youtubeFrame');

    if (modal && iframe) {
        modal.style.display = 'none';
        iframe.src = '';
    }
}
