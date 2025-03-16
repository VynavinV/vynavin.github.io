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

// Skill Galaxy Visualization
function initSkillGalaxy() {
  // Skill data structure
  const skillData = {
    nodes: [
      // Main skills
      {
        id: "game-dev",
        name: "Game Development",
        value: 90,
        group: 1,
        description:
          "Expert in Unity C# game development with 6+ years of experience creating immersive gaming experiences",
      },
      {
        id: "ai-ml",
        name: "AI & ML",
        value: 85,
        group: 2,
        description: "Strong knowledge of AI frameworks like OpenCV and Hugging Face for computer vision and NLP tasks",
      },
      {
        id: "web-dev",
        name: "Web Development",
        value: 80,
        group: 3,
        description: "Full stack web development skills with experience in both frontend and backend technologies",
      },
      {
        id: "ar-vr",
        name: "AR/VR",
        value: 85,
        group: 4,
        description: "Creating immersive augmented and virtual reality experiences using Unity and other frameworks",
      },
      {
        id: "hardware",
        name: "Hardware & IoT",
        value: 75,
        group: 5,
        description: "Proficient with Raspberry Pi hardware and software for IoT applications",
      },

      // Specific skills
      {
        id: "unity",
        name: "Unity",
        value: 90,
        group: 1,
        description: "Expert in Unity game engine with extensive experience in C# programming and game mechanics",
      },
      {
        id: "blender",
        name: "Blender",
        value: 80,
        group: 1,
        description: "3D modeling, texturing, rigging and animation skills using Blender",
      },
      {
        id: "opencv",
        name: "OpenCV",
        value: 85,
        group: 2,
        description: "Computer vision library expertise for real-time image processing and object detection",
      },
      {
        id: "huggingface",
        name: "Hugging Face",
        value: 80,
        group: 2,
        description: "NLP model implementation using Hugging Face transformers",
      },
      {
        id: "python",
        name: "Python",
        value: 85,
        group: 2,
        description: "Advanced Python programming for AI/ML, data processing, and backend development",
      },
      {
        id: "html-css",
        name: "HTML/CSS",
        value: 90,
        group: 3,
        description: "Creating responsive and visually appealing web interfaces with modern CSS techniques",
      },
      {
        id: "javascript",
        name: "JavaScript",
        value: 85,
        group: 3,
        description: "Frontend and backend JavaScript development with various frameworks",
      },
      {
        id: "csharp",
        name: "C#",
        value: 90,
        group: 1,
        description: "Advanced C# programming for game development, desktop applications, and backend services",
      },
      {
        id: "raspberry-pi",
        name: "Raspberry Pi",
        value: 75,
        group: 5,
        description: "Hardware and software development using Raspberry Pi for IoT and automation",
      },
      {
        id: "teamwork",
        name: "Teamwork",
        value: 80,
        group: 6,
        description: "Excellent team player and leader with experience managing development teams",
      },
    ],
    links: [
      // Game Development connections
      { source: "game-dev", target: "unity", value: 5 },
      { source: "game-dev", target: "blender", value: 4 },
      { source: "game-dev", target: "csharp", value: 5 },
      { source: "game-dev", target: "ar-vr", value: 4 },

      // AI/ML connections
      { source: "ai-ml", target: "opencv", value: 4 },
      { source: "ai-ml", target: "huggingface", value: 4 },
      { source: "ai-ml", target: "python", value: 5 },

      // Web Development connections
      { source: "web-dev", target: "html-css", value: 5 },
      { source: "web-dev", target: "javascript", value: 5 },
      { source: "web-dev", target: "python", value: 3 },

      // AR/VR connections
      { source: "ar-vr", target: "unity", value: 5 },
      { source: "ar-vr", target: "csharp", value: 4 },
      { source: "ar-vr", target: "blender", value: 3 },

      // Hardware connections
      { source: "hardware", target: "raspberry-pi", value: 5 },
      { source: "hardware", target: "python", value: 3 },

      // Cross-discipline connections
      { source: "unity", target: "csharp", value: 5 },
      { source: "ai-ml", target: "game-dev", value: 3 },
      { source: "web-dev", target: "ai-ml", value: 2 },
      { source: "teamwork", target: "game-dev", value: 4 },
      { source: "teamwork", target: "web-dev", value: 4 },
      { source: "teamwork", target: "ar-vr", value: 4 },
    ],
  }

  // Import D3.js library
  const d3 = window.d3

  // Set up the D3 force simulation
  const width = document.getElementById("skill-galaxy").clientWidth
  const height = document.getElementById("skill-galaxy").clientHeight

  // Color scale for different skill groups
  const colorScale = d3.scaleOrdinal().domain([1, 2, 3, 4, 5, 6]).range([
    "rgba(58, 134, 255, 0.9)", // Blue (Game Dev)
    "rgba(255, 0, 110, 0.9)", // Pink (AI/ML)
    "rgba(131, 56, 236, 0.9)", // Purple (Web Dev)
    "rgba(251, 86, 7, 0.9)", // Orange (AR/VR)
    "rgba(255, 190, 11, 0.9)", // Yellow (Hardware)
    "rgba(76, 217, 100, 0.9)", // Green (Teamwork)
  ])

  // Create a force simulation
  const simulation = d3
    .forceSimulation(skillData.nodes)
    .force(
      "link",
      d3
        .forceLink(skillData.links)
        .id((d) => d.id)
        .distance((d) => (100 / d.value) * 10),
    )
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force(
      "collision",
      d3.forceCollide().radius((d) => Math.sqrt(d.value) * 2),
    )

  // Create the SVG container
  const svg = d3
    .select("#skill-galaxy")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("class", "skill-galaxy-svg")

  // Create a gradient for the links
  const gradient = svg
    .append("defs")
    .selectAll("linearGradient")
    .data(skillData.links)
    .enter()
    .append("linearGradient")
    .attr("id", (d, i) => `gradient-${i}`)
    .attr("gradientUnits", "userSpaceOnUse")

  gradient
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", (d) => {
      const sourceNode = skillData.nodes.find((node) => node.id === d.source.id || node.id === d.source)
      return colorScale(sourceNode.group)
    })

  gradient
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", (d) => {
      const targetNode = skillData.nodes.find((node) => node.id === d.target.id || node.id === d.target)
      return colorScale(targetNode.group)
    })

  // Create the links
  const link = svg
    .append("g")
    .selectAll("line")
    .data(skillData.links)
    .enter()
    .append("line")
    .attr("class", "skill-link")
    .attr("stroke", (d, i) => `url(#gradient-${i})`)
    .attr("stroke-width", (d) => Math.sqrt(d.value))

  // Create the nodes
  const node = svg
    .append("g")
    .selectAll("g")
    .data(skillData.nodes)
    .enter()
    .append("g")
    .attr("class", "skill-node")
    .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended))
    .on("mouseover", showSkillInfo)
    .on("mouseout", hideSkillInfo)

  // Add circles to the nodes
  node
    .append("circle")
    .attr("r", (d) => Math.sqrt(d.value) * 1.5)
    .attr("fill", (d) => colorScale(d.group))
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .attr("stroke-opacity", 0.5)

  // Add text labels to the nodes
  node
    .append("text")
    .text((d) => d.name)
    .attr("x", (d) => 0)
    .attr("y", (d) => Math.sqrt(d.value) * 1.5 + 15)
    .attr("text-anchor", "middle")
    .attr("fill", "#fff")
    .attr("font-size", (d) => (d.value > 85 ? "12px" : "10px"))
    .attr("font-weight", (d) => (d.value > 85 ? "bold" : "normal"))
    .attr("pointer-events", "none")

  // Update the simulation on each tick
  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y)

    node.attr("transform", (d) => `translate(${d.x},${d.y})`)

    // Update gradient positions
    gradient
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y)
  })

  // Dragging functions
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
  }

  function dragged(event, d) {
    d.fx = event.x
    d.fy = event.y
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
  }

  // Show skill info on hover
  function showSkillInfo(event, d) {
    d3.select(this)
      .select("circle")
      .transition()
      .duration(200)
      .attr("r", Math.sqrt(d.value) * 1.8)

    // Update skill info box
    document.getElementById("selected-skill-title").textContent = d.name
    document.getElementById("selected-skill-description").textContent = d.description
  }

  // Hide skill info on mouseout
  function hideSkillInfo(event, d) {
    d3.select(this)
      .select("circle")
      .transition()
      .duration(200)
      .attr("r", Math.sqrt(d.value) * 1.5)
  }
}

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

  // Make hero section pop in without scrolling
  document.querySelector(".hero").classList.add("active")

  // Initialize custom cursor
  initCustomCursor()

  // Initialize skill galaxy
  initSkillGalaxy()
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

document.getElementById('scroll-circle').addEventListener('click', function() {
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});