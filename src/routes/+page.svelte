<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";

  gsap.registerPlugin(ScrollTrigger);

  let isMenuOpen = false;
  let isScrolled = false;
  let isMobileMenuOpen = false;

  let studentsCount = 0;
  let placementCount = 0;
  let partnersCount = 0;
  let experienceCount = 0;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/schemes", label: "Schemes" },
    { href: "/contact", label: "Contact" },
  ];

  // Add a function to handle hero animations
  function animateHero() {
    if (!browser) return;

    // Kill any existing animations
    gsap.killTweensOf([
      ".hero-title",
      ".hero-description",
      ".hero-buttons",
      ".hero-image-wrapper",
      ".hero-image-overlay",
    ]);

    // Create a single timeline for all animations
    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out",
        duration: 0.8,
      },
    });

    // Set initial states
    tl.set([".hero-title", ".hero-description", ".hero-buttons"], {
      opacity: 0,
      y: 20,
    })
      .set(".hero-image-wrapper", {
        opacity: 0,
        scale: 0.95,
      })
      .set(".hero-image-overlay", {
        opacity: 1,
      });

    // Animate elements
    tl.to(".hero-title", {
      opacity: 1,
      y: 0,
    })
      .to(
        ".hero-description",
        {
          opacity: 1,
          y: 0,
        },
        "-=0.6"
      )
      .to(
        ".hero-buttons",
        {
          opacity: 1,
          y: 0,
        },
        "-=0.6"
      )
      .to(
        ".hero-image-wrapper",
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
        },
        "-=0.4"
      )
      .to(
        ".hero-image-overlay",
        {
          opacity: 0,
          duration: 1,
        },
        "-=0.8"
      );

    return tl;
  }

  // Subscribe to route changes and trigger animation
  $: if (browser && $page.url.pathname === "/") {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const tl = animateHero();
      // Force completion of timeline to ensure elements are visible
      tl?.progress(1);
      // Then restart the animation
      tl?.restart();
    }, 100);
  }

  onMount(() => {
    if (!browser) return;

    // Handle scroll for navbar
    window.addEventListener("scroll", () => {
      isScrolled = window.scrollY > 50;
    });

    // Initial hero animation
    animateHero();

    // Stats counter animation
    const stats = [
      { el: "#students-count", value: 2487 },
      { el: "#placement-count", value: 97 },
      { el: "#partners-count", value: 73 },
      { el: "#experience-count", value: 16 },
    ];

    stats.forEach(({ el, value }) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
        innerHTML: value,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: "power2.out",
      });
    });

    // Services animation with stagger and scale
    gsap.from(".card", {
      scrollTrigger: {
        trigger: "#services",
        start: "top center",
        once: true,
      },
      y: 100,
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)",
    });

    // Testimonials slide-in animation
    gsap.from(".testimonial", {
      scrollTrigger: {
        trigger: ".testimonials",
        start: "top 80%",
        once: true,
      },
      x: -100,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
    });

    // Video cards animation
    gsap.from(".video-card", {
      scrollTrigger: {
        trigger: ".video-card",
        start: "top 80%",
        once: true,
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
    });

    // Add smooth scrolling for scheme cards
    const schemesContainer = document.querySelector(".schemes-container");
    if (schemesContainer) {
      const cards = schemesContainer.querySelectorAll(".card");
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          const scrollElement = schemesContainer.querySelector(
            ".animate-scroll"
          ) as HTMLElement;
          if (scrollElement) {
            scrollElement.style.animationPlayState = "paused";
          }
        });
        card.addEventListener("mouseleave", () => {
          const scrollElement = schemesContainer.querySelector(
            ".animate-scroll"
          ) as HTMLElement;
          if (scrollElement) {
            scrollElement.style.animationPlayState = "running";
          }
        });
      });
    }

    // Update counter animations
    const animateValue = (
      id: string,
      start: number,
      end: number,
      duration: number
    ) => {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);

        switch (id) {
          case "students-count":
            studentsCount = value;
            break;
          case "placement-count":
            placementCount = value;
            break;
          case "partners-count":
            partnersCount = value;
            break;
          case "experience-count":
            experienceCount = value;
            break;
        }

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateValue("students-count", 0, 7500, 2000);
          animateValue("placement-count", 0, 95, 2000);
          animateValue("partners-count", 0, 50, 2000);
          animateValue("experience-count", 0, 15, 2000);
          observer.unobserve(entry.target);
        }
      });
    });

    const statsSection = document.querySelector(".stat-item");
    if (statsSection) {
      observer.observe(statsSection);
    }
  });
