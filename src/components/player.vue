<template>

  <div>
    <img :style="styleObject" :src="require(`@/assets/player/${player.facingDirection}.png`)"></img>
    <div class=" hiddenInputDiv">
      <input autofocus ref="hiddenInput" @keydown.up="move('up')" @keydown.space="resetMachine()" @keydown.down="move('down')" @keydown.right="move('right')" @keydown.left="move('left')">
    </div>
  </div>

  </div>

</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      canvas: state => state.canvas,
      settings: state => state.settings,
      player: state => state.player
    }),
    styleObject() {
      return {
        position: 'absolute',
        marginLeft: `${this.player.position.x}px`,
        marginTop: `${this.player.position.y}px`,
        height: `${this.player.size}px`,
        width: `${this.player.size}px`,
        'z-index': 1000
      }
    },
    touchesLeftWall() {
      return this.player.position.x <= 0
    },
    touchesRightWall() {
      return this.player.position.x >= this.canvas.width - this.player.size
    },
    touchesTopWall() {
      return this.player.position.y <= 0
    },
    touchesBottomWall() {
      return this.player.position.y >= this.canvas.height - this.player.size
    }
  },
  mounted() {
    this.$refs.hiddenInput.focus()
  },
  methods: {
    ...mapActions({
      movePlayer: 'movePlayer'
    }),
    ...mapMutations({
      resetMachine: 'resetMachine'
    }),
    move(direction) {
      switch (direction) {
        case 'up':
          if (this.touchesTopWall) {
            break
          }
          this.movePlayer(direction)
          break
        case 'down':
          if (this.touchesBottomWall) {
            break
          }
          this.movePlayer(direction)
          break
        case 'left':
          if (this.touchesLeftWall) {
            break
          }
          this.movePlayer(direction)
          break
        case 'right':
          if (this.touchesRightWall) {
            break
          }
          this.movePlayer(direction)
          break
      }
    }
  }
}
</script>

<style scoped>
.hiddenInputDiv {
  width: 0;
  position: absolute;
  overflow: hidden;
}
</style>
