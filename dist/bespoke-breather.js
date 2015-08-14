/*!
 * bespoke-breather v1.0.0
 *
 * Copyright 2015, Dan Allen
 * This content is released under the MIT license
 * 
 */

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self);var o=n;o=o.bespoke||(o.bespoke={}),o=o.plugins||(o.plugins={}),o.breather=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
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

      dispatcher = function(e) {
        if (e.which === KEYCODE_B || e.which === KEYCODE_PERIOD) {
          pause(!paused);
        }
      },

      destroy = function() {
        document.removeEventListener('keydown', dispatcher, false);
      };

    document.addEventListener('keydown', dispatcher, false);

    deck.on('next', next);
    deck.on('prev', prev);
    deck.on('pause', pause);
    deck.on('destroy', destroy);
  };
};

},{}]},{},[1])
(1)
});