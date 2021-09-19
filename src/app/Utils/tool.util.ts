import Swal from "sweetalert2";


export default class Utils{
    static swalError(title:string,text:string){
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            showConfirmButton: false,
            timer: 2500
        });
    }

    static swalSuccess(title:string,text:string){
        Swal.fire({
            icon: 'success',
            title: title,
            text: text,
            showConfirmButton: false,
            timer: 2500
        })
    }

}