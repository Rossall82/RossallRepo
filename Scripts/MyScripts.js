$(document).ready(function() {

    $("#btnSubmit").on("click", function() {

        // Add email to xml
        var text = $('#txtEmail').val();

        xmlDoc = loadXMLDoc("EmailAddresses.xml");

        newel = xmlDoc.createElement("address");
        newtext = xmlDoc.createTextNode(text);
        newel.appendChild(newtext);

        x = xmlDoc.getElementsByTagName("address")[0];
        x.appendChild(newel);

        // Read email addresses from xml
        $.get('EmailAddresses.xml', function (d) {
            $('body').append('<p> Thanks!</p>');
            $('body').append('<dl />');

            $(d).find('address').each(function () {

                var $address = $(this);
                var title = $address.attr("text");
                var description = $address.find('name').text();

                var html = '<dd> <span class="loadingPic" alt="Loading" />';
                html += '<p class="title">' + title + '</p>';
                html += '<p> ' + description + '</p>';
                html += '</dd>';

                $('dl').append($(html));

                $('#emailShiz').fadeOut(1900);
            });
        });

    });

});

function loadXMLDoc(filename) {
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else // code for IE5 and IE6
    {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", filename, false);
    xhttp.send();
    return xhttp.responseXML;
}