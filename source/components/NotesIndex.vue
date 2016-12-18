<script lang="coffee">

focus = 'vue-focus'

module.exports =
  name: 'NotesIndex'

  components:
    NoteItem: require('./NoteItem')

  data: ->
    fuse: null
    notes: []
    focused: -1
    createNewNote: false
    activeNote: -1

  # computed:
  #   notes: ->
  #     if @$store.state.search.query.length > 0
  #       return @$store.state.search.results
  #     else
  #       @$store.state.notes

</script>

<template>
  <div id="page" class="hp-100">

    <section class="absolute top-0 left-0 hp-100 wp-100 pt-8">
      <div class="hp-100 pt-3 o-auto">
        <article v-if="$store.state.createNewNote" class="px-3 wp-100">
          <a href="#" class="d-block wp-100 px-4 py-3 rounded" style="background: rgba(0,0,0,0.02);">
            <p class="tn-1 cg-4 antialiased">Create New Note</p>
            <h1 class="t-1 cg-2 antialiased">{{ $store.state.query }}</h1>
            <span class="tn-1 cg-5 antialiased b-7 rounded px-1">Enter</span>
          </a>
        </article>

        <note-item v-for="(note, index) in $store.state.notes" :note="note" :index="index"></note-item>
      </div>
    </section>
  </div>
</template>
