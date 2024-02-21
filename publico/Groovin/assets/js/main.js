/**
* Template Name: Groovin
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/groovin-free-bootstrap-theme/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

document.getElementById("btnCadastrar").addEventListener("click", function() {
  // Chame a função de validação
  if (validarFormulario()) {
    // Se a validação passar, chame a função de cadastro
    cadastrar();
  }
});

function validarFormulario() {
  var email = document.getElementById("inputEmail4").value;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, insira um endereço de e-mail válido.");
    return false;
  }
  return true;
}

function validarSenha() {
  var senha = document.getElementById("inputPassword4").value;
  if (senha.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres.");
    return false;
  }
  return true;
}

function mCEP() {
  var cep = document.getElementById("inputCEP");
  cep.value = cep.value.replace(/\D/g, '');
  cep.value = cep.value.replace(/^(\d{5})(\d)/, '$1-$2');
}

function cadastrar() {
  if (validarSenha() && validarEmail()) {
    alert("Cadastro realizado com sucesso!");
    // Adicione aqui a lógica de envio do formulário ou outra ação desejada
  }
}

function validarCPF() {
  var cpf = document.getElementById("cpf").value;
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11 || !/[0-9]{11}/.test(cpf)) {
    alert("Por favor, insira um CPF válido.");
    return false;
  }

  // Validação do CPF
  var soma = 0;
  var resto;

  for (var i = 1; i <= 9; i++) {
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if ((resto === 10) || (resto === 11)) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.substring(9, 10))) {
    alert("Por favor, insira um CPF válido.");
    return false;
  }

  soma = 0;
  for (var i = 1; i <= 10; i++) {
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;

  if ((resto === 10) || (resto === 11)) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.substring(10, 11))) {
    alert("Por favor, insira um CPF válido.");
    return false;
  }

  return true;
}

function mascaraCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, '');

  if (cnpj.length > 14) {
    cnpj = cnpj.substring(0, 14);
  }

  if (cnpj.length > 12) {
    cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
    cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
  }

  return cnpj;
}

function mCNPJ() {
  var cnpj = document.getElementById("cnpj");
  cnpj.value = mascaraCNPJ(cnpj.value);
}


function mascaraCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length > 11) {
    cpf = cpf.substring(0, 11);
  }

  cpf = cpf.replace(/^(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
  cpf = cpf.replace(/\.(\d{3})(\d)/, '.$1-$2');

  return cpf;
}

function mCPF() {
  var cpf = document.getElementById("cpf");
  cpf.value = mascaraCPF(cpf.value);
}


function mascaraContato(contato) {
  contato = contato.replace(/\D/g, ''); // Remove caracteres não numéricos

  if (contato.length > 11) {
    contato = contato.substring(0, 11);
  }

  // Aplica a máscara
  contato = contato.replace(/^(\d{2})(\d)/, '($1)$2');
  contato = contato.replace(/(\d{5})(\d)/, '$1-$2');

  return contato;
}

function mContato() {
  var contato = document.getElementById("inputAddress");
  contato.value = mascaraContato(contato.value);
}
