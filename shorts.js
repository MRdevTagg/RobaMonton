const $ = selector => document.querySelector(selector);
const EV = ( sel, ev, cb) => sel.addEventListener(ev,cb);
const nNull = el => el !== null && el !== undefined;

let visibleUI = false;
function inputUpdate(touch,mouse){
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/iPhone/i) ? 
    input = touch: input= mouse;
    return input
    }
function fadeIn(alpha,ammount){
  alpha <= 1?
  alpha += ammount:
  alpha = 1;
}
function filterSpotId(sid,spots){
  filtered = spots.filter(spot => spot.id === sid)
  return filtered
}
const hideUI = (ui) => {
  ui.style.opacity = 0;
  setTimeout(() => {
    ui.style.display = 'none'
    visibleUI = false;
  }, 1000)
}

const showUI = (ui, content = null) => { 
  if (nNull(content)) {
    ui.innerHTML = content;
  }
  ui.style.display = 'flex';
      setTimeout(() => { ui.style.opacity = 1; visibleUI = true}, 10)}

