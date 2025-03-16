// DOM Elements
const header = document.querySelector("header")
const menuToggle = document.querySelector(".menu-toggle")
const navMenu = document.querySelector("nav ul")
const navLinks = document.querySelectorAll("nav ul li a")
const filterBtns = document.querySelectorAll(".filter-btn")
const projectCards = document.querySelectorAll(".project-card")
const skillLevels = document.querySelectorAll(".skill-level")
const loadMoreBtn = document.getElementById("load-more")
const contactForm = document.getElementById("contact-form")
const sections = document.querySelectorAll("section")

// 3D Background
let scene, camera, renderer, particles, clock, material
import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js"

function initThreeJS() {
  // Create scene
  scene = new THREE.Scene()

  // Create camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 30

  // Create renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  document.getElementById("canvas-container").appendChild(renderer.domElement)

  // Initialize clock for animation
  clock = new THREE.Clock()

  // Create enhanced particles
  createWaveParticles()

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  // Animation loop
  function animate() {
    requestAnimationFrame(animate)

    const elapsedTime = clock.getElapsedTime()

    // Animate particles
    if (particles) {
      const positions = particles.geometry.attributes.position.array

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]

        // Create wave effect
        positions[i + 2] = Math.sin(elapsedTime * 0.5 + x * 0.5) * 2 + Math.cos(elapsedTime * 0.3 + y * 0.3) * 2
      }

      particles.geometry.attributes.position.needsUpdate = true

      // Rotate particles
      particles.rotation.x = elapsedTime * 0.05
      particles.rotation.y = elapsedTime * 0.075
    }

    // Update material
    if (material) {
      // Cycle through colors
      const hue = (elapsedTime * 0.05) % 1
      const color = new THREE.Color().setHSL(hue, 0.8, 0.5)
      material.color = color
    }

    renderer.render(scene, camera)
  }

  animate()
}

function createWaveParticles() {
  // Create a grid of particles
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 5000

  const positions = new Float32Array(particlesCount * 3)
  const colors = new Float32Array(particlesCount * 3)

  const size = 100
  const halfSize = size / 2

  for (let i = 0; i < particlesCount; i++) {
    // Position particles in a grid pattern
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * size
    positions[i3 + 1] = (Math.random() - 0.5) * size
    positions[i3 + 2] = (Math.random() - 0.5) * 10

    // Add color variation
    const color = new THREE.Color()
    color.setHSL(Math.random() * 0.2 + 0.5, 0.8, 0.5)

    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b
  }

  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

  // Create material with vertex colors
  material = new THREE.PointsMaterial({
    size: 0.2,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
  })

  particles = new THREE.Points(particlesGeometry, material)
  scene.add(particles)
}

// Initialize 3D background
initThreeJS()

// Scroll event for header
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  // Reveal elements on scroll
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top
    const revealPoint = 300 // Adjusted reveal point

    if (sectionTop < window.innerHeight - revealPoint) {
      section.classList.add("active")
    }
  })

  // Animate skill bars when in view
  const skillsSection = document.querySelector(".skills")
  if (skillsSection.getBoundingClientRect().top < window.innerHeight - 100) {
    skillLevels.forEach((skill) => {
      skill.style.width = skill.getAttribute("data-level")
    })
  }
})

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")

    // Update active link
    navLinks.forEach((navLink) => {
      navLink.classList.remove("active")
    })
    link.classList.add("active")
  })
})

// Project filtering
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update active button
    filterBtns.forEach((filterBtn) => {
      filterBtn.classList.remove("active")
    })
    btn.classList.add("active")

    const filterValue = btn.getAttribute("data-filter")

    projectCards.forEach((card) => {
      if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })
  })
})

// Load more projects (simulation)
let projectsVisible = 6
const projectsPerLoad = 3

// Initially hide projects beyond the visible count
projectCards.forEach((card, index) => {
  if (index >= projectsVisible) {
    card.style.display = "none"
  }
})

// Load more button functionality
loadMoreBtn.addEventListener("click", () => {
  projectsVisible += projectsPerLoad

  projectCards.forEach((card, index) => {
    if (index < projectsVisible) {
      card.style.display = "block"
    }
  })

  // Hide button if all projects are visible
  if (projectsVisible >= projectCards.length) {
    loadMoreBtn.style.display = "none"
  }
})

// Custom cursor
function initCustomCursor() {
  const cursorDot = document.createElement("div")
  cursorDot.className = "cursor-dot"

  const cursorOutline = document.createElement("div")
  cursorOutline.className = "cursor-outline"

  document.body.appendChild(cursorDot)
  document.body.appendChild(cursorOutline)
  document.body.classList.add("custom-cursor")

  let mouseX = 0
  let mouseY = 0
  let outlineX = 0
  let outlineY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    cursorDot.style.left = `${mouseX}px`
    cursorDot.style.top = `${mouseY}px`
  })

  // Add hover effect for interactive elements
  const interactiveElements = document.querySelectorAll("a, button, .btn, .filter-btn, .social-link, input, textarea")

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorOutline.style.borderColor = "var(--secondary-color)"
      cursorDot.style.backgroundColor = "var(--secondary-color)"
    })

    el.addEventListener("mouseleave", () => {
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1)"
      cursorOutline.style.borderColor = "var(--primary-color)"
      cursorDot.style.backgroundColor = "var(--primary-color)"
    })
  })

  // Smooth animation for cursor outline
  function animateOutline() {
    // Smooth follow with lag
    outlineX += (mouseX - outlineX) * 0.15
    outlineY += (mouseY - outlineY) * 0.15

    cursorOutline.style.left = `${outlineX}px`
    cursorOutline.style.top = `${outlineY}px`

    requestAnimationFrame(animateOutline)
  }

  animateOutline()

  // Hide cursor when leaving window
  document.addEventListener("mouseout", (e) => {
    if (e.relatedTarget === null) {
      cursorDot.style.opacity = "0"
      cursorOutline.style.opacity = "0"
    }
  })

  document.addEventListener("mouseover", () => {
    cursorDot.style.opacity = "1"
    cursorOutline.style.opacity = "1"
  })
}

// Initialize page with active elements
document.addEventListener("DOMContentLoaded", () => {
  // Set initial active link based on scroll position
  updateActiveLink()

  // Add reveal class to all sections
  sections.forEach((section) => {
    section.classList.add("reveal")
  })

  // Add fadeIn animation to hero section
  document.querySelector(".hero-content").classList.add("fadeIn")

  // Initialize custom cursor
  initCustomCursor()
})

// Update active link based on scroll position
function updateActiveLink() {
  const scrollPosition = window.scrollY

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

// Update active link on scroll
window.addEventListener("scroll", updateActiveLink)

