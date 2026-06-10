$(document).ready(function () {
  $.validator.addMethod(
    "notplaceholder",
    function (value, element) {
      return $(element).attr("placeholder") != value;
    },
    "Please enter a value"
  );
  $.validator.addMethod(
    "phoneNumber",
    function (value, element) {
      return this.optional(element) || /^[0-9+\-\s()]{7,20}$/.test(value);
    },
    "Please enter a valid phone number"
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
        phoneNumber: true,
        notplaceholder: true,
      },
      message: {
        required: true,
        minlength: 10,
        notplaceholder: true,
      },
    },
    messages: {
      name: "Please enter your full name",
      email: {
        required: "Please enter your email address",
        email: "Please enter a valid email address",
      },
      phone: {
        required: "Please enter your phone number",
        phoneNumber: "Please enter a valid phone number",
      },
      message: {
        required: "Please enter your message",
        minlength: "Please enter at least 10 characters",
      },
    },
    submitHandler: function (form) {
      var $form = $(form);
      var $message = $("#sucess_msg");
      var $button = $form.find('button[type="submit"]');
      var $buttonText = $button.find("span");
      var defaultButtonText = $buttonText.text();

      $message.show().html("Sending...");
      $button.prop("disabled", true);
      $buttonText.text("Sending...");

      $.ajax({
        type: "POST",
        url: $form.attr("action"),
        data: $form.serialize(),
        dataType: "json",
        success: function () {
          $message.html("<span>Your message was successfully sent. We will contact you soon.</span>");
          form.reset();
        },
        error: function () {
          $message.html("<span>Unable to send your enquiry right now. Please try again later.</span>");
        },
        complete: function () {
          $button.prop("disabled", false);
          $buttonText.text(defaultButtonText);
        },
      });
    },
  });
});
