$().ready(function() {
    
    $('#loginForm').change(function() {
        if($('#IDuser').val() !== '' && $('#IDpassword').val() !== '') {
            $("#loginButton").removeAttr("disabled");          
        } else {
            $("#loginButton").attr("disabled", "disabled");
        }
    });
    
    $("#loginButton").click(() => {
        var myUser = $('#IDuser').val();
        var myPassword = $('#IDpassword').val();
        var urlUser = "http://fenw.etsisi.upm.es:5555/users/" + myUser;
        var urlLogin = "http://fenw.etsisi.upm.es:5555/users/login?username=" + myUser + "&password=" + myPassword;   // HOME
        // var urlLogin = "http://fenw.etsisi.upm.es:1723/users/login?username=" + myUser + "&password=" + myPassword;      // ETSISI
        
        $.ajax({
            beforeSend: () => {
                $('#loader').css('visibility','visible');
                $('.userError').addClass('displayNone');                
                $('.serverError').addClass('displayNone');                
            },
            url: urlUser,
            statusCode: {
                200: function() {
                    $.ajax({
                        beforeSend: () => { 
                            $('#loader').css('visibility','visible');
                            $('.loginError').addClass('displayNone');
                        },
                        url: urlLogin,
                        success: (data, textStatus, request) => { 
                            userToken = request.getResponseHeader('Authorization');
                            sessionStorage.setItem('Authorization', userToken);
                            
                            $('#ref-login').css('display','none'); 
                            $('#ref-registro').css('display','none'); 
                            $('#ref-logout').css('display','block'); 
            
                            $('.section-container').load('../pages/reservas.html');
                        },
                        error: (error) => { 
                            $('.loginError').removeClass('displayNone');
                        },
                        complete: () => { 
                            $('#loader').css('visibility','hidden');
                        }
                    });
                },
                404: function() {
                    $('.userError').removeClass('displayNone');
                },               
                500: function() {
                    $('.serverError').removeClass('displayNone');
                },           
            },
            complete: () => {
                $('#loader').css('visibility','hidden');
            }
        });

    });

    while (sessionStorage.getItem('Authorization')) {
        $('#ref-login').css('display','none'); 
        $('#ref-registro').css('display','none'); 
        $('#ref-logout').css('display','block');
    }
    
    $("#ref-logout").click(() => {
        sessionStorage.clear();
        $('#ref-login').css('display','block'); 
        $('#ref-registro').css('display','block'); 
        $('#ref-logout').css('display','none'); 
        $('.section-container').load('../pages/inicio.html');
    });

});