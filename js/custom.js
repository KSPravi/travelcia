// $(window).on("load", function () {
//   jQuery(".preloader").fadeOut("slow", function () {});
// });

$(".flexslider").flexslider({
  animation: "fade",

  controlNav: false,

  directionNav: true,

  prevText: "",

  nextText: "",

  slideshowSpeed: 3000,

  animationSpeed: 600,
});

if ($(window).width() > 991) {
  var cursor1 = $(".cursor"),
    follower = $(".follower"),
    cWidth = 8,
    fWidth = 10,
    delay = 10,
    mouseX1 = 0,
    mouseY1 = 0,
    posX = 0,
    posY = 0;

  TweenMax.to({}, 0.001, {
    repeat: -1,

    onRepeat: function () {
      posX += (mouseX1 - posX) / delay;

      posY += (mouseY1 - posY) / delay;

      TweenMax.set(follower, {
        css: {
          left: posX - fWidth / 2,

          top: posY - fWidth / 2,
        },
      });

      TweenMax.set(cursor1, {
        css: {
          left: mouseX1 - cWidth / 2,

          top: mouseY1 - cWidth / 2,
        },
      });
    },
  });

  $(document).on("mousemove", function (e) {
    mouseX1 = e.pageX;

    mouseY1 = e.pageY;
  });

  $("a").on({
    mouseenter: function () {
      cursor1.addClass("is-active");

      follower.addClass("is-active");
    },

    mouseleave: function () {
      cursor1.removeClass("is-active");

      follower.removeClass("is-active");
    },
  });

  $(".image-hover").on({
    mouseenter: function () {
      cursor1.addClass("open-img");

      follower.addClass("open-img");
    },

    mouseleave: function () {
      cursor1.removeClass("open-img");

      follower.removeClass("open-img");
    },
  });
}

$(document).ready(function () {
  var mainslider = new Swiper(".slider-main", {
    loop: false,

    slidesPerView: "3.5",

    spaceBetween: 40,

    pagination: {
      el: ".swiper-pagination",

      type: "progressbar",
    },

    navigation: {
      nextEl: ".swiper-button-next",

      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      320: {
        slidesPerView: 1.2,

        spaceBetween: 16,
      },
      480: {
        slidesPerView: 1.5,

        spaceBetween: 16,
      },
      640: {
        slidesPerView: 1.8,

        spaceBetween: 20,
      },

      768: {
        slidesPerView: 2.3,

        spaceBetween: 20,
      },

      992: {
        slidesPerView: 2.5,
      },

      1200: {
        slidesPerView: 3.5,
      },
      1400: {
        slidesPerView: 3.5,
      },
    },
  });
  var mainslider = new Swiper(".package-slider", {
    loop: false,

    slidesPerView: "3.5",

    spaceBetween: 40,

    pagination: {
      el: ".swiper-pagination",

      type: "progressbar",
    },

    navigation: {
      nextEl: ".swiper-button-next",

      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      320: {
        slidesPerView: 1.2,

        spaceBetween: 16,
      },

      640: {
        slidesPerView: 1.5,

        spaceBetween: 20,
      },

      768: {
        slidesPerView: 1.8,

        spaceBetween: 20,
      },

      1024: {
        slidesPerView: 2.4,
      },

      1280: {
        slidesPerView: 2.5,
      },
      1441: {
        slidesPerView: 3.5,
      },
    },
  });
  var mainslider = new Swiper(".review-slider", {
    loop: true,
    speed: 1000,
    slidesPerView: "4",

    spaceBetween: 24,
    autoplay: {
      delay: 2000,
    },
    pagination: {
      el: ".swiper-pagination",

      type: "progressbar",
    },

    navigation: {
      nextEl: ".swiper-button-next",

      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      320: {
        slidesPerView: 1,

        spaceBetween: 16,
      },

      576: {
        slidesPerView: 1,

        spaceBetween: 20,
      },

      768: {
        slidesPerView: 2,

        spaceBetween: 20,
      },

      992: {
        slidesPerView: 2,
      },

      1200: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 3,
      },
    },
  });
});

var aFx = 70,
  trF = 4;

$(".social-media")
  .on("mousemove touchmove", function (e) {
    var cH = $(".social-media").innerHeight(),
      cW = $(".social-media").innerWidth(),
      eX =
        e.originalEvent.type === "touchmove"
          ? e.originalEvent.touches[0].pageX
          : e.offsetX,
      eY =
        e.originalEvent.type === "touchmove"
          ? e.originalEvent.touches[0].pageY
          : e.offsetY;

    $.each($(".img-1"), function (i, el) {
      //console.log(((eY - cH / 2) / aFx) - (i*2));

      TweenMax.set($(el), {
        transformOrigin:
          (eX / (cW * trF) / 100) * 10000 +
          trF * 10 +
          "% " +
          ((eY / (cH * trF) / 100) * 10000 + trF * 10) +
          "%",

        transformPerspective: 10000 + i * 5000,
      });

      TweenMax.to($(el), 0.5, {
        rotationX: (eY - cH / 2) / aFx - i * 2,

        rotationY: ((eX - cW / 2) / aFx) * -1 - i * 2,

        y: (eY - cH / 2) / (70 - i * 20),

        x: (eX - cW / 2) / (70 - i * 20),
      });
    });

    $.each($(".img-2"), function (i, el) {
      //console.log(((eY - cH / 2) / aFx) - (i*2));

      TweenMax.set($(el), {
        transformOrigin:
          (eX / (cW * trF) / 100) * 10000 +
          trF * 10 +
          "% " +
          ((eY / (cH * trF) / 100) * 10000 + trF * 10) +
          "%",

        transformPerspective: 10000 + i * 5000,
      });

      TweenMax.to($(el), 0.5, {
        rotationX: (eY - cH / 2) / aFx - i * 2,

        rotationY: ((eX - cW / 2) / aFx) * -1 - i * 2,

        y: (eY - cH / 2) / (70 - i * 20),

        x: (eX - cW / 2) / (70 - i * 20),
      });
    });
  })
  .on("mouseout touchend", function (e) {
    $.each($(".img-1"), function (i, el) {
      TweenMax.to($(el), 1, {
        delay: 0.1,

        y: 0,

        x: 0,

        rotationX: 0,

        rotationY: 0,

        transformPerspective: "1500",
      });
    });

    $.each($(".img-2"), function (i, el) {
      TweenMax.to($(el), 1, {
        delay: 0.2,

        y: 0,

        x: 0,

        rotationX: 0,

        rotationY: 0,

        transformPerspective: "1500",
      });
    });
  });

