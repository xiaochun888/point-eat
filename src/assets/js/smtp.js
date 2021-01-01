/* SmtpJS.com - v3.0.0 */
// eslint-disable-next-line
// export const Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("http://witvue.com/smtpjs.php?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };
export const Email = {
  send: function(a) {
    return new Promise(function(resolve, reject) {
      a.nocache = Math.floor(1e6 * Math.random() + 1);
      a.Action = 'Send';
      var t = JSON.stringify(a);
      Email.ajaxPost('http://point-eat.fr/smtpjs.php?', t, function(e, r) {
        if(r) reject(new Error(e, r));
        else resolve(e);
      });
    });
  },
  ajaxPost: function(e, n, t) {
    var a = Email.createCORSRequest('POST', e);
    /**Don't add these two lines for cross domain
     * setRequestHeader('Access-Control-Allow-Origin', '*');
     * withCredentials = true;
     * */
    a.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    a.onload = function() {
      /**status 200 */
      if(t != null) t(a.responseText);
    };
    a.onerror = function () {
      /**status 0: sent in error No 'Access-Control-Allow-Origin' */
      if(t != null) t(a.statusText, a.status);
    };
    a.send(n);
  },
  ajax: function(e, n) {
    var t = Email.createCORSRequest('GET', e);
    t.onload = function() {
      if(n != null) n(t.responseText);
    };
    t.send();
  },
  createCORSRequest: function(e, n) {
    var t = new XMLHttpRequest();
    if('withCredentials' in t) {
      t.open(e, n, !0);
    } else {
      if(typeof XDomainRequest != 'undefined') {
        t = new XDomainRequest();
        t.open(e, n);
      } else {
        t = null;
      }
    }
    return t;
  }
};
