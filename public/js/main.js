/* Dar Al Haiba — language toggle.
   Both languages ship in the markup. This shows one, hides the other, relabels the
   navigation, repoints the anchor links at the active language's sections, and
   remembers the choice. */
(function () {
  var EN = ['Products', 'Craft', 'Story', 'Visit'];
  var AR = ['\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a', '\u062d\u0631\u0641\u062a\u0646\u0627', '\u0642\u0635\u062a\u0646\u0627', '\u0632\u0648\u0631\u0648\u0646\u0627'];
  var TARGETS = ['#products', '#craft', '#story', '#visit'];

  function apply(lang) {
    var ar = lang === 'ar';
    var en_main = document.querySelector('[data-lang="en"]');
    var ar_main = document.querySelector('[data-lang="ar"]');
    // `hidden` rather than style.display: only one <main> may be exposed at a time,
    // or the document carries two main landmarks. It also hides the inactive language
    // before this script runs, and if it never runs at all.
    if (en_main) en_main.hidden = ar;
    if (ar_main) ar_main.hidden = !ar;

    var header = document.querySelector('header');
    if (header) {
      var brand = ar ? '\u062f\u0627\u0631 \u0627\u0644\u0647\u064a\u0628\u0629' : 'Dar Al Haiba';
      header.querySelectorAll('a[href^="#"]').forEach(function (a, i) {
        if (i === 0) {
          a.textContent = brand;
          a.setAttribute('href', ar ? '#top-ar' : '#top');
          return;
        }
        var k = i - 1;
        if (EN[k]) a.textContent = ar ? AR[k] : EN[k];
        if (TARGETS[k]) a.setAttribute('href', ar ? TARGETS[k] + '-ar' : TARGETS[k]);
      });
      var wa = header.querySelector('a[data-callbtn] [data-walabel]');
      if (wa) wa.textContent = ar ? "اتصل" : "Call";
      header.dir = ar ? 'rtl' : 'ltr';
      header.style.fontFamily = ar ? "'Noto Kufi Arabic', sans-serif" : '';
    }

    var mob = document.querySelector('[data-mobnav]');
    if (mob) {
      mob.querySelectorAll('a').forEach(function (a, i) {
        if (EN[i]) a.textContent = ar ? AR[i] : EN[i];
        if (TARGETS[i]) a.setAttribute('href', ar ? TARGETS[i] + '-ar' : TARGETS[i]);
      });
      mob.dir = ar ? 'rtl' : 'ltr';
      mob.style.fontFamily = ar ? "'Noto Kufi Arabic', sans-serif" : '';
    }

    var btn = document.getElementById('langToggle');
    if (btn) btn.textContent = ar ? 'English' : '\u0627\u0644\u0639\u0631\u0628\u064a\u0629';
    document.documentElement.lang = ar ? 'ar' : 'en';
    document.documentElement.dir = ar ? 'rtl' : 'ltr';
    try { localStorage.setItem('dah-lang', lang); } catch (e) {}
  }

  var initial = 'en';
  try {
    initial = new URLSearchParams(location.search).get('lang') || localStorage.getItem('dah-lang') || 'en';
  } catch (e) {}
  apply(initial === 'ar' ? 'ar' : 'en');

  var toggle = document.getElementById('langToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      apply(document.documentElement.lang === 'ar' ? 'en' : 'ar');
    });
  }
})();
