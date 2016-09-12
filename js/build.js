({
  baseUrl: ".",
  paths: {
    src: 'src',
    components: 'src/components',
    jquery: 'lib/jquery-2.1.4.min',
    waypoint: 'lib/jquery.waypoints.min',
    signal: 'lib/signals.min',
  },
  shim: {
    'waypoint': ['jquery'],
  },
  name: "app",
  out: "app-built.js"
})
