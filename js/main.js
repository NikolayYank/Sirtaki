/* ============================================
   RESTAURANT SIRTAKI - MAIN SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---------- MOBILE MENU ----------
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('active');
      body.classList.toggle('menu-open');

      // Animate hamburger icon
      const spans = menuToggle.querySelectorAll('span');
      if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        body.classList.remove('menu-open');

        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // ---------- HEADER SCROLL EFFECT ----------
  const header = document.querySelector('.header');

  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ---------- LIGHTBOX FOR GALLERY ----------
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-content img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (galleryItems.length > 0 && lightbox) {
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        const img = this.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('active');
          body.classList.add('lightbox-open');
        }
      });
    });

    // Close lightbox
    if (lightboxClose) {
      lightboxClose.addEventListener('click', function () {
        lightbox.classList.remove('active');
        body.classList.remove('lightbox-open');
      });
    }

    // Close on background click
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        body.classList.remove('lightbox-open');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        body.classList.remove('lightbox-open');
      }
    });
  }

  // ---------- GALLERY SLIDERS (Mobile) ----------
  const sliders = document.querySelectorAll('.gallery-slider');

  sliders.forEach(function (slider) {
    const sliderName = slider.getAttribute('data-slider');
    const dotsContainer = document.querySelector('[data-dots="' + sliderName + '"]');
    const slides = slider.querySelectorAll('.gallery-slide');

    if (!dotsContainer || slides.length === 0) return;

    // Create dots
    slides.forEach(function (_, index) {
      const dot = document.createElement('button');
      dot.classList.add('slider-dot');
      dot.setAttribute('aria-label', 'Slide ' + (index + 1));
      if (index === 0) dot.classList.add('active');

      dot.addEventListener('click', function () {
        const slideWidth = slides[0].offsetWidth;
        const gap = parseInt(getComputedStyle(slider).gap) || 16;
        slider.scrollTo({
          left: index * (slideWidth + gap),
          behavior: 'smooth'
        });
      });

      dotsContainer.appendChild(dot);
    });

    // Update dots on scroll
    let scrollTimeout;
    slider.addEventListener('scroll', function () {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        const slideWidth = slides[0].offsetWidth;
        const gap = parseInt(getComputedStyle(slider).gap) || 16;
        const currentIndex = Math.round(slider.scrollLeft / (slideWidth + gap));
        const dots = dotsContainer.querySelectorAll('.slider-dot');

        dots.forEach(function (dot, i) {
          dot.classList.toggle('active', i === currentIndex);
        });
      }, 50);
    });
  });

  // ---------- HIDE FIXED CTA NEAR FOOTER ----------
  const fixedCta = document.querySelector('.mobile-fixed-cta');
  const footer = document.querySelector('.footer');

  if (fixedCta && footer) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          fixedCta.style.opacity = '0';
          fixedCta.style.pointerEvents = 'none';
        } else {
          fixedCta.style.opacity = '1';
          fixedCta.style.pointerEvents = 'auto';
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(footer);

    // Add transition for smooth fade
    fixedCta.style.transition = 'opacity 0.3s ease';
  }

  // ---------- HORIZONTAL MENU SLIDER ----------
  const menuSlider = document.querySelector('.menu-slider');
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuDots = document.querySelectorAll('.menu-dot');
  const menuTabsContainer = document.querySelector('.menu-tabs');

  if (menuSlider && menuTabs.length > 0) {
    // Tab click → scroll to slide
    menuTabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        const slides = menuSlider.querySelectorAll('.menu-slide');
        if (slides[index]) {
          menuSlider.scrollTo({
            left: index * menuSlider.offsetWidth,
            behavior: 'smooth'
          });
        }
      });
    });

    // Dot click → scroll to slide
    menuDots.forEach(function (dot, index) {
      dot.addEventListener('click', function () {
        menuSlider.scrollTo({
          left: index * menuSlider.offsetWidth,
          behavior: 'smooth'
        });
      });
    });

    // On slider scroll → update active tab & dot
    let menuScrollTimeout;
    menuSlider.addEventListener('scroll', function () {
      clearTimeout(menuScrollTimeout);
      menuScrollTimeout = setTimeout(function () {
        const currentIndex = Math.round(menuSlider.scrollLeft / menuSlider.offsetWidth);

        // Update tabs
        menuTabs.forEach(function (tab, i) {
          tab.classList.toggle('active', i === currentIndex);
        });

        // Update dots
        menuDots.forEach(function (dot, i) {
          dot.classList.toggle('active', i === currentIndex);
        });

        // Scroll the tabs container to make active tab visible
        if (menuTabsContainer && menuTabs[currentIndex]) {
          const activeTab = menuTabs[currentIndex];
          const tabLeft = activeTab.offsetLeft;
          const tabWidth = activeTab.offsetWidth;
          const containerWidth = menuTabsContainer.offsetWidth;
          const scrollLeft = menuTabsContainer.scrollLeft;

          // If tab is out of view, scroll tabs container
          if (tabLeft < scrollLeft || tabLeft + tabWidth > scrollLeft + containerWidth) {
            menuTabsContainer.scrollTo({
              left: tabLeft - containerWidth / 2 + tabWidth / 2,
              behavior: 'smooth'
            });
          }
        }
      }, 30);
    });

    // Handle URL hash → scroll to target slide on page load
    function scrollToHashSlide() {
      const hash = window.location.hash;
      if (!hash) return;

      const targetSlide = document.querySelector(hash);
      if (!targetSlide || !targetSlide.classList.contains('menu-slide')) return;

      const slides = menuSlider.querySelectorAll('.menu-slide');
      let targetIndex = -1;
      slides.forEach(function (slide, i) {
        if (slide === targetSlide) targetIndex = i;
      });

      if (targetIndex < 0) return;

      // Small delay to ensure layout is ready
      setTimeout(function () {
        menuSlider.scrollTo({
          left: targetIndex * menuSlider.offsetWidth,
          behavior: 'auto'
        });

        // Update tabs
        menuTabs.forEach(function (tab, i) {
          tab.classList.toggle('active', i === targetIndex);
        });

        // Update dots
        menuDots.forEach(function (dot, i) {
          dot.classList.toggle('active', i === targetIndex);
        });

        // Scroll tab bar
        if (menuTabsContainer && menuTabs[targetIndex]) {
          const activeTab = menuTabs[targetIndex];
          menuTabsContainer.scrollTo({
            left: activeTab.offsetLeft - menuTabsContainer.offsetWidth / 2 + activeTab.offsetWidth / 2,
            behavior: 'auto'
          });
        }
      }, 100);
    }

    scrollToHashSlide();

    // Also handle hash change while on the page
    window.addEventListener('hashchange', scrollToHashSlide);
  }

  // ---------- PREVENT BODY SCROLL WHEN MENU/LIGHTBOX OPEN ----------
  const style = document.createElement('style');
  style.textContent = `
    body.menu-open,
    body.lightbox-open {
      overflow: hidden;
    }
    
    .header.scrolled {
      background-color: rgba(28, 46, 74, 0.98);
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
  `;
  document.head.appendChild(style);

});
