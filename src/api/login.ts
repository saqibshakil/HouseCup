import { apiUrl, longGuid } from './base';
import { Constants } from 'expo'
export const login = (email: string, password: string) => {
    return new Promise(function (resolve, reject) {
        fetch(apiUrl + `/user?filter=email,eq,${email}&filter=password,eq,${password}&join=teacher`, {
            method: 'GET'
        }).then(p => {
            if (p.status === 200)
                return p
            else
                throw 'Error'
        })
            .then(p => p.json())
            .then(user => {
                user = user.records[0]
                if (user) {
                    if (user.deviceKey !== Constants.deviceId)
                        reject('The specified user is not assigned to this device,' +
                            'If you have changed devices or reinstalled please ask your admin to reset you password')
                    else
                        updateLoginHash(user.id, longGuid())
                            .then(p => resolve(p))
                            .catch(() => reject())
                } else {
                    reject()
                }
            })
            .catch(() => {
                reject()
            })
    });
}


export const updateLoginHash = (id: string, loginHash: string) => {
    return new Promise(function (resolve, reject) {
        const loginHash = longGuid()
        fetch(apiUrl + `/user/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ loginHash })
        }).then(p => {
            if (p.status === 200)
                return p
            else
                throw 'Error'
        })
            .then(p => p.text())
            .then(recordsUpdated => {
                if (parseInt(recordsUpdated, 10) > 0) {
                    resolve({
                        id,
                        loginHash
                    })
                } else {

                    reject()
                }
            })
            .catch(() => {
                reject()
            })
    });
}