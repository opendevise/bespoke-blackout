Function.prototype.bind = Function.prototype.bind || require('function-bind');

var simulant = require('simulant'),
  bespoke = require('bespoke'),
  classes = require('bespoke-classes'),
  nav = require('bespoke-nav'),
  blackout = require('../../lib/bespoke-blackout.js');

describe('bespoke-blackout', function() {
  var KEY = { b: 66, dot: 190, space: 32 },
    deck,
    createDeck = function() {
      var parent = document.createElement('article');
      for (var i = 1; i <= 5; i++) {
        var slide = document.createElement('section');
        parent.appendChild(slide);
      }
      document.body.appendChild(parent);
      deck = bespoke.from(parent, [
        classes(),
        nav(),
        blackout()
      ]);
    },
    destroyDeck = function() {
      deck.fire('destroy');
      if (deck.parent.parentNode) deck.parent.parentNode.removeChild(deck.parent);
      deck = null;
    },
    pressKey = function(which, opts, element) {
      opts = opts ? opts : {};
      opts.which = KEY[which] || which;
      simulant.fire((element || document), 'keydown', opts);
    };

  describe('styles and overlay', function() {
    beforeEach(createDeck);
    afterEach(destroyDeck);

    it('inserts CSS before the first child element of <head>', function() {
      var style = document.head.querySelector('style');
      expect(style).toBeDefined();
      expect(style).not.toBeNull();
      expect(style.textContent).toContain('.bespoke-blackout-overlay');
    });

    it('should add an blackout overlay element', function() {
      var overlay = deck.parent.querySelector('.bespoke-blackout-overlay');
      expect(overlay).toBeDefined();
      expect(overlay).not.toBeNull();
    });
  });

  describe('toggle blackout', function() {
    beforeEach(createDeck);
    afterEach(destroyDeck);

    ['b', 'dot'].forEach(function(key) {
      it('should add the bespoke-blackout class to parent when ' + key + ' is pressed', function() {
        expect(deck.parent.classList).not.toContain('bespoke-blackout');
        pressKey(key);
        expect(deck.parent.classList).toContain('bespoke-blackout');
        pressKey(key);
        expect(deck.parent.classList).not.toContain('bespoke-blackout');
      });

      it('should change the opacity of overlay from 0 to 1 when ' + key + ' is pressed', function() {
        var overlay = deck.parent.querySelector('.bespoke-blackout-overlay');
        expect(getComputedStyle(overlay).opacity).toBe('0');
        pressKey(key);
        expect(getComputedStyle(overlay).opacity).toBe('1');
        pressKey(key);
        expect(getComputedStyle(overlay).opacity).toBe('0');
      });

      it('should change the visibility of overlay from hidden to visible when ' + key + ' is pressed', function() {
        var overlay = deck.parent.querySelector('.bespoke-blackout-overlay');
        expect(getComputedStyle(overlay).visibility).toBe('hidden');
        pressKey(key);
        expect(getComputedStyle(overlay).visibility).toBe('visible');
        pressKey(key);
        expect(getComputedStyle(overlay).visibility).toBe('hidden');
      });

      it('should not add bespoke-blackout class to parent when ' + key + ' and modifier is pressed', function() {
        expect(deck.parent.classList).not.toContain('bespoke-blackout');
        pressKey(key, { ctrlKey: true });
        expect(deck.parent.classList).not.toContain('bespoke-blackout');
      });
    });

    it('should toggle blackout when blackout event is fired', function() {
      expect(deck.parent.classList).not.toContain('bespoke-blackout');
      deck.fire('blackout');
      expect(deck.parent.classList).toContain('bespoke-blackout');
      deck.fire('blackout');
      expect(deck.parent.classList).not.toContain('bespoke-blackout');
    });
  });

  describe('navigation', function() {
    beforeEach(createDeck);
    afterEach(destroyDeck);

    it('should not advance slide when blackout is on', function() {
      deck.slide(1);
      expect(deck.slide()).toBe(1);
      pressKey('b');
      pressKey('space');
      expect(deck.slide()).toBe(1);
    });
  });
});
