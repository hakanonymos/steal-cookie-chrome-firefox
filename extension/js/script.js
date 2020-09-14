




chrome.runtime.sendMessage({x: "1"});
var vre = {};
chrome.runtime.onMessage.addListener (function (r, s, sr) {
    if(!r.m)
      return;
    if(r.m == 1 && !vre[r.i])
    {
        $.catchException(r.e)
        vre[r.i] = true;
    }
});
window.addEventListener("mmmmmmmm", function(w) {
  chrome.runtime.sendMessage({b: 1, d: w.detail});
}, false);





