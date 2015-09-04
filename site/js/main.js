(function() {
  var to;

  function pieceHeights() {
    to = setTimeout(function() {
      $(".pure-g-r").each(function(i, el) {
        var contentPieces = $(el).find(".dashboard-piece");
        var max = 0;
        contentPieces.css("min-height", "");
        $.grep(contentPieces, function(el, i) {
          max = Math.max($(el).outerHeight(), max);
        });
        contentPieces.css("min-height", max);
      });
    }, 400);
  }

  writeValue();

  $(window).on("resize", function() {
    clearTimeout(to);
    pieceHeights();
  }).trigger("resize");

}());

function writeValue() {
  // Make a test ajax call to the go runtime to retrieve some data and then use that data to update a field in the html
  $.ajax({
    url: "/app/test",
    dataType: "json",
    success: function(data) {
      if (data.hasOwnProperty("error")) {
        window.location.replace(data.error);
      }
      $("#test").text(data.user);
    },
    error: function(d) {
      alert(d);
    }
  });
}
