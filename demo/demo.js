var deck = bespoke.from('.deck', [
  bespoke.plugins.classes(),
  bespoke.plugins.nav(),
  bespoke.plugins.blackout(),
  bespoke.plugins.forms()
]);

// expose API to other applications
window.deck = deck;
