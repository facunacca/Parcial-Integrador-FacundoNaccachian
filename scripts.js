function aplicarModo(modo) {
  if (modo === 'oscuro') {
    $('body').removeClass('modo_claro').addClass('modo_oscuro');
  } else {
    $('body').removeClass('modo_oscuro').addClass('modo_claro');
  }
  localStorage.setItem('modo_ficha', modo);
}

function limpiarErrores() {
  $('.texto_error').text('');
  $('.entrada_texto').removeClass('campo_error');
}

function validarFormulario() {
  limpiarErrores();

  var nombre = $('#campo_nombre').val().trim();
  var edad = $('#campo_edad').val().trim();
  var email = $('#campo_email').val().trim();
  var comentario = $('#campo_comentario').val().trim();

  var hayErrores = false;

  if (nombre.length < 2) {
    $('#error_nombre').text('Ingresá tu nombre y apellido.');
    $('#campo_nombre').addClass('campo_error');
    hayErrores = true;
  }

  if (edad === '') {
    $('#error_edad').text('Ingresá tu edad.');
    $('#campo_edad').addClass('campo_error');
    hayErrores = true;
  } else if (isNaN(edad) || edad < 18 || edad > 99) {
    $('#error_edad').text('La edad debe ser un número entre 18 y 99.');
    $('#campo_edad').addClass('campo_error');
    hayErrores = true;
  }

  if (email === '') {
    $('#error_email').text('Ingresá tu email.');
    $('#campo_email').addClass('campo_error');
    hayErrores = true;
  } else if (!email.includes('@') || !email.includes('.')) {
    $('#error_email').text('El email no parece válido.');
    $('#campo_email').addClass('campo_error');
    hayErrores = true;
  }

  if (comentario.length < 5) {
    $('#error_comentario').text('Escribí un comentario (mínimo 5 caracteres).');
    $('#campo_comentario').addClass('campo_error');
    hayErrores = true;
  }

  return !hayErrores;
}

$(function () {
  var guardado = localStorage.getItem('modo_ficha');
  if (guardado === 'oscuro') {
    aplicarModo('oscuro');
  } else {
    aplicarModo('claro');
  }

  $('#boton_modo').on('click', function () {
    if ($('body').hasClass('modo_oscuro')) {
      aplicarModo('claro');
    } else {
      aplicarModo('oscuro');
    }
  });

  if ($('#form_contacto').length > 0) {

    $('#form_contacto').on('submit', function (evento) {
      evento.preventDefault();

      var esValido = validarFormulario();

      if (esValido) {
        alert('Mensaje enviado correctamente.');
        this.reset();
      }
    });

    $('#boton_borrar').on('click', function () {
      $('#form_contacto')[0].reset();
      limpiarErrores();
    });
  }
});
