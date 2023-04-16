const $form = document.getElementById("form")


$form.addEventListener('submit', (e)=>{
    e.preventDefault()
    Swal.fire(
        'Good job!',
        'Your inquiry was successfully sent!',
        'success',      
    )
    $form.reset()
})


