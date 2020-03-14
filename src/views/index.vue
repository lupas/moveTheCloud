<template>
  <div>
    <p class="bigTitle">☁ Move the Cloud ☁</p>
    <div class="canvas">
      <div class="score">
        VMs Migrated: {{migrated }} / {{total }}
      </div>
      <player />
      <virtualMachine />
      <cloud1 />
      <cloud2 />
    </div>
    <p class="title">
      ▲►▼◄: Move VM
      <br>
      <b>Space:</b> Restart VM
      <br>
      <b>Tab:</b> If stuff doesn't work, try hitting tab a couple of times.
    </p>
    <p class="title">Built with ♥ NOT during working hours 🙃</p>
  </div>

</template>

<script>
import player from '@/components/player'
import virtualMachine from '@/components/virtualMachine'
import cloud2 from '@/components/cloud2'
import cloud1 from '@/components/cloud1'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'index',
  components: {
    player,
    virtualMachine,
    cloud2,
    cloud1
  },
  computed: {
    ...mapState({
      virtualMachinePosition: state => state.virtualMachine.position,
      playerPosition: state => state.player.position,
      playerPositionX: state => state.player.position.x,
      playerPositionY: state => state.player.position.y,
      migrated: state => state.score.migrated,
      total: state => state.score.total
    })
  },
  watch: {
    playerPositionX(val) {
      this.checkIfHitVirtualMachine()
    },
    playerPositionY(val) {
      this.checkIfHitVirtualMachine()
    }
  },
  methods: {
    ...mapMutations({
      migrateMachine: 'migrateMachine'
    }),
    checkIfHitVirtualMachine() {
      if (
        this.playerPosition.x === this.virtualMachinePosition.x &&
        this.playerPosition.y === this.virtualMachinePosition.y
      ) {
        this.migrateMachine()
      }
    }
  }
}
</script>

<style scoped>
.canvas {
  background: url('../assets/clouds.jpg');
  border: 1px;
  height: 480px;
  width: 640px;
  border-color: black;
  border-style: solid;
  margin: auto;
  z-index: 0;
}

.bigTitle {
  text-align: center;
  font-size: 150%;
}

.title {
  text-align: center;
}

.score {
  position: absolute;
  text-align: center;
  width: inherit;
}
</style>
