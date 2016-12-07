module.exports =
  paths:
    watched: ['source', 'craft/templates']

  files:
    javascripts:
      joinTo: 'js/main.js'
    stylesheets:
      sourceFiles: ['init.scss']
      joinTo: 'css/main.css'

  server:
    command: 'electron .'

  plugins:
    postcss:
      processors: [
        require('autoprefixer')(['last 8 versions'])
      ]
    sass:
      mode: ''
    coffeescript:
      bare: true