<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  onMount(() => {
    // Set initial states
    gsap.set(".hero-content", { opacity: 0, y: 20 });
    gsap.set(".service-card", { opacity: 0, y: 15 });
    gsap.set(".feature-item", { opacity: 0, y: 10 });
    gsap.set(".certificate-section", { opacity: 0, y: 15 });

    // Hero section parallax
    gsap.to(".hero-bg", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
      y: 50,
      ease: "none",
    });

    // Create timeline for hero content
    const heroTl = gsap.timeline();
    heroTl.to(".hero-content", {
      duration: 1.8,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    });

    // Service cards animation
    gsap.to(".service-card", {
      scrollTrigger: {
        trigger: ".services-grid",
        start: "top 85%",
        once: true,
      },
      duration: 1,
      y: 0,
      opacity: 1,
      stagger: 0.2,
      ease: "power1.out",
    });

    // Feature items animation
    gsap.to(".feature-item", {
      scrollTrigger: {
        trigger: ".features-grid",
        start: "top 85%",
        once: true,
      },
      duration: 0.8,
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ease: "power1.out",
    });

    // Certificate section animation
    gsap.to(".certificate-section", {
      scrollTrigger: {
        trigger: ".certificate-section",
        start: "top 85%",
        once: true,
      },
      duration: 1.2,
      y: 0,
      opacity: 1,
      ease: "power1.out",
    });
  });
</script>

<!-- Hero Section -->
<section
  class="hero-section relative min-h-[600px] overflow-hidden bg-primary -mt-[80px]"
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
      <source src="/videos/video-2.webm" type="video/webm" />
    </video>
    <div
      class="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary/70"
    ></div>
  </div>

  <div
    class="container relative min-h-[600px] flex flex-col justify-center items-center pt-[100px]"
  >
    <div class="hero-content text-white max-w-3xl mt-[80px]">
      <h1 class="text-6xl font-heading font-bold mb-6 text-center">
        Our Services
      </h1>
      <p class="text-2xl text-gray-200 text-center">
        Comprehensive training solutions designed to empower your career growth
      </p>
    </div>
  </div>
</section>

<!-- Services Grid -->
<section id="services" class="section py-20">
  <div class="container">
    <div class="services-grid grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Computer Operations -->
      <div
        class="service-card bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
      >
        <div class="relative h-72 rounded-t-xl overflow-hidden">
          <img
            src="/images/computer-training.webp"
            alt="Computer Operations Training"
            class="w-full h-full object-cover transform transition-transform hover:scale-105 duration-700"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"
          ></div>
        </div>
        <div class="p-8">
          <h2 class="text-3xl font-heading font-bold text-primary mb-4">
            Computer Operations Training
          </h2>
          <p class="text-text-light mb-6 text-lg">
            Master essential computer skills and software applications needed in
            today's digital workplace. Our comprehensive program covers
            everything from basic operations to advanced software usage.
          </p>
          <div class="space-y-6">
            <h3 class="text-xl font-heading font-bold text-primary">
              Course Highlights
            </h3>
            <ul class="space-y-4">
              <li class="feature-item flex items-start">
                <div
                  class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                >
                  <svg
                    class="w-5 h-5 text-secondary"
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
                <span class="text-text-light"
                  >Microsoft Office Suite (Word, Excel, PowerPoint)</span
                >
              </li>
              <li class="feature-item flex items-start">
                <div
                  class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                >
                  <svg
                    class="w-5 h-5 text-secondary"
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
                <span class="text-text-light"
                  >Internet and Email Management</span
                >
              </li>
              <li class="feature-item flex items-start">
                <div
                  class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                >
                  <svg
                    class="w-5 h-5 text-secondary"
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
                <span class="text-text-light"
                  >Basic Hardware and Software Troubleshooting</span
                >
              </li>
              <li class="feature-item flex items-start">
                <div
                  class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                >
                  <svg
                    class="w-5 h-5 text-secondary"
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
                <span class="text-text-light">Data Entry and Management</span>
              </li>
            </ul>
            <div class="pt-6">
              <a
                href="/contact"
                class="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
              >
                Enroll Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Stitching Training -->
      <div
        class="service-card bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
      >
        <div class="relative h-72 rounded-t-xl overflow-hidden">
          <img
            src="/images/stitching-training.webp"
            alt="Stitching Training"
            class="w-full h-full object-cover transform transition-transform hover:scale-105 duration-700"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"
          ></div>
        </div>
        <div class="p-8">
          <h2 class="text-3xl font-heading font-bold text-primary mb-4">
            Stitching Training
          </h2>
          <p class="text-text-light mb-6 text-lg">
            Learn professional stitching techniques and become a skilled tailor.
            Our hands-on training program covers both traditional and modern
            stitching methods.
          </p>
          <div class="space-y-6">
            <h3 class="text-xl font-heading font-bold text-primary">
              Course Highlights
            </h3>
            <ul class="space-y-4">
              <li class="feature-item flex items-start">
                <div
                  class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                >
                  <svg
                    class="w-5 h-5 text-secondary"
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
                <span class="text-text-light"
                  >Basic to Advanced Stitching Techniques</span
                >
              </li>
              <li class="feature-item flex items-start">
                <div
                  class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                >
                  <svg
                    class="w-5 h-5 text-secondary"
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
                <span class="text-text-light">Pattern Making and Cutting</span>
              </li>
              <li class="feature-item flex items-start">
                <div
                  class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                >
                  <svg
                    class="w-5 h-5 text-secondary"
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
                <span class="text-text-light"
                  >Machine Operation and Maintenance</span
                >
              </li>
              <li class="feature-item flex items-start">
                <div
                  class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                >
                  <svg
                    class="w-5 h-5 text-secondary"
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
                <span class="text-text-light"
                  >Garment Design and Construction</span
                >
              </li>
            </ul>
            <div class="pt-6">
              <a
                href="/contact"
                class="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
              >
                Enroll Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Features Section -->
