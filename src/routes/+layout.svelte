<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { scale } from "svelte/transition";
  import { fade } from "svelte/transition";

  gsap.registerPlugin(ScrollTrigger);

  let isMenuOpen = false;
  let isScrolled = false;
  let isMobileMenuOpen = false;
  let scrollProgress = 0;
  let isLoaded = false;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/schemes", label: "Schemes" },
    { href: "/success-stories", label: "Success Stories" },
    { href: "/contact", label: "Contact" },
  ];

  function isActive(href: string): boolean {
    try {
      return $page?.url?.pathname === href;
    } catch (e) {
      return false;
    }
  }

  onMount(() => {
    // Set initial state
    isLoaded = true;

    // Initialize header animations
    gsap.set(".nav-item", {
      opacity: 0,
      y: -20,
    });
    gsap.set(".logo-container", {
      opacity: 0,
      x: -20,
    });

    // Create staggered animation timeline
    const headerTl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        duration: 0.8,
      },
    });

    headerTl
      .to(".logo-container", {
        opacity: 1,
        x: 0,
        duration: 0.6,
      })
      .to(
        ".nav-item",
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
        },
        "-=0.3"
      );

    // Smooth scroll handling with debounce
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const winScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          isScrolled = winScroll > 50;

          // Calculate scroll progress smoothly
          const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
          scrollProgress = Math.min(
            Math.max((winScroll / height) * 100, 0),
            100
          );

          ticking = false;
        });
        ticking = true;
      }
    };

    // Enable smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.style.scrollBehavior = "";
    };
  });

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<div class="min-h-screen flex flex-col">
  <!-- Navigation -->
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[80px] flex items-center {isScrolled
      ? 'bg-white/90 backdrop-blur-md shadow-sm'
      : 'bg-transparent'}"
  >
    <!-- Progress Bar -->
    <div
      class="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-150"
      style="width: {scrollProgress}%"
    ></div>

    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between">
        <!-- Icon with Text -->
        <a href="/" class="logo-container flex items-center space-x-3">
          <div
            class="text-3xl {isScrolled
              ? 'text-primary'
              : 'text-white'} relative w-10 h-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-full w-full"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <!-- Base Layer -->
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M4 7l8-4 8 4m-16 4l8 4 8-4m-16 4l8 4 8-4"
                class="opacity-90"
              />
              <!-- Accent Layer -->
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v18"
                class={isScrolled ? "stroke-accent" : "stroke-accent/90"}
              />
              <!-- Dynamic Layer -->
              <circle
                cx="12"
                cy="12"
                r="3"
                class="fill-current {isScrolled ? 'text-accent' : 'text-white'}"
                stroke="none"
              />
            </svg>
          </div>
          <span
            class="text-xl font-bold {isScrolled
              ? 'text-primary'
              : 'text-white'} transition-colors duration-300"
          >
            BNG Solutions
          </span>
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          {#each navItems as { href, label }}
            <a
              {href}
              class="nav-item text-lg transition-all duration-300 {isActive(
                href
              )
                ? isScrolled
                  ? 'text-primary font-semibold border-b-2 border-primary'
                  : 'text-accent/90 font-semibold'
                : isScrolled
                  ? 'text-text hover:text-primary'
                  : 'text-white hover:text-white/80'}"
            >
              {label}
            </a>
          {/each}
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="nav-item md:hidden text-3xl {isScrolled
            ? 'text-primary'
            : 'text-white'}"
          on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d={isMobileMenuOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu with transition -->
    {#if isMobileMenuOpen}
      <div
        class="fixed inset-0 z-40 bg-primary/95 backdrop-blur-sm"
        transition:scale={{ duration: 200 }}
      >
        <div class="container mx-auto px-6 py-24">
          <div class="flex flex-col space-y-6">
            {#each navItems as { href, label }, i}
              <a
                {href}
                class="text-white text-2xl font-medium hover:text-accent transition-colors duration-300 {isActive(
                  href
                )
                  ? 'text-accent'
                  : ''}"
                on:click={() => (isMobileMenuOpen = false)}
                in:fade={{ delay: i * 100, duration: 200 }}
              >
                {label}
              </a>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </nav>

  <!-- Main Content -->
  <main>
    <slot />
  </main>

  <!-- Footer -->
  <footer class="bg-primary text-white py-12">
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About -->
        <div>
          <h3 class="text-xl font-heading font-bold mb-4">About Us</h3>
          <p class="text-gray-300">
            BNG Solutions is a government-approved training and skill
            development agency committed to empowering individuals through
            quality education and placement opportunities.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-xl font-heading font-bold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            {#each navItems as item}
              <li>
                <a
                  href={item.href}
                  class="text-gray-300 hover:text-secondary transition-colors duration-300"
                >
                  {item.label}
                </a>
              </li>
            {/each}
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-xl font-heading font-bold mb-4">Contact Us</h3>
          <ul class="space-y-2 text-gray-300">
            <li>Afzalpur, Karnataka</li>
            <li>Phone: +91 XXXXXXXXXX</li>
            <li>Email: info@bngsolutions.com</li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h3 class="text-xl font-heading font-bold mb-4">Follow Us</h3>
          <div class="flex space-x-4">
            <a
              href="https://facebook.com/bngsolutions"
              class="text-gray-300 hover:text-secondary transition-colors duration-300"
              aria-label="Follow us on Facebook"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                />
              </svg>
            </a>
            <a
              href="https://twitter.com/bngsolutions"
              class="text-gray-300 hover:text-secondary transition-colors duration-300"
              aria-label="Follow us on Twitter"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                />
              </svg>
            </a>
            <a
              href="https://instagram.com/bngsolutions"
              class="text-gray-300 hover:text-secondary transition-colors duration-300"
              aria-label="Follow us on Instagram"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
        <p>
          &copy; {new Date().getFullYear()} BNG Solutions. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</div>

<style>
  /* Add a subtle gradient line at the bottom of the header when not scrolled */
  nav:not(:has(.bg-white\/90))::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
  }

  /* Update nav-link hover styles with subtle transitions */
  :global(.nav-item) {
    transition: all 0.3s ease;
    position: relative;
  }

  :global(.nav-item)::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: currentColor;
    transition: width 0.3s ease;
  }

  :global(.nav-item:hover)::after {
    width: 100%;
  }

  /* Active link styles */
  :global(.nav-item.active) {
    position: relative;
  }

  :global(.nav-item.active)::before {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: currentColor;
  }

  /* Mobile menu animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