</script>

<!-- Hero Section -->
<section class="relative h-[500px] md:h-[800px] overflow-visible">
  <!-- Video Background -->
  <div class="absolute inset-0 z-0">
    <video
      class="w-full h-full object-cover opacity-40"
      autoplay
      loop
      muted
      playsinline
    >
      <source src="/videos/home-video.webm" type="video/webm" />
    </video>
    <div
      class="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80"
    ></div>
  </div>

  <div class="container relative z-10 h-full flex items-center">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div class="hero-content">
        <h1
          class="hero-title text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight"
        >
          Empowering <span class="text-accent">Digital</span> Futures
        </h1>
        <p
          class="hero-description text-base md:text-lg mb-8 text-white/80 leading-relaxed max-w-2xl font-light"
        >
          Master the skills that drive tomorrow's digital economy with BNG
          Solutions. Expert-led training for your professional growth and
          success.
        </p>
        <div class="hero-buttons flex flex-col sm:flex-row gap-6">
          <a
            href="/services"
            class="inline-block px-6 py-3 bg-accent text-white hover:bg-accent/90 transition-all duration-300 rounded-full font-semibold text-center text-base"
          >
            Explore Courses
          </a>
          <a
            href="/contact"
            class="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 transition-all duration-300 rounded-full font-semibold text-center text-base"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  </div>
  <div
    class="hero-image hidden md:block"
    style="position: absolute; width: 35em;  z-index: 40; top: 12em; left: 50%; transform: translateY(100px);"
  >
    <div
      class="hero-image-wrapper aspect-square rounded-full overflow-hidden border-8 border-white/20 shadow-2xl relative"
    >
      <div
        class="hero-image-overlay absolute inset-0 bg-gradient-to-tr from-white via-white/50 to-transparent z-10"
      ></div>
      <img
        src="/images/hero-image.webp"
        alt="Business professionals collaborating"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
  <!-- 15+ years badge -->
  <div
    class="hidden md:flex absolute left-[85%] bottom-10 translate-y-1/2 w-32 h-32 rounded-full bg-accent items-center justify-center text-white font-bold text-2xl shadow-2xl z-50"
    style="transform: translateY(50%);"
  >
    15+ Years
  </div>

  <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
    <a
      href="#services"
      class="text-white/80 hover:text-white transition-colors"
      aria-label="Scroll to services section"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 animate-bounce"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </a>
  </div>
</section>

<!-- Services Section -->
<section
  id="services"
  class="section bg-background py-20 relative"
  style="margin-top: -80px; padding-top: 120px; z-index: 10;"
>
  <div class="container">
    <div class="text-center mb-16">
      <h2 class="section-title">
        Our <span class="gradient-text">Services</span>
      </h2>
      <p class="section-subtitle">
        Comprehensive training programs designed to equip you with
        industry-relevant skills and knowledge.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Computer Operations -->
      <div
        class="card bg-white shadow-lg rounded-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        <div
          class="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 transform transition-transform group-hover:rotate-6"
        >
          <svg
            class="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-primary mb-4">
          Computer Operations
        </h3>
        <p class="text-gray-600 mb-6">
          Master essential computer skills, software applications, and digital
          tools to excel in today's technology-driven workplace.
        </p>
        <a
          href="/services#computer"
          class="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors"
        >
          Learn More
          <svg
            class="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>

      <!-- Stitching Training -->
      <div
        class="card bg-white shadow-lg rounded-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        <div
          class="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 transform transition-transform group-hover:rotate-6"
        >
          <svg
            class="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
            />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-primary mb-4">Stitching Training</h3>
        <p class="text-gray-600 mb-6">
          Develop professional stitching skills with hands-on training and
          industry-standard techniques.
        </p>
        <a
          href="/services#stitching"
          class="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors"
        >
          Learn More
          <svg
            class="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>

      <!-- Placement Assistance -->
      <div
        class="card bg-white shadow-lg rounded-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        <div
          class="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 transform transition-transform group-hover:rotate-6"
        >
          <svg
            class="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-primary mb-4">
          Placement Assistance
        </h3>
        <p class="text-gray-600 mb-6">
          Get connected with leading companies and secure your dream job with
          our comprehensive placement support.
        </p>
        <a
          href="/services#placement"
          class="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors"
        >
          Learn More
          <svg
            class="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Video Showcase Section -->
