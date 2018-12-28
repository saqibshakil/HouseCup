import { apiUrl, emailUrl, throwError, guid } from './base';
export const createSchool = (school) => {
    return new Promise(function (resolve, reject) {
        fetch(apiUrl + '/school', {
            method: 'POST',
            body: JSON.stringify(school)
        }).then(throwError)
            .then(p => p.text())
            .then(p => {
            if (p) {
                resolve(Object.assign({}, school, { id: parseInt(p, 10) }));
            }
            else {
                reject();
            }
        });
        // .catch(p => null)
    });
};
const sendEmail = (to, link) => {
    fetch(emailUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: (`To=${encodeURIComponent(to)}&KeyCode=${encodeURIComponent(link)}`)
    });
};
export const createAdmin = (school, teacher, isAdmin) => {
    return new Promise(function (resolve, reject) {
        const apiPath = apiUrl + '/teacher' + (teacher.id ? ('/' + teacher.id) : '');
        const method = teacher.id ? 'PUT' : 'POST';
        fetch(apiPath, {
            method,
            body: JSON.stringify(Object.assign({}, teacher, { schoolId: school.id, isAdmin: isAdmin ? 1 : 0 }))
        })
            .then(throwError)
            .then(p => p.text())
            .then(teacherId => {
            if (teacherId) {
                const keyCode = guid().toUpperCase();
                fetch(apiUrl + '/user', {
                    method,
                    body: JSON.stringify({
                        email: teacher.email,
                        teacherId: teacher.id ? teacher.id : parseInt(teacherId, 10),
                        keyCode: keyCode
                    })
                }).then(throwError)
                    .then(res => res.text())
                    .then(userId => {
                    if (userId) {
                        sendEmail(teacher.email, keyCode);
                        resolve(teacher.id);
                    }
                    else {
                        fetch(apiUrl + '/teacher/' + teacherId, {
                            method: 'DELETE'
                        }).then(throwError);
                        reject();
                    }
                })
                    .catch(reject);
            }
            else {
                reject();
            }
        }).catch(reject);
    });
};
export const deleteTeacher = (id) => new Promise(function (resolve, reject) {
    fetch(apiUrl + '/teacher/' + id, {
        method: 'DELETE'
    }).then(throwError)
        .then(res => res.text())
        .then(() => resolve())
        .catch(() => reject('Unable to delete'));
});
//# sourceMappingURL=school.js.map