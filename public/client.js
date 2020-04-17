$(function () {
  $("#newThread").submit(function () {
    var board = $("#board1").val();
    $(this).attr("action", "/api/threads/" + board);
  });

  $("#newReply").submit(function () {
    var board = $("#board4").val();
    $(this).attr("action", "/api/replies/" + board);
  });

  $("#reportThread").submit(function (e) {
    var url = "/api/threads/" + $("#board2").val();
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

  $("#deleteThread").submit(function (e) {
    var url = "/api/threads/" + $("#board3").val();
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

  $("#reportReply").submit(function (e) {
    var url = "/api/replies/" + $("#board5").val();
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

  $("#deleteReply").submit(function (e) {
    var url = "/api/replies/" + $("#board6").val();
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
  // ---------------------------------------------------------

  $("#testForm1").submit(function (e) {
    $.ajax({
      url: "/api/issues/api_test",
      type: "post",
      data: $("#testForm1").serialize(),
      success: function (data) {
        $("#f2a").text(JSON.stringify(data));
      },
    });
    e.preventDefault();
  });

  $("#testForm2").submit(function (e) {
    $.ajax({
      url: "/api/issues/api_test",
      type: "put",
      data: $("#testForm2").serialize(),
      success: function (data) {
        $("#f2a").text(JSON.stringify(data));
      },
    });
    e.preventDefault();
  });

  $("#testForm3").submit(function (e) {
    $.ajax({
      url: "/api/issues/api_test",
      type: "delete",
      data: $("#testForm3").serialize(),
      success: function (data) {
        $("#f2a").text(JSON.stringify(data));
      },
    });
    e.preventDefault();
  });
});