<section
  class="section bg-gradient-to-br from-primary to-secondary text-white py-20"
>
  <div class="container">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold mb-4">Experience Our Training Programs</h2>
      <p class="text-xl text-white/90">
        Get a glimpse of our state-of-the-art facilities and training methods.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-12">
      <!-- Video cards with same styling -->
      <div
        class="video-card bg-white/10 rounded-xl p-6 backdrop-blur-sm transform transition-all duration-300 hover:scale-105"
      >
        <div class="rounded-2xl overflow-hidden shadow-2xl">
          <video
            class="w-full aspect-video object-cover"
            controls
            poster="/images/laptop.webp"
          >
            <source
              src="/videos/2058803-hd_1920_1080_25fps.webm"
              type="video/webm"
            />
            <track
              kind="captions"
              src="/videos/computer-training-captions.vtt"
              label="English captions"
              srclang="en"
              default
            />
          </video>
        </div>
        <h3 class="text-2xl font-bold mt-6 mb-2">Computer Training</h3>
        <p class="text-white">
          Modern computer labs equipped with the latest software and technology.
        </p>
      </div>

      <div
        class="video-card bg-white/10 rounded-xl p-6 backdrop-blur-sm transform transition-all duration-300 hover:scale-105"
      >
        <div class="rounded-2xl overflow-hidden shadow-2xl">
          <video
            class="w-full aspect-video object-cover"
            controls
            poster="/images/agency.webp"
          >
            <source
              src="/videos/6459959-hd_1080_1920_30fps.webm"
              type="video/webm"
            />
            <track
              kind="captions"
              src="/videos/stitching-workshop-captions.vtt"
              label="English captions"
              srclang="en"
              default
            />
          </video>
        </div>
        <h3 class="text-2xl font-bold mt-6 mb-2">Stitching Workshop</h3>
        <p class="text-white">
          Hands-on training with industry-standard stitching equipment.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Stats Section -->
<section class="section bg-gradient-primary text-white py-16">
  <div class="container">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
      <div class="stat-item animate-fadeIn" style="animation-delay: 0.1s">
        <div class="text-5xl font-bold mb-2">
          <span>{studentsCount}</span><span class="text-accent">+</span>
        </div>
        <div class="text-xl text-blue-100">Students Trained</div>
      </div>
      <div class="stat-item animate-fadeIn" style="animation-delay: 0.2s">
        <div class="text-5xl font-bold mb-2">
          <span>{placementCount}</span><span class="text-accent">%</span>
        </div>
        <div class="text-xl text-blue-100">Placement Rate</div>
      </div>
      <div class="stat-item animate-fadeIn" style="animation-delay: 0.3s">
        <div class="text-5xl font-bold mb-2">
          <span>{partnersCount}</span><span class="text-accent">+</span>
        </div>
        <div class="text-xl text-blue-100">Partner Companies</div>
      </div>
      <div class="stat-item animate-fadeIn" style="animation-delay: 0.4s">
        <div class="text-5xl font-bold mb-2">
          <span>{experienceCount}</span><span class="text-accent">+</span>
        </div>
        <div class="text-xl text-blue-100">Years Experience</div>
      </div>
    </div>
  </div>
</section>

