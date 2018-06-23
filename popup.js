var tabId_re = /tabId=([0-9]+)/;
var match = tabId_re.exec(window.location.hash);
if (match) {
  var hist = chrome.extension.getBackgroundPage().History[match[1]];
  var table = document.createElement("table");
  for (var i=0; i < hist.length; i++) {
    var r = table.insertRow(-1);

    var date = "";
    if (i == hist.length - 1 ||
        (hist[i][0].toLocaleDateString() != hist[i+1][0].toLocaleDateString())) {
      date = hist[i][0].toLocaleDateString();
    }
    r.insertCell(-1).textContent = date;

    r.insertCell(-1).textContent = hist[i][0].toLocaleTimeString();

    var end_time;
    if (i == 0) {
      end_time = new Date();
    } else {
      end_time = hist[i-1][0];
    }
    r.insertCell(-1).textContent = FormatDuration(end_time - hist[i][0]);

    var a = document.createElement("a");
    a.textContent = hist[i][1];
    a.setAttribute("href", hist[i][1]);
    a.setAttribute("target", "_blank");
    r.insertCell(-1).appendChild(a);
  }
  document.body.appendChild(table);
}


/**
 * Add your Analytics tracking ID here.
 */
var _AnalyticsCode = 'UA-31608319-1';

/**
 * Below is a modified version of the Google Analytics asynchronous tracking
 * code snippet.  It has been modified to pull the HTTPS version of ga.js
 * instead of the default HTTP version.  It is recommended that you use this
 * snippet instead of the standard tracking snippet provided when setting up
 * a Google Analytics account.
 */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();

/**
 * Track a click on a button using the asynchronous tracking API.
 *
 * See http://code.google.com/apis/analytics/docs/tracking/asyncTracking.html
 * for information on how to use the asynchronous tracking API.
 */
function trackButtonClick(e) {
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
}

/**
 * Now set up your event handlers for the popup's `button` elements once the
 * popup's DOM has loaded.
 */
document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', trackButtonClick);
  }
});
