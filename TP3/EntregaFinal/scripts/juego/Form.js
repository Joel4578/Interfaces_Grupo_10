//controlo que no se pueda seleccionar la ficha con el mismo personaje
document.addEventListener("DOMContentLoaded", function() {
  const radiosGrupo1 = document.querySelectorAll('input[name="grupo1"]');
  const radiosGrupo2 = document.querySelectorAll('input[name="grupo2"]');

  radiosGrupo1.forEach(function(radio1) {
    radio1.addEventListener("change", function() {
      if (this.checked) {
        radiosGrupo2.forEach(function(radio2) {
          if (radio2.value === radio1.value) {
            radio2.disabled = true;
          }else{
              radio2.disabled = false;
          }
        });
      }
    });
  });

  radiosGrupo2.forEach(function(radio2) {
    radio2.addEventListener("change", function() {
      if (this.checked) {
        radiosGrupo1.forEach(function(radio1) {
          if (radio1.value === radio2.value) {
            radio1.disabled = true;
          }else{
              radio1.disabled = false;
          }
        });
      }
    });
  });  
});

  