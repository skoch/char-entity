define(
  [ 'jquery' ],
  function( $ )
  {
    var signals;
    var transitions = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';
    var allCharacters;
    var searchInput = $( '.search' );

    function init( shared )
    {
      console.log( " === home ===" );
      signals = shared.signals;

      _getCharacters();

      searchInput.keyup( _search );
    }

    function _getCharacters()
    {
      $.getJSON( "js/characters.json", function( data )
      {
        allCharacters = data;
        _update( allCharacters );
      });
    }

    function _update( $characters )
    {
      var mode = document.designMode;
      console.log( "mode", mode );
      // document.designMode = "on";
      // document.designMode = "off";

      $.each( $characters, function( key, val )
      {
        // console.log( "key, val", key, val );

        var characterMacro = $( '#templates .character-macro' ).clone();
        characterMacro.attr({
          'title': val.title,
          'data-block': val['data-block'],
          'data-category': val['data-category'],
          'data-set': val['data-set'],
          'data-hex': val['hex'],
          'data-dec': val['dec']
        });

        characterMacro.find( '.character' ).html( val.character );
        characterMacro.find( '.desc' ).html( _formatTitle( key ) );
        var entity = val.named.split( ' ' )[0];
        characterMacro.find( '.code' ).val( entity.replace( /&amp;/g, '&' ) );
        // characterMacro.find( '.code' ).val( val.named.replace( /&amp;/g, '&' ) );

        $( '.characters-macro' ).append( characterMacro );
      });

      $( '.character-macro' ).click( _copy );
      searchInput.focus();

      signals['dom-ready'].dispatch();
    }

    function _copy( $evt )
    {
      var characterMacro = $( $evt.currentTarget );
      var code = characterMacro.find( '.code' );
      code.select();

      try {
        var success = document.execCommand( 'copy' );
        if( success )
        {
          _flashBackground( code, '#D9EAD3' );
        }
      }catch( err )
      {
        _flashBackground( code, '#F4CCCC' );
      }
    }

    function _flashBackground( $element, $color )
    {
      $element.css( 'backgroundColor', $color );
      $element.on( transitions, {element:$element, color:'#f1f1f1'}, _resetBackground );
      $element.blur();
    }

    function _resetBackground( $evt )
    {
      var code = $( $evt.data.element );
      code.off( transitions, _resetBackground );
      code.css( 'backgroundColor', $evt.data.color );
    }

    function _formatTitle( $str )
    {
      $str = $str.replace( /-/g , ' ' );
      return $str.toLowerCase().replace( /\b\w/g, function( m )
      {
        return m.toUpperCase();
      });
    }

    function _search( $evt )
    {
      if( $evt.keyCode == 13 )
      {
        var foundCharacters = [];
        var searchTerm = $( $evt.currentTarget ).val();

        // don't do anything because empty string, flash input red
        if( searchTerm == '' )
        {
          _flashBackground( searchInput, '#F4CCCC' );
          searchInput.focus();
          return;
        }

        // we at least want to search for something so clear results
        $( '.search-results-macro' ).empty();

        // clear/reset, flash green
        if( searchTerm == 'clear' || searchTerm == 'all' )
        {
          _flashBackground( searchInput, '#D9EAD3' );
          $( '.characters-macro' ).removeClass( 'is-hidden' );
          searchInput.val( '' );
          searchInput.focus();
          return;
        }

        $.each( allCharacters, function( key, val )
        {
          if( val.title.search( new RegExp( searchTerm, 'i' ) ) != -1 )
          {
            var characterMacro = $( '#templates .character-macro' ).clone();
            characterMacro.attr({
              'title': val.title,
              'data-block': val['data-block'],
              'data-category': val['data-category'],
              'data-set': val['data-set'],
              'data-hex': val['hex'],
              'data-dec': val['dec']
            });

            characterMacro.find( '.character' ).html( val.character );
            characterMacro.find( '.desc' ).html( _formatTitle( key ) );
            var entity = val.named.split( ' ' )[0];
            characterMacro.find( '.code' ).val( entity.replace( /&amp;/g, '&' ) );

            foundCharacters.push( characterMacro );
          }
        });

        if( foundCharacters.length > 0 )
        {
          $( '.characters-macro' ).addClass( 'is-hidden' );
          $.each( foundCharacters, function( key, val )
          {
            $( '.search-results-macro' ).append( val );
          });

          $( '.character-macro' ).click( _copy );

          _flashBackground( searchInput, '#D9EAD3' );
          searchInput.focus();

        }else
        {
          $( '.characters-macro' ).addClass( 'is-hidden' );
          $( '.search-results-macro' ).append( '<h4 class="oops">No results</h4>' );
          // _flashBackground( searchInput, '#F4CCCC' );
          // $( '.characters-macro' ).removeClass( 'is-hidden' );
          // searchInput.focus();
        }
      }
    }

    return { init: init };
  }
);
