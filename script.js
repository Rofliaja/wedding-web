// ==================== WEDDING WEBSITE SCRIPTS ==================== //

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 900,
        easing: 'ease-out-cubic',
        once: false,
        offset: 80
    });

    // 2. Parse Guest Name from URL Parameter (?to=Nama+Tamu or ?nama=... or ?u=...)
    initGuestName();

    // 3. Audio & Cover Unlock Controller
    initCoverAndMusic();

    // 4. Countdown Timer
    initCountdown();

    // 5. Falling Petals Effect
    initPetals();

    // 6. Gallery Lightbox Modal
    initLightbox();

    // 7. RSVP Form & LocalStorage Guestbook
    initGuestBook();

    // 8. Navigation Active State on Scroll
    initScrollSpy();
});

// ==================== GUEST NAME ==================== //
function initGuestName() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to') || urlParams.get('nama') || urlParams.get('u');
    const guestEl = document.getElementById('guest-name');
    const formNameEl = document.getElementById('form-name');

    if (guestParam && guestEl) {
        const decodedName = decodeURIComponent(guestParam).replace(/\+/g, ' ');
        guestEl.textContent = decodedName;
        if (formNameEl) {
            formNameEl.value = decodedName;
        }
    }
}

// ==================== COVER & MUSIC ==================== //
function initCoverAndMusic() {
    const btnOpen = document.getElementById('btn-open-invitation');
    const coverScreen = document.getElementById('cover-screen');
    const musicController = document.getElementById('music-controller');
    const bottomNav = document.getElementById('bottom-nav');
    const audio = document.getElementById('wedding-music');
    const btnMusic = document.getElementById('btn-music');
    const musicIcon = document.getElementById('music-icon');

    let isPlaying = false;

    // Handle "Buka Undangan"
    btnOpen.addEventListener('click', () => {
        // Smooth slide up / fade out cover
        coverScreen.classList.add('opacity-0', 'pointer-events-none', '-translate-y-full');
        
        // Show audio controller & navigation
        setTimeout(() => {
            coverScreen.style.display = 'none';
            musicController.classList.remove('hidden');
            bottomNav.classList.remove('hidden');
            AOS.refresh();
        }, 800);

        // Play audio
        playMusic();

        // Confetti Celebration
        launchConfetti();
    });

    function playMusic() {
        if (!audio) return;
        audio.play().then(() => {
            isPlaying = true;
            musicIcon.classList.remove('spin-paused');
            musicIcon.classList.add('spin-slow');
        }).catch(err => {
            console.log('Autoplay blocked or audio load error:', err);
            isPlaying = false;
        });
    }

    function pauseMusic() {
        if (!audio) return;
        audio.pause();
        isPlaying = false;
        musicIcon.classList.add('spin-paused');
    }

    // Toggle Music
    btnMusic.addEventListener('click', () => {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });
}

// Confetti Effect
function launchConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#b78b58', '#dfc3a2', '#f3a683', '#ffffff']
        });
    }
}

