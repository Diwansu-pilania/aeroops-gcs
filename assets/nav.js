// AeroOps GCS — shared nav behavior: active-page highlight + mobile drawer toggle
(function () {
  // Mark the current page's links active (works for both /page and /page.html)
  var file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var page = file.replace('.html', '') || 'index';
  document.querySelectorAll('[data-nav]').forEach(function (a) {
    var target = a.getAttribute('data-nav');
    if (target === page) a.classList.add('active');
  });

  // Mobile drawer
  var burger = document.getElementById('gnavBurger');
  var drawer = document.getElementById('gnavDrawer');
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      drawer.classList.toggle('open');
    });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { drawer.classList.remove('open'); });
    });
    // Close drawer if resized up to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) drawer.classList.remove('open');
    });
  }
})();
