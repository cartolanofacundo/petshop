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

 
Swal.fire({
    title: 'Sweet!',
    text: 'Modal with a custom image.',
    imageUrl: 'https://unsplash.it/400/200',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
  })


