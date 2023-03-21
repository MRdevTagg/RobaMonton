const c = $('canvas');
responsiveCanvas(c)
const ctx =setPixelDensity(c);
let load_percent = 0;

function game(){
  let load_max = table.deck.counter * 6.66666667;

  if (load_percent < load_max && load_percent < 100) {
    load_percent ++
    console.log(load_percent)
  }
switch (table.status) {
  case 'play':
    break;
  case 'resolve':
    $('.ui h1').innerHTML = mesagge;
    $('.cambiar').style.display = 'none'
    break;
}
if(table.deck.state == "shuffling"){
      showUI( $('.mezclando'),`<h1>Mezclando Cartas <br> ${load_percent}% </h1>`)}
else if( table.deck.state == "active"){
      hideUI($('.mezclando'))}

$('.gamestate').innerHTML = `turno de : ${table.player.id}`
;
if (table.status === 'resolve'){
  showUI($('.ui'))
}

  ctx.clearRect(0,0,c.width,c.height)

  table.update()
  
	window.requestAnimationFrame(game)

}

setTimeout(()=>{hideUI($('.Loading'))},5000);
window.requestAnimationFrame(game)

