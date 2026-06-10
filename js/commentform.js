$(document).ready(function () {
  setTimeout(function () {
    $("#sucess_msg").fadeOut("fast");
  }, 1000);
  // $("#sucess_msg").hide();
  $.validator.addMethod(
    "notplaceholder",
    function (value, element) {
      return $(element).attr("placeholder") != value;
    },
    "Please enter a value",
  );
  $("#comment_form").validate({
    rules: {
      name: {
        required: true,
        notplaceholder: true,
      },

      email: {
        required: true,
        email: true,
        notplaceholder: true,
      },
      phone: {
        required: true,
        number: true,
        notplaceholder: true,
      },
    },
    messages: {
      name: "Please enter your First Name",

      email: {
        required: "Please enter your Email ",
        email: "Please enter a valid Email",
      },
      phone: "Please enter your number",
    },
    submitHandler: function (form) {
      $("#sucess_msg").show();
      $.ajax({
        type: "POST",
        url: "commentform.php",
        data: $(form).serialize(), // serializes the form's elements.
        success: function (data) {
          $("#sucess_msg").html(data);
          $("#comment_form").trigger("reset"); // show response from the php script.
        },
      });
    },
  });
});
