import { apiUrl, emailUrl, throwError } from './base';
import { Linking } from 'expo';

interface ISchool {
    id?: number,
    name: string,
    maxTeachers?: number,
    enfOfTerm: Date
}

interface ITeacher {
    id?: number,
    name: string,
    email?: string,
    isAdmin: boolean
}

export const createSchool = (school: ISchool) => {
    return new Promise(function (resolve, reject) {
        fetch(apiUrl + '/school', {
            method: 'POST',
            body: JSON.stringify(school)
        }).then(throwError)
            .then(p => p.text())
            .then(p => {

                if (p) {
                    resolve({
                        ...school,
                        id: parseInt(p)
                    })
                } else {

                    reject()
                }
            })
            .catch(p => {

            })
    });
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4();
}

export const createAdmin = (school: ISchool, teacher: ITeacher) => {
    return new Promise(function (resolve, reject) {
        fetch(apiUrl + '/teacher', {
            method: 'POST',
            body: JSON.stringify({ ...teacher, schoolId: school.id, isAdmin: 1 })
        })
            .then(throwError)
            .then(p => p.text())
            .then(teacherId => {
                if (teacherId) {
                    const keyCode = guid().toUpperCase()
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
                                sendEmail(teacher.email, 'https://app.readers.com.pk/PreLogin/TeacherSignUp?keyCode=' + keyCode)
                                resolve(teacher.id)
                            }
                            else {
                                fetch(apiUrl + '/teacher/' + teacherId, {
                                    method: 'DELETE'
                                }).then(throwError)
                                reject()
                            }
                        })
                        .catch(reject)

                } else {
                    reject()
                }
            }).catch(reject)
    })

}

const sendEmail = (to: string, link: string) => {
    fetch(emailUrl,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: (`To=${encodeURIComponent(to)}&Link=${encodeURIComponent(link)}`)
        }
    )
}