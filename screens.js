var PlayScreen = me.ScreenObject.extend({
  onDestroyEvent: function() {
    me.gamestat.reset("coins");
  },
  onResetEvent: function() {
    me.levelDirector.loadLevel("level1");
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    document.getElementById('game_state').innerHTML = "Collect the coin!";
    document.getElementById('instructions').innerHTML = "RIGHT and LEFT arrows to move and UP arrow to jump.";
  }
});
var TitleScreen = me.ScreenObject.extend({
  init: function() {
    this.parent(true);
    me.input.bindKey(me.input.KEY.UP, "jump", true);
  },
  onResetEvent: function() {
    if (this.title == null) {
      this.title = me.loader.getImage("titleScreen");
      document.getElementById('game_state').innerHTML = "";
      document.getElementById('instructions').innerHTML = ""; 
    }
  },
  update: function() {
    if (me.input.isKeyPressed('jump')) {
      me.state.change(me.state.PLAY);
    }
    return true;
  },
  draw: function(context){
    context.drawImage(this.title, 230, 150);
  }
});