// ==================== COUNTDOWN TIMER ==================== //
function initCountdown() {
    // Target Wedding Date: 24 Oktober 2026 08:00 WIB
    const targetDate = new Date('2026-10-24T08:00:00+07:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateTimer() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// ==================== PETALS ANIMATION ==================== //
function initPetals() {
    const container = document.getElementById('petal-container');
    const petalCount = 15;

    for (let i = 0; i < petalCount; i++) {
        createPetal(container);
    }
}

function createPetal(container) {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    const size = Math.random() * 12 + 10; // 10px - 22px
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.3}px`;
    petal.style.left = `${Math.random() * 100}vw`;
    
    // Varying speeds & delays
    const duration = Math.random() * 8 + 7; // 7s - 15s
    const delay = Math.random() * 10;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;

    // Colors: soft pink to champagne
    const colors = ['#fce7f3', '#ffe4e6', '#fdf2f8', '#fae8ff'];
    petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(petal);
}

// ==================== LIGHTBOX MODAL ==================== //
function initLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-src') || item.querySelector('img').src;
            modalImg.src = imgSrc;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        });
    });

    const closeModal = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        modalImg.src = '';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// ==================== COPY TO CLIPBOARD ==================== //
function copyToClipboard(text, label = 'Teks') {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`${label} berhasil disalin!`);
    }).catch(err => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`${label} berhasil disalin!`);
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    toastMsg.textContent = message;
    
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 2500);
}

// ==================== GUESTBOOK / RSVP ==================== //
const DEFAULT_WISHES = [
    {
        name: "Rizky Fauzi & Keluarga",
        attendance: "Hadir",
        message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khoir. Selamat menempuh hidup baru sahabatku Dimas & Annisa! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
        time: "10 menit yang lalu"
    },
    {
        name: "dr. Amanda Putri",
        attendance: "Hadir",
        message: "Happy wedding Annisa & Dimas! Cantik dan ganteng banget serasi! Lancar sampai hari H yaa sayang.",
        time: "1 jam yang lalu"
    },
    {
        name: "Kevin Pratama (ITB '16)",
        attendance: "Hadir",
        message: "Selamat Dimas & Annisa! Akhirnya berlabuh ke pelaminan. Doa terbaik untuk kalian berdua!",
        time: "3 jam yang lalu"
    }
];

function initGuestBook() {
    const form = document.getElementById('rsvp-form');
    const wishesContainer = document.getElementById('wishes-container');
    const totalWishesEl = document.getElementById('total-wishes');
    const btnWaConfirm = document.getElementById('btn-wa-confirm');

    // Retrieve from LocalStorage or default
    let storedWishes = JSON.parse(localStorage.getItem('wedding_wishes_dimas_annisa'));
    if (!storedWishes || !Array.isArray(storedWishes) || storedWishes.length === 0) {
        storedWishes = DEFAULT_WISHES;
        localStorage.setItem('wedding_wishes_dimas_annisa', JSON.stringify(storedWishes));
    }

    renderWishes(storedWishes);

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('form-name').value.trim();
        const attendance = document.getElementById('form-attendance').value;
        const message = document.getElementById('form-message').value.trim();

        if (!name || !message) return;

        const newWish = {
            name,
            attendance,
            message,
            time: 'Baru saja'
        };

        storedWishes.unshift(newWish);
        localStorage.setItem('wedding_wishes_dimas_annisa', JSON.stringify(storedWishes));

        renderWishes(storedWishes);
        document.getElementById('form-message').value = '';
        
        launchConfetti();
        showToast('Terima kasih atas doa restunya!');
    });

    // WhatsApp Confirmation Handler
    btnWaConfirm.addEventListener('click', () => {
        const name = document.getElementById('form-name').value.trim() || 'Tamu Undangan';
        const attendance = document.getElementById('form-attendance').value;
        const guests = document.getElementById('form-guests').value;
        const message = document.getElementById('form-message').value.trim() || 'Semoga samawa!';

        // Format message
        const waText = `Halo Dimas & Annisa,%0A%0ASaya *${encodeURIComponent(name)}* mengonfirmasi kehadiran untuk pernikahan kalian:%0A- Status: *${encodeURIComponent(attendance)}*%0A- Jumlah: *${encodeURIComponent(guests)}*%0A- Doa & Ucapan: "${encodeURIComponent(message)}"%0A%0ATerima kasih!`;
        
        // Nomor HP Tujuan Mempelai (Format Internasional: 62...)
        const waNumber = '6281234567890';
        window.open(`https://wa.me/${waNumber}?text=${waText}`, '_blank');
    });

    function renderWishes(wishes) {
        wishesContainer.innerHTML = '';
        totalWishesEl.textContent = wishes.length;

        wishes.forEach(item => {
            const card = document.createElement('div');
            card.className = 'p-4 rounded-2xl bg-cream/70 border border-primary/20 text-xs text-darkText space-y-1.5 transition hover:shadow-sm';

            const badgeColor = item.attendance === 'Hadir' 
                ? 'bg-emerald-100 text-emerald-700' 
                : (item.attendance === 'Tidak Hadir' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700');

            card.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <span class="font-bold text-darkText text-sm">${escapeHtml(item.name)}</span>
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeColor}">
                            ${escapeHtml(item.attendance)}
                        </span>
                    </div>
                    <span class="text-[10px] text-mutedText">${escapeHtml(item.time)}</span>
                </div>
                <p class="text-mutedText leading-relaxed pt-1 text-xs">
                    "${escapeHtml(item.message)}"
                </p>
            `;
            wishesContainer.appendChild(card);
        });
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==================== SCROLL SPY NAVIGATION ==================== //
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}
