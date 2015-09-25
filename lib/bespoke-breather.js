module.exports = function() {
  return function(deck) {
    var KEY_B = 66, KEY_DOT = 190, EVT_KEYDOWN = 'keydown',
      paused = false,
      togglePause = function() {
        var parentClasses = deck.parent.classList;
        if (paused) {
          parentClasses.remove('bespoke-paused');
          (paused || []).forEach(function(unbindEvent) { unbindEvent(); });
          paused = false;
        }
        else {
          parentClasses.add('bespoke-paused');
          paused = [deck.on('next', preventNavigation), deck.on('prev', preventNavigation)];
        }
      },
      preventNavigation = function() {
        return false;
      },
      onKeydown = function(e) {
        var key = e.which;
        if (key === KEY_B || key === KEY_DOT) togglePause();
      };
    deck.on('pause', togglePause);
    deck.on('destroy', function() { document.removeEventListener(EVT_KEYDOWN, onKeydown); });
    document.addEventListener(EVT_KEYDOWN, onKeydown);
  };
};
