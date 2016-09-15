define(
  [ 'jquery' ],
  function( $ )
  {
    var signals;

    function init( config )
    {
      console.log( "  === instructions ===" );
      signals = config.signals;

      $( '.instructions-button' ).click( _open );
      $( '.md-close' ).click( _close );
      $( '.md-overlay' ).click( _close );
    }

    function _open( $evt )
    {
      console.log( "open" );
      $( '#modal-12' ).addClass( 'md-show' );
      $( 'body' ).addClass( 'md-hide-body' );
    }

    function _close( $evt )
    {
      $( '#modal-12' ).removeClass( 'md-show' );
      setTimeout( function() {
        $( 'body' ).removeClass( 'md-hide-body' );
      }, 250 );
      // $( 'body' ).removeClass( 'md-hide-body' );
    }

    return { init: init };
  }
);
