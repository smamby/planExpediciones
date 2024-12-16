swal.fire({
    title: 'Video tutorial',
    html: '<a class="btn-href" href="https://drive.google.com/file/d/1LTg-mecQHPZelc3zB0Z_dzGIFo7Qw34e/view?usp=sharingQQZZ" target="_blank" rel="noopener noreferrer" style="visibility:none;"><img src="./assets/img/tutorial.jpg" alt="" style="width:200px;"></a>',
    customClass: {
        html: 'SWAL-link-html',
    },
    color: "rgb(190,150,120)",
    cancelButtonColor: 'rgb(190, 50, 50)', 
    icon: undefined,
    footer: "Hace clic pára ver el video tutorial",
    width: '320px',
    padding: '1rem',
    background: 'rgb(35, 24, 44)',
    grow: 'column',
    backdrop: false,
    timer: 15000,
    timerProgressBar: true,
    toast: false,
    position: 'bottom-end',
    allowOutsideClick: false,
    allowEscapeKey: false,
    stopKeydownPropagation: false,

    showConfirmButton: false,
    showCancelButton: true,
    showCloseButton: false,
})