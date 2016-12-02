/**
 * Created by hamid on 12/1/16.
 */
$(function () {
    var inp = $('input');
    //var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    var regex = new RegExp("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$");
    inp.keypress(function () {
        setTimeout(function() {
            var dInput = inp.val();
            console.log(dInput);

            if(regex.test(dInput)){
                console.log("Successful match");
                if (dInput.substr(0,3) === 'www') dInput = 'https://' + dInput;
                var request = $.ajax({
                    url: '/request',
                    method: "POST",
                    data: { url : dInput },
                    dataType: "html",
                    success: function(response){
                        var arr = JSON.parse(response).data.split('"');
                        var img = arr[arr.indexOf('og:image')+2] || arr[arr.indexOf('twitter:image')+2] ;
                        if (img != null && img!= "")
                            $('img').attr('src', img);
                        var title = arr[arr.indexOf('og:title')+2] || arr[arr.indexOf('twitter:image')+2] ;
                        $('#title').html(title);
                        var desc = arr[arr.indexOf('og:description')+2] || arr[arr.indexOf('twitter:description')+2];
                        $('#description').html(desc);
                    },
                    error: function(response) {
                        console.log(response);
                    }
                });
            }
        }, 0);
    });
});