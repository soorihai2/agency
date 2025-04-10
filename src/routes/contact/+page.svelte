<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  onMount(() => {
    // Set initial states
    gsap.set(".hero-content", { opacity: 0, y: 20 });
    gsap.set(".contact-info", { opacity: 0, y: 30 });
    gsap.set(".contact-form", { opacity: 0, y: 30 });

    // Hero content animation
    const heroTl = gsap.timeline();
    heroTl.to(".hero-content", {
      duration: 1.2,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    });

    // Contact info and form animations
    gsap.to(".contact-info", {
      scrollTrigger: {
        trigger: ".contact-info",
        start: "top 85%",
        once: true,
      },
      duration: 0.8,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    });

    gsap.to(".contact-form", {
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 85%",
        once: true,
      },
      duration: 0.8,
      y: 0,
      opacity: 1,
      delay: 0.2,
      ease: "power2.out",
    });
  });

  let formData = {
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  };

  let isSubmitting = false;
  let submitStatus: { success: boolean; message: string } = {
    success: false,
    message: "",
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    isSubmitting = true;
    submitStatus = { success: false, message: "" };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      submitStatus = {
        success: result.success,
        message: result.message,
      };

      if (result.success) {
        // Reset form on success
        formData = {
          name: "",
          email: "",
          phone: "",
          course: "",
          message: "",
        };
      }
    } catch (error) {
      submitStatus = {
        success: false,
        message: "An error occurred. Please try again later.",
      };
    } finally {
      isSubmitting = false;
    }
  };
</script>

<!-- Hero Section -->
<section
  class="hero-section relative h-[600px] overflow-hidden bg-primary -mt-[80px]"
>
  <!-- Video Background -->
  <div class="absolute inset-0 w-full h-full">
    <video
      class="w-full h-full object-cover opacity-40"
      autoplay
      loop
      muted
      playsinline
    >
      <source src="/videos/contact-hero.webm" type="video/webm" />
    </video>
    <div
      class="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary/70"
    ></div>
  </div>

  <div class="container relative h-full flex items-center">
    <div class="hero-content text-white max-w-3xl pt-[100px]">
      <h1 class="text-6xl font-heading font-bold mb-6">Let's Connect</h1>
      <p class="text-2xl text-gray-200 mb-8 leading-relaxed">
        Transform your career with our expert guidance. Reach out today and take
        the first step towards your success.
      </p>
      <div class="flex gap-4">
        <a href="#contact-form" class="btn-primary-light"> Send Message </a>
        <a href="#map" class="btn-secondary"> Visit Us </a>
      </div>
    </div>
  </div>
</section>

<!-- Contact Section -->
<section class="py-20 bg-background" id="contact-form">
  <div class="container">
    <div class="grid md:grid-cols-2 gap-12">
      <!-- Contact Information -->
      <div class="contact-info space-y-8">
        <div class="bg-white p-8 rounded-xl shadow-lg">
          <h2 class="text-3xl font-heading font-bold text-primary mb-6">
            Get In Touch
          </h2>
          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="text-accent">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-lg mb-1">Address</h3>
                <p class="text-text-light">
                  123 Training Street, Education City, State - 123456
                </p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="text-accent">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-lg mb-1">Email</h3>
                <a
                  href="mailto:info@bngsolutions.com"
                  class="text-text-light hover:text-primary transition-colors"
                  >info@bngsolutions.com</a
                >
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="text-accent">
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-lg mb-1">Phone</h3>
                <a
                  href="tel:+911234567890"
                  class="text-text-light hover:text-primary transition-colors"
                  >+91 123 456 7890</a
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Social Media Links -->
        <div class="bg-white p-8 rounded-xl shadow-lg">
          <h3 class="text-2xl font-heading font-bold text-primary mb-6">
            Follow Us
          </h3>
          <div class="flex gap-4 mt-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
              aria-label="Visit our Facebook page"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"
                />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              aria-label="Visit our Instagram page"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12,2.2c3.2,0,3.6,0,4.9.1,3.3.1,4.8,1.7,4.9,4.9.1,1.3.1,1.6.1,4.8,0,3.2,0,3.6-.1,4.8-.1,3.2-1.7,4.8-4.9,4.9-1.3.1-1.6.1-4.9.1-3.2,0-3.6,0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8,0-3.2,0-3.6.1-4.8C2.4,4,4,2.4,7.2,2.3,8.5,2.2,8.8,2.2,12,2.2ZM12,0C8.7,0,8.3,0,7,0.1,2.7.3.3,2.7.1,7,0,8.3,0,8.7,0,12s0,3.7.1,5c.2,4.3,2.6,6.7,7,6.9,1.3.1,1.7.1,5,.1s3.7,0,5-.1c4.3-.2,6.7-2.6,6.9-7,.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.2-4.3-2.6-6.7-7-6.9C15.7,0,15.3,0,12,0Zm0,5.8A6.2,6.2,0,1,0,18.2,12,6.2,6.2,0,0,0,12,5.8ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.4,4.2a1.4,1.4,0,1,0,1.4,1.4A1.4,1.4,0,0,0,18.4,4.2Z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="contact-form bg-white p-8 rounded-xl shadow-lg">
        <h2 class="text-3xl font-heading font-bold text-primary mb-6">
          Send us a Message
        </h2>
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-text mb-2"
              >Full Name</label
            >
            <input
              type="text"
              id="name"
              bind:value={formData.name}
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-text mb-2"
              >Email Address</label
            >
            <input
              type="email"
              id="email"
              bind:value={formData.email}
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label for="phone" class="block text-sm font-medium text-text mb-2"
              >Phone Number</label
            >
            <input
              type="tel"
              id="phone"
              bind:value={formData.phone}
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label for="course" class="block text-sm font-medium text-text mb-2"
              >Interested Course</label
            >
            <select
              id="course"
              bind:value={formData.course}
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            >
              <option value="">Select a course</option>
              <option value="computer-basics">Computer Basics</option>
              <option value="web-development">Web Development</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="data-analytics">Data Analytics</option>
            </select>
          </div>
          <div>
            <label
              for="message"
              class="block text-sm font-medium text-text mb-2">Message</label
            >
            <textarea
              id="message"
              bind:value={formData.message}
              required
              rows="4"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          {#if submitStatus.message}
            <div
              class="p-4 rounded-lg {submitStatus.success
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'}"
            >
              {submitStatus.message}
            </div>
          {/if}
        </form>
      </div>
    </div>
  </div>
</section>

<!-- Map Section -->
<section class="h-[600px] relative" id="map">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.985619587854!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1679900095101!5m2!1sen!2sin"
    width="100%"
    height="100%"
    style="border:0;"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    title="BNG Solutions Location"
  ></iframe>
</section>

<style>
  /* Add initial opacity 0 to elements that will be animated */
  :global(.hero-content),
  :global(.contact-info),
  :global(.contact-form) {
    opacity: 0;
  }

  .hero-section {
    position: relative;
    background-size: cover;
    background-position: center;
  }

  /* Smooth scroll behavior for anchor links */
  :global(html) {
    scroll-behavior: smooth;
  }

  .contact-info,
  .contact-form {
    opacity: 1;
    transform: none;
    transition: all 0.5s ease;
  }

  .contact-info:hover,
  .contact-form:hover {
    transform: translateY(-5px);
  }

  input,
  select,
  textarea {
    transition: all 0.3s ease;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary/10);
  }

  .btn-secondary {
    display: inline-block;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: all 0.3s ease;
  }
</style>
