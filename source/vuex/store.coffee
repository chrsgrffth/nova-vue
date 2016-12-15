Vue = require('vue')
Vuex = require('vuex')

Vue.use(Vuex)

state =
  notes: []
  activeNote: null

mutations =
  GET_NOTES: (state, notes) ->
    state.notes = notes

  EDIT_NOTE: (state, note) ->
    state.activeNote = note

actions =
  getNotes: ({ commit }) =>
    commit('GET_NOTES', notes)

  editNote: ({ commit }, note) =>
    commit('EDIT_NOTE', note)


module.exports = new Vuex.Store
  state: state
  mutations: mutations
  actions: actions
