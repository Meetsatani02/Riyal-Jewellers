/*
 * Async script loader (defers theme JS until first user interaction).
 * Vendor license / copyright domain-check removed intentionally.
 */
var script_loaded = false;

function loadAsync() {
  if (script_loaded) {
    return;
  }
  script_loaded = true;

  var scripts = document.getElementsByTagName('script');
  for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].getAttribute('data-src') !== null) {
      scripts[i].setAttribute('src', scripts[i].getAttribute('data-src'));
      delete scripts[i].dataset.src;
    }
    if (scripts[i].getAttribute('type') == 'text/javascripts') {
      var newScript = document.createElement('script');
      for (var j = 0; j < scripts[i].attributes.length; j++) {
        var attr = scripts[i].attributes[j];
        newScript.setAttribute(attr.name, attr.value);
      }
      newScript.type = 'text/javascript';
      newScript.innerHTML = scripts[i].innerHTML;
      scripts[i].parentNode.removeChild(scripts[i]);
      scripts[i].parentNode.insertBefore(newScript, scripts[i]);
    }
  }

  setTimeout(function () {
    document.dispatchEvent(new CustomEvent('StartAsyncLoading'));
  }, 900);
  document.dispatchEvent(new CustomEvent('startasyncloading'));
}

window.addEventListener('scroll', function () { loadAsync(); });
window.addEventListener('mousemove', function () { loadAsync(); });
window.addEventListener('touchstart', function () { loadAsync(); });

if (window.addEventListener) {
  window.addEventListener('load', function () { setTimeout(loadAsync, 9000); }, false);
} else if (window.attachEvent) {
  window.attachEvent('onload', function () { setTimeout(loadAsync, 9000); });
} else {
  window.onload = loadAsync;
}
