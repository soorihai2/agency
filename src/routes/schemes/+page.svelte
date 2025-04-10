<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  onMount(() => {
    // Set initial states
    gsap.set(".hero-content", { opacity: 0, y: 20 });
    gsap.set(".scheme-section", { opacity: 0, y: 15 });
    gsap.set(".feature-item", { opacity: 0, y: 10 });
    gsap.set(".cta-content", { opacity: 0, y: 15 });

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

    // Scheme sections animation with stagger
    gsap.to(".scheme-section", {
      scrollTrigger: {
        trigger: ".schemes-container",
        start: "top 85%",
        once: true,
      },
      duration: 1,
      y: 0,
      opacity: 1,
      stagger: 0.2,
      ease: "power1.out",
    });

    // Features animation
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

    // CTA section animation
    gsap.to(".cta-content", {
      scrollTrigger: {
        trigger: ".cta-section",
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
      <source src="/videos/video-1.webm" type="video/webm" />
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
        Government Schemes
      </h1>
      <p class="text-2xl text-gray-200 text-center">
        Empowering individuals through government-supported skill development
        programs.
      </p>
    </div>
  </div>
</section>

<!-- Schemes Overview -->
<section id="schemes" class="py-20 bg-gray-50">
  <div class="container">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-heading font-bold text-primary mb-4">
        Available Schemes
      </h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Discover various government initiatives designed to support your skill
        development journey.
      </p>
    </div>

    <!-- PMKVY Section -->
    <div class="scheme-section mb-20">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="relative">
          <div class="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/schemes/scheme-1.webp"
              alt="PMKVY Training - Professional Call Center Training"
              class="w-full h-[400px] object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div
            class="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl"
          >
            <div class="text-4xl font-bold text-primary mb-1">100%</div>
            <div class="text-sm text-gray-600">Free Training</div>
          </div>
        </div>
        <div>
          <h3 class="text-3xl font-heading font-bold text-primary mb-6">
            Pradhan Mantri Kaushal Vikas Yojana (PMKVY)
          </h3>
          <p class="text-gray-600 mb-6">
            A flagship scheme under Skill India Mission, focusing on enabling
            youth to take up industry-relevant skill training to secure better
            livelihood opportunities.
          </p>
          <div class="features-grid grid grid-cols-2 gap-4 mb-8">
            <div class="feature-item bg-white p-4 rounded-lg shadow-md">
              <div class="text-accent mb-2">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 class="font-bold mb-1">Short Term Training</h4>
              <p class="text-sm text-gray-600">3-6 months duration</p>
            </div>
            <div class="feature-item bg-white p-4 rounded-lg shadow-md">
              <div class="text-accent mb-2">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 class="font-bold mb-1">RPL Certification</h4>
              <p class="text-sm text-gray-600">Prior learning recognition</p>
            </div>
          </div>
          <a
            href="https://www.pmkvyofficial.org/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Learn More About PMKVY
          </a>
        </div>
      </div>
    </div>

    <!-- DDU-GKY Section -->
    <div class="scheme-section mb-20">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="order-2 md:order-1">
          <h3 class="text-3xl font-heading font-bold text-primary mb-6">
            DDU-GKY (Deen Dayal Upadhyaya Grameen Kaushalya Yojana)
          </h3>
          <p class="text-gray-600 mb-6">
            A transformative initiative focusing on rural youth skill
            development and sustainable employment opportunities.
          </p>
          <div class="features-grid grid grid-cols-2 gap-4 mb-8">
            <div class="feature-item bg-white p-4 rounded-lg shadow-md">
              <div class="text-accent mb-2">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h4 class="font-bold mb-1">Rural Focus</h4>
              <p class="text-sm text-gray-600">Specialized for rural youth</p>
            </div>
            <div class="feature-item bg-white p-4 rounded-lg shadow-md">
              <div class="text-accent mb-2">
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
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h4 class="font-bold mb-1">Placement Support</h4>
              <p class="text-sm text-gray-600">Guaranteed job placement</p>
            </div>
          </div>
          <a
            href="https://ddugky.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Learn More About DDU-GKY
          </a>
        </div>
        <div class="order-1 md:order-2 relative">
          <div class="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/schemes/scheme-2.webp"
              alt="DDU-GKY Professional Training"
              class="w-full h-[400px] object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div
            class="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl"
          >
            <div class="text-4xl font-bold text-primary mb-1">100%</div>
            <div class="text-sm text-gray-600">Job Placement</div>
          </div>
        </div>
      </div>
    </div>

    <!-- SANKALP Section -->
    <div class="scheme-section mb-20">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="relative">
          <div class="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/schemes/scheme-3.webp"
              alt="SANKALP Professional Development"
              class="w-full h-[400px] object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div
            class="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl"
          >
            <div class="text-4xl font-bold text-primary mb-1">Free</div>
            <div class="text-sm text-gray-600">Certification</div>
          </div>
        </div>
        <div>
          <h3 class="text-3xl font-heading font-bold text-primary mb-6">
            SANKALP (Skills Acquisition and Knowledge Awareness for Livelihood)
          </h3>
          <p class="text-gray-600 mb-6">
            A World Bank supported program focusing on strengthening
            institutional mechanisms for skill development and increasing access
            to quality training programs.
          </p>
          <div class="features-grid grid grid-cols-2 gap-4 mb-8">
            <div class="feature-item bg-white p-4 rounded-lg shadow-md">
              <div class="text-accent mb-2">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h4 class="font-bold mb-1">Industry Partnership</h4>
              <p class="text-sm text-gray-600">Direct industry collaboration</p>
            </div>
            <div class="feature-item bg-white p-4 rounded-lg shadow-md">
              <div class="text-accent mb-2">
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
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h4 class="font-bold mb-1">Quality Assurance</h4>
              <p class="text-sm text-gray-600">International standards</p>
            </div>
          </div>
          <a
            href="#contact-form"
            class="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Enroll in SANKALP
          </a>
        </div>
      </div>
    </div>

    <!-- PMKK Section -->
    <div class="scheme-section mb-20">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="order-2 md:order-1">
          <h3 class="text-3xl font-heading font-bold text-primary mb-6">
            PMKK (Pradhan Mantri Kaushal Kendra)
          </h3>
          <p class="text-gray-600 mb-6">
            State-of-the-art skill development centers providing advanced
            training facilities and industry-relevant courses to empower the
            youth with employable skills.
          </p>
          <div class="features-grid grid grid-cols-2 gap-4 mb-8">
            <div class="feature-item bg-white p-4 rounded-lg shadow-md">
              <div class="text-accent mb-2">
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
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h4 class="font-bold mb-1">Modern Labs</h4>
              <p class="text-sm text-gray-600">Advanced equipment</p>
            </div>
            <div class="feature-item bg-white p-4 rounded-lg shadow-md">
              <div class="text-accent mb-2">
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
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h4 class="font-bold mb-1">Industry Mentors</h4>
              <p class="text-sm text-gray-600">Expert guidance</p>
            </div>
          </div>
          <a
            href="#contact-form"
            class="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Join PMKK Program
          </a>
        </div>
        <div class="order-1 md:order-2 relative">
          <div class="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/schemes/scheme-4.webp"
              alt="PMKK Professional Development"
              class="w-full h-[400px] object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div
            class="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl"
          >
            <div class="text-4xl font-bold text-primary mb-1">Smart</div>
            <div class="text-sm text-gray-600">Training Labs</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-20 bg-gradient-to-br from-primary to-secondary text-white">
  <div class="container text-center">
    <h2 class="text-4xl font-heading font-bold mb-6">
      Ready to Start Your Journey?
    </h2>
    <p class="text-xl mb-8 max-w-2xl mx-auto">
      Join our training programs and take advantage of these government schemes
      to build a successful career.
    </p>
    <div class="flex justify-center gap-4">
      <a href="/contact" class="btn-primary-light"> Apply Now </a>
      <a href="/about" class="btn-secondary"> Learn More </a>
    </div>
  </div>
</section>

<style>
  .hero-section {
    background-size: cover;
    background-position: center;
  }

  .btn-secondary {
    display: inline-block;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .scheme-section {
    opacity: 0;
    transform: translateY(20px);
  }

  .feature-item {
    transition: all 0.3s ease;
  }

  .feature-item:hover {
    transform: translateY(-5px);
  }
</style>
