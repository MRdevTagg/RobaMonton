let mesagge;


/*class UI{
  constructor({comp},UIs, table){
    this.comp = comp;
    this.table = table;
    this.shufflePcent = 0
    this.shPer_max = this.table.deck.counter * 6.66666667;
  }
  update(){
    if (this.shufflePcent < this.shPer_max && this.shufflePcent < 100) {
    shufflePcent ++
  }
switch (this.table.status) {
  case 'play':
    break;
  case 'resolve':
    $('.ui h1').innerHTML = mesagge;
    $('.cambiar').style.display = 'none'
    showUI($('.ui'))
    break;
}
if(this.table.deck.state == "shuffling"){
   showUI( $('.mezclando'),`<h1>Mezclando Cartas <br> ${load_percent}% </h1>`)}
else if( this.table.deck.state == "active"){
      hideUI($('.mezclando'))}

$('.gamestate').innerHTML = `turno de : ${table.player.id}`
;}}*/

class Table{
  constructor(  x, y, w, h, deck, board, players  ){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.board = board;
    this.deck = deck;
    this.players = players;
    this.player = players[0];
    this.background = new Image;
    this.background.src = 'src/background5.jpg';
    this.turn = 'p1';
    this.notActivePlayer=players[1];
    this.s = [8,12];//spots para monton
    
    this.status = 'round';//game stage
    this.counter = 0;
    this.countDelay = 300;
    
    this.turn_count = 0;
    this.turn_end = false;
    this.weHadWinner = false;
    
  }
draw(){
  ctx.fillStyle ='rgba(8, 131, 49, 1)'
        ctx.drawImage(this.background,0,0,c.width,c.height)

  }
handRound(){
  
      this.board.spots.forEach((spot, index,board)=>{
        let id = spot.id;
        if (spot.isEmpty && id !== 'mazo'){
           this.counter += this.countDelay
          if(id.includes('mano') || id.includes('mesa') ){
            setTimeout(()=>{
        if(this.deck.active.length > 0 ){
          spot.card = this.deck.active[0];
          spot.card.alpha.current = 0
          spot.fillSpot('card')}
          this.deck.update()
          nNull(spot.card)?
         console.log(`spot ${ spot.id } filled!! with card ${spot.card.number} de ${ spot.card.type}`):
         console.log(`${spot.id} card is null`)
         console.log(this.deck.active.length)
        } ,this.counter)}
        }
        if (index == board.length -1) {
          this.status = 'play'
          this.counter = 0
          console.log(index)
        }
      })
    
}
emptyHands(){
  if (this.status === 'turn'){
  let hands = this.board.spots.filter(spot => spot.id.includes('mano'))
  let allEmpty = hands.every(spot=>spot.isEmpty === true)
  
    if(allEmpty === true){ 
      if(this.deck.active.length > 0 ){this.status = 'round';}
      else{ this.status = 'resolve' }
    }
  else{this.status = 'play'}
  }

}
whoWins(){
console.log(this.status)
this.weHadWinner = true;
  if(this.player.stealedCards.length > this.notActivePlayer.stealedCards.length || this.notActivePlayer.stealedCards == []){
 mesagge = `${this.player.id} gana`}
  else if(this.notActivePlayer.stealedCards.length > this.player.stealedCards.length || this.player.stealedCards == []){
    mesagge = `${this.notActivePlayer.id} gana`}
    

}
switchTurn(){
  if(this.status === 'turn'){//cambiamos el turno
    this.turn == 'p1'?
    this.turn = 'p2' :
    this.turn = 'p1';
    this.board.switchHands() //cambiamos las manos de lugar
    //this.status = 'play' // actualizamos el estado del juego
    this.board.update() // actualizamos la mesa render
    this.emptyHands() // checkeamos si hay que repartir

    this.turn_count += 1;
    console.log(this.turn_count)
  }
  }
drawDeck(deck,spot,offset,plus,turned,scale = 1){
  if(this.deck.state === 'active'){
    deck.forEach((card,index,d)=>{
      turned ?
      card.turnedArround=true :
      card.turnedArround=false
if(d === this.deck){
      card.drawCard(spot.x + offset ,spot.y + offset,turned ,scale)
      offset += plus}
    else{
      card.drawCard(spot.x + offset ,spot.y + offset,turned ,scale)
      offset += plus
      }
    })          
  }
}
calls(){
    switch (this.status){
      case 'round':
        this.handRound()
        break;
      case 'turn':
        this.switchTurn()
        break;
        case 'resolve':
          this.whoWins()
          break;
        
    }
  }
drawAllDecks(){
  if (this.deck.state === 'active' ) {
 this.drawDeck(this.deck.active,this.board.spots[0],20,-.5,true,.8)
 if(this.players[0].stealedCards.length > 0){
   this.drawDeck(this.players[0].stealedCards,this.board.spots[this.s[0]],5,-.6,false,.7)
 }
 if(this.players[1].stealedCards.length > 0){
   this.drawDeck(this.players[1].stealedCards,this.board.spots[this.s[1]],5,-.6,false,.7)
 }
}
}
update(){
    this.draw()
    
 if (this.turn == 'p1') {
   this.player = this.players[0]
   this.notActivePlayer = this.players[1]
   this.s [0] = 11
   this.s [1] = 12
 }
 if (this.turn == 'p2') {
   this.player = this.players[1]
   this.notActivePlayer = this.players[0]
   this.s [0] = 12
   this.s [1] = 11
 }
 if(this.deck.state === 'active'){
       this.calls();

   if (this.turn_count >= 1) {
   }

 }
this.board.update();
 this.deck.update()
this.drawAllDecks()
 

 this.players.forEach(pl => pl.update())
 }
 
}


