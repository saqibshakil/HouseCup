import { apiUrl, longGuid } from './base';
import { Constants } from 'expo'

export const loadTeacherByKeyCode = (keycode: string) => {
    return new Promise(function (resolve, reject) {
        fetch(apiUrl + `/user?filter=keyCode,eq,${keycode}&join=teacher`, {
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
                    resolve({
                        ...user.teacherId,
                        ...user,
                        teacherId: user.teacherId.id
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

export const updateTeacher = (user: any) => {
    return new Promise(function (resolve, reject) {
        const loginHash = longGuid()
        fetch(apiUrl + `/user/${user.id}`, {
            method: 'PUT',
            body: JSON.stringify({ password: user.password, deviceKey: Constants.deviceId, loginHash })
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
                            user: {
                                ...user,
                                loginHash
                            }
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