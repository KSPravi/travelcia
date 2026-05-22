(function () {
  var form = document.querySelector(".contact-form");

  if (!form) {
    return;
  }

  var submitButton = form.querySelector('button[type="submit"]');
  var submitText = submitButton ? submitButton.querySelector("span") : null;
  var messageBox = form.querySelector(".form-message");
  var defaultButtonText = submitText ? submitText.textContent : "Send Enquiry";

  var rules = {
    name: {
      message: "Please enter your full name.",
      validate: function (value) {
        return value.trim().length >= 2;
      },
    },
    phone: {
      message: "Please enter a valid phone number.",
      validate: function (value) {
        return /^[0-9+\-\s()]{7,20}$/.test(value.trim());
      },
    },
    email: {
      message: "Please enter a valid email address.",
      validate: function (value) {
        var email = value.trim();
        return email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
    },
    message: {
      message: "Please enter your message.",
      validate: function (value) {
        return value.trim().length >= 10;
      },
    },
  };

  function getField(name) {
    return form.querySelector('[name="' + name + '"]');
  }

  function clearFieldError(field) {
    var group = field.closest(".form-group");
    var error = group ? group.querySelector(".field-error") : null;

    field.classList.remove("is-invalid");

    if (error) {
      error.remove();
    }
  }

  function setFieldError(field, message) {
    var group = field.closest(".form-group");
    var error = document.createElement("small");

    clearFieldError(field);
    field.classList.add("is-invalid");

    error.className = "field-error";
    error.textContent = message;

    if (group) {
      group.appendChild(error);
    }
  }

  function setMessage(message, type) {
    if (!messageBox) {
      return;
    }

    messageBox.className = "form-message " + (type || "");
    messageBox.textContent = message || "";
  }

  function validateForm() {
    var isValid = true;

    Object.keys(rules).forEach(function (name) {
      var field = getField(name);
      var rule = rules[name];

      if (!field) {
        return;
      }

      clearFieldError(field);

      if (!rule.validate(field.value)) {
        isValid = false;
        setFieldError(field, rule.message);
      }
    });

    if (typeof grecaptcha !== "undefined" && grecaptcha.getResponse().length === 0) {
      isValid = false;
      setMessage("Please complete the reCAPTCHA verification.", "error");
    } else if (isValid) {
      setMessage("", "");
    }

    return isValid;
  }

  Object.keys(rules).forEach(function (name) {
    var field = getField(name);

    if (!field) {
      return;
    }

    field.addEventListener("input", function () {
      clearFieldError(field);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
    }

    if (submitText) {
      submitText.textContent = "Sending...";
    }

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json().then(function (data) {
          if (!response.ok || !data.success) {
            throw new Error(data.message || "Something went wrong. Please try again.");
          }

          return data;
        });
      })
      .then(function (data) {
        form.reset();
        setMessage(data.message || "Thank you. We will contact you shortly.", "success");

        if (typeof grecaptcha !== "undefined") {
          grecaptcha.reset();
        }
      })
      .catch(function (error) {
        setMessage(error.message, "error");

        if (typeof grecaptcha !== "undefined") {
          grecaptcha.reset();
        }
      })
      .finally(function () {
        if (submitButton) {
          submitButton.disabled = false;
        }

        if (submitText) {
          submitText.textContent = defaultButtonText;
        }
      });
  });
})();