class Board{
  constructor( spots ){
    this.spots = spots;
    this.emptySpots = [];
    this.current;
    this.previous;
    
  }

update(){
  this.spots.forEach((spot) => {
  
  switch (spot.id) {
    case 'mesa':
        spot.draw()
      this.card !== null?
      spot.fillSpot('card',false,):
      spot.fillSpot('empty')
      break;
    case 'mano':
        spot.draw()
      this.card !== null ?
        spot.fillSpot('card', false,) :
        spot.fillSpot('empty')
      break;
    case 'mazo':
      spot.fillSpot('empty')
      break;
    case 'monton':
      spot.fillSpot('empty')
      break;
    case 'mano2':
        spot.draw()
      this.card !== null?
      spot.fillSpot('card',true):
      spot.fillSpot('empty')
      break;

    case 'monton2':
      spot.fillSpot('empty')
      break;
    
    default:
      break;
  }
  })
}
switchHands(){
 const hands = [
  this.spots[1].card,
  this.spots[3].card,
  this.spots[5].card,
  
  this.spots[2].card,
  this.spots[4].card,
  this.spots[6].card,
]
  this.spots[1].card = hands[3] 
  this.spots[3].card = hands[4]
  this.spots[5].card = hands[5] 
  
  this.spots[2].card = hands[0] 
  this.spots[4].card = hands[1] 
  this.spots[6].card = hands[2]
this.spots.forEach( spot => spot.card === null ?
  spot.isEmpty = true :
  spot.isEmpty = false)
}

}
class Deck{ 
  constructor( cards, state ){
  this.cards = cards; //array que contiene las cartas ordenadas
  this.state = state; //estado del mazo: si esta mezclado, si hay que repartir, 
  
  this.used = false; //booleano que marca si la carta fue usada
  this.active = [] ; //array que contiene las cartas no usadas
  this.mixed_cards = [];// array con cartas mezcladas
  this.shuffled = false;//indica si el mazo esta mezclado
  
  this.counter = 0;
  }
  
