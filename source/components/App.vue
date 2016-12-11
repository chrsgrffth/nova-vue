<script lang="coffee">

module.exports =
  name: 'App'

  components:
    NotesIndex: require('./NotesIndex'),
    Editor: require('./Editor')


</script>

<template>
    
  <div class="hp-100">
    <notes-index></notes-index>
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