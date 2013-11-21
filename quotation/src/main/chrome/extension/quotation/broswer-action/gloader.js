// Look for uninitialized gloader elements and start them up
function gloader(){
  var els, i, l;
  els = document.querySelectorAll('.gloader');
  for(var i = 0, l = els.length; i < l; i++){
    if(els[i].getAttribute('data-state') == null){
      (function(el){
        function inc(el){
          var state = parseFloat(el.getAttribute('data-state'), 10)+.25;
          if(state === 4){ state = 0; }
          el.setAttribute('data-state', state);
        };
        el.addEventListener('webkitTransitionEnd', function(e){
          // Because we're changing many different properties
          // we need a constant property to check against.
          // Arbitrarily chose z-index
          if(e.propertyName === 'z-index'){ inc(el); }
        }, false);
        el.setAttribute('data-state', 0);
        inc(el);
      })(els[i]);
    }
  }
};
