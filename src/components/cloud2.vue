<template>
  <div :style="styleObject">
    <span class="text">Cloud 2</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      canvas: state => state.canvas,
      settings: state => state.settings,
      player: state => state.player
    }),
    styleObject() {
      return {
        background: '#1781e375',
        position: 'absolute',
        'text-align': 'center',
        marginLeft: `${(this.canvas.width / 3) * 2}px`,
        marginTop: `${0}px`,
        height: `${this.canvas.height}px`,
        width: `${this.canvas.width / 3}px`,
        'z-index': 1
      }
    }
  }
}
</script>

<style scoped>
.text {
  color: white;
  font-weight: 600;
}
</style>