<!-- Government Schemes Section -->
<section class="section overflow-hidden">
  <div class="container">
    <div class="text-center mb-16">
      <h2 class="section-title">
        Government <span class="gradient-text">Schemes</span>
      </h2>
      <p class="section-subtitle">
        We are proud partners of various government skill development
        initiatives to make quality training accessible to all.
      </p>
    </div>

    <div class="schemes-container-wrapper relative">
      <div class="schemes-container overflow-x-auto pb-6">
        <div class="flex gap-8 animate-scroll">
          <div class="card min-w-[320px] bg-white p-6 rounded-xl shadow-lg">
            <div class="text-accent mb-4">
              <svg
                class="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-primary mb-4">PMKVY</h3>
            <p class="text-text-light mb-6">
              Pradhan Mantri Kaushal Vikas Yojana - A flagship scheme for skill
              training of youth. Free training with certification.
            </p>
            <a
              href="/schemes#pmkvy"
              class="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors"
            >
              Learn More
              <svg
                class="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>

          <div class="card min-w-[320px] bg-white p-6 rounded-xl shadow-lg">
            <div class="text-accent mb-4">
              <svg
                class="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-primary mb-4">DDU-GKY</h3>
            <p class="text-text-light mb-6">
              Deen Dayal Upadhyaya Grameen Kaushalya Yojana - Rural youth skill
              development with placement support.
            </p>
            <a
              href="/schemes#ddu-gky"
              class="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors"
            >
              Learn More
              <svg
                class="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>

          <div class="card min-w-[320px] bg-white p-6 rounded-xl shadow-lg">
            <div class="text-accent mb-4">
              <svg
                class="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-primary mb-4">NULM</h3>
            <p class="text-text-light mb-6">
              National Urban Livelihoods Mission - Empowering urban poor through
              skill development and self-employment.
            </p>
            <a
              href="/schemes#nulm"
              class="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors"
            >
              Learn More
              <svg
                class="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>

          <div class="card min-w-[320px] bg-white p-6 rounded-xl shadow-lg">
            <div class="text-accent mb-4">
              <svg
                class="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-primary mb-4">SANKALP</h3>
            <p class="text-text-light mb-6">
              Skills Acquisition and Knowledge Awareness for Livelihood -
              Strengthening institutional mechanisms for skill development.
            </p>
            <a
              href="/schemes#sankalp"
              class="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors"
            >
              Learn More
              <svg
                class="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>

          <div class="card min-w-[320px] bg-white p-6 rounded-xl shadow-lg">
            <div class="text-accent mb-4">
              <svg
                class="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-primary mb-4">PMKK</h3>
            <p class="text-text-light mb-6">
              Pradhan Mantri Kaushal Kendra - State-of-the-art skill development
              centers with industry partnerships.
            </p>
            <a
              href="/schemes#pmkk"
              class="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors"
            >
              Learn More
              <svg
                class="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div class="gradient-mask-l"></div>
      <div class="gradient-mask-r"></div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="section bg-secondary text-white">
  <div class="container text-center">
    <h2 class="text-4xl font-heading font-bold mb-6">
      Ready to Transform Your Career?
    </h2>
    <p class="text-xl mb-8 max-w-2xl mx-auto">
      Join BNG Solutions today and take the first step towards a successful
      career in computer operations or stitching.
    </p>
    <a
      href="/contact"
      class="inline-block px-8 py-3 bg-white text-secondary hover:bg-gray-100 transition-colors duration-300 rounded-lg font-semibold text-center"
    >
      Get Started Now
    </a>
  </div>
</section>

