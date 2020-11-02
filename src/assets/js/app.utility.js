export const resolveLocalhost = () => {
  return new Promise((resolve, reject) => {
    window.RTCPeerConnection = window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection; //compatibility for firefox and chrome
    if(window.RTCPeerConnection) {
      const pc = new window.RTCPeerConnection({iceServers:[]}), noop = function() {};
      /**On Windows Edge there is no createDataChannel.*/
      if(pc.createDataChannel) {
        pc.createDataChannel(''); //create a bogus data channel
        pc.createOffer(pc.setLocalDescription.bind(pc), noop); // create offer and set local description
        pc.onicecandidate = (ice) => { //listen for candidate events
          if(!ice || !ice.candidate || !ice.candidate.candidate) return;
          // const localIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
          const IPs = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate);
          const localIP = IPs && IPs.find(IP => /^(?!.*\.$)((?!0\d)(1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(IP));
          console.info(localIP, ice.candidate.candidate);
          pc.onicecandidate = noop;
          resolve(localIP);
        };
      } else {
        reject(new Error('No createDataChannel defined.'));
      }
    } else {
      reject(new Error('No RTCPeerConnection defined.'));
    }
  });
};

export const closest = (el, selector) => {
  const p = Element.prototype;
  Element.prototype.matches = p.matches ||
                              p.webkitMatchesSelector ||
                              p.mozMatchesSelector ||
                              p.msMatchesSelector ||
                              function (s) {
                                return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
                              };

  // Get the closest matching element
  for (; el && el !== document; el = el.parentNode) {
    if(el.matches(selector)) return el;
  }
  return null;
};

export const cloneDeep = (o) => {
  var newO;
  var i;
  if (!o || typeof o !== 'object') return o;
  /**copy date */
  if(o instanceof Date) return new Date(o.valueOf());

  // if (Object.prototype.toString.apply(o) === '[object Array]') {
  if(o.constructor === Array) {
    newO = [];
    for (i = 0; i < o.length; i += 1) {
      /**avoid a endless loop */
      newO[i] = (o == o[i]) ? o[i] : cloneDeep(o[i]);
    }
    return newO;
  }
  newO = {};
  /** NOTE:
   * In Firefox it is presumably a property of the prototype but not property of the element
 */
  // for (i in o) {
  //   if (o.hasOwnProperty(i)) {
  //       newO[i] = cloneDeep(o[i]);
  //   }
  // }
  Object.keys(o).forEach(function(i) {
    /**avoid a endless loop */
    newO[i] = (o == o[i]) ? o[i] : cloneDeep(o[i]);
  });
  return newO;
};
export const cloneFilter = (obj, filter) => {
  const container = Array.isArray(obj) ? [] : {};
  const keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    const key = keys[i];
    if(filter && !filter(key)) continue;

    if(typeof obj[key] == 'object') {
      container[key] = cloneFilter(obj[key], filter);
    } else
      container[key] = obj[key].slice();
  }
  return container;
};
export const objectDefault = (defs) => {
  const container = Array.isArray(defs) ? [] : {};
  const keys = Object.keys(defs);
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i];

    if(typeof defs[key] == 'object') {
      if(typeof defs[key].default != 'undefined') {
        container[key] = defs[key].default;
      } else {
        /**inexistent or default: undefined */
        container[key] = objectDefault(defs[key]);
      }
    } else {
      container[key] = defs[key];
    }
  }
  return container;
};
/** enumerate an object or array */
export const objectEnumerate = (defs) => {
  const enumObject = {};
  const enumOptions = [];
  const keys = Object.keys(defs);
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i];
    var value;
    if(typeof defs[key] == 'object') {
      if(typeof defs[key].value != 'undefined') {
        value = defs[key].value;
      } else {
        value = objectEnumerate(defs[key]);
      }
    } else {
      value = defs[key];
    }

    Object.defineProperty(enumObject, key.toUpperCase(), {
      value: value,
      writable: false,
      enumerable: true,
      configurable: true
    });
    const option = Object.assign({}, {
      text: key.toUpperCase(),
      value: value
    }, cloneDeep(defs[key]));
    enumOptions.push(option);
  }
  if(!enumObject.toText) {
    enumObject.toText = function(value) {
      const option = enumOptions.find(option => option.value == value);
      return option ? option.text : '';
    };
  }
  if(!enumObject.toOption) {
    enumObject.toOption = function(value) {
      return enumOptions.find(option => option.value == value);
    };
  }
  if(!enumObject.toOptions) {
    enumObject.toOptions = function() {
      return enumOptions;
    };
  }
  return enumObject;
};

