module.exports = function() {
  require('insert-css')('.bespoke-blackout-overlay{position:absolute;top:0;right:0;bottom:0;left:0;background-color:#101010;opacity:0;visibility:hidden;z-index:1000}.bespoke-blackout .bespoke-blackout-overlay{opacity:1;visibility:visible}');
  return function(deck) {
    var KEY_B = 66, KEY_DOT = 190, EVT_KEYDOWN = 'keydown',
      blackout = false,
      addOverlay = function() {
        var overlay = document.createElement('div');
        overlay.className = 'bespoke-blackout-overlay';
        deck.parent.appendChild(overlay);
      },
      preventDefault = function() { return false; },
      toggleBlackout = function() {
        var parentClasses = deck.parent.classList;
        if (blackout) {
          parentClasses.remove('bespoke-blackout');
          blackout.forEach(function(unbindEvent) { unbindEvent(); });
          blackout = false;
        }
        else {
          parentClasses.add('bespoke-blackout');
          blackout = [deck.on('next', preventDefault), deck.on('prev', preventDefault)];
        }
      },
      isModifierPressed = function(e) {
        return !!(e.ctrlKey || e.shiftKey || e.altKey || e.metaKey);
      },
      onKeydown = function(e) {
        var key = e.which;
        if ((key === KEY_B || key === KEY_DOT) && !isModifierPressed(e)) toggleBlackout();
      };
    deck.on('blackout', toggleBlackout);
    deck.on('destroy', function() {
      deck.parent.removeChild(deck.parent.querySelector('.bespoke-blackout-overlay'));
      document.removeEventListener(EVT_KEYDOWN, onKeydown);
    });
    addOverlay();
    document.addEventListener(EVT_KEYDOWN, onKeydown);
  };
};
