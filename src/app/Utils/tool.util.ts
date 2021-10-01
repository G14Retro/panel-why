import Swal from "sweetalert2";


export default class Utils{
    static swalError(title:string,text:string){
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            showConfirmButton: false,
            timer: 3000
        });
    }


    static swalErrorConfirm(title:string,text:string){
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
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

    static swalSuccessConfirm(title:string,text:string){
        Swal.fire({
            icon: 'success',
            title: title,
            text: text,
            showConfirmButton: true,
            confirmButtonText: 'Entendido'
        })
    }

    static swalWarning(title:string,text:string){
        Swal.fire({
            icon: 'warning',
            title: title,
            text: text,
            showConfirmButton: false,
            timer: 2500
        })
    }


    static downloadFile( x , fileName ){
        var newBlob = new Blob([x], { type: x.type });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            console.log("set");
            window.navigator.msSaveOrOpenBlob(newBlob, fileName);
            return;
        }
    
        // For other browsers:
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);
    
        var link = document.createElement('a');
        link.href = data;
        link.download = fileName;
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    
        setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
            link.remove();
        }, 100);
    
      }

}