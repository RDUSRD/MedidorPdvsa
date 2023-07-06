$(document).ready(function () {
  $("#formulario_fechas").submit(function (event) {
    event.preventDefault(); // prevenir el envío del formulario
    var fecha_inicio = $("#fecha_inicio").val();
    var fecha_fin = $("#fecha_fin").val();
    $.ajax({
      type: "POST",
      url: "obtener_datos.php",
      data: {
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin,
      },
      success: function (datos) {
        // Parsear los datos JSON recibidos de la página obtener_datos.php
        var datos_json = datos;

        // Crear arrays para almacenar los valores de las mediciones y las fechas
        var valores_psi = [];
        var fechas = [];

        // Llenar los arrays con los datos recibidos
        for (var i = 0; i < datos_json.length; i++) {
          valores_psi.push(datos_json[i].valor_psi);
          fechas.push(datos_json[i].fecha_hora);
        }

        // Generar la gráfica con los datos recibidos
        var grafica_mediciones = new Chart($("#grafica_mediciones"), {
          type: "line",
          data: {
            labels: fechas,
            datasets: [
              {
                label: "Mediciones de valvulas PSI",
                data: valores_psi,
                borderColor: "rgb(75, 192, 192)",
                fill: false,
              },
            ],
          },
        });

        // Limpiar la tabla de mediciones anterior
        $("#tabla_mediciones tbody").empty();

        // Llenar la tabla con los datos recibidos
        for (var i = 0; i < datos_json.length; i++) {
          $("#tabla_mediciones tbody").append(
            "<tr><td>" +
              datos_json[i].pozo +
              "</td><td>" +
              datos_json[i].valor_psi +
              "</td><td>" +
              datos_json[i].fecha_hora +
              "</td></tr>"
          );
        }
      },
    });
  });
});