<!-- Simple Solutions Section -->
<section class="section bg-primary text-white overflow-visible">
  <div class="container">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div class="relative">
        <div class="rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="/images/laptop.webp"
            alt="Modern laptop on desk"
            class="w-full"
          />
        </div>
      </div>
      <div>
        <h2 class="section-title text-white">Simple Solutions!</h2>
        <div class="space-y-8 mt-8">
          <div class="flex items-start gap-4">
            <div
              class="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center font-bold"
            >
              1
            </div>
            <div>
              <h3 class="text-xl font-bold mb-2">Contact us</h3>
              <p class="text-blue-100">
                Reach out to discuss your training needs and goals.
              </p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div
              class="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center font-bold"
            >
              2
            </div>
            <div>
              <h3 class="text-xl font-bold mb-2">Consult</h3>
              <p class="text-blue-100">
                Get expert advice on the best training path for you.
              </p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div
              class="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center font-bold"
            >
              3
            </div>
            <div>
              <h3 class="text-xl font-bold mb-2">Place order</h3>
              <p class="text-blue-100">
                Enroll in your chosen training program.
              </p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div
              class="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center font-bold"
            >
              4
            </div>
            <div>
              <h3 class="text-xl font-bold mb-2">Payment</h3>
              <p class="text-blue-100">
                Secure and flexible payment options available.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-8 flex gap-4">
          <a
            href="/contact"
            class="inline-block px-8 py-3 bg-white text-primary hover:bg-gray-100 transition-colors duration-300 rounded-lg font-semibold text-center"
          >
            Get Started
          </a>
          <a
            href="/about"
            class="inline-block px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-primary transition-colors duration-300 rounded-lg font-semibold text-center"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Our Institute Section -->
<section class="section bg-gray-50">
  <div class="container">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 class="section-title">Our Institute</h2>
        <p class="text-text-light text-lg mb-8">
          We are committed to providing high-quality training and placement
          services to help you achieve your career goals. Our experienced
          trainers and industry connections ensure your success.
        </p>

        <!-- Added Achievement Cards -->
        <div class="grid grid-cols-2 gap-4 mb-8">
          <div
            class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div class="text-primary mb-2">
              <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="font-bold text-lg mb-1">Certified</h3>
            <p class="text-sm text-gray-600">
              Government Approved Training Center
            </p>
          </div>
          <div
            class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div class="text-primary mb-2">
              <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 class="font-bold text-lg mb-1">Expert Faculty</h3>
            <p class="text-sm text-gray-600">Industry Experienced Trainers</p>
          </div>
        </div>

        <!-- Added Features List -->
        <div class="space-y-4 mb-8">
          <div class="flex items-center gap-3">
            <div class="text-accent">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span class="text-gray-700"
              >Modern Computer Labs with Latest Software</span
            >
          </div>
          <div class="flex items-center gap-3">
            <div class="text-accent">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span class="text-gray-700">Professional Stitching Equipment</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="text-accent">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span class="text-gray-700">Dedicated Placement Cell</span>
          </div>
        </div>

        <div class="flex gap-4">
          <a
            href="/about"
            class="inline-block px-8 py-3 bg-primary text-white hover:bg-primary/80 transition-colors duration-300 rounded-lg font-semibold text-center"
          >
            Read More
          </a>
          <a
            href="/contact"
            class="inline-block px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 rounded-lg font-semibold text-center"
          >
            Visit Institute
          </a>
        </div>
      </div>

      <div class="relative">
        <!-- Main Image -->
        <div
          class="aspect-square rounded-2xl overflow-hidden bg-gradient-primary p-1 shadow-2xl"
        >
          <img
            src="/images/agency.webp"
            alt="Our institute facilities"
            class="w-full h-full object-cover rounded-2xl"
          />
        </div>

        <!-- Floating Stats Card -->
        <div
          class="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-xl"
        >
          <div class="flex items-center gap-4">
            <div class="text-3xl font-bold text-primary">95%</div>
            <div class="text-sm text-gray-600">Placement<br />Success Rate</div>
          </div>
        </div>

        <!-- Floating Badge -->
        <div
          class="absolute -top-4 -left-4 bg-accent text-white p-4 rounded-full shadow-lg transform rotate-12"
        >
          <span class="text-sm font-bold">Since 2008</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Testimonials Section -->
