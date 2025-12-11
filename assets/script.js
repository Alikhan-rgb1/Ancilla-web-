const toggle = document.querySelector('.menu-toggle')
const header = document.querySelector('.site-header')

if (toggle && header) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true'
    toggle.setAttribute('aria-expanded', String(!expanded))
    document.body.classList.toggle('nav-open')
  })
}

// reveal on scroll
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!prefersReduced) {
  const items = document.querySelectorAll('.reveal, .reveal-left')
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in')
        io.unobserve(e.target)
      }
    })
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 })

  items.forEach((el) => io.observe(el))

  const links = document.querySelectorAll('a[href^="#"]')
  const navLinks = document.querySelectorAll('nav.site-nav a[href^="#"]')
  links.forEach((a) => {
    a.addEventListener('click', (ev) => {
      const href = a.getAttribute('href')
      if (!href) return
      const target = document.querySelector(href)
      if (target) {
        ev.preventDefault()
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        document.body.classList.remove('nav-open')
        navLinks.forEach((l) => l.classList.remove('active'))
        if (a.closest('nav.site-nav')) a.classList.add('active')
        toggle?.setAttribute('aria-expanded', 'false')
      }
    })
  })

  const sections = document.querySelectorAll('main section[id]')
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const id = '#' + e.target.id
        navLinks.forEach((l) => {
          l.classList.toggle('active', l.getAttribute('href') === id)
        })
      }
    })
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 })

  sections.forEach((s) => spy.observe(s))
}
