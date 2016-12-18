Vue = require('vue')
Vuex = require('vuex')

Vue.use(Vuex)

state =
  notes: []
  activeNote: null
  query: ''
  searchResults: []
  searchActive: false
  createNewNote : false

mutations =
  GET_NOTES: (state, notes) ->
    state.notes = notes || window.notes

  EDIT_NOTE: (state, note) ->
    state.activeNote = note

  SEARCH_NOTES: (state, searchResults) ->
    state.notes = searchResults

actions =
  getNotes: ({ commit }, notes) =>
    commit('GET_NOTES', notes)

  editNote: ({ commit }, note) =>
    commit('EDIT_NOTE', note)

  searchNotes: ({ commit }, searchResults) =>
    commit('SEARCH_NOTES', searchResults)

module.exports = new Vuex.Store
  state: state
  mutations: mutations
  actions: actions
