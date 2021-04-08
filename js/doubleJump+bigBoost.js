// Big boost in update function
if (cursors.left.isDown) {
    player.body.velocity.x = -150
    player.animations.play('left')
} else if (cursors.right.isDown) {
    player.body.velocity.x = 150
    player.animations.play('right')
}else {
    player.animations.stop()
}


if (cursors.left.isDown && cursors.down.isDown) {
    player.body.velocity.x = -500
    player.animations.play('left')

} else if (cursors.right.isDown  && cursors.down.isDown) {
    player.body.velocity.x = 500
    player.animations.play('right')
}else {
    player.animations.stop()
}

cursors.up.onDown.add(jumpCheck);
if(player.body.touching.down){
    jumpCount = 0;
}

// Double jump in update function
function jumpCheck() {
    if((jumpCount < 1) && (player.body.touching.down)){
        jump()
    }
    if((jumpCount < 2) && (!player.body.touching.down)){
        jump();
    }
}

function jump(){ 
    jumpCount ++;
    player.body.velocity.y = -400;
}
if (score === 120) {
    alert('You win!')
    score = 0
  }
}
