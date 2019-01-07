import { apiUrl, longGuid } from './base';
import { Constants } from 'expo';
import { getPointsPerHouses } from './home';
export const login = (email, password, loginHash) => {
    return new Promise(function (resolve, reject) {
        let url;
        if (loginHash)
            url = apiUrl + `/user?filter=loginHash,eq,${loginHash}&join=teacher,school`;
        else
            url = apiUrl + `/user?filter=email,eq,${email}&filter=password,eq,${password}&join=teacher,school`;
        fetch(url, {
            method: 'GET'
        }).then(p => {
            if (p.status === 200)
                return p;
            else
                throw 'Error';
        })
            .then(p => p.json())
            .then(user => {
            user = user.records[0];
            const hash = longGuid();
            if (user) {
                if (user.deviceKey !== Constants.deviceId)
                    reject('The specified user is not assigned to this device,' +
                        'If you have changed devices or reinstalled please ask your admin to reset you password');
                else
                    updateLoginHash(user.id, hash)
                        .then(() => resolve({
                        teacherId: user.teacherId.id,
                        schoolId: user.teacherId.schoolId.id,
                        maxTeachers: user.teacherId.schoolId.maxTeachers,
                        userId: user.id,
                        loginHash: hash
                    }))
                        .catch(() => reject());
            }
            else {
                reject();
            }
        })
            .catch(() => {
            reject();
        });
    });
};
export const updateLoginHash = (id, loginHash) => {
    return new Promise(function (resolve, reject) {
        fetch(apiUrl + `/user/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ loginHash: loginHash })
        }).then(p => {
            if (p.status === 200)
                return p;
            else
                throw 'Error';
        })
            .then(p => p.text())
            .then(recordsUpdated => {
            if (parseInt(recordsUpdated, 10) > 0) {
                resolve({
                    loginHash
                });
            }
            else {
                reject();
            }
        })
            .catch(() => {
            reject();
        });
    });
};
export const verifyLoginAndCache = (p) => {
    return new Promise(function (resolve, reject) {
        fetch(`${apiUrl}/user?filter=loginHash,eq,${p.loginHash}&filter=teacherId,eq,${p.teacherId}`)
            .then(s => {
            if (s.status === 200)
                return s;
            else
                throw 'Error';
        })
            .then((s) => s.json())
            .then(user => {
            user = user.records[0];
            if (user) {
                resolve();
            }
            else {
                reject();
            }
        });
    });
};
export const cacheSchoolInfo = (schoolId) => {
    return new Promise(function (resolve, reject) {
        Promise.all([getHouses(schoolId), getReason(schoolId), getTeacher(schoolId), getPointsPerHouses(schoolId)])
            .then(([houses, reasons, teachers, points]) => {
            resolve({ houses, reasons, teachers, points });
        }).catch(() => reject());
    });
};
export const getHouses = (schoolId) => fetch(`${apiUrl}/house?filter=schoolId,eq,${schoolId}`)
    .then(p => {
    if (p.status === 200)
        return p;
    else
        throw 'Error';
})
    .then(p => p.json())
    .then(houses => houses.records);
export const getReason = (schoolId) => fetch(`${apiUrl}/reason?filter=schoolId,eq,${schoolId}`)
    .then(p => {
    if (p.status === 200)
        return p;
    else
        throw 'Error';
})
    .then(p => p.json())
    .then(houses => houses.records);
export const getTeacher = (schoolId) => fetch(`${apiUrl}/teacher?filter=schoolId,eq,${schoolId}`)
    .then(p => {
    if (p.status === 200)
        return p;
    else
        throw 'Error';
})
    .then(p => p.json())
    .then(houses => houses.records);
//# sourceMappingURL=login.js.map