wow = new WOW({
  boxClass: "wow",

  animateClass: "animated",

  offset: 0,

  mobile: true,

  live: true,
});

// https://www.bootcdn.cn/fancyapps-ui/

new WOW().init();

(function ($, undefined) {
  "use strict";

  var defaults = {
    timedelay: 0.03,

    animationclass: "textup",

    splittingchar: true,
  };

  $.fn.splittingcharfn = function (options) {
    var settings = $.extend(defaults, options);

    $(this).each(function () {
      // var text = $(this).text().split(' ');

      if (settings.splittingchar) {
        var text = $(this).text().split(" ");
      } else {
        var text = $(this).text().split(" ");
      }

      for (var i = 0, len = text.length; i < len; i++) {
        var j = i + 1;

        text[i] =
          '<span class="wow ' +
          settings.animationclass +
          " word-" +
          i +
          '"  data-wow-delay="' +
          j * settings.timedelay +
          's" >' +
          text[i] +
          "</span>";
      }

      // $(this).html(text.join(' '));

      if (settings.splittingchar) {
        $(this).html(text.join(" "));
      } else {
        $(this).html(text.join(" "));
      }
    });

    // return this;
  };
})(jQuery);

// call Function

//Below Code always call after function

$(".big-text").splittingcharfn({
  timedelay: 0.04,

  animationclass: "textup",

  splittingchar: true,
});

// $(".big-text div>").splittingcharfn({

//   timedelay: 0.04,

//   animationclass: "text-up",

//   splittingchar: true

// });

// https://api.jquery.com/jquery.extend/

//if you want to split each character then remove white space from split(''); and also from join('')

// You can also try with animate.css

var btn = $("#button");

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass("show");

    $(".wtsapp").addClass("movetop");
    $(".call-btn").addClass("movetop");
  } else {
    btn.removeClass("show");

    $(".wtsapp").removeClass("movetop");
    $(".call-btn").removeClass("movetop");
  }
});

btn.on("click", function (e) {
  e.preventDefault();

  $("html, body").animate({ scrollTop: 0 }, "300");
});

$(document).ready(function () {
  var lastScroll = 0;

  jQuery(document).ready(function ($) {
    $(window).scroll(function () {
      setTimeout(function () {
        //gives 100ms to finish scrolling before doing a check

        var scroll = $(window).scrollTop();

        if (scroll > lastScroll) {
          $("header").addClass("scroll-down");
        } else if (scroll < lastScroll) {
          $("header").removeClass("scroll-down");
        }

        lastScroll = scroll;
      }, 100);
    });
  });
});

// Viewport add class

$.fn.isInViewport = function () {
  var elementTop = $(this).offset().top;

  var elementBottom = elementTop + $(this).outerHeight() / 1;

  var viewportTop = $(window).scrollTop();

  var viewportHalf = viewportTop + $(window).height() / 1;

  return elementBottom > viewportTop && elementTop < viewportHalf;
};

$(window).on("load resize scroll", function () {
  $(".google-reviews").each(function () {
    if ($(this).isInViewport()) {
      $(".wrapper").addClass("in-view");

      $(".wrapper").css({ transition: "all 500ms" });
    } else {
      $(".wrapper").removeClass("in-view");
    }
  });
});
// Fancybox Config
$('[data-fancybox="gallery"]').fancybox({
  buttons: ["slideShow", "thumbs", "zoom", "fullScreen", "share", "close"],
  loop: false,
  protect: true,
});

$(".drop-down").each(function () {
  var $dropdown = $(this);

  $("a.dropdown-toggle", $dropdown).click(function (e) {
    e.preventDefault();
    $div = $(".drop-menu", $dropdown);
    $div.slideToggle();
    $(".drop-menu").not($div).slideUp();
    return false;
  });
});

$(".toggle-menu").click(function () {
  $(".menu").addClass("open-menu");
  $("body").addClass("menu-open");
});
$(".close-menu-btn").click(function () {
  $(".menu").removeClass("open-menu");
  $("body").removeClass("menu-open");
});

$(".addon-btn").click(function (e) {
  $(".addon-wrap").addClass("opened");
  e.preventDefault();
});
$(".addon-wrap .close").click(function (e) {
  $(".addon-wrap").removeClass("opened");
  e.preventDefault();
});
