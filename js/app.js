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
    var transitions = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';

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

      $( '.loader' ).addClass( 'in' );

      // sk: initialize all main modules. add config object.
      home.init( config );
      instructions.init( config );

      // _onDomReady();

    }

    function _onDomReady()
    {
      var target = $( '.loader' );
      target.on( transitions, _ready );
      target.removeClass( 'in' );

      // $( '.loader' ).removeClass( 'in' );
      // $( '.container' ).addClass( 'in' );
    }

    function _ready( $evt )
    {
      $( '.loader' ).off( transitions, _ready );
      $( '.loader' ).addClass( 'hidden' );
      $( 'body' ).removeClass( 'md-hide-body' );
      $( '.container, footer' ).removeClass( 'no-display' );
      setTimeout( function(){
        $( '.container' ).addClass( 'in' );
      }, 300 );
    }
  }
);
