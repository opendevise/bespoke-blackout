var deck = bespoke.from('#presentation', [
  bespoke.plugins.classes(),
  bespoke.plugins.keys(),
  bespoke.plugins.breather(),
  bespoke.plugins.forms()
]);

// expose API to other applications
window.deck = deck;