export const apiUrl = 'http://app.readers.com.pk/api.php/records'
export const emailUrl = 'http://app.readers.com.pk/mail/handler.php'
export const throwError = (p: Response)=>{
    if(p.status == 200)
        return p
    else 
        throw p.status
}