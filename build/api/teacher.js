import { apiUrl, longGuid, guid, throwError } from './base';
import { Constants } from 'expo';
import { sendEmail } from './school';
export const loadTeacherByKeyCode = (keycode) => {
    return new Promise(function (resolve, reject) {
        fetch(apiUrl + `/user?filter=keyCode,eq,${keycode}&join=teacher,school`, {
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
            if (user) {
                resolve(Object.assign({}, user.teacherId, user, { teacherId: user.teacherId.id }));
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
export const loadUserByTeacher = (teacher) => {
    return fetch(apiUrl + `/user?filter=teacherId,eq,${teacher.id}`, {
        method: 'GET'
    }).then(p => {
        if (p.status === 200)
            return p;
        else
            throw 'Error';
    }).then(p => p.json())
        .then(user => {
        user = user.records[0];
        if (user) {
            return user;
        }
        else {
            throw 'No users';
        }
    });
};
export const updateTeacher = (user) => {
    return new Promise(function (resolve, reject) {
        const loginHash = longGuid();
        fetch(apiUrl + `/user/${user.id}`, {
            method: 'PUT',
            body: JSON.stringify({ password: user.password, deviceKey: Constants.deviceId, loginHash, keyCode: null })
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
                    teacherId: user.teacherId,
                    schoolId: user.schoolId.id,
                    maxTeachers: user.schoolId.maxTeachers,
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
export const resetUser = (teacher) => {
    return loadUserByTeacher(teacher)
        .then((user) => {
        const apiPath = apiUrl + '/user/' + user.id;
        const keyCode = guid().toUpperCase();
        fetch(apiPath, {
            method: 'PUT',
            body: JSON.stringify({
                deviceId: null,
                loginHash: null,
                password: null,
                keyCode
            })
        })
            .then(throwError)
            .then(p => p.text())
            .then(updated => {
            if (updated) {
                sendEmail(teacher.email, keyCode, teacher.name);
                return true;
            }
            else {
                throw 'Unable to reset password';
            }
        });
    });
};
//# sourceMappingURL=teacher.js.map