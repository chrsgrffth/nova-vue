<script lang="coffee">

module.exports =
  name: 'Home',

  data: ->
    notes: []
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

  methods:
    activateSearch: ->
      @search.active = true

    searchNotes: ->
      if @search.query.length > 0
        @search.results = []

        # @todo: Fuzzy search this beast – http://fusejs.io/
        for note in @notes
          @search.results.push(note) if note.title.toLowerCase().indexOf(@search.query.toLowerCase()) > -1

        @createNewNote = true

        for note in @search.results
          if note.title.toLowerCase() == @search.query.toLowerCase()
            @createNewNote = false

      else
        @search.results = @notes
        @createNewNote = false


    submitSearch: (e) ->
      e.preventDefault()
      console.log @createNewNote

    returnToSearch: (e) ->
      console.log 'Return to the Search'

    goToNote: ->
      console.log 'Go to the Note'

</script>

<template>
  <div>

    <section class="fixed wp-100 h-8 bb-7 cbgg-8 mb-3">
      <div class="absolute wp-100 bottom-0 left-0 px-3 py-3">
        <form @submit="submitSearch" :class="{ 'shadow': search.active }">
          <input v-model="search.query" @focus="activateSearch" @keyup="searchNotes" type="text" class="px-4 py-1 t-1 wp-100 cbg-white rounded">
          <div class="absolute-right-middle pr-3">
            <span class="px-4 tn-1 cg-3 antialiased">{{ search.results.length }} notes</span>
          </div>
        </form>
      </div>
    </section>

    <section class="pt-8 pb-7">
      <article v-if="createNewNote" class="px-3 mt-5">
        <a href="#" @click="goToNote" class="d-block wp-100 px-4 py-3 rounded" style="background: rgba(0,0,0,0.02);">
          <p class="tn-1 cg-4 antialiased">Create New Note</p>
          <h1 class="t-1 cg-2 antialiased">{{ search.query }}</h1>
          <span class="tn-1 cg-5 antialiased b-7 rounded px-1">Enter</span>
        </a>
      </article>

      <article v-for="(note, index) in search.results" @keyup.esc="returnToSearch" class="px-3" :class="{ 'mt-5': index == 0 }">
        <a href="#" @click="goToNote" class="d-block wp-100 px-4 py-3 rounded">
          <h1 class="t-1 c-black">{{ note.title }}</h1>
          <p class="tn-1 cg-3 antialiased">{{ note.dateModifiedPretty }}</p>
        </a>
      </article>
    </section>

  </div>
</template>