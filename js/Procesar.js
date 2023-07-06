$(document).ready(function() {
    $("#formulario_mediciones").submit(function(event) {
        event.preventDefault(); // prevenir el envío del formulario
        var pozo = $("#pozo").val();
        var valor_psi = $("#valor_psi").val();
        var fecha_hora = $("#fecha_hora").val();
        $.ajax({
            type: "POST",
            url: "procesar.php",
            data: {
                pozo: pozo,
                valor_psi: valor_psi,
                fecha_hora: fecha_hora
            },
            success: function(resultado) {
                $("#mensaje").html(resultado);
                $("#formulario_mediciones")[0].reset();
            }
        });
        return false; // evitar que se propague el evento submit
    });
});