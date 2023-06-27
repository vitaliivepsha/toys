// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('./assets/templates/layouts/index.html');
  require('./assets/templates/layouts/blog.html');
  require('./assets/templates/layouts/blog-article.html');
  require('./assets/templates/layouts/catalog.html');
  require('./assets/templates/layouts/catalog-checked-filters.html');
  require('./assets/templates/layouts/catalog-checked-category.html');
  require('./assets/templates/layouts/search-results.html');
  require('./assets/templates/layouts/search-results-empty.html');
  require('./assets/templates/layouts/thank-you.html');
  require('./assets/templates/layouts/no-goods.html');
  require('./assets/templates/layouts/about.html');
  require('./assets/templates/layouts/product.html');
  require('./assets/templates/layouts/product-in-cart.html');
  require('./assets/templates/layouts/product-not-available.html');
  require('./assets/templates/layouts/404.html');
  require('./assets/templates/layouts/reviews.html');
  require('./assets/templates/layouts/contacts.html');
  require('./assets/templates/layouts/faq.html');
  require('./assets/templates/layouts/delivery-payment.html');
  require('./assets/templates/layouts/return.html');
  require('./assets/templates/layouts/cart.html');
  require('_templates/layouts/checkout-step1.html');
  require('_templates/layouts/checkout-step2.html');
  require('_templates/layouts/checkout-step3.html');
}

// Depends
var $ = require('jquery');
require('bootstrap-sass');

// Modules
var Forms = require('_modules/forms');
var Slider = require('_modules/slider');
var Popup = require('_modules/popup');
var LightGallery = require('_modules/lightgallery');
require('../node_modules/sumoselect/jquery.sumoselect.min');
require('../node_modules/mark.js/dist/jquery.mark.min');
require('../node_modules/jquery-validation/dist/jquery.validate.min');
require('_modules/succinct/succinct');
//require('../node_modules/ion-rangeslider/js/ion.rangeSlider');
var swal = require('sweetalert2');

// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function() {
  new Forms();
  new Popup();
  new LightGallery();
  new Slider();

  setTimeout(function() {
    $('body').trigger('scroll');
  }, 100);

    // fixed header

  var header = $('.header'),
    scrollPrev = 0;

  $(window).scroll(function() {
    var scrolled = $(window).scrollTop();

    if (scrolled > 200 && scrolled) {
      header.addClass('fixed');
      $('body').addClass('fixed-header');
    } else {
      header.removeClass('fixed');
      $('body').removeClass('fixed-header');
    }
    scrollPrev = scrolled;
  });

    // scroll to id

  $(document).on('click', 'a[href*="#"]', function(e) {
    var id = $(this).attr('href');
    var $id = $(id);
    if ($id.length === 0) {
      return;
    }
    e.preventDefault();
    var pos = $id.offset().top;
    $('body, html').animate({scrollTop: pos}, 500);
  });

    /*$(window).resize(function() {
      setTimeout(function() {
        $('.slick-slider').slick('setPosition');
      }, 100);
    });*/

  $(window).on('resize orientationchange', function() {
    if ($('.slick-slider').length) {
      setTimeout(function() {
        $('.slick-slider')[0].slick.refresh();
      }, 100);
    }
  });

    // video preview

  $('.video-wrapper').on('click', function() {
    var video = $(this).find('video').get(0),
      btn = $(this).find('.play-btn'),
      preview = $(this).find('img');
    btn.hide();
    preview.hide();
    video.play();
    return false;
  });

    // faq

  $('.faq-item__head').on('click', function() {
    $(this).closest('.faq-item').toggleClass('active').siblings().removeClass('active');
    $(this).next('.faq-item__body').slideToggle().closest('.faq-item').siblings().find('.faq-item__body').slideUp();
  });

    // input states

  $('.input, .textarea').on('focus', function() {
    $(this).closest('.input-wrapper').addClass('focus');
  });
  $('.input, .textarea').on('focusout', function() {
    $(this).closest('.input-wrapper').removeClass('focus');
  });
  $('.input, .textarea').on('keyup', function() {
    var $this = $(this);
    if ($this.val().length > 0) {
      $this.closest('.input-wrapper').addClass('filled');
    } else {
      $this.closest('.input-wrapper').removeClass('filled');
    }
  });

    // blog tags filters

  $('.blog-mob__filters-main').on('click', function() {
    $(this).closest('.blog-mob__filters').toggleClass('active');
  });

  $(document).click(function() {
    $('.blog-mob__filters').removeClass('active');
  });

  $(document).on('click', '.blog-mob__filters', function(e) {
    e.stopPropagation();
  });

    // 404 back

  $('.nf-back').click(function() {
    window.history.back();
  });

    // validation

  $('.validate-form').each(function() {
    var validate_form = $(this);
    validate_form.validate({
      highlight: function(element) {
        $(element).parent().addClass('error');
      },
      unhighlight: function(element) {
        $(element).parent().removeClass('error');
      },
      rules: {
        name: {
          required: true,
        },
        phone: {
          required: true,
        },
        email: {
          required: true,
        },
        country_region: {
          required: true,
        },
        first_name: {
          required: true,
        },
        last_name: {
          required: true,
        },
        address: {
          required: true,
        },
        city: {
          required: true,
        },
        state: {
          required: true,
        },
        zip: {
          required: true,
        },
        shipping_method: {
          required: true,
        },
      },
      messages: {
        name: {
          required: 'Fill out the name',
        },
        phone: {
          required: 'Fill out the phone',
        },
        email: {
          required: 'Fill out the email',
        },
        country_region: {
          required: 'Choose your Country/Region',
        },
        first_name: {
          required: 'Fill out First name',
        },
        last_name: {
          required: 'Fill out Last name',
        },
        address: {
          required: 'Fill out the address',
        },
        city: {
          required: 'Fill out the city',
        },
        state: {
          required: 'Fill out the state',
        },
        zip: {
          required: 'Fill out Zip code',
        },
        shipping_method: {
          required: 'Choose your shipping method',
        },
      },
      submitHandler: function(form) {
        if (validate_form.attr('id') == 'reviews-form') {
          $.ajax({
            data: $('#reviews-form').serialize(),
            success: function(data) {
              $.magnificPopup.instance.close = function() {
                $('#reviews-popup-success').removeClass('mfp-with-zoom');
                setTimeout(function() {
                  $.magnificPopup.proto.close.call(this);
                }, 300);
              };
              $.magnificPopup.open({
                items: {
                  src: '#reviews-popup-success'
                }
              });
              setTimeout(function() {
                $('#reviews-popup-success').addClass('mfp-with-zoom');
              }, 100);
            }
          });
        }
        else if (validate_form.attr('id') == 'customer-reviews-form') {
          $.ajax({
            data: $('#customer-reviews-form').serialize(),
            success: function(data) {
              $.magnificPopup.instance.close = function() {
                $('#customer-reviews-popup-success').removeClass('mfp-with-zoom');
                setTimeout(function() {
                  $.magnificPopup.proto.close.call(this);
                }, 300);
              };
              $.magnificPopup.open({
                items: {
                  src: '#customer-reviews-popup-success'
                }
              });
              setTimeout(function() {
                $('#customer-reviews-popup-success').addClass('mfp-with-zoom');
              }, 100);
            }
          });
        }
        else if (validate_form.attr('id') == 'club-form') {
          $.ajax({
            data: $('#club-form').serialize(),
            success: function(data) {
              $.magnificPopup.instance.close = function() {
                $('#club-popup-success').removeClass('mfp-with-zoom');
                setTimeout(function() {
                  $.magnificPopup.proto.close.call(this);
                }, 300);
              };
              $.magnificPopup.open({
                items: {
                  src: '#club-popup-success'
                }
              });
              setTimeout(function() {
                $('#club-popup-success').addClass('mfp-with-zoom');
              }, 100);
            }
          });
        }
        else if (validate_form.attr('id') == 'oneclick-form') {
          $.ajax({
            data: $('#oneclick-form').serialize(),
            success: function(data) {
              $.magnificPopup.instance.close = function() {
                $('#oneclick-popup-success').removeClass('mfp-with-zoom');
                setTimeout(function() {
                  $.magnificPopup.proto.close.call(this);
                }, 300);
              };
              $.magnificPopup.open({
                items: {
                  src: '#oneclick-popup-success'
                }
              });
              setTimeout(function() {
                $('#oneclick-popup-success').addClass('mfp-with-zoom');
              }, 100);
            }
          });
        }
      }
    });
  });

    // catalog sort dropdown

  $('.dropdown-sort-top').click(function() {
    $(this).closest('.dropdown-sort').toggleClass('open');
  });

  $('.dropdown-sort-bot').on('click', '.dropdown-sort-bot-item', function() {
    var val = $(this).html();
    $(this)
            .closest('.dropdown-sort')
            .removeClass('open')
            .find('.dropdown-sort-top > .dropdown-sort-top-text')
            .html(val)
            .addClass('chosen');
  });

  $(document).click(function() {
    $('.dropdown-sort').removeClass('open');
  });

  $(document).on('click', '.dropdown-sort', function(e) {
    e.stopPropagation();
  });

    // catalog filters

  $('.catalog-filer__title').on('click', function() {
    $(this).toggleClass('active').next('.catalog-filter__body').slideToggle();
  });

  $('.cat-open').on('click', function() {
    $(this).toggleClass('show').closest('.has-children').toggleClass('active').find('ul').slideToggle();
  });

  $('.catalog-filters a').on('click', function() {
    $(this).toggleClass('current');
  });

  $('.catalog-btn__filters').click(function() {
    $('.mob-filters').addClass('active');
    $('body').addClass('filters-opened');
  });

  $('.catalog-btn__categories').click(function() {
    $('.mob-categories').addClass('active');
    $('body').addClass('filters-opened');
  });

  $(document).click(function() {
    $('.catalog-mob__filters').removeClass('active');
    $('body').removeClass('filters-opened');
  });

  $(document).on('click', '.catalog-mob__filters', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', '.catalog-btn__filters', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', '.catalog-btn__categories', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', '.mob-filters__close', function() {
    $('.catalog-mob__filters').removeClass('active');
    $('body').removeClass('filters-opened');
  });

  $(document).on('click', '.mob-categories .has-children.lvl1 > span', function() {
    $(this).next('.lvl2').addClass('active');
    $(this).parent().addClass('active');
  });

  $(document).on('click', '.mob-categories .go-back.l2', function() {
    $(this).closest('.lvl2').removeClass('active');
    $(this).parents('.has-children').removeClass('active');
  });

  $(document).on('click', '.mob-categories .has-children.lvl2 > span', function() {
    $(this).next('.lvl3').addClass('active');
    $(this).parent().addClass('active');
  });

  $(document).on('click', '.mob-categories .go-back.l3', function() {
    $(this).closest('.lvl3').removeClass('active');
    $(this).parents('.has-children').removeClass('active');
  });

  $(document).on('click', '.mob-categories .has-children.lvl3 > span', function() {
    $(this).next('.lvl4').addClass('active');
    $(this).parent().addClass('active');
  });

  $(document).on('click', '.mob-categories .go-back.l4', function() {
    $(this).closest('.lvl4').removeClass('active');
    $(this).parents('.has-children').removeClass('active');
  });

    // $('.popup-btn:not(.product-video, .catalog-filter__video-btn, .video-gallery__item)').magnificPopup({
    //   callbacks: {
    //     open: function() {
    //       $('.mfp-wrap').css('overflow', 'initial').removeAttr('tabindex');
    //     },
    //     beforeOpen: function() {
    //       $('body').addClass('mfp-open');
    //     },
    //     afterClose: function() {
    //       $('body').removeClass('mfp-open');
    //     }
    //   }
    // });

    // ===========================

  $('.header-mob__phone.show-phone').on('click', function() {
    $('body').toggleClass('show-tel');
  });

  $(document).click(function() {
    $('body').removeClass('show-tel');
  });

  $(document).on('click', '.header-mob__phones', function(e) {
    e.stopPropagation();
  });


    // mobile-menu
  $('.mobile-menu__list .has-children.lvl1 > span > i ').click(function() {
    $('body').addClass('mm-lvl2');
    $(this).parent().next('.mobile-menu__lvl2').addClass('show');
  });

  $('.mobile-menu__list .menu-back.lvl2').click(function() {
    $('body').removeClass('mm-lvl2');
    $('.mobile-menu__lvl2').removeClass('show');
  });

  $('.mobile-menu__list .has-children.lvl2 > span > i ').click(function() {
    $('body').addClass('mm-lvl3');
    $(this).parent().next('.mobile-menu__lvl3').addClass('show');
  });

  $('.mobile-menu__list .menu-back.lvl3').click(function() {
    $('body').removeClass('mm-lvl3');
    $('.mobile-menu__lvl3').removeClass('show');
  });

  $('.mobile-menu__list .has-children.lvl3 > span > i ').click(function() {
    $('body').addClass('mm-lvl4');
    $(this).parent().next('.mobile-menu__lvl4').addClass('show');
  });

  $('.mobile-menu__list .menu-back.lvl4').click(function() {
    $('body').removeClass('mm-lvl4');
    $('.mobile-menu__lvl4').removeClass('show');
  });

  $('.mobile-menu__list .has-submenu > span > i').click(function() {
    $(this).closest('li').toggleClass('active').find('ul').slideToggle();
  });


    // mobile btn
  $('.mobile-btn').on('click', function() {
    $(this).toggleClass('active');
    $('.mobile-menu').toggleClass('active');
    $('body').toggleClass('open-mobile-menu');
  });
  $('.mobile-btn.active').on('click', function() {
    $('body').removeClass('open-search-results');
    $('.header-search__wrapper').removeClass('focus');
  });

    // main menu
  $('.header-nav li.has-menu').on('mouseover', function() {
    $('body').addClass('open-menu');
  }).on('mouseout', function() {
    $('body').removeClass('open-menu');
  });

    // header menu
  $('.header-menu li.has-children').on('mouseover', function() {
    $('body').addClass('open-menu');
  }).on('mouseout', function() {
    $('body').removeClass('open-menu');
  });

    // slider counter

    // $('.counter-slider').each(function() {
    //   var $slider = $(this);
    //
    //   var currentSlide;
    //   var slidesCount;
    //   var sliderCounter = $slider.closest('.counter-slider__wrapper').find('.slider-counter');
    //   $(sliderCounter).html('<span>1</span>' + ' ' + '/' + ' ' + $slider.slick('getSlick').slideCount);
    //
    //   var updateSliderCounter = function(slick, currentIndex) {
    //     currentSlide = slick.slickCurrentSlide() + 1;
    //     slidesCount = $slider.slick('getSlick').slideCount;
    //     $(sliderCounter).html('<span>' + currentSlide + '</span> ' + '/' + ' ' + slidesCount);
    //   };
    //
    //   $slider.on('init', function(event, slick, slidesCount) {
    //     updateSliderCounter(slick, slidesCount);
    //   });
    //
    //   $slider.on('afterChange', function(event, slick, currentSlide) {
    //     updateSliderCounter(slick, currentSlide);
    //   });
    // });

    // truncate text

  $('.blog-main__item-description').succinct({
    size: 170
  });

    /*$('.reviews-item__text').succinct({
      size: 265
    });*/

    // fixed controls

  $(window).on('scroll', function() {
    var wh = $(window).height();
    if ($(this).scrollTop() > wh) {
      $('.fixed-controls').addClass('active');
    } else {
      $('.fixed-controls').removeClass('active');
    }
  });

    // video gallery
    // $('.video-popup').on('click', function(e) {
    //   $(this).find('img').hide();
    //   $(this).find('svg').hide();
    //   $(this).find('iframe').show();
    //   $(this).find('iframe')[0].src += '?autoplay=1';
    //   e.preventDefault();
    // });

    // photo slider navigation