export const newDebounce = (func, wait) => {
  var debounce = function() {
    const context = this, args = arguments;
    const later = function() {
      debounce.timeout = null;
      func.apply(context, args);
    };
    if(debounce.timeout) {
      clearTimeout(debounce.timeout);
    }
    debounce.timeout = setTimeout(later, wait);
  };
  return debounce;
};

/**Load data from local (desktop) or remote(website) */
export const httpGetJSON = (url, async = true) => {
  return new Promise((resolve, reject) => {
    try {
      const httpRequest = new XMLHttpRequest();
      httpRequest.overrideMimeType('application/json');
      httpRequest.open('GET', url, async);
      httpRequest.onreadystatechange = () => {
        if(httpRequest.readyState == 4) {
          if(httpRequest.status == '200') {
            try {
              resolve(JSON.parse(httpRequest.responseText));
            } catch(error) {
              console.error(error);
              reject(error);
            }
          } else {
            reject(httpRequest);
          }
        }
      };
      httpRequest.send(null);
    } catch(error) {
      reject(error);
    }
  });
};

export const httpPostJSON = (url, data) => {
  return new Promise((resolve, reject) => {
    try {
      const httpRequest = new XMLHttpRequest();
      // httpRequest.overrideMimeType("application/json;charset=UTF-8");
      httpRequest.overrideMimeType('application/json');
      httpRequest.onreadystatechange = function() {
        if (this.readyState == this.DONE) {
          if(this.status == 200) {
            resolve(httpRequest);
          } else {
            const error = new Error(url + ' ' + this.statusText, this.status);
            console.error(error);
            reject(error);
          }
        }
      };
      httpRequest.open('post', url, true);
      httpRequest.send(data);
    } catch(error) { reject(error); }
  });
};

export const urlExists = (url, func) => {
  /**async without try-catch */
  const http = new XMLHttpRequest();
  http.open('HEAD', url);
  http.onreadystatechange = function() {
    if (this.readyState == this.DONE) {
      /**UTC string standard format -> local date */
      func(this.status == 200, new Date(http.getResponseHeader('Date')));
    }
  };
  http.send();
};

export const matrixify = (array, columns) => {
  var matrix = [];
  for (var i = 0, k = -1; i < array.length; i++) {
    if (i % columns === 0) {
      matrix[++k] = [];
    }
    if(matrix[k]) matrix[k].push(array[i]);
  }
  return matrix;
};

/**support safari */
export const triggerEvent = (el, etype) => {
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    const events = document.createEvent('Events');
    events.initEvent(etype, true, false);
    el.dispatchEvent(events);
  }
};
/**Both documentElement.clientWidth and window.innerWidth do not respond on device orientation change on iOS */
export const viewport = () => {
  var e = window, a = 'inner';
  if(!('innerWidth' in window)) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  return {width : e[ a + 'Width' ], height : e[ a + 'Height' ]};
};
export const measureText = (text, font = 'bold 16px Helvetica') => {
  // re-use canvas object for better performance
  const canvas = measureText.canvas || (measureText.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = font;
  return context.measureText(text);
};
export const similarStr = function(s1, s2) {
  if(s1 == s2) return true;
  else if((!s1 || s1 == '') && (!s2 || s2 == '')) return true;
  return false;
};
export const capitalizeEachWord = (str) => {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const httpPostFormData = function(url, data) {
  const formData = new FormData();
  formData.append('data', data);

  return new Promise((resolve, reject) => {
    try {
      const httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = function() {
        if (this.readyState == this.DONE) {
          if(this.status == 200) {
            resolve(httpRequest);
          } else {
            const error = new Error(url + ' ' + this.statusText, this.status);
            console.error(error);
            reject(error);
          }
        }
      };
      httpRequest.open('post', url, true);
      httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      httpRequest.send(data);
    } catch(error) { reject(error); }
  });
};

export const validateEmail = function(email) {
  // eslint-disable-next-line
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};
