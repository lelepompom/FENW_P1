$().ready(function() {
    $('.section-container').load('../pages/inicio.html');

    $('#ref-inicio').click(() => {
        $('.section-container').load('../pages/inicio.html');
    });

    $('#ref-instalaciones').click(() => {
        $('.section-container').load('../pages/instalaciones.html');
    });

    $('#ref-servicios').click(() => {
        $('.section-container').load('../pages/servicios.html');
    });

    $('#ref-reservas').click(() => {
        if (sessionStorage.getItem('Authorization')) {
            $('.section-container').load('../pages/reservas.html');
        } else {
            $('.section-container').html('<div class="alert alert-warning" role="alert">Inicie sesión para acceder a la reservas de pista.</div>');
        }
    });

    $('#reservasLink').click(() => {
        $('.section-container').load('../pages/reservas.html');
    });

    $('#ref-registro').click(() => {
        $('.section-container').load('../pages/registro.html');
    });

    $('#ref-login').click(() => {
        $('.section-container').load('../pages/login.html');
    });

    $('.nav-item').click(() => {
        $('.navbar-collapse').removeClass('in');
    });
});
