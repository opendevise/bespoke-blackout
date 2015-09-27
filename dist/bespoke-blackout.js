/*!
 * bespoke-blackout v1.0.1-dev
 *
 * Copyright 2015, Dan Allen
 * This content is released under the MIT license
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.bespoke||(g.bespoke = {}));g=(g.plugins||(g.plugins = {}));g.blackout = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
      preventDefault = function() { return false; },
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

},{"insert-css":2}],2:[function(require,module,exports){
var inserted = {};

module.exports = function (css, options) {
    if (inserted[css]) return;
    inserted[css] = true;
    
    var elem = document.createElement('style');
    elem.setAttribute('type', 'text/css');

    if ('textContent' in elem) {
      elem.textContent = css;
    } else {
      elem.styleSheet.cssText = css;
    }
    
    var head = document.getElementsByTagName('head')[0];
    if (options && options.prepend) {
        head.insertBefore(elem, head.childNodes[0]);
    } else {
        head.appendChild(elem);
    }
};

},{}]},{},[1])(1)
});