var forEach = Array.prototype.forEach;

// Check for <style scoped> support
if(!('scoped' in document.createElement('style'))) {
  var el = document.getElementById('no-scoped')
    , scopedStyles = document.querySelectorAll('style[scoped][contenteditable]');

  // Append scope polyfill
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '../js/scoped.js';
  document.getElementsByTagName('head')[0].appendChild(script);

  // Disable all content editable styles
  forEach.call(scopedStyles, function(el) {
    el.setAttribute('contenteditable', false);
  });

  var browserBlocks = [];
  if(window.chrome) {
    browserBlocks = el.querySelectorAll('.chrome');
  } else {
    browserBlocks = el.querySelectorAll('.other');
  }
  forEach.call(browserBlocks, function(el) {
    el.classList[el.classList.contains('hide') ? 'remove' : 'add']('hide');
  });

}

Reveal.initialize({
  controls: true,
  progress: false,
  history: true,
  keyboard: true
});

hljs.initHighlightingOnLoad();

// Trim whitespace in blocks
forEach.call(document.querySelectorAll('[data-trim]'), function(el) {
  el.innerHTML = el.innerHTML.trim();
});

// Make html tags safe in code blocks
forEach.call(document.querySelectorAll('pre code'), function(el) {
  if(!el.hasAttribute('data-noescape')) {
    el.innerHTML = el.innerHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
});

// Initialize live content editable code blocks
forEach.call(document.querySelectorAll('code [contenteditable=true]'), function(editor) {
  var container = document.createElement('div');
  container.classList.add('live-edit');
  container.innerHTML = editor.textContent;

  editor.setAttribute('spellcheck', false);

  // Find closest parent
  var el = editor;
  while(el && el.tagName && 'CODE' !== el.tagName) {
    el = el.parentNode;
  }

  el.parentNode.insertBefore(container, el);

  // Update on edit
  editor.addEventListener('keyup', function() {
    container.innerHTML = this.textContent;
  });
});
