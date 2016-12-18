<script lang="coffee">

module.exports =
  name: 'App'

  components:
    Search: require('./Search')
    NotesIndex: require('./NotesIndex')
    Editor: require('./Editor')

  directives:
    focus: focus

  mounted: ->
    @$store.dispatch('getNotes')

</script>

<template>

  <div class="hp-100">

    <section class="absolute top-0 left-0 z-9 wp-100 h-8 bb-7 cbgg-8">
      <div class="absolute wp-100 bottom-0 left-0 px-3 py-3">
        <search></search>
      </div>
    </section>

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
