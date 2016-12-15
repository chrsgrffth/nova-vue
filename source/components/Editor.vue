<script lang="coffee">

module.exports =
  name: 'Editor'

  mixins: [focus.mixin]

  props:
    note:
      type: Object
      required: true

  data: ->
    isMounted: false
    editMode: false
    htmlContent: null
    rawContent: null
    formattedContent: null


  mounted: ->
    @isMounted = true
    @htmlContent = @note.content
    @formattedContent = marked(@note.content)

  computed:
    markdown: ->
      return @note.content.replace(/^\s+|\s+$/g, "")

    wordCount: ->
      if @rawContent
        return @rawContent.replace(/^\s+|\s+$/g, "").split(' ').length
      else
        return 0

  methods:
    keyCommands: (e) ->
      target = e.currentTarget

      switch e.keyCode
        when 27 # Escape.
          @$store.state.activeNote = null
          break

</script>

<template>
  <div v-if="isMounted" v-focus="true" @keyup.esc="$store.state.activeNote = null" class="pt-8 pb-5 px-5 hp-100" tabindex="0">

    <section class="hp-100 o-auto">
      <div class="container">
        <div class="col-md-8 markdown">
          <div v-if="!editMode" v-html="formattedContent" tabindex="0"></div>
          <div v-if="editMode" contenteditable="true" tabindex="0">
            {{ note.content }}
          </div>

        </div>
      </div>
    </section>

    <footer class="fixed bottom-0 left-0 wp-100 h-5 px-5 bt-7 cbgg-7">
      <div class="flex items-center hp-100">
        <p class="tn-1">{{ wordCount }} Words</p>
      </div>
    </footer>

  </div>
</template>
