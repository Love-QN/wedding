// main.js

window.addEventListener("load", () => {
  
  try {
    if (!document.getElementById("intro-overlay") && window.AOS && typeof AOS.init === "function") {
        AOS.init({ duration: 800, once: true });
    }
  } catch (e) {
    console.error("AOS init error:", e);
  }

  try {
    if (window.VanillaTilt) {
      VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 12,
        speed: 800,
        glare: true,
        "max-glare": 0.25,
      });
    }
  } catch (e) {
    console.error("VanillaTilt error:", e);
  }

  try {
    const introOverlay = document.getElementById("intro-overlay");
    const enterBtn = document.getElementById("enter-btn");

    const runHeroAnimation = () => {
      if (!window.gsap) return;
      gsap.from(".hero-title", { y: 40, opacity: 0, duration: 1, delay: 0.1 });
      gsap.from(".hero-names", { y: 30, opacity: 0, duration: 1, delay: 0.3 });
      gsap.from(".hero-subtitle", { y: 20, opacity: 0, duration: 1, delay: 0.5 });
    };

    const hideIntro = () => {
      if (!introOverlay) {
        runHeroAnimation();
        if (window.AOS && typeof AOS.init === "function") {
          AOS.init({ duration: 800, once: true });
        }
        return;
      }
      
      if (window.gsap) {
        gsap.to("#intro-overlay", {
          opacity: 0,
          duration: 0.8,
          onComplete: () => {
            introOverlay.style.display = "none";
            
            if (window.AOS && typeof AOS.init === "function") {
              setTimeout(() => {
                AOS.init({ duration: 800, once: true });
                AOS.refresh();
              }, 300); 
            }
          },
        });
      } else {
        introOverlay.style.display = "none";
        if (window.AOS && typeof AOS.init === "function") {
          AOS.init({ duration: 800, once: true });
        }
      }
      runHeroAnimation();
    };

    if (introOverlay && enterBtn && window.gsap) {
      gsap.from(".intro-monogram", { y: -30, opacity: 0, duration: 1 });
      gsap.from(".intro-title", { y: 20, opacity: 0, duration: 0.8, delay: 0.3 });
      gsap.from(".intro-subtitle", { y: 20, opacity: 0, duration: 0.8, delay: 0.5 });
      gsap.from(".intro-btn", { scale: 0.9, opacity: 0, duration: 0.8, delay: 0.7 });

      enterBtn.addEventListener("click", hideIntro);
    } else {
      runHeroAnimation();
    }
  } catch (e) {
    console.error("Intro / GSAP error:", e);
  }

  try {
    const typedTarget = document.getElementById("typed-text");
    if (typedTarget && window.Typed) {
      new Typed("#typed-text", {
        strings: [
          "كثير من التعب…",
          "كثير من الحب…",
          "كثير من الانتظار…",
          "وفي النهاية: عقد في سوريا، لقاء في عمّان، وبيت في زارلاند."
        ],
        typeSpeed: 55,
        backSpeed: 35,
        backDelay: 1100,
        loop: true,
        smartBackspace: true,
      });
    }
  } catch (e) {
    console.error("Typed.js error:", e);
  }

  try {
    const meetingDate = new Date("2025-12-11T00:00:00").getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = meetingDate - now;

      const daysEl = document.getElementById("days");
      const hoursEl = document.getElementById("hours");
      const minutesEl = document.getElementById("minutes");
      const secondsEl = document.getElementById("seconds");

      if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

      if (distance <= 0) {
        daysEl.textContent = "0";
        hoursEl.textContent = "0";
        minutesEl.textContent = "0";
        secondsEl.textContent = "0";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = days;
      hoursEl.textContent = hours;
      minutesEl.textContent = minutes;
      secondsEl.textContent = seconds;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  } catch (e) {
    console.error("Countdown error:", e);
  }

  try {
    if (window.tsParticles) {
      tsParticles.load("tsparticles", {
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        particles: {
          number: { value: 55, density: { enable: true, area: 800 } },
          color: { value: ["#e74c3c", "#f1c40f", "#ffffff"] },
          shape: {
            type: ["circle", "char"],
            character: {
              value: ["♥", "★", "❤"],
              font: "Verdana",
              style: "",
              weight: "400"
            }
          },
          opacity: {
            value: 0.65,
            random: true,
            animation: { enable: true, speed: 1, minimumValue: 0.2, sync: false }
          },
          size: {
            value: 8,
            random: { enable: true, minimumValue: 4 }
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: "none",
            random: false,
            straight: false,
            outModes: { default: "out" },
            attract: { enable: false }
          }
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
            resize: true
          },
          modes: {
            repulse: { distance: 80, duration: 0.4 },
            push: { quantity: 3 }
          }
        },
        detectRetina: true
    });
    }
  } catch (e) {
    console.error("tsParticles error:", e);
  }

  try {
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const icon = themeToggle.querySelector("i");
        if (!icon) return;
        if (document.body.classList.contains("dark-mode")) {
          icon.classList.remove("fa-moon");
          icon.classList.add("fa-sun");
        } else {
          icon.classList.remove("fa-sun");
          icon.classList.add("fa-moon");
        }
      });
    }
  } catch (e) {
    console.error("Theme toggle error:", e);
  }

  try {
    const musicToggle = document.getElementById("music-toggle");
    const musicPlayer = document.getElementById("music-player");
    if (musicToggle && musicPlayer) {
      musicToggle.addEventListener("click", () => {
        const icon = musicToggle.querySelector("i");
        if (!icon) return;

        if (musicPlayer.paused) {
          musicPlayer.play().catch(() => {});
          icon.classList.remove("fa-play");
          icon.classList.add("fa-pause");
        } else {
          musicPlayer.pause();
          icon.classList.remove("fa-pause");
          icon.classList.add("fa-play");
        }
      });
    }
  } catch (e) {
    console.error("Music toggle error:", e);
  }

  try {
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxModalEl = document.getElementById("lightboxModal");

    if (
      galleryItems &&
      galleryItems.length > 0 &&
      lightboxImg &&
      lightboxCaption &&
      lightboxModalEl &&
      window.bootstrap
    ) {
      const lightboxModal = new bootstrap.Modal(lightboxModalEl);

      galleryItems.forEach((item) => {
        item.addEventListener("click", () => {
          const imgSrc = item.getAttribute("data-img");
          const caption = item.getAttribute("data-caption") || "";
          lightboxImg.src = imgSrc;
          lightboxCaption.textContent = caption;
          lightboxModal.show();
        });
      });
    }
  } catch (e) {
    console.error("Gallery / lightbox error:", e);
  }

  try {
    const backToTopBtn = document.getElementById("back-to-top");

    if (backToTopBtn) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 350) {
          backToTopBtn.classList.add("show");
        } else {
          backToTopBtn.classList.remove("show");
        }
      });

      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  } catch (e) {
    console.error("Back-to-top error:", e);
  }
});
