exports.config =
  paths:
    public: 'public'
    watched: ['app','test','vendor']
  conventions:
    assets:  /^app\/assets\//
  modules:
    definition: false
    wrapper: false
  files:
    javascripts:
      joinTo:
        'js/app.js': /^app/
        'js/vendor.js': /^(bower_components|vendor)/
    stylesheets:
      joinTo:
        'css/app.css': /^app/
        'css/vendor.css': /^(bower_components|vendor)/
      order:
        before: ['app/styles/app.less']
  server:
    path: 'server/inject.coffee'
  plugins:
    autoReload:
      enabled: true
