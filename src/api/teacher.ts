import { apiUrl } from './base';

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
        fetch(apiUrl + `/user/${user.id}`, {
            method: 'PUT',
            body: JSON.stringify({ password: user.password })
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