<section class="features-section section bg-gray-50">
  <div class="container">
    <h2 class="text-4xl font-heading font-bold text-primary text-center mb-12">
      Program Features
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="feature-item card">
        <div
          class="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mb-6"
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
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h3 class="text-2xl font-heading font-bold text-primary mb-4">
          Expert Trainers
        </h3>
        <p class="text-text-light">
          Learn from industry professionals with years of experience in their
          respective fields.
        </p>
      </div>

      <div class="feature-item card">
        <div
          class="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mb-6"
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 class="text-2xl font-heading font-bold text-primary mb-4">
          Practical Training
        </h3>
        <p class="text-text-light">
          Hands-on experience with modern equipment and real-world projects.
        </p>
      </div>

      <div class="feature-item card">
        <div
          class="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mb-6"
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
        <h3 class="text-2xl font-heading font-bold text-primary mb-4">
          Placement Support
        </h3>
        <p class="text-text-light">
          Dedicated placement assistance to help you secure employment after
          training.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Certification Section -->
<section class="section">
  <div class="container">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 class="text-4xl font-heading font-bold text-primary mb-6">
          Government Recognized Certification
        </h2>
        <p class="text-text-light mb-6">
          Upon successful completion of the training program, you will receive a
          government-recognized certificate that enhances your employability and
          validates your skills.
        </p>
        <ul class="space-y-4">
          <li class="flex items-start">
            <svg
              class="w-6 h-6 text-secondary mt-1 mr-2"
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
            <span>Nationally recognized certification</span>
          </li>
          <li class="flex items-start">
            <svg
              class="w-6 h-6 text-secondary mt-1 mr-2"
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
            <span>Valid across all states in India</span>
          </li>
          <li class="flex items-start">
            <svg
              class="w-6 h-6 text-secondary mt-1 mr-2"
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
            <span>Preferred by employers</span>
          </li>
        </ul>
      </div>
      <div class="relative">
        <img
          src="/images/placement.webp"
          alt="Placement"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute -bottom-6 -right-6 bg-secondary text-white p-6 rounded-lg"
        >
          <div class="text-3xl font-heading font-bold mb-2">100%</div>
          <div class="text-sm">Certification Rate</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="section bg-secondary text-white py-20">
  <div class="container text-center">
    <h2 class="text-4xl font-heading font-bold mb-6">
      Ready to Start Your Journey?
    </h2>
    <p class="text-xl mb-8 max-w-2xl mx-auto">
      Join our training programs and take the first step towards a successful
      career. Our expert trainers are here to guide you every step of the way.
    </p>
    <a
      href="/contact"
      class="inline-block px-8 py-3 bg-white text-secondary rounded-lg hover:bg-gray-100 transition-colors duration-300"
    >
      Get Started Today
    </a>
  </div>
</section>

<style>
  /* Add initial opacity 0 to elements that will be animated */
  :global(.hero-content),
  :global(.service-card),
  :global(.feature-item),
  :global(.certificate-section) {
    opacity: 0;
  }

  .hero-section {
    background-size: cover;
    background-position: center;
  }

  .service-card {
    transform: translateY(0);
    transition: all 0.3s ease;
  }

  .service-card:hover {
    transform: translateY(-5px);
  }

  .feature-item {
    transition: all 0.3s ease;
  }

  .feature-item:hover {
    transform: translateX(5px);
  }
</style>
