// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('./assets/templates/layouts/index.html');
    require('./assets/templates/layouts/blog.html');
    require('./assets/templates/layouts/blog-article.html');
  require('./assets/templates/layouts/catalog.html');
  require('./assets/templates/layouts/catalog-checked-filters.html');
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
  require('./assets/templates/layouts/warranty.html');
  require('./assets/templates/layouts/delivery-payment.html');
  require('./assets/templates/layouts/return.html');
  require('./assets/templates/layouts/checkout.html');
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
require('_modules/succinct/succinct');
require('../node_modules/ion-rangeslider/js/ion.rangeSlider');

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

  $(window).resize(function() {
    setTimeout(function() {
      $('.slick-slider').slick('setPosition');
    }, 100);
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

    $('.input, .textarea').on('focus', function () {
        $(this).closest('.input-wrapper').addClass('focus');
    });
    $('.input, .textarea').on('focusout', function () {
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

    $('.blog-mob__filters-main').on('click', function () {
        $(this).closest('.blog-mob__filters').toggleClass('active');
    });

    $(document).click(function () {
        $('.blog-mob__filters').removeClass('active');
    });

    $(document).on('click', '.blog-mob__filters', function (e) {
        e.stopPropagation();
    });

  $('.popup-btn:not(.product-video, .catalog-filter__video-btn, .video-gallery__item)').magnificPopup({
    callbacks: {
      open: function() {
        $('.mfp-wrap').css('overflow', 'initial').removeAttr('tabindex');
      },
      beforeOpen: function() {
        $('body').addClass('mfp-open');
      },
      afterClose: function() {
        $('body').removeClass('mfp-open');
      }
    }
  });

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

  $('.counter-slider').each(function() {
    var $slider = $(this);

    var currentSlide;
    var slidesCount;
    var sliderCounter = $slider.closest('.counter-slider__wrapper').find('.slider-counter');
    $(sliderCounter).html('<span>1</span>' + ' ' + '/' + ' ' + $slider.slick('getSlick').slideCount);

    var updateSliderCounter = function(slick, currentIndex) {
      currentSlide = slick.slickCurrentSlide() + 1;
      slidesCount = $slider.slick('getSlick').slideCount;
      $(sliderCounter).html('<span>' + currentSlide + '</span> ' + '/' + ' ' + slidesCount);
    };

    $slider.on('init', function(event, slick, slidesCount) {
      updateSliderCounter(slick, slidesCount);
    });

    $slider.on('afterChange', function(event, slick, currentSlide) {
      updateSliderCounter(slick, currentSlide);
    });
  });

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
    }
    else {
      $('.fixed-controls').removeClass('active');
    }
  });

    // video gallery
  $('.video-popup').on('click', function(e) {
    $(this).find('img').hide();
    $(this).find('svg').hide();
    $(this).find('iframe').show();
    $(this).find('iframe')[0].src += '?autoplay=1';
    e.preventDefault();
  });

    // photo slider navigation

  $('.photo-slider').each(function() {
    var $slider = $(this);

    $slider.find('.slick-prev').append(`<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.00089 3.99966C8.00089 4.13226 7.94822 4.25944 7.85445 4.35321C7.76068 4.44698 7.6335 4.49966 7.50089 4.49966H1.70789L3.85489 6.64566C3.90138 6.69214 3.93826 6.74733 3.96342 6.80807C3.98858 6.86881 4.00152 6.93391 4.00152 6.99966C4.00152 7.0654 3.98858 7.1305 3.96342 7.19124C3.93826 7.25198 3.90138 7.30717 3.85489 7.35366C3.80841 7.40014 3.75322 7.43702 3.69248 7.46218C3.63174 7.48734 3.56664 7.50029 3.50089 7.50029C3.43515 7.50029 3.37005 7.48734 3.30931 7.46218C3.24857 7.43702 3.19338 7.40014 3.14689 7.35366L0.146894 4.35366C0.100331 4.30721 0.0633875 4.25203 0.0381811 4.19129C0.0129746 4.13054 0 4.06542 0 3.99966C0 3.93389 0.0129746 3.86877 0.0381811 3.80802C0.0633875 3.74728 0.100331 3.6921 0.146894 3.64566L3.14689 0.645655C3.24078 0.551769 3.36812 0.499023 3.50089 0.499023C3.63367 0.499023 3.76101 0.551769 3.85489 0.645655C3.94878 0.739542 4.00152 0.866879 4.00152 0.999655C4.00152 1.13243 3.94878 1.25977 3.85489 1.35366L1.70789 3.49966H7.50089C7.6335 3.49966 7.76068 3.55233 7.85445 3.6461C7.94822 3.73987 8.00089 3.86705 8.00089 3.99966Z" fill="white"/>
</svg>
`);

    $slider.find('.slick-next').append(`<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M-0.000893899 4.00035C-0.00089391 3.86774 0.0517842 3.74056 0.145552 3.64679C0.23932 3.55302 0.366498 3.50035 0.499106 3.50035L6.29211 3.50034L4.14511 1.35435C4.09862 1.30786 4.06174 1.25267 4.03658 1.19193C4.01142 1.13119 3.99847 1.06609 3.99847 1.00035C3.99847 0.934601 4.01142 0.869501 4.03658 0.808761C4.06174 0.748022 4.09862 0.692833 4.14511 0.646345C4.19159 0.599857 4.24678 0.562981 4.30752 0.537822C4.36826 0.512663 4.43336 0.499714 4.49911 0.499714C4.56485 0.499714 4.62995 0.512663 4.69069 0.537822C4.75143 0.56298 4.80662 0.599857 4.85311 0.646345L7.85311 3.64634C7.89967 3.69279 7.93661 3.74797 7.96182 3.80871C7.98703 3.86946 8 3.93458 8 4.00034C8 4.06611 7.98703 4.13123 7.96182 4.19198C7.93661 4.25272 7.89967 4.3079 7.85311 4.35434L4.85311 7.35435C4.75922 7.44823 4.63188 7.50098 4.49911 7.50098C4.36633 7.50098 4.23899 7.44823 4.14511 7.35435C4.05122 7.26046 3.99848 7.13312 3.99848 7.00035C3.99848 6.86757 4.05122 6.74023 4.14511 6.64634L6.29211 4.50034L0.499106 4.50035C0.366498 4.50035 0.23932 4.44767 0.145552 4.3539C0.0517842 4.26013 -0.000893887 4.13295 -0.000893899 4.00035Z" fill="white"/>
</svg>
`);

    $slider.closest('.counter-photo-slider__wrapper').find('.slider-next').click(function() {
      $slider.slick('slickNext');
    });

    $slider.closest('.counter-photo-slider__wrapper').find('.slider-prev').click(function() {
      $slider.slick('slickPrev');
    });

    var currentSlide;
    var slidesCount;
    var sliderCounter = $slider.closest('.counter-photo-slider__wrapper').find('.slider-counter');
    $(sliderCounter).text('ФОТО ' + '1' + ' из ' + $slider.slick('getSlick').slideCount);

    if ($slider.find('.slick-prev').hasClass('slick-disabled')) {
      $slider.closest('.counter-photo-slider__wrapper').find('.slider-prev').addClass('slick-disabled');
    } else {
      $slider.closest('.counter-photo-slider__wrapper').find('.slider-prev').removeClass('slick-disabled');
    }

    if ($slider.find('.slick-next').hasClass('slick-disabled')) {
      $slider.closest('.counter-photo-slider__wrapper').find('.slider-next').addClass('slick-disabled');
    } else {
      $slider.closest('.counter-photo-slider__wrapper').find('.slider-next').removeClass('slick-disabled');
    }

    var updateSliderCounter = function(slick, currentIndex) {
      currentSlide = slick.slickCurrentSlide() + 1;
      slidesCount = $slider.slick('getSlick').slideCount;
      $(sliderCounter).text('Фото ' + currentSlide + ' из ' + slidesCount);
    };

    $slider.on('init', function(event, slick, slidesCount) {
      updateSliderCounter(slick, slidesCount);
    });


    $slider.on('afterChange', function(event, slick, currentSlide) {
      updateSliderCounter(slick, currentSlide);

      if ($slider.find('.slick-prev').hasClass('slick-disabled')) {
        $slider.closest('.counter-photo-slider__wrapper').find('.slider-prev').addClass('slick-disabled');
      } else {
        $slider.closest('.counter-photo-slider__wrapper').find('.slider-prev').removeClass('slick-disabled');
      }

      if ($slider.find('.slick-next').hasClass('slick-disabled')) {
        $slider.closest('.counter-photo-slider__wrapper').find('.slider-next').addClass('slick-disabled');
      } else {
        $slider.closest('.counter-photo-slider__wrapper').find('.slider-next').removeClass('slick-disabled');
      }
    });
  });

  $('.popup-btn').on('click', function() {
    $(window).trigger('resize');
    $('.slick-slider').slick('setPosition');
  });


    // chechout
    // chechout goods del

  $('.checkout-goods__item-close').click(function() {
    $(this).closest('.checkout-goods__item').remove();
  });

  $('.cart-popup__item-close').click(function() {
    $(this).closest('.cart-popup__item').remove();
  });


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

    // reviews
  $('.page-reviews__top-form').css('display', 'none');
  $('.page-reviews__top-btn').click(function() {
    $(this).toggleClass('active').closest('.page-reviews__top-wrapper').next().slideToggle();
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

  $('.plus').click(function() {
    var input = $(this).parent().find('input');
    input.val(parseInt(input.val()) + 1).change();
  });

  $('.minus').click(function() {
    var input = $(this).parent().find('input');
    var val = parseInt(input.val());
    if (val > 1) {
      val--;
    }
    input.val(val).change();
  });

    // tabs

  $('.tabs').on('click', 'li:not(.active)', function() {
    $(this).addClass('active').siblings().removeClass('active')
            .closest('.tabs-wrapper').find('.tabs-content').removeClass('active').eq($(this).index()).addClass('active');
    $(window).trigger('resize');
    $('.slick-slider').slick('setPosition');
  });

  $('.product-tabs__container .tabs').on('click', 'li:first-child', function() {
    $(this).closest('.product-tabs__container').animate({scrollLeft: 0}, 50);
  });

  $('.product-tabs__container .tabs').on('click', 'li:last-child', function() {
    var w = $('.product-tabs__container .tabs').width();
    $(this).closest('.product-tabs__container').animate({scrollLeft: w}, 50);
  });

    // catalog filters

  $('.catalog-filer__title').on('click', function() {
    $(this).toggleClass('active').next('.catalog-filter__body').slideToggle();
  });

  $('.cat-open').on('click', function() {
    $(this).toggleClass('show').closest('.has-children').toggleClass('active').find('ul').slideToggle();
  });

    // catalog range

  var $range = $('.js-range-slider'),
    $inputFrom = $('.js-input-from'),
    $inputTo = $('.js-input-to'),
    instance,
    min = 5489,
    max = 4535767,
    from = 5489,
    to = 4535767;

  $range.ionRangeSlider({
    skin: 'round',
    type: 'double',
    min: min,
    max: max,
    from: 5489,
    to: 4535767,
    onStart: updateInputs,
    onChange: updateInputs
  });
  instance = $range.data('ionRangeSlider');

  function updateInputs(data) {
    from = data.from;
    to = data.to;

    $inputFrom.prop('value', Math.floor(from));
    $inputTo.prop('value', Math.floor(to));
  }

  $inputFrom.on('input', function() {
    var val = $(this).prop('value');

        // validate
    if (val < min) {
      val = min;
    } else if (val > to) {
      val = to;
    }

    instance.update({
      from: val
    });
  });

  $inputTo.on('input', function() {
    var val = $(this).prop('value');

        // validate
    if (val < from) {
      val = from;
    } else if (val > max) {
      val = max;
    }

    instance.update({
      to: val
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

    // select

  $('.select').SumoSelect({
    forceCustomRendering: true
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

