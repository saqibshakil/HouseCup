import { apiUrl, emailUrl, throwError } from './base';
export const createSchool = (school) => {
    return new Promise(function (resolve, reject) {
        fetch(apiUrl + '/school', {
            method: 'POST',
            body: JSON.stringify(school)
        }).then(throwError)
            .then(p => p.text())
            .then(p => {
            if (p) {
                resolve(Object.assign({}, school, { id: parseInt(p) }));
            }
            else {
                reject();
            }
        })
            .catch(p => {
        });
    });
};
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4();
}
export const createAdmin = (school, teacher) => {
    return new Promise(function (resolve, reject) {
        fetch(apiUrl + '/teacher', {
            method: 'POST',
            body: JSON.stringify(Object.assign({}, teacher, { schoolId: school.id, isAdmin: 1 }))
        })
            .then(throwError)
            .then(p => p.text())
            .then(teacherId => {
            if (teacherId) {
                const keyCode = guid().toUpperCase();
                fetch(apiUrl + '/user', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: teacher.email,
                        teacherId: parseInt(teacherId),
                        keyCode: keyCode
                    })
                }).then(throwError)
                    .then(res => res.text())
                    .then(userId => {
                    if (userId) {
                        sendEmail(teacher.email, 'https://app.readers.com.pk/PreLogin/TeacherSignUp?keyCode=' + keyCode);
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
const sendEmail = (to, link) => {
    fetch(emailUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: (`To=${encodeURIComponent(to)}&Link=${encodeURIComponent(link)}`)
    });
};
//# sourceMappingURL=school.js.map