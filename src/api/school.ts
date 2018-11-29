import { apiUrl } from './base';

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
        })
            .then(p => p.text())
            .then(p => {
                debugger
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
                debugger
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
        }).then(p => p.text())
            .then(teacherId => {
                if (teacherId) {
                    fetch(apiUrl + '/user', {
                        method: 'POST',
                        body: JSON.stringify({
                            email: teacher.email,
                            teacherId: parseInt(teacherId),
                            keyCode: guid()
                        })
                    }).then(res => res.text())
                        .then(userId => {
                            if (userId)
                                resolve(teacher.id)
                            else {
                                fetch(apiUrl + '/teacher/' + teacherId, {
                                    method: 'DELETE'
                                })
                                reject()
                            }
                        })

                } else {
                    reject()
                }
            })
    })
        .catch(p => {
            debugger
        });
}