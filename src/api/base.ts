export const apiUrl = 'http://app.readers.com.pk/api.php/records'
export const emailUrl = 'http://app.readers.com.pk/mail/handler.php'
export const throwError = (p: Response) => {
    if (p.status === 200)
        return p
    else
        throw p.status
}

export const guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4();
}

export const longGuid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + s4() + s4();
}
