<script lang="coffee">

module.exports =
  name: 'App'

  components:
    NotesIndex: require('./NotesIndex'),
    Editor: require('./Editor')

  directives:
    focus: focus

</script>

<template>

  <div class="hp-100">
    <notes-index v-if="!$store.state.activeNote"></notes-index>
    <editor v-if="$store.state.activeNote" :note="$store.state.activeNote"></editor>
  </div>

</template>

<!-- vuex: {
    getters: {
      activeNote: state => state.activeNote
    },
    actions: {
      addNote,
      deleteNote,
      toggleFavorite
    }
  } -->
