/* ============================================================
   DukaMax Website — JavaScript (Animations & Interactions)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar Scroll Effect ----
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ---- Mobile Nav Toggle ----
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = navToggle.querySelector('span');
      if (navLinks.classList.contains('active')) {
        icon.textContent = '✕';
      } else {
        icon.textContent = '☰';
      }
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.querySelector('span').textContent = '☰';
      });
    });
  }

  // ---- Intersection Observer for Scroll Animations ----
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // ---- Animated Counter for Stats ----
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          const prefix = counter.getAttribute('data-prefix') || '';
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = prefix + target.toLocaleString() + suffix;
            }
          };
          updateCounter();
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-bar');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // ---- Phone Mockup Chart Bars Animation ----
  const chartBars = document.querySelectorAll('.chart-bar');
  chartBars.forEach((bar, i) => {
    const heights = [45, 65, 55, 80, 70, 90, 60, 75, 85, 50, 95, 68];
    const h = heights[i % heights.length];
    bar.style.height = '0';
    setTimeout(() => {
      bar.style.transition = `height 1s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.08}s`;
      bar.style.height = h + '%';
    }, 600);
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Parallax Blobs ----
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    document.querySelectorAll('.blob').forEach((blob, i) => {
      const speed = 0.02 + (i * 0.01);
      blob.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });

  // ---- Gallery Filter ----
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (galleryFilterBtns.length > 0) {
    galleryFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        galleryFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Get filter value
        const filterValue = btn.getAttribute('data-filter');

        // Filter and animate items
        galleryItems.forEach((item, index) => {
          const itemCategory = item.getAttribute('data-category');
          
          if (filterValue === 'all' || itemCategory === filterValue) {
            item.classList.remove('hide');
            setTimeout(() => {
              item.style.opacity = '1';
            }, index * 50);
          } else {
            item.style.opacity = '0';
            setTimeout(() => {
              item.classList.add('hide');
            }, 300);
          }
        });
      });
    });
  }

  // ---- Current year in footer ----
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
