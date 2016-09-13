require.config({
  baseUrl: 'js/lib',
  paths: {
    jquery: 'jquery-2.1.4.min',
    signal: 'signals.min',
    src: '../src',
    components: '../src/components'
  }
});

require(
  [
    'src/home',
    'components/instructions',
    'signal',
    'jquery'
  ],
  function(
    home,
    instructions,
    Signal,
    $
  )
  {
    $( document ).ready( init );

    function init()
    {
      // console.log( "=== init ===" );
      var config = {
        signals: {
          'open'             : new Signal(),
          'dom-ready'        : new Signal()
        }
      };

      config.signals['dom-ready'].add( _onDomReady );

      // sk: initialize all main modules. add config object.
      home.init( config );
      instructions.init( config );

      // _onDomReady();
    }

    function _onDomReady()
    {
      $( 'body' ).addClass( 'in' );
    }
  }
);
