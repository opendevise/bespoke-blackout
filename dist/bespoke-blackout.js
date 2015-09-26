/*!
 * bespoke-blackout v1.0.0-dev
 *
 * Copyright 2015, Dan Allen
 * This content is released under the MIT license
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.bespoke||(g.bespoke = {}));g=(g.plugins||(g.plugins = {}));g.blackout = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});