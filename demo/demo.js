var deck = bespoke.from('.deck', [
  bespoke.plugins.classes(),
  bespoke.plugins.keys(),
  bespoke.plugins.blackout(),
  bespoke.plugins.forms()
]);

// expose API to other applications
window.deck = deck;
