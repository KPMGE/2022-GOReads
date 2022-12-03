import Swal from 'sweetalert2'
export const alertError = async (message: string) => {
  await Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: `${message}`
  })
}
