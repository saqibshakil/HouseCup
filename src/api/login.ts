import { apiUrl, longGuid } from './base';
import { Constants } from 'expo'
import school from '../schema/school';
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
                const hash = longGuid()
                if (user) {
                    if (user.deviceKey !== Constants.deviceId)
                        reject('The specified user is not assigned to this device,' +
                            'If you have changed devices or reinstalled please ask your admin to reset you password')
                    else
                        updateLoginHash(user.id, hash)
                            .then(() => resolve({
                                teacherId: user.teacherId.id,
                                schoolId: user.teacherId.schoolId,
                                loginHash: hash
                            }))
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
        fetch(apiUrl + `/user/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ loginHash: loginHash })
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

export const verifyLoginAndCache = (p: { teacherId: string, loginHash: string, schoolId: string }) => {
    return new Promise(function (resolve, reject) {
        fetch(`${apiUrl}/user?filter=loginHash,eq,${p.loginHash}&filter=teacherId,eq,${p.teacherId}`)
            .then(p => {
                if (p.status === 200)
                    return p
                else
                    throw 'Error'
            })
            .then(p => p.json())
            .then(user => {
                user = user.records[0]
                if (user) {
                    resolve()
                } else {
                    reject()
                }
            })
    })
}

export const cacheSchoolInfo = (schoolId: string) => {
    return new Promise(function (resolve, reject) {
        Promise.all([getHouses(schoolId), getReason(schoolId), getTeacher(schoolId)])
            .then(([houses, reasons, teachers]) => {
                resolve({ houses, reasons, teachers })
            }).catch(() => reject())
    })
}

export const getHouses = (schoolId: string) =>
    fetch(`${apiUrl}/house?filter=schoolId,eq,${schoolId}`)
        .then(p => {
            if (p.status === 200)
                return p
            else
                throw 'Error'
        })
        .then(p => p.json())
        .then(houses => houses.records)

export const getReason = (schoolId: string) =>
    fetch(`${apiUrl}/reason?filter=schoolId,eq,${schoolId}`)
        .then(p => {
            if (p.status === 200)
                return p
            else
                throw 'Error'
        })
        .then(p => p.json())
        .then(houses => houses.records)

export const getTeacher = (schoolId: string) =>
    fetch(`${apiUrl}/teacher?filter=schoolId,eq,${schoolId}`)
        .then(p => {
            if (p.status === 200)
                return p
            else
                throw 'Error'
        })
        .then(p => p.json())
        .then(houses => houses.records)