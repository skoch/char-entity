define(
  [ 'jquery' ],
  function( $ )
  {
    var signals;

    function init( config )
    {
      console.log( "  === home ===" );
      signals = config.signals;

      signals['dom-ready'].dispatch();
    }

    return { init: init };
  }
);
