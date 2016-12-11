<script lang="coffee">

module.exports =
  name: 'NoteItem'

  data: ->
    commandMode: false

  props:
    note:
      required: true
      type: Object
    index:
      default: -1

  methods:

    keyCommands: (e) ->
      target = e.currentTarget

      switch e.keyCode
        when 27 # Escape.
          console.log 'Return to Search'
          break
        when 38 # Up.
          target.previousSibling.focus() if @$parent.focused > 0
          break
        when 40 # Down.
          target.nextSibling.focus()
          break
        when 91
          @commandMode = true

      if @commandMode
        switch e.keyCode
          when 82
            e.preventDefault()
            @commandMode = false
            @rename(document.activeElement.childNodes[0].querySelector('h1'), document.activeElement)
            break

    editNote: ->
      @$store.dispatch('editNote', @note)

    returnToSearch: (e) ->
      @$parent.focused = -1

    previewNote: (index) ->
      @$parent.focused = index

    rename: (el, focusOutEl) ->
      el.contentEditable = true
      el.focus()

      # range = document.createRange()
      # range.selectNode(el)
      # window.getSelection().addRange(range)

      el.addEventListener 'blur', (e) ->
        el.contentEditable = false

      el.addEventListener 'keydown', (e) ->
        if e.keyCode == 13
          e.preventDefault()
          document.getSelection().empty()
          focusOutEl.focus()

</script>

<template>
  <a 
    href="#"
    @keydown="keyCommands"
    @keyup="commandMode = false"
    @click="editNote"
    @focus="previewNote(index)"
    class="note-heading"
    :class="{ 'active': $parent.focused == index }"
  >
    <div class="o-hidden">
      <h1 class="t-1 c-black py-1 px-1">{{ note.title }} <span v-if="commandMode" class="tn-1 cg-5 antialiased"><span class="b-6 rounded px-1">r</span> to Rename</span></h1>
      <p class="tn-1 cg-3 antialiased px-1">{{ note.dateModifiedPretty }}</p>
      <div v-if="index === $parent.focused" class="mt-2 cg-1 antialiased px-1" style="word-wrap: break-word;">{{ note.preview }}</div>
    </div>
  </a>
</template>