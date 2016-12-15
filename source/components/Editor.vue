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


    # formattedContent: ->
    #   return marked(@note.content)


  methods:
    keyCommands: (e) ->
      target = e.currentTarget

      switch e.keyCode
        when 27 # Escape.
          @$store.state.activeNote = null
          break
        else
          # @formattedContent = marked(e.currentTarget.innerHTML)
          @rawContent = e.currentTarget.textContent


</script>

<template>
  <div v-if="isMounted" class="pt-8 px-5">

    <div class="container">
      <div class="col-md-8 markdown">
        <!-- <div contenteditable="true" v-focus="true" v-html="formattedContent" @keyup="keyCommands" tabindex="0"></div> -->
        <div contenteditable="true" v-focus="true" @keyup="keyCommands" tabindex="0">
          {{ markdown }}
        </div>

        <!-- <div class="wp-100 mt-8">
          <pre class="my-2">{{ htmlContent }}</pre>
          <pre class="my-2">{{ markdown }}</pre>
          <pre class="my-2">{{ rawContent }}</pre>
        </div> -->
      </div>
    </div>

    <footer class="absolute bottom-0 left-0 wp-100 py-3 px-5">
      <p class="tn-1">{{ wordCount }} Words</p>
    </footer>

  </div>
</template>