  update(){
   if(!this.shuffled){
         this.shuffle()
         this.state = 'shuffling'
      if ( this.mixed_cards.length == this.cards.length) {
         if (this.counter < 15) {
           this.counter += 1
           this.cards = this.mixed_cards
           this.mixed_cards = []
           console.log(this.counter)
         }
         else{
           this.shuffled = true;
           this.counter = 0
         }
      }
       
    }
    if(this.shuffled){
      this.active = this.mixed_cards.filter(card=>card.used == false)
      this.state = 'active'
    }
  }
  
  shuffle(){
   
    for (let i = this.cards.length ; i > 0; i--) {
      const j = Math.floor(Math.random() * (i));
      if (!this.mixed_cards.includes(this.cards[j])) {
      this.mixed_cards.push(this.cards[j]);
      }
    }
    
  
  }
 
  
}
class Card{
  constructor( model, type, number, w, h ){
  this.model = model;
  this.type = type;
  this.number = number;
  this.w = w || 85;
  this.h = h || 126;
  this.alpha = {current:1,
                max:1,
                min: 0,
                speed: 0.05,
                fade: 'in' };
  this.image = new Image;
  this.turnedArround = false;

  this.used = false;
  this.isMoving = false;
  }
  showCard(){
    let sAlpha = this.alpha;
    if ( this.alpha.fade === 'in' ) {
    sAlpha.current <= sAlpha.max?
    sAlpha.current += sAlpha.speed:
    sAlpha.current = sAlpha.max
    }
    if ( this.alpha.fade === 'out' ) {
    sAlpha.current >= sAlpha.min?
    sAlpha.current -= sAlpha.speed:
    sAlpha.current = sAlpha.min
    }
    
  }
drawCard(X,Y,turned = false, scale = 1,w = this.w, h = this.h){
    
  this.showCard()
  this.turnedArround ? 
  this.image.src = 'src/back.png':
  this.image.src = `src/${this.type}/0000${this.number}.png`
  this.turnedArround = turned
  if (nNull(this.image)) {
  ctx.save();
  ctx.globalAlpha = this.alpha.current;
  ctx.drawImage(this.image, X, Y, w*scale, h*scale);
  ctx.restore();
}
  }

}
class Player{
  constructor( hand, id, src, stats ){
    this.hand = hand;// array que contiene las cartas de la mano
    this.id = id; // id del personaje
    this.src = src; // source del avatar
    this.stats = stats; // objeto que contiene las estadisticas
    this.selectedCard = null; //carta elegida
    this.stealedCards = []; // array con cartas robadas
    this.emptyHands = true;
    this.moveX;
    this.moveY;
  }
dragCard(){
      if(this.selectedCard.isMoving){
        this.selectedCard.drawCard(this.moveX,this.moveY, false, .9)
      }
  }
stealCard(spot){
  this.selectedCard.used = true
  this.stealedCards.push(spot.card,this.selectedCard)
   spot.fillSpot('empty')
   this.selectedCard = null
}
  
update(){ 
    if (this.selectedCard !== null && this.selectedCard !== undefined) {
  this.dragCard() }
  }
}
class Spot{
  constructor( id, x, y, w, ratio, color, card ){
  this.id = id;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = w * ratio;
  

  this.color = color;
  this.isEmpty = true;
  this.canFill = true;
  this.card = card;

}
draw(){
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.fillRect( this.x, this.y, this.w, this.h )
}

fillSpot(whatToFill, turned = false, offset = 0, scale = 1){
 
   switch (whatToFill) {
     case 'card':
      if (this.card !== null && this.card !== undefined) {
           this.isEmpty = false;
           this.card.used = true;
           this.card.drawCard( this.x + offset, this.y + offset, turned, scale, this.w, this.h)
          }
       break;
       case 'empty':
         this.isEmpty = true;
         this.card = null;
         break;
         
       default:
       break;
   }

 
}

}

