Function.prototype.bind = Function.prototype.bind || require('function-bind');

var simulant = require('simulant'),
  bespoke = require('bespoke'),
  classes = require('bespoke-classes'),
  keys = require('bespoke-keys'),
  breather = require('../../lib/bespoke-breather.js');

describe("bespoke-breather", function() {

  var deck,
    createDeck = function() {
      var parent = document.createElement('article');
      for (var i = 0; i < 10; i++) {
        var slide = document.createElement('section');
        parent.appendChild(slide);
      }

      deck = bespoke.from(parent, [
        classes(),
        keys(),
        breather()
      ]);
    },

    destroyDeck = function() {
      deck.fire('destroy');
      deck = null;
    },

    pressKey = function(which, element) {
      simulant.fire((element || document), 'keydown', { which: which });
    };

  describe("blank slide", function() {

    beforeEach(createDeck);
    afterEach(destroyDeck);

    it("should add the bespoke-paused class to the parent when pressing b", function() {
      expect(deck.parent.classList.contains('bespoke-paused')).toBe(false);
      pressKey(66);
      expect(deck.parent.classList.contains('bespoke-paused')).toBe(true);
      pressKey(66);
      expect(deck.parent.classList.contains('bespoke-paused')).toBe(false);
    });

    it("should add the bespoke-paused class to the parent when pressing .", function() {
      expect(deck.parent.classList.contains('bespoke-paused')).toBe(false);
      pressKey(190);
      expect(deck.parent.classList.contains('bespoke-paused')).toBe(true);
      pressKey(190);
      expect(deck.parent.classList.contains('bespoke-paused')).toBe(false);
    });

    it("should not advance slide when paused", function() {
      deck.slide(1);
      expect(deck.slide()).toBe(1);
      pressKey(66);
      pressKey(32);
      expect(deck.slide()).toBe(1);
    });

  });

});
