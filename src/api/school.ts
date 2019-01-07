import { apiUrl, emailUrl, throwError, guid } from './base';

interface ISchool {
    id?: number,
    name?: string,
    maxTeachers?: number,
    enfOfTerm?: Date
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
                        id: parseInt(p, 10)
                    })
                } else {

                    reject()
                }
            })
        // .catch(p => null)
    });
}

export const sendEmail = (to: string, link: string, name: string) => {
    fetch(emailUrl,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: (`To=${encodeURIComponent(to)}&KeyCode=${encodeURIComponent(link)}&email=${encodeURIComponent(to)}
            &name==${encodeURIComponent(name)}&keyCode=${encodeURIComponent(link)}`)
        }
    )
}
export const createAdmin = (school: ISchool, teacher: ITeacher, isAdmin: boolean) => {
    return new Promise(function (resolve, reject) {
        const apiPath = apiUrl + '/teacher' + (teacher.id ? ('/' + teacher.id) : '')
        const method = teacher.id ? 'PUT' : 'POST'
        fetch(apiPath, {
            method,
            body: JSON.stringify({ ...teacher, schoolId: school.id, isAdmin: isAdmin ? 1 : 0 })
        })
            .then(throwError)
            .then(p => p.text())
            .then(teacherId => {
                if (teacherId) {
                    const keyCode = guid().toUpperCase()
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
                                sendEmail(teacher.email, keyCode, teacher.name)
                                resolve(teacher.id)
                            } else {
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

export const deleteTeacher = (id: string) =>
    new Promise(function (resolve, reject) {
        fetch(apiUrl + '/teacher/' + id, {
            method: 'DELETE'
        }).then(throwError)
            .then(res => res.text())
            .then(() => resolve())
            .catch(() => reject('Unable to delete'))
    })