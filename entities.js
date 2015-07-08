
var counter = 0;
var counter2 = 0;
function addForN() {
  return counter += 1;
}
function addForS(){
  return counter2 +=1;
}
var PlayerEntity = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    this.setVelocity(3, 12);
  },
  update: function() {
    if (me.input.isKeyPressed('left')) { this.doWalk(true); } 
    else if (me.input.isKeyPressed('right')) { this.doWalk(false); } 
    else { this.vel.x = 0; }
    if (me.input.isKeyPressed('jump')) { this.doJump(); }
    me.game.collide(this);
    this.updateMovement();
    if (this.bottom > 10000){ this.gameOver(); }
    if (this.vel.x!=0 || this.vel.y!=0) {
      this.parent(this);
      return true;
    }
    return false;
  },
  gameOver: function() {
    me.state.change(me.state.MENU);
    me.gamestat.set("currentLevel", 1);
  },

  nextLevel: function() {
    var currentLevel = me.gamestat.getItemValue('currentLevel');
    console.log("current level: " + currentLevel);
    me.gamestat.setValue("currentLevel", currentLevel + 1);
    console.log("new current level: " + me.gamestat.getItemValue('currentLevel'))
    me.levelDirector.loadLevel( me.gamestat.getItemValue('currentLevel'));
    me.gamestat.setValue("coins", 0);
  },
  youWin: function() {
    me.state.change(me.state.MENU);
    this.nextLevel();
    document.getElementById('game_state').innerHTML = "You Win!";
    document.getElementById('instructions').innerHTML = "";
    if (counter + counter2 != 2){
      document.getElementById("scoreSouth").innerHTML = "North Korea has " + addForS() + " wins and North Korea has " +counter + " wins";
    }
    else{
      document.getElementById("scoreSouth").innerHTML = "Force is all-conquering, but its victories are short-lived.";
    }
  }
});

var PlayerEntity2 = me.ObjectEntity.extend({
 init: function(x, y, settings) {
    this.parent(x, y, settings);
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    this.setVelocity(3, 12);
  },
  update: function() {
    if (me.input.isKeyPressed('left2')) {
      this.doWalk(true);
    }
    else if (me.input.isKeyPressed('right2')) {
      this.doWalk(false);
    }
    else {
      this.vel.x = 0;
    }
    if (me.input.isKeyPressed('jump2')) {
      this.doJump();
    }
    me.game.collide(this);
    this.updateMovement();
    if (this.bottom > 10000) {
      this.gameOver();
    }
    if (this.vel.x != 0 || this.vel.y != 0) {
      this.parent(this);
      return true;
    }
    return false;
  },
  gameOver: function() {
    me.state.change(me.state.MENU);
    me.gamestat.set("currentLevel", 1);
  },

  nextLevel: function() {
    var currentLevel = me.gamestat.getItemValue('currentLevel');
    console.log("current level: " + currentLevel);
    me.gamestat.setValue("currentLevel", currentLevel + 1);
    console.log("new current level: " + me.gamestat.getItemValue('currentLevel'))
    me.levelDirector.loadLevel( me.gamestat.getItemValue('currentLevel'));
    me.gamestat.setValue("coins", 0);
  },
  youWin: function() {
    me.state.change(me.state.MENU);
    this.nextLevel();
    document.getElementById('game_state').innerHTML = "You Win!";
    document.getElementById('instructions').innerHTML = "";
    if (counter + counter2 != 2){
      document.getElementById("scoreSouth").innerHTML = "North Korea has " + addForS() + " wins and North Korea has " +counter + " wins";
    }
    else{
      document.getElementById("scoreSouth").innerHTML = "Force is all-conquering, but its victories are short-lived.";
    }
  }
});

var CoinEntity = me.CollectableEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
  },
  onCollision : function (res, obj) {
    me.gamestat.updateValue("coins", 1);
    this.collidable = false;
    me.game.remove(this);
    if(me.gamestat.getItemValue("coins") === me.gamestat.getItemValue("totalCoins")){
      obj.youWin();
    }
  }
}); 
var EnemyEntity = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    settings.image = "badguy";
    settings.spritewidth = 16;
    this.parent(x, y, settings);
    this.startX = x;
    this.endX = x + settings.width - settings.spritewidth;
    this.pos.x = this.endX;
    this.walkLeft = true;
    this.setVelocity(2);
    this.collidable = true;
  },
  onCollision: function(res, obj) {
    obj.gameOver();
  },
  update: function() {
    if (!this.visible){
      return false;
    }
    if (this.alive) {
      if (this.walkLeft && this.pos.x <= this.startX) {
        this.walkLeft = false;
      } 
      else if (!this.walkLeft && this.pos.x >= this.endX){ 
        this.walkLeft = true;
      }
      this.doWalk(this.walkLeft);
    }
    else { this.vel.x = 0; }
    this.updateMovement();
    if (this.vel.x!=0 || this.vel.y!=0) {
      this.parent(this);
      return true;
    }
    return false;
  }
});
var BootsEntity = me.CollectableEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
  },
  onCollision : function (res, obj) {
    console.log(obj);
    this.collidable = false;
    me.game.remove(this);
    var currentVel = obj.maxVel.x;
    obj.maxVel.x = 5.5;
    setTimeout(function(){obj.maxVel.x= currentVel },4000);
  }

  //setInterval(onCollision() , 3000);

});
