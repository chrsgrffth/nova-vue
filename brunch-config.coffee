module.exports =
  paths:
    watched: ['source']

  files:
    javascripts:
      joinTo: 'js/app.js'
    stylesheets:
      sourceFiles: ['init.scss']
      joinTo: 'css/app.css'

  npm:
    aliases:
      'vue': 'vue/dist/vue.js'
    globals:
      moment: 'moment'

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