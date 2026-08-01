/**
 * University of Bisha - Main JavaScript Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Navigation
  const headerWrapper = document.querySelector('.header-wrapper');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      headerWrapper?.classList.add('sticky');
    } else {
      headerWrapper?.classList.remove('sticky');
    }

    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('active');
    } else {
      backToTopBtn?.classList.remove('active');
    }
  });

  // Back to top scroll click
  backToTopBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 2. Mobile Menu Toggle Drawer
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileClose = document.querySelector('.mobile-drawer-close');

  const openMobileMenu = () => {
    mobileDrawer?.classList.add('active');
    mobileOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    mobileDrawer?.classList.remove('active');
    mobileOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  mobileToggle?.addEventListener('click', openMobileMenu);
  mobileClose?.addEventListener('click', closeMobileMenu);
  mobileOverlay?.addEventListener('click', closeMobileMenu);

  // 3. Events Slider Controls
  const sliderTrack = document.querySelector('.events-slider-track');
  const prevBtn = document.querySelector('.arrow-btn-prev');
  const nextBtn = document.querySelector('.arrow-btn-next');

  if (sliderTrack) {
    const scrollAmount = 360;

    prevBtn?.addEventListener('click', () => {
      // In RTL: prev (right arrow) scrolls right (+scrollAmount)
      sliderTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    nextBtn?.addEventListener('click', () => {
      // In RTL: next (left arrow) scrolls left (-scrollAmount)
      sliderTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  // 4. Statistics Animated Counter
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const duration = 2000;
      const step = Math.ceil(target / (duration / 16));

      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          stat.textContent = target.toLocaleString('ar-SA');
          clearInterval(timer);
        } else {
          stat.textContent = current.toLocaleString('ar-SA');
        }
      }, 16);
    });
  };

  const statsSection = document.querySelector('.statistics');
  if (statsSection && statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        animateCounters();
      }
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }
});

