$(function () {
    // optimizar esto 

    $('#btnSearch').click(() => {
        // lenght para numeros y sin lenght el txt introducido
        if (!$('#txtSearch').val().length == 0) {

            const id = $('#txtSearch').val();
            const action = 'searchContact';
            var dataContact = "";
            $('#txtSearch').val("");
            $.ajax({
                url: 'ajaxData.php',
                type: "POST",
                async: true,
                data: {
                    action: action,
                    id: id
                },
                beforeSend: function () {

                },
                success: function (resp) {
                    if (resp == 'notData') {
                        dataContact = "No hay registros";
                    } else {
                        // console.log(JSON.parse(resp));
                        var info = $.parseJSON(resp);
                        dataContact = `
                        <tr>
                            <th scope="row">${info.id}</th>
                            <th>${info.nombre}</th>
                            <th>${info.apellido}</th>
                            <th>${info.telefono}</th>
                            <th>${info.email}</th>
                        </tr>
                        `;
                    }
                    $('#rowsContact').html(dataContact);


                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
    });


    $('#txtSearch').keyup(function () {
        // console.log($('#txtSearch').val());
        const dataSearch = $('#txtSearch').val();
        const action = 'searchContactKey';
        var dataContact = "";
        // $('#txtSearch').val("");
        $.ajax({
            url: 'ajaxData.php',
            type: "POST",
            async: true,
            data: {
                action: action,
                dataSearch: dataSearch
            },
            beforeSend: function () {

            },
            success: function (response) {
                if (response == 'notData') {
                    dataContact = "No hay registros";
                } else {
                    // console.log(JSON.parse(resp));
                    var info = JSON.parse(response);
                    dataContact = info;
                }
                $('#rowsContact').html(dataContact);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

});