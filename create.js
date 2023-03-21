const boardSpotColor = "white";
const spotAR = ratio(126,85);//spot aspect ratio
const sH = (height,margin) => (height * 2.5 * spotAR) + py(margin)
//// BOARD ////
const X = 20;
const mesaY = 20;

let cards = [
  new Card("español","espada", 1),
  new Card("español","espada", 2),
  new Card("español","espada", 3),
  new Card("español","espada", 4),
  new Card("español","espada", 5),
  new Card("español","espada", 6),
  new Card("español","espada", 7),
  new Card("español","espada", 8),
  new Card("español","espada", 9),
  new Card("español","espada", 10),
  new Card("español","espada", 11),
  new Card("español","espada", 12),

  new Card("español","oro", 1),
  new Card("español","oro", 2),
  new Card("español","oro", 3),
  new Card("español","oro", 4),
  new Card("español","oro", 5),
  new Card("español","oro", 6),
  new Card("español","oro", 7),
  new Card("español","oro", 8),
  new Card("español","oro", 9),
  new Card("español","oro", 10),
  new Card("español","oro", 11),
  new Card("español","oro", 12),
  
  new Card("español","basto", 1),
  new Card("español","basto", 2),
  new Card("español","basto", 3),
  new Card("español","basto", 4),
  new Card("español","basto", 5),
  new Card("español","basto", 6),
  new Card("español","basto", 7),
  new Card("español","basto", 8),
  new Card("español","basto", 9),
  new Card("español","basto", 10),
  new Card("español","basto", 11),
  new Card("español","basto", 12),
  
  new Card("español","copa", 1),
  new Card("español","copa", 2),
  new Card("español","copa", 3),
  new Card("español","copa", 4),
  new Card("español","copa", 5),
  new Card("español","copa", 6),
  new Card("español","copa", 7),
  new Card("español","copa", 8),
  new Card("español","copa", 9),
  new Card("español","copa", 10),
  new Card("español","copa", 11),
  new Card("español","copa", 12)
  ];
  const deck = new Deck(cards,'ordered')

  const spots = [
  new Spot('mazo',240,225, 90, spotAR, 'blue',null,),
    
  new Spot('mano', 30, 500, 75 / 1.4, spotAR, 'green', null, ),
  new Spot('mano2',30,20, 75/1.4, spotAR, 'green',null,),
  new Spot('mano', 100, 500, 75 / 1.4, spotAR, 'green', null, ),
  new Spot('mano2',100,20, 75/1.4, spotAR, 'green',null,),
  new Spot('mano', 170, 500, 75 / 1.4, spotAR, 'green', null, ),
  new Spot('mano2',170,20, 75/1.4, spotAR, 'green',null,),
  
  new Spot('mesa',50,170, 75,spotAR, boardSpotColor,null,),
  new Spot('mesa',130,170, 75, spotAR, boardSpotColor,null,),
  new Spot('mesa',50,sH(75,12), 75, spotAR, boardSpotColor,null,),
  new Spot('mesa',130,sH(75,12), 75, spotAR, boardSpotColor,null,),
  
  
  

  
  new Spot('monton',260,490, 75, spotAR, 'yellow',null,),

  
  new Spot('monton2',260,30, 75, spotAR, 'yellow',null,),
]
const board = new Board( spots );


const player1 = new Player([],'p1','nosrc',{
  wins: 0,
  loses: 0
})
const player2 = new Player([],'p2','nosrc',{
  wins: 0,
  loses: 0
})
const table = new Table(0,0,400,600,deck,board,[player1,player2]);


