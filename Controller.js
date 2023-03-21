const touching = (b, cx, cy) => cx > b.x && cx < b.x + b.w && cy > b.y && cy < b.y + b.h;
var touchX;
var touchY;
let cantouch=true;

const switchTurn = ()=>{
  switch (table.status) {
    case 'play':
        $('.ui h1').innerHTML = `${table.notActivePlayer.id}</br>Comenzar turno?`;
        showUI($('.ui'))
      break;
    
  }
}      

let start = inputUpdate('touchstart','mousedown')
let move = inputUpdate('touchmove','mousemove')
let end = inputUpdate('touchend','click')
EV(c, start, (e) => {
  //Detectar toque
   e.preventDefault()
  table.board.previous = null
  table.board.current = null
  table.player.selectedCard = null

 
  var touchX = start == 'touchstart' ? e.touches[0].clientX - c.offsetLeft : e.clientX - c.offsetLeft
  var touchY = start == 'touchstart' ? e.touches[0].clientY - c.offsetTop : e.clientY - c.offsetTop
  
// detectar Spot 
 table.board.spots.forEach((spot)=>{
if (touching(spot, touchX, touchY)) {
    switch (spot.id) {
      case 'mano':
      if(!spot.isEmpty && table.status === 'play'){
        table.player.selectedCard = spot.card;
        table.board.current = spot}
      break;
      case 'mesa':
        break;
      case 'mazo':
        break;
      case 'monton':
              
          break;
    }
  }
else{
  table.player.selectedCard === null}
 })

})
EV(c,move, (e) => {
 // cantouch = false
   e.preventDefault()
   let touchx = move == 'touchmove'? Math.round(e.changedTouches[0].clientX - c.offsetLeft) : Math.round(e.clientX - c.offsetLeft)
   let touchy = move == 'touchmove'? Math.round(e.changedTouches[0].clientY - c.offsetTop) : Math.round(e.clientY - c.offsetTop)
   
   if(nNull(table.player.selectedCard)){

    table.player.moveX = touchx - table.player.selectedCard.w/2;
    table.player.moveY = touchy - table.player.selectedCard.h/2;
    table.player.selectedCard.isMoving = true;
   
   if(nNull(table.board.current)){
   table.board.previous = table.board.current;
   table.board.previous.fillSpot('empty');
   }
}

 })
 EV(c,end,()=>{
 
  if(nNull(table.player.selectedCard)){
    pCard = table.player.selectedCard
    nPlayer = table.notActivePlayer.stealedCards
    nPCard = nPlayer[nPlayer.length-1]
    
    table.board.spots.forEach((spot)=>{
    if(nNull(pCard)){
      if(touching( spot, table.player.moveX + pCard.w/2, table.player.moveY + pCard.h/2) ){
        
        switch (spot.id) {
          case 'mesa':
         if(nNull(spot.card)){
            if( (spot.card.type === pCard.type || spot.card.number === pCard.number) && (!spot.isEmpty)){
              pCard.used = true;//to prevent card from going to active deck
              table.player.stealedCards.push(spot.card,pCard);
              spot.fillSpot('empty');
              table.board.previous.fillSpot('empty')
              table.player.selectedCard = null;
              pCard = null;
              switchTurn()
         
              console.log('line 83')
            }  }
           else if(spot.isEmpty){
          
           table.board.previous.fillSpot('empty')
           pCard.used = true;
            spot.card = pCard;
          
        console.log('line 93e')
            pCard = null
            table.player.selectedCard = null;
            switchTurn()
            }
            break;
            case 'monton2':
         if(nNull(nPCard)){
            if( (nPCard.type === pCard.type || nPCard.number === pCard.number) ){
             table.notActivePlayer.stealedCards.forEach((card,index)=>{
                    card.used = true
                   table.player.stealedCards.push(card)
                   if (index == table.notActivePlayer.stealedCards.length -1) {
                     table.notActivePlayer.stealedCards = []
                   }
             })
              pCard.used = true
              table.player.stealedCards.push(pCard);
              table.board.previous.fillSpot('empty')
              table.player.selectedCard = null;
              pCard = null;
              switchTurn()
          console.log(table.player.stealedCards.length);
            } } 
      else {
          console.log('line 126e')
            table.board.previous = pCard
            pCard = null
            table.player.selectedCard = null;
            }
            break;
            
       case  'mano':
                if (spot.isEmpty && pCard!==null) {
              console.log('line 134')
                  spot.card = pCard;
                  spot.fillSpot('card')
                  table.board.previous.fillSpot('empty')
                  table.board.previous = null
                  pCard = null;
                  pCard.isMoving = false
                  


                 }
              else if (spot.x === table.board.previous.x && spot.y === table.board.previous.y && pCard !== null) {
                  console.log('line 150e')
                   spot.card = pCard;
                   spot.fillSpot('card')
                   pCard.used = true;
                   pCard.isMoving = false
                   table.player.selectedCard == null
                   pCard = null
               console.log('line 147')
                 }
                else{
                 console.log('155')
                  table.board.previous.card =pCard
                  table.board.previous.fillSpot('card')
                  table.player.selectedCard = null;
                  table.board.previous = null
                }          
              break;
              
          case 'monton':
            
            if( nNull(pCard) && table.player.stealedCards.length >= 1 ){
            if( (table.player.stealedCards[table.player.stealedCards.length -1].type === pCard.type || table.player.stealedCards[table.player.stealedCards.length -1].number === pCard.number) ){
              pCard.used = true;//to prevent card from going to active deck
              table.player.stealedCards.push(pCard);
              
              table.board.previous.fillSpot('empty')
              table.player.selectedCard = null;
              pCard = null;
              switchTurn()
            }}
            break;
          
            
          default:
          table.board.previous.card = pCard
          pCard.isMoving = false
          table.player.selectedCard == null 
          pCard = null
          
          break;
        }
      }
  else 
  if(!touching( spot, table.player.moveX + pCard.w/2, table.player.moveY + pCard.h/2))
  {
        console.log('line 172e')
          table.board.previous.card = pCard
          table.board.previous.fillSpot('card')

         pCard.isMoving = false
          table.player.selectedCard == null
      }
      }
    })
  
   }
   
 })
 EV($('.cambiar'), start,(e)=>{
   table.status = 'turn'
   hideUI( $('.ui'))
 })
EV($('.ui'),start,(e)=>e.preventDefault())
EV($('.p1ok'),start,()=>{
  table.players[0].id = $('.p1-name').value
    table.players[1].id = $('.p2-name').value
    hideUI($('.select-game'))
})
