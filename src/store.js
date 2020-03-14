import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    canvas: {
      width: 640,
      height: 480
    },
    settings: {
      speed: 10
    },
    player: {
      size: 30,
      position: {
        x: 310,
        y: 230
      },
      facingDirection: 'down'
    },
    virtualMachine: {
      size: 30,
      position: {
        x: 110,
        y: 130
      },
      facingDirection: 'down'
    },
    score: {
      migrated: 0,
      total: 2000
    }
  },
  mutations: {
    moveEntityUp: (state, entity) => {
      state[entity].position.y -= state.settings.speed
      state[entity].facingDirection = 'up'
    },
    moveEntityDown: (state, entity) => {
      state[entity].position.y += state.settings.speed
      state[entity].facingDirection = 'down'
    },
    moveEntityLeft: (state, entity) => {
      state[entity].position.x -= state.settings.speed
      state[entity].facingDirection = 'left'
    },
    moveEntityRight: (state, entity) => {
      state[entity].position.x += state.settings.speed
      state[entity].facingDirection = 'right'
    },
    addMigratedScore: state => {
      state.score.migrated += 1
    },
    resetMachine: state => {
      state.virtualMachine.position.x =
        Math.round(
          (Math.random() * (state.canvas.width / 3 - state.player.size * 2)) /
            10
        ) *
          10 +
        state.player.size //110

      state.virtualMachine.position.y =
        Math.round(
          (Math.random() * (state.canvas.height - state.player.size * 2)) / 10
        ) *
          10 +
        state.player.size
    }
  },
  getters: {
    playerTouchesLeft: state => {
      return (
        state.player.position.x ===
          state.virtualMachine.position.x - state.virtualMachine.size &&
        state.player.position.y >
          state.virtualMachine.position.y - state.virtualMachine.size &&
        state.player.position.y <
          state.virtualMachine.position.y + state.virtualMachine.size
      )
    },
    playerTouchesRight: state => {
      return (
        state.player.position.x ===
          state.virtualMachine.position.x + state.virtualMachine.size &&
        state.player.position.y >
          state.virtualMachine.position.y - state.virtualMachine.size &&
        state.player.position.y <
          state.virtualMachine.position.y + state.virtualMachine.size
      )
    },
    playerTouchesTop: state => {
      return (
        state.player.position.y ===
          state.virtualMachine.position.y - state.virtualMachine.size &&
        state.player.position.x >
          state.virtualMachine.position.x - state.virtualMachine.size &&
        state.player.position.x <
          state.virtualMachine.position.x + state.virtualMachine.size
      )
    },
    playerTouchesBottom: state => {
      return (
        state.player.position.y ===
          state.virtualMachine.position.y + state.virtualMachine.size &&
        state.player.position.x >
          state.virtualMachine.position.x - state.virtualMachine.size &&
        state.player.position.x <
          state.virtualMachine.position.x + state.virtualMachine.size
      )
    }
  },
  actions: {
    movePlayer: ({ getters, commit }, direction) => {
      switch (direction) {
        case 'up':
          if (getters.playerTouchesBottom) {
            commit('moveEntityUp', 'virtualMachine')
          }
          commit('moveEntityUp', 'player')
          break
        case 'down':
          if (getters.playerTouchesTop) {
            commit('moveEntityDown', 'virtualMachine')
          }
          commit('moveEntityDown', 'player')
          break
        case 'left':
          if (getters.playerTouchesRight) {
            commit('moveEntityLeft', 'virtualMachine')
          }
          commit('moveEntityLeft', 'player')
          break
        case 'right':
          if (getters.playerTouchesLeft) {
            commit('moveEntityRight', 'virtualMachine')
          }
          commit('moveEntityRight', 'player')
          break
      }
    },
    migrateMachine: ({ commit }) => {
      commit('addMigratedScore')
      commit('resetMachine')
    }
  }
})
