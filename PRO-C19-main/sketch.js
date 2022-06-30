var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  //  REPRODUCIR spookySound EN CICLO (O LOOP)
  spookySound.loop();

  //  INICIALIZAR TOWER CON SPRITE DE 300 X 300, AGREGAR SU IMAGEN Y DAR VELOCIDAD EN Y DE 1
  tower = createSprite(300,300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  
  //  INICIALIZAR COMO NUEVOS GRUPOS doorsGroup, climbersGroup E invisibleBlockGroup
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group ();

  
  //  CONFIGURAR SPRITE PARA GHOST
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3


}

function draw() {
  background(200);

  if (gameState === "play") {
    //  PROGRAMAR LAS FLECHAS A LA IZQUIERDA Y A LA DERECHA, Y EL ESPACIO PARA SALTAR
    
    if(keyDown("z"))  {
      
      ghost.x = ghost.x-3;

    }
    

    if(keyDown("c"))  {
      
      ghost.x = ghost.x +3;


    }


    if(keyDown("space"))  {
      
      ghost.velocityY = -10;

    }
    
    
    //  HACER CAER AL FANTASMA

    ghost.velocityY = ghost.velocityY + 0.8;
    

    //  NO PERMITIR QUE LA TORRE SALGA DEL MAPA POR ABAJO
    
    if(tower.y > 400)   {

     tower.y = 300

    }
    
    //  APARECER PUERTAS
    
    spawnDoors();

    //  DETENER FANTASMA SI CHOCA CON ALGUNA CONSTRUCCIÓN DEL GRUPO
    
    if(climbersGroup.isTouching(ghost))  {

    ghost.velocityY = 0;

    }
    
    //  DESTRUIR FANTASMA Y TERMINAR EL JUEGO SI EL FANTASMA SE CAE O SI TOCA UN OBSTÁCULO INVISIBLE
    
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600)  {
      
      ghost.destroy();
      gameState = "end";

    }
    
    drawSprites();

    
  }  

    
  //  CONFIGURAR ESTADO DE JUEGO "end"
  
  if(gameState === "end")   {

    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Moriste",200,250);

  }
  
  
  
  
  
}

//  FUNCIÓN PARA APARECER PUERTAS EN LA TORRE

function spawnDoors() {
  if (frameCount % 240 === 0) {

    //  DECLARAR VARIABLES PARA door Y climber
    
    var door = createSprite(200,-50);
    var climber = createSprite(200,10);

    //  DECLARAR Y invisibleBlock Y CONFIGURAR SU ANCHO DEL TAMAÑO DE climber Y SU ALTO EN 2
    
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    
    //  CONFIGURAR LA POSICIÓN EN X DE door, climber E invisibleBlock EN EL MISMO LUGAR ALEATORIO
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    
    //  CONFIGURAR LA POSICIÓN EN Y en 1 PARA door, climber E invisibleBlock
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    
    
    //  AGREGAR IMÁGENES PARA door Y climber
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    
    //  INTERCAMBIAR depth DE ghost Y door, QUEREMOS QUE LA DE ghost SEA LA MAYOR
    
    door.depth = ghost.depth
    ghost.depth += 1;

    
    //  ASIGNAR TIEMPO DE VIDA DE 800 A LOS SPRITES
    
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    

    //  AGREGAR door, climber E invisibleBlock AL GRUPO CORRESPONDIENTE
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    

    //  AGREGAR debug A invisibleBlock

    invisibleBlock.debug = true;
    
  }
}
