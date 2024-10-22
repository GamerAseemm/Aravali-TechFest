  let lastScrollTop = 0;
  const navbar = document.querySelector('.navbar');
  let disableScrollDetection = false;

  window.addEventListener('scroll', function() {
    if (disableScrollDetection) return;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      navbar.classList.add('hidden-navbar');
    } else {
      navbar.classList.remove('hidden-navbar');
    }

    lastScrollTop = scrollTop;
  });
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function() {
      disableScrollDetection = true; 
    });
  });

  