import Swal from "sweetalert2";

export function wordCapitalize(word : string) : string {

    if(!word.length) return "";

    const capitalize = word.charAt(0).toUpperCase() + word.slice(1);    

    return capitalize;
}

export function wordNormalize(word : string) : string {

    if(!word.length) return "";

    const normalize = word.normalize('NFKD').replace(/[^\w\s.-_\/]/g, '').replaceAll(" ", "").toLowerCase();  

    return normalize;
}

export function alert(title : string, text: string) : void {    
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
     })
}