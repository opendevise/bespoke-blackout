module.exports = function() {
  return function(deck) {
    var KEYCODE_B = 66,
      KEYCODE_PERIOD = 190,
      paused = false,
      pause = function(toState) {
        var parentClasses = deck.parent.classList;
        if (toState === false) {
          if (paused) {
            parentClasses.remove('bespoke-paused');
            paused = false;
          }
        }
        else {
          if (!paused) {
            parentClasses.add('bespoke-paused');
            paused = true;
          }
        }
      },
      next = function() {
        return !paused;
      },
      prev = function() {
        return !paused;
      },
      keydownHandler = function(e) {
        if (e.which === KEYCODE_B || e.which === KEYCODE_PERIOD) {
          pause(!paused);
        }
      },
      destroy = function() {
        document.removeEventListener('keydown', keydownHandler, false);
      };

    document.addEventListener('keydown', keydownHandler, false);

    deck.on('next', next);
    deck.on('prev', prev);
    deck.on('pause', pause);
    deck.on('destroy', destroy);
  };
};
