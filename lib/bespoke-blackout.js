module.exports = function() {
  return function(deck) {
    var KEY_B = 66, KEY_DOT = 190, EVT_KEYDOWN = 'keydown',
      blackout = false,
      toggleBlackout = function() {
        var parentClasses = deck.parent.classList;
        if (blackout) {
          parentClasses.remove('bespoke-blackout');
          (blackout || []).forEach(function(unbindEvent) { unbindEvent(); });
          blackout = false;
        }
        else {
          parentClasses.add('bespoke-blackout');
          blackout = [deck.on('next', preventDefault), deck.on('prev', preventDefault)];
        }
      },
      preventDefault = function() { return false; },
      onKeydown = function(e) {
        var key = e.which;
        if (key === KEY_B || key === KEY_DOT) toggleBlackout();
      };
    deck.on('blackout', toggleBlackout);
    deck.on('destroy', function() { document.removeEventListener(EVT_KEYDOWN, onKeydown); });
    document.addEventListener(EVT_KEYDOWN, onKeydown);
  };
};
