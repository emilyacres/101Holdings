$( document ).ready(function () {
  $( "#nav-filter" ).click(function () {
    $("#filters").toggle();
  });

  $('#down-arrow').hover(function () {

  });

  $('#down-arrow').click(function () {
    var height = $( window ).height();
    $('html, body').animate({scrollTop: height},'50');
  })

  $('#nav-logo').click(function () {
    $('html, body').animate({scrollTop: 0},'50');
  })
})
