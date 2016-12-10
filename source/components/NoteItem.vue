<script lang="coffee">

module.exports =
  name: 'NoteItem'

  props:
    note:
      required: true
      type: Object
    index:
      default: -1

  data: ->
    commandMode: false

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
            @rename(document.activeElement.childNodes[0].querySelector('h1'), document.activeElement)
            break

      target.addEventListener 'keyup', (e) ->
        switch e.keyCode
          when 91
            @commandMode = false

    returnToSearch: (e) ->
      @$parent.focused = -1

    previewNote: (index) ->
      @$parent.focused = index

    goToNote: (e, index) ->
      # page = document.getElementById('page')
      # copy = e.currentTarget.cloneNode(true)
      # wrap = document.createElement('div')
      # wrap.appendChild(copy)
      # page.appendChild(wrap)

      # wrap.style.position = 'absolute'
      # wrap.style.top = e.currentTarget.offsetTop + 'px'

      @activeNote = index
      console.log 'Go to the Note', @activeNote

    rename: (el, focusOutEl) ->
      el.contentEditable = true
      el.focus()

      range = document.createRange()
      range.selectNode(el)
      window.getSelection().addRange(range)

      el.addEventListener 'blur', (e) ->
        el.contentEditable = false

      el.addEventListener 'keydown', (e) ->
        e.preventDefault()
        focusOutEl.focus() if e.keyCode == 13


</script>

<template>
  <a 
    href="#"
    @keydown="keyCommands"
    @click="goToNote($event, index)"
    @focus="previewNote(index)"
    class="note-heading"
    :class="{ 'active': $parent.focused == index }"
  >
    <div class="o-hidden">
      <h1 @click="rename($event, true)" class="t-1 c-black py-1 px-1">{{ note.title }}</h1>
      <p class="tn-1 cg-3 antialiased px-1">{{ note.dateModifiedPretty }}</p>
      <div v-if="index === $parent.focused" class="mt-2 cg-1 antialiased px-1">{{ note.preview }}</div>
    </div>
  </a>
</template>