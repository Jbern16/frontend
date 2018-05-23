import { Controller } from "stimulus";

export default class extends Controller {
  connect() {
    $.getScript( "https://player.vimeo.com/api/player.js", function( data, textStatus, jqxhr ) {
      if($('#featured-media').length == 0){
        return
      }
      var $window = $( window );
      var $featuredMedia = $( "#featured-media" ); // Container.
      var $featuredVideo = $( "#featured-video" ); // Actual Video.
      var player = new Vimeo.Player($featuredVideo);
      var top = $featuredMedia.offset().top;
      var offset = Math.floor( top + ( $featuredMedia.outerHeight() / 2 ) );
      
      // delete this listener if you want it always floating
      player.on('play', function() {
        $window
  
        .on( "resize", function() {
          top = $featuredMedia.offset().top;
          offset = Math.floor( top + ( $featuredMedia.outerHeight() / 2 ) );
        })
        
        .on( "scroll", function() {
          $featuredVideo.toggleClass( "is-sticky",
          $window.scrollTop() > offset
          );
        });
      });
    });
  }
}