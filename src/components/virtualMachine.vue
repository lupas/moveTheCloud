<template>

  <div>
    <img :style="styleObject" :src="require(`@/assets/VirtualMachine.png`)"></img>
  </div>

  </div>

</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      canvas: state => state.canvas,
      settings: state => state.settings,
      player: state => state.player,
      virtualMachine: state => state.virtualMachine,
      virtualMachineXposition: state => state.virtualMachine.position.x
    }),
    styleObject() {
      return {
        position: 'absolute',
        marginLeft: `${this.virtualMachine.position.x}px`,
        marginTop: `${this.virtualMachine.position.y}px`,
        height: `${this.virtualMachine.size}px`,
        width: `${this.virtualMachine.size}px`,
        'z-index': 1000
      }
    }
  },
  watch: {
    virtualMachineXposition: function virtualMachine(virtualMachineXposition) {
      if (virtualMachineXposition > 420) {
        this.migrateMachine()
      }
    }
  },
  beforeMount() {
    this.resetMachine()
  },
  methods: {
    ...mapMutations({
      resetMachine: 'resetMachine'
    }),
    ...mapActions({
      migrateMachine: 'migrateMachine'
    })
  }
}
</script>

<style scoped>
</style>
