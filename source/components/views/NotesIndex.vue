<script lang="coffee">

fuse = require('fuse.js')

module.exports =
  name: 'Home',

  data: ->
    fuse: null
    notes: []
    focused: -1
    createNewNote: false
    search:
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

    returnToSearch: (e) ->
      console.log 'Return to the Search'

    previewNote: (index) ->
      @focused = index
      console.log @focused

    goToNote: ->
      console.log 'Go to the Note'

</script>

<template>
  <div class="hp-100">

    <section class="absolute top-0 left-0 z-9 wp-100 h-8 bb-7 cbgg-8">
      <div class="absolute wp-100 bottom-0 left-0 px-3 py-3">
        <form @submit="submitSearch" :class="{ 'shadow': search.active }">
          <input v-model="search.query" @focus="activateSearch" @keyup="searchNotes" type="text" class="px-4 py-1 t-1 wp-100 cbg-white rounded">
          <div class="absolute-right-middle pr-3">
            <span class="px-4 tn-1 cg-3 antialiased">{{ search.results.length }} notes</span>
          </div>
        </form>
      </div>
    </section>

    <section class="absolute top-0 left-0 hp-100 wp-100 pt-8">
      <div class="hp-100 o-auto">
        <article v-if="createNewNote" class="px-3 mt-5 wp-100">
          <a href="#" @click="goToNote" class="d-block wp-100 px-4 py-3 rounded" style="background: rgba(0,0,0,0.02);">
            <p class="tn-1 cg-4 antialiased">Create New Note</p>
            <h1 class="t-1 cg-2 antialiased">{{ search.query }}</h1>
            <span class="tn-1 cg-5 antialiased b-7 rounded px-1">Enter</span>
          </a>
        </article>

        <article v-for="(note, index) in search.results" @keyup.esc="returnToSearch" class="wp-100 px-3" :class="{ 'mt-5': index == 0 }">
          <a href="#" @click="goToNote" @focus="previewNote(index)" class="d-block wp-100 px-4 py-3 rounded">
            <h1 class="t-1 c-black">{{ note.title }}</h1>
            <p class="tn-1 cg-3 antialiased">{{ note.dateModifiedPretty }}</p>

            <div v-if="index === focused">{{ note.preview }}</div>
          </a>
        </article>
      </div>
    </section>

  </div>
</template>