/**
 * University of Bisha - Main JavaScript Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Navigation & Back to Top
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

  // 2. Accessibility & Display Settings Panel Logic
  const settingsToggleBtn = document.getElementById('settingsToggleBtn');
  const settingsPanel = document.getElementById('settingsPanel');
  const settingsPanelClose = document.getElementById('settingsPanelClose');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeToggleText = document.getElementById('themeToggleText');
  const mobileThemeToggleBtn = document.querySelector('.theme-toggle-btn-mobile');

  // Toggle Settings Panel Dropdown
  const toggleSettingsPanel = () => {
    settingsPanel?.classList.toggle('active');
  };

  settingsToggleBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSettingsPanel();
  });

  settingsPanelClose?.addEventListener('click', () => {
    settingsPanel?.classList.remove('active');
  });

  // Close panel on clicking outside
  document.addEventListener('click', (e) => {
    if (settingsPanel && !settingsPanel.contains(e.target) && e.target !== settingsToggleBtn) {
      settingsPanel.classList.remove('active');
    }
  });

  // Dark Mode Theme Controller
  const applyTheme = (isDark) => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeToggleText) themeToggleText.textContent = 'إلغاء الوضع الداكن';
      if (themeToggleBtn) themeToggleBtn.querySelector('i').className = 'fa-solid fa-sun';
      if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.querySelector('i').className = 'fa-solid fa-sun';
        mobileThemeToggleBtn.querySelector('span').textContent = 'الوضع المضيء';
      }
      localStorage.setItem('ub_theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeToggleText) themeToggleText.textContent = 'تفعيل الوضع الداكن';
      if (themeToggleBtn) themeToggleBtn.querySelector('i').className = 'fa-solid fa-moon';
      if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.querySelector('i').className = 'fa-solid fa-moon';
        mobileThemeToggleBtn.querySelector('span').textContent = 'الوضع الداكن';
      }
      localStorage.setItem('ub_theme', 'light');
    }
  };

  // Saved theme preference restoration
  const savedTheme = localStorage.getItem('ub_theme');
  if (savedTheme === 'dark') {
    applyTheme(true);
  }

  const toggleDarkTheme = () => {
    const isCurrentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
    applyTheme(!isCurrentlyDark);
  };

  themeToggleBtn?.addEventListener('click', toggleDarkTheme);
  mobileThemeToggleBtn?.addEventListener('click', toggleDarkTheme);

  // Font Size Resizing Logic
  const fontDecBtns = [document.getElementById('fontDecrease'), document.getElementById('mobileFontDec')];
  const fontResetBtns = [document.getElementById('fontReset'), document.getElementById('mobileFontReset')];
  const fontIncBtns = [document.getElementById('fontIncrease'), document.getElementById('mobileFontInc')];

  const updateFontScale = (scale) => {
    document.documentElement.style.setProperty('--font-scale', scale);
    localStorage.setItem('ub_font_scale', scale);

    // Update active classes on font buttons
    [...fontDecBtns, ...fontResetBtns, ...fontIncBtns].forEach(btn => btn?.classList.remove('active'));
    if (scale === 0.9) fontDecBtns.forEach(btn => btn?.classList.add('active'));
    else if (scale === 1.15) fontIncBtns.forEach(btn => btn?.classList.add('active'));
    else fontResetBtns.forEach(btn => btn?.classList.add('active'));
  };

  fontDecBtns.forEach(btn => btn?.addEventListener('click', () => updateFontScale(0.9)));
  fontResetBtns.forEach(btn => btn?.addEventListener('click', () => updateFontScale(1)));
  fontIncBtns.forEach(btn => btn?.addEventListener('click', () => updateFontScale(1.15)));

  // Saved font scale restoration
  const savedFontScale = parseFloat(localStorage.getItem('ub_font_scale'));
  if (savedFontScale) {
    updateFontScale(savedFontScale);
  }

  // 3. Mobile Menu & Accordion Navigation Drawer
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

  // Accordion Toggle inside Mobile Drawer
  const accordionHeaders = document.querySelectorAll('.mobile-accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement;
      const isActive = accordionItem.classList.contains('active');

      // Close other accordion items
      document.querySelectorAll('.mobile-accordion-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle clicked item
      if (!isActive) {
        accordionItem.classList.add('active');
      }
    });
  });

  // 4. Events Slider Controls & Touch Swipe Support
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

    // Touch Swipe Event Support for iPad & Mobile
    let isDown = false;
    let startX;
    let scrollLeft;

    sliderTrack.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - sliderTrack.offsetLeft;
      scrollLeft = sliderTrack.scrollLeft;
    });

    sliderTrack.addEventListener('mouseleave', () => {
      isDown = false;
    });

    sliderTrack.addEventListener('mouseup', () => {
      isDown = false;
    });

    sliderTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - sliderTrack.offsetLeft;
      const walk = (x - startX) * 2;
      sliderTrack.scrollLeft = scrollLeft - walk;
    });
  }

  // 5. Statistics Animated Counter
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