<section class="section bg-background">
  <div class="container">
    <div class="text-center mb-16">
      <h2 class="section-title">What Clients Say</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="testimonial-card">
        <div class="flex items-center gap-4 mb-4">
          <img
            src="/images/client1.webp"
            alt="Johanna Doe"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 class="font-bold">Johanna Doe</h3>
            <p class="text-sm text-text-light">Computer Operations Graduate</p>
          </div>
        </div>
        <p class="text-text-light mb-4">
          "The training program was excellent! I learned valuable skills that
          helped me secure a great job."
        </p>
        <div class="flex text-yellow-400">★★★★★</div>
      </div>
      <div class="testimonial-card">
        <div class="flex items-center gap-4 mb-4">
          <img
            src="/images/client2.webp"
            alt="John Doe"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 class="font-bold">John Doe</h3>
            <p class="text-sm text-text-light">Stitching Program Alumni</p>
          </div>
        </div>
        <p class="text-text-light mb-4">
          "Professional trainers and excellent placement support. Highly
          recommended!"
        </p>
        <div class="flex text-yellow-400">★★★★★</div>
      </div>
      <div class="testimonial-card">
        <div class="flex items-center gap-4 mb-4">
          <img
            src="/images/client3.webp"
            alt="Jonathan Doe"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 class="font-bold">Jonathan Doe</h3>
            <p class="text-sm text-text-light">Recent Graduate</p>
          </div>
        </div>
        <p class="text-text-light mb-4">
          "The skills I learned here have been invaluable in my new career.
          Thank you!"
        </p>
        <div class="flex text-yellow-400">★★★★★</div>
      </div>
    </div>
  </div>
</section>

<style>
  .section {
    overflow: hidden;
  }

  /* Update nav-link hover styles */
  :global(.nav-link) {
    transition: all 0.3s ease;
  }

  :global(.nav-link:hover) {
    opacity: 1;
  }

  /* Remove conflicting opacity styles and ensure proper visibility */
  :global(.hero-title),
  :global(.hero-description),
  :global(.hero-buttons) {
    will-change: transform;
    backface-visibility: hidden;
  }

  /* Add CSS animations */
  .card {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .video-card {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .stat-item {
    animation: fadeIn 0.8s ease-out forwards;
  }

  .testimonial-card {
    animation: fadeInLeft 0.8s ease-out forwards;
  }

  /* Animation for cards and video cards */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Animation for stats */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Animation for testimonials */
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Add animation delays for staggered effect */
  .card:nth-child(1) {
    animation-delay: 0.2s;
  }
  .card:nth-child(2) {
    animation-delay: 0.4s;
  }
  .card:nth-child(3) {
    animation-delay: 0.6s;
  }

  .video-card:nth-child(1) {
    animation-delay: 0.3s;
  }
  .video-card:nth-child(2) {
    animation-delay: 0.6s;
  }

  .testimonial-card:nth-child(1) {
    animation-delay: 0.2s;
  }
  .testimonial-card:nth-child(2) {
    animation-delay: 0.4s;
  }
  .testimonial-card:nth-child(3) {
    animation-delay: 0.6s;
  }

  .stat-item:nth-child(1) {
    animation-delay: 0.2s;
  }
  .stat-item:nth-child(2) {
    animation-delay: 0.4s;
  }
  .stat-item:nth-child(3) {
    animation-delay: 0.6s;
  }
  .stat-item:nth-child(4) {
    animation-delay: 0.8s;
  }

  .schemes-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .schemes-container::-webkit-scrollbar {
    display: none;
  }

  .animate-scroll {
    animation: scroll 30s linear infinite;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(
        calc(-320px * 2.5)
      ); /* Adjust based on card width and number */
    }
  }

  .schemes-container:hover .animate-scroll {
    animation-play-state: paused;
  }
  .hero-content {
    opacity: 1;
  }
  .schemes-container-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .gradient-mask-l {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100px;
    background: linear-gradient(
      to right,
      rgb(255, 255, 255) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    z-index: 2;
    pointer-events: none;
  }

  .gradient-mask-r {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100px;
    background: linear-gradient(
      to left,
      rgb(255, 255, 255) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    z-index: 2;
    pointer-events: none;
  }

  .schemes-container {
    position: relative;
    z-index: 1;
  }
</style>