//   $('.photo-slider').each(function() {
//     var $slider = $(this);
//
//     $slider.find('.slick-prev').append(`<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00089 3.99966C8.00089 4.13226 7.94822 4.25944 7.85445 4.35321C7.76068 4.44698 7.6335 4.49966 7.50089 4.49966H1.70789L3.85489 6.64566C3.90138 6.69214 3.93826 6.74733 3.96342 6.80807C3.98858 6.86881 4.00152 6.93391 4.00152 6.99966C4.00152 7.0654 3.98858 7.1305 3.96342 7.19124C3.93826 7.25198 3.90138 7.30717 3.85489 7.35366C3.80841 7.40014 3.75322 7.43702 3.69248 7.46218C3.63174 7.48734 3.56664 7.50029 3.50089 7.50029C3.43515 7.50029 3.37005 7.48734 3.30931 7.46218C3.24857 7.43702 3.19338 7.40014 3.14689 7.35366L0.146894 4.35366C0.100331 4.30721 0.0633875 4.25203 0.0381811 4.19129C0.0129746 4.13054 0 4.06542 0 3.99966C0 3.93389 0.0129746 3.86877 0.0381811 3.80802C0.0633875 3.74728 0.100331 3.6921 0.146894 3.64566L3.14689 0.645655C3.24078 0.551769 3.36812 0.499023 3.50089 0.499023C3.63367 0.499023 3.76101 0.551769 3.85489 0.645655C3.94878 0.739542 4.00152 0.866879 4.00152 0.999655C4.00152 1.13243 3.94878 1.25977 3.85489 1.35366L1.70789 3.49966H7.50089C7.6335 3.49966 7.76068 3.55233 7.85445 3.6461C7.94822 3.73987 8.00089 3.86705 8.00089 3.99966Z" fill="white"/>
// </svg>
// `);
//
//     $slider.find('.slick-next').append(`<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path fill-rule="evenodd" clip-rule="evenodd" d="M-0.000893899 4.00035C-0.00089391 3.86774 0.0517842 3.74056 0.145552 3.64679C0.23932 3.55302 0.366498 3.50035 0.499106 3.50035L6.29211 3.50034L4.14511 1.35435C4.09862 1.30786 4.06174 1.25267 4.03658 1.19193C4.01142 1.13119 3.99847 1.06609 3.99847 1.00035C3.99847 0.934601 4.01142 0.869501 4.03658 0.808761C4.06174 0.748022 4.09862 0.692833 4.14511 0.646345C4.19159 0.599857 4.24678 0.562981 4.30752 0.537822C4.36826 0.512663 4.43336 0.499714 4.49911 0.499714C4.56485 0.499714 4.62995 0.512663 4.69069 0.537822C4.75143 0.56298 4.80662 0.599857 4.85311 0.646345L7.85311 3.64634C7.89967 3.69279 7.93661 3.74797 7.96182 3.80871C7.98703 3.86946 8 3.93458 8 4.00034C8 4.06611 7.98703 4.13123 7.96182 4.19198C7.93661 4.25272 7.89967 4.3079 7.85311 4.35434L4.85311 7.35435C4.75922 7.44823 4.63188 7.50098 4.49911 7.50098C4.36633 7.50098 4.23899 7.44823 4.14511 7.35435C4.05122 7.26046 3.99848 7.13312 3.99848 7.00035C3.99848 6.86757 4.05122 6.74023 4.14511 6.64634L6.29211 4.50034L0.499106 4.50035C0.366498 4.50035 0.23932 4.44767 0.145552 4.3539C0.0517842 4.26013 -0.000893887 4.13295 -0.000893899 4.00035Z" fill="white"/>
// </svg>
// `);
//
//     $slider.closest('.counter-photo-slider__wrapper').find('.slider-next').click(function() {
//       $slider.slick('slickNext');
//     });
//
//     $slider.closest('.counter-photo-slider__wrapper').find('.slider-prev').click(function() {
//       $slider.slick('slickPrev');
//     });
//
//     var currentSlide;
//     var slidesCount;
//     var sliderCounter = $slider.closest('.counter-photo-slider__wrapper').find('.slider-counter');
//     $(sliderCounter).text('ФОТО ' + '1' + ' из ' + $slider.slick('getSlick').slideCount);
//
//     if ($slider.find('.slick-prev').hasClass('slick-disabled')) {
//       $slider.closest('.counter-photo-slider__wrapper').find('.slider-prev').addClass('slick-disabled');
//     } else {
//       $slider.closest('.counter-photo-slider__wrapper').find('.slider-prev').removeClass('slick-disabled');
//     }
//
//     if ($slider.find('.slick-next').hasClass('slick-disabled')) {
//       $slider.closest('.counter-photo-slider__wrapper').find('.slider-next').addClass('slick-disabled');
//     } else {
//       $slider.closest('.counter-photo-slider__wrapper').find('.slider-next').removeClass('slick-disabled');
//     }
//
//     var updateSliderCounter = function(slick, currentIndex) {
//       currentSlide = slick.slickCurrentSlide() + 1;
//       slidesCount = $slider.slick('getSlick').slideCount;
//       $(sliderCounter).text('Фото ' + currentSlide + ' из ' + slidesCount);
//     };
//
//     $slider.on('init', function(event, slick, slidesCount) {
//       updateSliderCounter(slick, slidesCount);
//     });
//
//
//     $slider.on('afterChange', function(event, slick, currentSlide) {
//       updateSliderCounter(slick, currentSlide);
//
//       if ($slider.find('.slick-prev').hasClass('slick-disabled')) {
//         $slider.closest('.counter-photo-slider__wrapper').find('.slider-prev').addClass('slick-disabled');
//       } else {
//         $slider.closest('.counter-photo-slider__wrapper').find('.slider-prev').removeClass('slick-disabled');
//       }
//
//       if ($slider.find('.slick-next').hasClass('slick-disabled')) {
//         $slider.closest('.counter-photo-slider__wrapper').find('.slider-next').addClass('slick-disabled');
//       } else {
//         $slider.closest('.counter-photo-slider__wrapper').find('.slider-next').removeClass('slick-disabled');
//       }
//     });
//   });
//
//   $('.popup-btn').on('click', function() {
//     $(window).trigger('resize');
//     $('.slick-slider').slick('setPosition');
//   });


    // chechout
    // chechout goods del

  // $('.checkout-goods__item-close').click(function() {
  //   $(this).closest('.checkout-goods__item').remove();
  // });
  //
  // $('.cart-popup__item-close').click(function() {
  //   $(this).closest('.cart-popup__item').remove();
  // });


    // chechout comment
  $('.chechout-comment').hide();
  $('.chechout-comment__btn').click(function() {
    $('.chechout-comment').slideToggle();
  });

    // chechout form
  $('.deliver-self').hide();
  $('.select.delivery').change(function() {
    var value = $(this).val(),

      $nova = $(this).closest('.chechout-form').find('.deliver.deliver-nova'),
      $self = $(this).closest('.chechout-form').find('.deliver.deliver-self');

    if (value == 'nova') {
      $nova.show();
    } else {
      $nova.hide();
    }

    if (value == 'self') {
      $self.show();
    } else {
      $self.hide();
    }
  });

  $('.obl.select').SumoSelect({
    search: true,
    searchText: '',
    noMatch: 'Не знайдено',
    forceCustomRendering: true
  });

    // header-search

  $('.header-search input[type="search"]').each(function() {
    if ($(this).val().length) {
      $('.header-search button').css('pointer-events', 'auto');
      $('.header-search .search-clear').css('display', 'flex');
    } else {
      $('.header-search button').css('pointer-events', 'none');
      $('.header-search .search-clear').css('display', 'none');
    }

    $(this).on('keyup', function() {
      if ($(this).val().length) {
        $('.header-search button').css('pointer-events', 'auto');
        $('.header-search .search-clear').css('display', 'flex');
      } else {
        $('.header-search button').css('pointer-events', 'none');
        $('.header-search .search-clear').css('display', 'none');
      }
    });
  });

  $('.header-search input[type="search"]').bind('keyup keypress', function(e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
      if ($(this).val() == '') {
        e.preventDefault();
        return false;
      }
    }
  });

  $('.header-search .search-clear').on('click', function() {
    $('.header-search input[type="search"]').val('');
    $(this).closest('.header-search__wrapper').removeClass('focus').removeClass('active');
    $('.header-search > .search-results').hide();
    $('body').removeClass('open-search-results');
    $(this).css('display', 'none');
  });

  $('.header-search input[type="search"]').on('keyup', function(e) {
    var $this = $(this);
    if ($this.val().length < 3) {
      $this.closest('.header-search__wrapper').removeClass('focus').removeClass('active');
      $('.header-search > .search-results').hide();
      $('body').removeClass('open-search-results');
    } else {
      $this.closest('.header-search__wrapper').addClass('focus').addClass('active');
      $('.header-search > .search-results').show();
      $('body').addClass('open-search-results');
    }
    $('.mobile-btn.active').on('click', function() {
      $('body').removeClass('open-search-results');
      $('.header-search__wrapper').removeClass('focus');
    });
  });

  $(document).click(function() {
    $('.header-search__wrapper').removeClass('show').removeClass('active');
    $('body').removeClass('mob-search').removeClass('mob-menu').removeClass('open-search-results');
    $('.header-search > .search-results').hide();
  });

  $(document).on('click', '.header-search__wrapper', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', '.header-search__wrapper .search-results', function(e) {
    e.stopPropagation();
  });

    // the input field
  var $input = $('.header-search input'),
    $content = $('.header-search .search-results'),
    $results,
    currentIndex = 0;

  $input.on('input', function() {
    var searchVal = this.value;
    $('.header-search .search-results li a').each(function() {
      $(this).find('span').bind('DOMSubtreeModified', function() {
        if ($(this).find('mark').length) {
          $(this).closest('li').addClass('show').closest('ul').addClass('highlighting-results');
        } else {
          $(this).closest('li').removeClass('show');
        }
      });
    });

    $content.unmark({
      done: function() {
        $content.mark(searchVal, {
          separateWordSearch: true,
          done: function() {
            $results = $content.find('mark');
            currentIndex = 0;
          }
        });
      }
    });
    if ($('.search-results > ul li.show').length) {
      $('.search-results > div > a').css('display', 'flex');
      $('.search-results > div > span').css('display', 'none');
    } else {
      $('.search-results > div > a').css('display', 'none');
      $('.search-results > div > span').css('display', 'flex');
    }
  });

    // product counter

  $('.product-counter input').each(function() {
    var input = $(this);
    var val = parseInt(input.val());
    var minus = $(this).parent().find('.minus');
    if (val > 1) {
      minus.removeClass('disabled');
    } else {
      minus.addClass('disabled');
    }
  });

  $('.plus').click(function() {
    var input = $(this).parent().find('input');
    var minus = $(this).parent().find('.minus');
    var val = parseInt(input.val());
    input.val(parseInt(input.val()) + 1).change();
    if (val > 0) {
      minus.removeClass('disabled');
    } else {
      minus.addClass('disabled');
    }
  });

  $('.minus').click(function() {
    var input = $(this).parent().find('input');
    var val = parseInt(input.val());
    if (val > 1) {
      val--;
    }
    if (val > 1) {
      $(this).removeClass('disabled');
    } else {
      $(this).addClass('disabled');
    }
    input.val(val).change();
  });

    // tabs

  $('.tabs').on('click', 'li:not(.active)', function() {
    $(this).addClass('active').siblings().removeClass('active')
            .closest('.tabs-wrapper').find('.tabs-content').removeClass('active').eq($(this).index()).addClass('active');
    $(window).trigger('resize');
    $('.slick-slider')[0].slick.refresh();
  });

    // product tabs

  $('.product-tabs__container .tabs').on('click', 'li:first-child', function() {
    $(this).closest('.product-tabs__container').animate({scrollLeft: 0}, 50);
  });

  $('.product-tabs__container .tabs').on('click', 'li:last-child', function() {
    var w = $('.product-tabs__container .tabs').width();
    $(this).closest('.product-tabs__container').animate({scrollLeft: w}, 50);
  });

  $('.customer-reviews__btn').on('click', function() {
    $('.customer-reviews__wrapper').slideUp();
    $('.product-tabs__wrapper .tabs li[data-tab="reviews"]').addClass('active').siblings().removeClass('active');
    $('.product-tabs__wrapper .tabs-content[data-content="reviews"]').addClass('active').siblings().removeClass('active');
  });

  $('.product-tabs__container .tabs').on('click', 'li:not([data-tab="reviews"])', function() {
    $('.customer-reviews__wrapper').slideDown();
  });

    // cart variations

  $('.cart-variation-current').on('click', function() {
    $(this).toggleClass('active');
  });

  $(document).click(function() {
    $('.cart-variation-current').removeClass('active');
  });

  $(document).on('click', '.cart-variations > div', function(e) {
    e.stopPropagation();
  });

  $('.cart-variations-list > li').on('click', function() {
    var color = $(this).data('color');
    $(this).closest('.cart-variations')
            .find('.cart-variation-current').removeClass('active')
            .find('span').html(color);
  });

    // remove from cart

  $('.cart-item-remove').on('click', function() {
    var $item = $(this).closest('.cart-item');
    swal({
      title: 'Would you like to remove this item from the shopping cart?',
      showCancelButton: true,
      confirmButtonText: 'Ok',
    }).then(
            function() {
              $item.remove();
            });
  });

    // upload filed

  $('#files').on('change', function(e) {
    var filesExt = ['jpeg', 'jpg', 'bmp', 'gif', 'png'];
    var parts = $(this).val().split('.');
    var files = e.target.files,
      filesLength = files.length;
    for (var i = 0; i < filesLength; i++) {
      var f = files[i];
      var fileReader = new FileReader();
      fileReader.onload = (function(e) {
        var file = e.target;

        if (filesExt.join().search(parts[parts.length - 1]) != -1) {
          $('.uploaded-error').removeClass('active');
          $('.uploaded-files').append("<span class='file-preview'>" +
                        "<img class='thumb' src='" + e.target.result + "' title='" + f.name + "'/>" +
                        "<span class='file-name'>" + f.name + '</span>' +
                        "<span class='remove-file'><svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>\n" +
                        "                                <circle cx='7.5' cy='7.5' r='7' stroke='#1C3557'/>\n" +
                        '                                <path\n' +
                        "                                    d='M9.94207 5.93151L8.32332 7.55026L9.94207 9.16901C10.1535 9.38047 10.1535 9.73047 9.94207 9.94193C9.8327 10.0513 9.69416 10.1023 9.55562 10.1023C9.41707 10.1023 9.27853 10.0513 9.16916 9.94193L7.55041 8.32318L5.93166 9.94193C5.82228 10.0513 5.68374 10.1023 5.5452 10.1023C5.40666 10.1023 5.26812 10.0513 5.15874 9.94193C5.05704 9.83901 5 9.70016 5 9.55547C5 9.41078 5.05704 9.27192 5.15874 9.16901L6.77749 7.55026L5.15874 5.93151C4.94728 5.72005 4.94728 5.37005 5.15874 5.15859C5.3702 4.94714 5.7202 4.94714 5.93166 5.15859L7.55041 6.77734L9.16916 5.15859C9.38062 4.94714 9.73062 4.94714 9.94207 5.15859C10.1535 5.37005 10.1535 5.72005 9.94207 5.93151Z'\n" +
                        "                                    fill='#1C3557'/>\n" +
                        '                            </svg></span>' +
                        '</span>');
        }
        else {
          $('.uploaded-error').addClass('active');
          setTimeout(function() {
            $('.uploaded-error').hide('300');
          }, 5000);
          setTimeout(function() {
            $('.uploaded-error').removeClass('active').removeAttr('style');
          }, 5300);
        }
        $('.remove-file').click(function() {
          $(this).parent('.file-preview').remove();
        });
      });
      fileReader.readAsDataURL(f);
    }
    console.log(files);
  });

    // select

  $('.select').SumoSelect({
    forceCustomRendering: true
  });

  $('.search-select').SumoSelect({
    search: true,
    searchText: '',
    noMatch: 'Nothing found',
    forceCustomRendering: true
  });

    $('.search-select').on('sumo:opening', function () {
        $(this).closest('.input-wrapper').addClass('open');
    });
    $('.search-select').on('sumo:closing', function () {
        $(this).closest('.input-wrapper').removeClass('open');
    });

  $('.select, .search-select').change(function() {
      var val = $(this).val();
      if (!$(this).val() == ''){
          $(this).closest('.input-wrapper').removeClass('error').addClass('active').find('.input').val(val);
          $(this).closest('.input-wrapper').find('label.error').remove();
      }
  });

  // checkout mobile view

    $('.checkout-head__mob').on('click', function() {
        $(this).toggleClass('active');
        $('.checkout-right').slideToggle();
    });

    // lazy load
  var lazyload = function() {
    var scroll = $(window).scrollTop() + $(window).height() * 3;

    $('.lazy').each(function() {
      var $this = $(this);
      if ($this.offset().top < scroll) {
        $this.attr('src', $(this).data('original'));
      }
    });
    $('.lazy-web').each(function() {
      var $this = $(this);
      if ($this.offset().top < scroll) {
        $this.attr('srcset', $(this).data('original'));
      }
    });
  };
  $(window).scroll(lazyload);
});

