
function validName() {
    const nameInput = document.getElementById("name");
    const errorName = document.getElementById("errorName");
    
    if (nameInput.value === "") {
      errorName.textContent = "Por favor ingrese su nombre.";
      return false;
    } else {
      errorName.textContent = "";
      return true;
    }
  }
  
  // Función de validación para el campo email
  function validEmail() {
    const emailInput = document.getElementById("email");
    const errorEmail = document.getElementById("errorEmail");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailInput.value === "") {
      errorEmail.textContent = "Por favor ingrese su correo electrónico.";
      return false;
    } else if (!emailRegex.test(emailInput.value)) {
      errorEmail.textContent = "Por favor ingrese un correo electrónico válido.";
      return false;
    } else {
      errorEmail.textContent = "";
      return true;
    }
  }
  
  // Agregar evento al formulario
  const formulario = document.getElementById("miForm");
  formulario.addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe
    
    // Validar campos
    const esValidoNombre = validName();
    const esValidoEmail = validEmail();
    
    // Si hay algún error, mostrar mensaje y evitar envío
    if (!esValidoNombre || !esValidoEmail) {
        Swal.fire({
            icon: 'error',
            title: 'Revisa los errores al completar tu compra en tu compra',
            
            
          })
      return false;
    }
    
    // Si no hay errores, enviar formulario
    formulario.submit();
    
  });
  