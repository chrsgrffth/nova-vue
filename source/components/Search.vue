<script lang="coffee">

focus = 'vue-focus'

module.exports =
  name: 'NotesIndex'

  directives:
    focus: focus

  data: ->
    fuse: null
    search:
      focused: false
      active: false
      query: ''
      results: []

  computed:
    searchActive: ->
      return @$store.state.searchActive

  mounted: ->
    @$store.dispatch('getNotes')

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

    @fuse = new Fuse(@$store.state.notes, options)

  methods:
    activateSearch: ->
      @search.active = true

    searchNotes: (e) ->
      # If the query has started, return results, including when there are no
      # results. Otherwise, restore the notes list.
      if @$store.state.query.length > 0
        @$store.dispatch('getNotes', @fuse.search(@$store.state.query))

        @$store.state.createNewNote = true

        for note in @$store.state.notes
          if note.title.toLowerCase() == @$store.state.query.toLowerCase()
            @$store.state.createNewNote = false

      else
        @$store.dispatch('getNotes')
        @$store.state.createNewNote = false

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

  <form @submit="submitSearch" :class="{ 'shadow': $store.state.searchActive }">
    <input
      v-model="$store.state.query"
      @focus="$store.state.searchActive = true"
      @keyup="searchNotes"
    type="text" class="px-4 py-1 t-1 wp-100 cbg-white rounded">
    <div class="absolute-right-middle pr-3">
      <span class="px-4 tn-1 cg-3 antialiased">{{ $store.state.notes.length }} notes</span>
    </div>
  </form>

</template>
