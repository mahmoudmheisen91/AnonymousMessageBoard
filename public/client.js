$(function () {
  $("#testForm1").submit(function () {
    let board = $(".board1").val();
    $(this).attr("action", "/api/threads/" + board);
  });

  $("#testForm1a").submit(function () {
    let board = $(".board1a").val();
    $(this).attr("action", "/api/replies/" + board);
  });

  $("#testForm2").submit(function (e) {
    var url = "/api/threads/" + $(".board2").val();
    $.ajax({
      type: "PUT",
      url: url,
      data: $(this).serialize(),
      success: function (data) {
        alert(data);
      },
    });
    e.preventDefault();
  });

  $("#testForm2a").submit(function (e) {
    var url = "/api/replies/" + $(".board2a").val();
    $.ajax({
      type: "PUT",
      url: url,
      data: $(this).serialize(),
      success: function (data) {
        alert(data);
      },
    });
    e.preventDefault();
  });

  $("#testForm3").submit(function (e) {
    var url = "/api/threads/" + $(".board3").val();
    $.ajax({
      type: "DELETE",
      url: url,
      data: $(this).serialize(),
      success: function (data) {
        alert(data);
      },
    });
    e.preventDefault();
  });

  $("#testForm3a").submit(function (e) {
    var url = "/api/replies/" + $(".board3a").val();
    $.ajax({
      type: "DELETE",
      url: url,
      data: $(this).serialize(),
      success: function (data) {
        alert(data);
      },
    });
    e.preventDefault();
  });
});
