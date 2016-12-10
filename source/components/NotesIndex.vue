<script lang="coffee">

focus = 'vue-focus'

module.exports =
  name: 'NotesIndex'

  components:
    NoteItem: require('./NoteItem')

  directives:
    focus: focus

  data: ->
    fuse: null
    notes: []
    focused: -1
    createNewNote: false
    activeNote: -1
    search:
      focused: false
      active: false
      query: ''
      results: []

  computed:
    notes: ->
      return window.notes

  mounted: ->
    # Move to computed.
    @search.results = @notes

    # http://fusejs.io/
    options =
      shouldSort: true
      threshold: 0.4,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        {
          name: 'title',
          weight: 0.5
        },
        {
          name: 'raw',
          weight: 0.3
        },
        {
          name: 'dateModifiedPretty',
          weight: 0.2
        }
      ]

    @fuse = new Fuse(@notes, options)

  methods:
    activateSearch: ->
      @search.active = true

    searchNotes: ->
      if @search.query.length > 0
        @search.results = @fuse.search(@search.query)
      else
        @search.results = @notes

      # if @search.query.length > 0
      #   @search.results = []

      #   # @todo: Fuzzy search this beast – http://fusejs.io/
      #   for note in @notes
      #     @search.results.push(note) if note.title.toLowerCase().indexOf(@search.query.toLowerCase()) > -1

      #   @createNewNote = true

      #   for note in @search.results
      #     if note.title.toLowerCase() == @search.query.toLowerCase()
      #       @createNewNote = false

      # else
      #   @search.results = @notes
      #   @createNewNote = false


    submitSearch: (e) ->
      e.preventDefault()
      console.log @createNewNote

</script>

<template>
  <div id="page" class="hp-100">
    <section class="absolute top-0 left-0 z-9 wp-100 h-8 bb-7 cbgg-8">
      <div class="absolute wp-100 bottom-0 left-0 px-3 py-3">
        <form @submit="submitSearch" :class="{ 'shadow': search.active }">
          <input
            v-focus="search.focused"
            v-model="search.query"
            @blur="search.focused = false"
            @focus="activateSearch"
            @keyup="searchNotes"
          type="text" class="px-4 py-1 t-1 wp-100 cbg-white rounded">
          <div class="absolute-right-middle pr-3">
            <span class="px-4 tn-1 cg-3 antialiased">{{ search.results.length }} notes</span>
          </div>
        </form>
      </div>
    </section>

    <section class="absolute top-0 left-0 hp-100 wp-100 pt-8">
      <div class="hp-100 o-auto pt-3">
        <article v-if="createNewNote" class="px-3 mt-5 wp-100">
          <a href="#" @click="goToNote" class="d-block wp-100 px-4 py-3 rounded" style="background: rgba(0,0,0,0.02);">
            <p class="tn-1 cg-4 antialiased">Create New Note</p>
            <h1 class="t-1 cg-2 antialiased">{{ search.query }}</h1>
            <span class="tn-1 cg-5 antialiased b-7 rounded px-1">Enter</span>
          </a>
        </article>

        <note-item v-for="(note, index) in search.results" :note="note" :index="index"></note-item>
      </div>
    </section>

  </div>
</template>