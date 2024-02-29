import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const messageService = {
    success: (title: string, text: string) => {
        MySwal.fire({
            title: title,
            text: text,
            icon: 'success',
            confirmButtonText: 'OK'
        })
    },
    error: (title: string) => {
        MySwal.fire({
            title: title,
            // text: text,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    },
    warning: (title: string, text: string) => {
        MySwal.fire({
            title: title,
            text: text,
            icon: 'warning',
            confirmButtonText: 'OK'
        })
    },
    info: (title: string, text: string) => {
        MySwal.fire({
            title: title,
            text: text,
            icon: 'info',
            confirmButtonText: 'OK'
        })
    },
    question: (title: string, text: string) => {
        MySwal.fire({
            title: title,
            text: text,
            icon: 'question',
            confirmButtonText: 'OK'
        })
    }
}