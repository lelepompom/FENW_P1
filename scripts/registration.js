$().ready(function() {
    
    $('#registrationForm').change(function() {
        if($('#IDnewPassword').val() !== $('#IDrepeatPassword').val()) {
            $("#registrationButton").attr("disabled", "disabled");
            $('.samePasswordError').removeClass('displayNone');
        } else {
            $("#registrationButton").removeAttr("disabled");          
            $('.samePasswordError').addClass('displayNone');
        }
    });

    $("#registrationButton").click(() => {
        var newUser = $('#IDnewUser').val();
        var newEmail = $('#IDnewEmail').val();
        var newPassword = $('#IDnewPassword').val();
        var newBirthday = $('#IDnewBirthday').val();

        var urlNewUser = "http://fenw.etsisi.upm.es:5555/users";

        $.ajax({
            beforeSend: () => {
                $('#loader').css('visibility','visible');
                $('.userRegistered').addClass('displayNone');                
                $('.userDuplicated').addClass('displayNone');                
                $('.internalError').addClass('displayNone');                
            },
            url: urlNewUser,
            type: "POST",
            data: ({username:newUser, email:newEmail, password:newPassword, birthdate:newBirthday}),
            statusCode: {
                
                201: function() {
                    $('.userRegistered').removeClass('displayNone');
                },                
                409: function() {
                    $('.userDuplicated').removeClass('displayNone');
                },                
                500: function() {
                    $('.internalError').removeClass('displayNone');
                },
            
            },
            complete: () => {
                $('#loader').css('visibility','hidden');
            }
        });


    });

});
