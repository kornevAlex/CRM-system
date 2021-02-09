window.addEventListener('load', function () {
  $(".modal").each(function () {
    $(this).wrap('<div class="overlay"></div>')
  });

  $(".addClient").on('click', function (e) {
    e.stopImmediatePropagation;
    var $this = $(this),
      modal = $($this).data("modal");
    localStorage.removeItem('id')
    $('.content__title')[0].innerHTML = `Новый клиент`
    $(modal).parents(".overlay").addClass("open");
    $('#btn__bifacial').removeClass('delete__clients')
    $('#btn__bifacial').addClass('form__close')
    $('#btn__bifacial')[0].innerHTML = 'Отмена'
    setTimeout(function () {
      $(modal).addClass("open");
    }, 350);

  });

  $(".modal__close").on('click', function (e) {
    e.stopImmediatePropagation;
    var $this = $(this),
      modal = $($this).data("modal");
    $(modal).removeClass("open");
    setTimeout(() => {
      $('.add__contact__field').remove()
      $('.form__contact')[0].style.height = '35px'
    }, 350)

    setTimeout(function () {
      $(modal).parents(".overlay").removeClass("open");
    }, 350);

  });

  $(".form__close").on('click', function (e) {
    e.stopImmediatePropagation;
    var $this = $(this),
      modal = $($this).data("modal");

    $(modal).removeClass("open");
    setTimeout(function () {
      $(modal).parents(".overlay").removeClass("open");
    }, 350);
  });

  $(".form__cancel").on('click', function (e) {
    e.stopImmediatePropagation;
    var $this = $(this),
      modal = $($this).data("modal");

    $(modal).removeClass("open");
    setTimeout(function () {
      $(modal).parents(".overlay").removeClass("open");
    }, 350);
  });
})