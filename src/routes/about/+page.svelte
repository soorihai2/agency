<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  onMount(() => {
    // Set initial states
    gsap.set(".hero-content", { opacity: 0, y: 20 });
    gsap.set(".mission-content", { opacity: 0, y: 15 });
    gsap.set(".stat-card", { opacity: 0, y: 15 });
    gsap.set(".feature-card", { opacity: 0, y: 15 });

    // Hero section parallax - more subtle movement
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

    // Create a timeline for hero content
    const heroTl = gsap.timeline();
    heroTl.to(".hero-content", {
      duration: 1.8,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    });

    // Mission content animation
    gsap.to(".mission-content", {
      scrollTrigger: {
        trigger: ".mission-content",
        start: "top 85%",
        once: true,
      },
      duration: 1.2,
      y: 0,
      opacity: 1,
      ease: "power1.out",
    });

    // Stats animation
    gsap.to(".stat-card", {
      scrollTrigger: {
        trigger: ".stats-grid",
        start: "top 85%",
        once: true,
      },
      duration: 1,
      y: 0,
      opacity: 1,
      stagger: 0.15,
      ease: "power1.out",
    });

    // Feature cards animation
    gsap.to(".feature-card", {
      scrollTrigger: {
        trigger: ".features-grid",
        start: "top 85%",
        once: true,
      },
      duration: 1,
      y: 0,
      opacity: 1,
      stagger: 0.15,
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
      <source src="/videos/video-3.webm" type="video/webm" />
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
        About Our Institute
      </h1>
      <p class="text-2xl text-gray-200 text-center">
        Building careers through excellence in skill development and training
      </p>
    </div>
  </div>
</section>

<!-- Mission & Vision -->
<section class="section py-20">
  <div class="container">
    <div
      class="mission-content grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
    >
      <div>
        <h2 class="text-4xl font-heading font-bold text-primary mb-6">
          Our Mission & Vision
        </h2>
        <p class="text-text-light mb-6 text-lg">
          At BNG Solutions, we are committed to bridging the skill gap in
          India's workforce by providing high-quality training and development
          programs. Our mission is to empower individuals with industry-relevant
          skills and connect them with meaningful employment opportunities.
        </p>
        <p class="text-text-light mb-8 text-lg">
          We envision a future where every individual has access to quality
          skill development programs and the opportunity to build a successful
          career. Through our government-approved training programs, we aim to
          contribute to India's skill development mission.
        </p>
        <div class="stats-grid grid grid-cols-2 gap-6">
          <div
            class="stat-card text-center p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="text-5xl font-heading font-bold text-secondary mb-2">
              15+
            </div>
            <div class="text-text">Years of Excellence</div>
          </div>
          <div
            class="stat-card text-center p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="text-5xl font-heading font-bold text-secondary mb-2">
              7500+
            </div>
            <div class="text-text">Students Trained</div>
          </div>
        </div>
      </div>
      <div class="relative">
        <img
          src="/images/computer-training.webp"
          alt="Training session at BNG Solutions"
          class="rounded-xl shadow-lg"
        />
        <div
          class="absolute -bottom-6 -right-6 bg-secondary text-white p-8 rounded-xl shadow-lg"
        >
          <div class="text-4xl font-heading font-bold mb-2">95%</div>
          <div class="text-sm uppercase tracking-wider">Placement Rate</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Why Choose Us -->
<section class="section py-20 bg-gray-50">
  <div class="container">
    <h2 class="text-4xl font-heading font-bold text-primary text-center mb-16">
      Why Choose BNG Solutions?
    </h2>
    <div class="features-grid grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        class="feature-card bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div
          class="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mb-6 transform transition-transform hover:scale-110"
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
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <h3 class="text-2xl font-heading font-bold text-primary mb-4">
          Government Approved
        </h3>
        <p class="text-text-light">
          Our training programs are recognized and approved by various
          government schemes, ensuring quality and credibility.
        </p>
      </div>
      <div
        class="feature-card bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div
          class="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mb-6 transform transition-transform hover:scale-110"
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
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h3 class="text-2xl font-heading font-bold text-primary mb-4">
          Industry Partnerships
        </h3>
        <p class="text-text-light">
          Strong connections with leading companies ensure excellent placement
          opportunities for our students.
        </p>
      </div>
      <div
        class="feature-card bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div
          class="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mb-6 transform transition-transform hover:scale-110"
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
          Expert Training
        </h3>
        <p class="text-text-light">
          Our experienced trainers provide hands-on learning with modern
          facilities and updated curriculum.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="section bg-secondary text-white">
  <div class="container text-center">
    <h2 class="text-4xl font-heading font-bold mb-6">
      Join Our Growing Community
    </h2>
    <p class="text-xl mb-8 max-w-2xl mx-auto">
      Take the first step towards a successful career with BNG Solutions. Our
      expert team is ready to guide you through your learning journey.
    </p>
    <a href="/contact" class="btn-primary-light"> Contact Us Today </a>
  </div>
</section>

<style>
  /* Add initial opacity 0 to elements that will be animated */
  :global(.hero-content),
  :global(.mission-content),
  :global(.stat-card),
  :global(.feature-card) {
    opacity: 0;
  }

  .hero-section {
    background-size: cover;
    background-position: center;
  }

  .feature-card {
    transform: translateY(0);
    transition: all 0.3s ease;
  }

  .feature-card:hover {
    transform: translateY(-5px);
  }

  .stat-card {
    transition: all 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-5px);
  }
</style>
