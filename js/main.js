$(document).ready(function() {


  // Зацикливание галлереи fancybox

  $("[data-fancybox]").fancybox({
    loop: true
  });


  // Плавный скролл
  
  if ($(window).width() > 992) {
    $('.header__button').on('click', function (e) {
      e.preventDefault();
      smoothScroll('product-shoes', 45);
    });

    $('.about-product__button--shoes').on('click', function (e) {
      e.preventDefault();
      smoothScroll('product-shoes', 45);
    });

    $('.about__button').on('click', function (e) {
      e.preventDefault();
      smoothScroll('product-shoes', 45);
    });

    $('.about-product__button--clothes').on('click', function (e) {
      e.preventDefault();
      smoothScroll('product-clothes', 45);
    });
  } else {
    $('.header__button').on('click', function (e) {
      e.preventDefault();
      smoothScroll('product-info__form--shoes', ($(window).height() - 400));
    });

    $('.about-product__button--shoes').on('click', function (e) {
      e.preventDefault();
      smoothScroll('product-info__form--shoes', ($(window).height() - 400));
    });

    $('.about__button').on('click', function (e) {
      e.preventDefault();
      smoothScroll('product-info__form--shoes', ($(window).height() - 400));
    });

    $('.about-product__button--clothes').on('click', function (e) {
      e.preventDefault();
      smoothScroll('product-info__form--clothes', ($(window).height() - 400));
    });
  }

  function smoothScroll(classOfName, topSmooth) {
    $('html, body').animate({
      scrollTop: $("." + classOfName).offset().top - topSmooth
    }, 1500);
  }


  // Добавление нуля, если число < 10

  function addZero(num) {
    return (num > 9) ? num : '0' + num;
  }


  // Динамическая дата, от сегодняшней + 2 дня с добавлением нулей, если день или месяц меньше 10

  function addDays(days) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  }

  $('.sale-date').text(addZero(addDays(2).getDate()) + '.' + (addZero(addDays(2).getMonth() + 1)) + '.' + addDays(2).getFullYear());


  // Выбор размера товара

  $('.product-info__size').on('click', function() {
    $(this).parent('.product-info__size-wrapper').find('.product-info__size').each(function(i, key) {
      $(key).removeClass('product-info__size--active');
    });

    $(this).parent('.product-info__size-wrapper').find('.product-info__size-santimeter').each(function(i, key) {
      $(key).removeClass('product-info__size-santimeter--active');
    });

    $(this).children().addClass('product-info__size-santimeter--active');
    $(this).addClass('product-info__size--active');
  });

  $('.product__button-gender').on('click', function() {
    $('.product__button-gender').each(function(i, key) {
      $(key).removeClass('product__button-gender--active');
    });

    $(this).addClass('product__button-gender--active');
  });


  // Слайдер в секции product (одежда)

  const product = new Swiper('.product-swiper', {
    loop: true,
    spaceBetween: 30,
    
    pagination: {
      el: '.swiper__wrapper-pagination',
      clickable: true,
    },
  });


  // Инициальизация библиотеки с анимацияи

  AOS.init();


  // Скрытие и показ кнопки заказать

  var handleBtnMobOrder = null;

  function getDocumentScrollTop() {
    return $(document.scrollingElement || document.documentElement).scrollTop();
}

  window.addEventListener('scroll', function() {
      clearTimeout(handleBtnMobOrder);

      handleBtnMobOrder = setTimeout(function() {

          const holders = document.querySelectorAll(".hidden-button");

          if (holders.length > 0) {
              const windowScrollBottom = getDocumentScrollTop() + $(window).height();
              var isVisible = true;

              for (let i = 0; i < holders.length; i++) {
                  var $item = $(holders[i]);
                  var $itemTop = $item.offset().top;
                  if (windowScrollBottom > $itemTop && windowScrollBottom < $itemTop + $item.height() + 100) {
                      isVisible = false;
                      break;
                  }
              }

              const $pageHeight = $(document).height() - $(window).height();

              if (getDocumentScrollTop() + 100 >= $pageHeight) {
                  $(".about__button").removeClass("active");
              } else {
                  $(".about__button").toggleClass("active", isVisible);
              }

          }
      }, 30);
  });
});