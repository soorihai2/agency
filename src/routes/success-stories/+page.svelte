<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  const successStories = [
    {
      name: "Priya Sharma",
      role: "Software Developer",
      image: "/images/client1.webp",
      course: "Computer Operations Training",
      story:
        "After completing the computer operations training, I secured a position as a junior developer. The practical skills and industry knowledge gained during the program were invaluable.",
      achievement:
        "Placed at a leading IT company with 40% higher salary than market average",
      company: "TechCorp Solutions",
      year: "2023",
    },
    {
      name: "Rahul Kumar",
      role: "Production Manager",
      image: "/images/client2.webp",
      course: "Advanced Stitching Program",
      story:
        "The stitching program opened new doors for me. From learning basic techniques to managing production, the journey has been transformative.",
      achievement:
        "Promoted to Production Manager within 8 months of placement",
      company: "Fashion Dynamics",
      year: "2023",
    },
    {
      name: "Anjali Patel",
      role: "IT Support Specialist",
      image: "/images/client3.webp",
      course: "Computer Operations & Networking",
      story:
        "The comprehensive training in computer operations and networking helped me build a strong foundation. Now I'm working with a multinational company.",
      achievement: "Certified IT professional managing critical systems",
      company: "Global Systems Inc",
      year: "2022",
    },
  ];

  onMount(() => {
    // Set initial states
    gsap.set(".hero-content", { opacity: 0, y: 20 });
    gsap.set(".story-card", { opacity: 0, y: 15 });
    gsap.set(".stats-item", { opacity: 0, y: 10 });
    gsap.set(".cta-section", { opacity: 0, y: 15 });

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

    // Story cards animation with stagger
    gsap.to(".story-card", {
      scrollTrigger: {
        trigger: ".stories-grid",
        start: "top 85%",
        once: true,
      },
      duration: 1,
      y: 0,
      opacity: 1,
      stagger: 0.2,
      ease: "power1.out",
    });

    // Stats animation
    gsap.to(".stats-item", {
      scrollTrigger: {
        trigger: ".stats-section",
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
    gsap.to(".cta-section", {
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
      <source src="/videos/video-4.webm" type="video/webm" />
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
        Success Stories
      </h1>
      <p class="text-2xl text-gray-200 text-center">
        Real stories of transformation and achievement from our alumni
      </p>
    </div>
  </div>
</section>

<!-- Success Stories Grid -->
<section class="section py-20">
  <div class="container">
    <div class="stories-grid grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each successStories as story}
        <div class="story-card bg-white rounded-xl shadow-lg overflow-hidden">
          <img src={story.image} alt={story.name} class="story-image" />
          <div class="p-6">
            <div
              class="achievement-badge text-white text-sm px-4 py-2 rounded-full mb-4 inline-block"
            >
              {story.year}
            </div>
            <h3 class="text-2xl font-heading font-bold text-primary mb-2">
              {story.name}
            </h3>
            <p class="text-accent font-medium mb-4">{story.role}</p>
            <p class="text-text-light mb-4">{story.story}</p>
            <div class="border-t pt-4">
              <p class="font-medium text-primary mb-2">Achievement:</p>
              <p class="text-text-light">{story.achievement}</p>
            </div>
            <div class="mt-4">
              <p class="font-medium text-primary mb-2">Company:</p>
              <p class="text-text-light">{story.company}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Stats Section -->
<section class="stats-section bg-gray-50 py-20">
  <div class="container">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div class="stats-item text-center">
        <div class="text-4xl font-bold text-primary mb-2">95%</div>
        <p class="text-text-light">Placement Rate</p>
      </div>
      <div class="stats-item text-center">
        <div class="text-4xl font-bold text-primary mb-2">7500+</div>
        <p class="text-text-light">Students Trained</p>
      </div>
      <div class="stats-item text-center">
        <div class="text-4xl font-bold text-primary mb-2">50+</div>
        <p class="text-text-light">Corporate Partners</p>
      </div>
      <div class="stats-item text-center">
        <div class="text-4xl font-bold text-primary mb-2">15+</div>
        <p class="text-text-light">Years Experience</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="cta-section bg-primary text-white py-20">
  <div class="container text-center">
    <h2 class="text-4xl font-heading font-bold mb-6">
      Start Your Success Story
    </h2>
    <p class="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
      Join our training programs and take the first step towards a successful
      career.
    </p>
    <div class="flex gap-4 justify-center">
      <a href="/contact" class="btn-primary-light"> Enroll Now </a>
      <a href="/services" class="btn-secondary"> View Courses </a>
    </div>
  </div>
</section>

<style>
  /* Add initial opacity 0 to elements that will be animated */
  :global(.hero-content),
  :global(.story-card),
  :global(.stats-item),
  :global(.cta-section) {
    opacity: 0;
  }

  .hero-section {
    background-size: cover;
    background-position: center;
  }

  .story-card {
    transform: translateY(0);
    transition: all 0.3s ease;
  }

  .story-card:hover {
    transform: translateY(-5px);
  }

  .story-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 1rem 1rem 0 0;
  }

  .achievement-badge {
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  }
</style>
