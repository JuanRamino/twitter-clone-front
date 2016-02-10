import jsdom from 'jsdom';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

// localStorage mock
function storage() {
  var storage = {};
  return {
    setItem: function(key, value) {
      storage[key] = value || '';
    },
    getItem: function(key) {
      return storage[key];
    },
    removeItem: function(key) {
      delete storage[key];
    },
    get length () {
      return Object.keys(storage).length;
    },
    key: function(i) {
      var keys = Object.keys(storage);
      return keys[i] || null;
    }
  };
}

if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
  global.localStorage = storage();
  global.sessionStorage = storage();
}