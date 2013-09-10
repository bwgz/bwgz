$(document).ready(function() {
	(function() {
		  if (window._facebookSharerHandler) return;
		  var intentRegex = /www.facebook.com\/sharer/,
		      windowOptions = 'width=626,height=436',
		      width = 626,
		      height = 436,
		      winHeight = screen.height,
		      winWidth = screen.width;
		 
		  function handleIntent(e) {
		    e = e || window.event;
		    var target = e.target || e.srcElement,
		        m, left, top;
		 
		    while (target && target.nodeName.toLowerCase() !== 'a') {
		      target = target.parentNode;
		    }
		 
		    if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
		      m = target.href.match(intentRegex);
		      if (m) {
		        left = Math.round((winWidth / 2) - (width / 2));
		        top = 0;
		 
		        if (winHeight > height) {
		          top = Math.round((winHeight / 2) - (height / 2));
		        }
		 
		        window.open(target.href, 'facebook-share-dialog', windowOptions + ',width=' + width +
		                                           ',height=' + height + ',left=' + left + ',top=' + top);
		        e.returnValue = false;
		        e.preventDefault && e.preventDefault();
		      }
		    }
		  }
		 
		  if (document.addEventListener) {
		    document.addEventListener('click', handleIntent, false);
		  } else if (document.attachEvent) {
		    document.attachEvent('onclick', handleIntent);
		  }
		  window._facebookSharerHandler = true;
		}());
});