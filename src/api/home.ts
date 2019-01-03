import { sumUrl, apiUrl, throwError } from './base';

export const getPointsPerHouses = (schoolId: string) =>
    fetch(`${sumUrl}${schoolId}`)
        .then(p => {
            if (p.status === 200)
                return p
            else
                throw 'Error'
        })
        .then(p => p.json())

export const studentExist = (student: any, schoolId: any) => {
    return fetch(apiUrl + `/student?filter=schoolId,eq,${schoolId}&filter=grNo,eq,${student.grNo}`)
        .then(p => {
            if (p.status === 200)
                return p
            else
                throw 'Error'
        })
        .then(p => p.json())
        .then(data => data.records)
        .then((students: any) => {
            if (students.length)
                return students[0]
            else
                return undefined
        })
}

export const create = (schoolId: any, student: any) => {
    return new Promise(function (resolve, reject) {

        studentExist(student, schoolId)
            .then((std: any) => {
                if (std) {
                    student.id = std.id
                }
                const urlAppendage = student.id ? '/' + student.id : ''
                fetch(apiUrl + '/student' + urlAppendage, {
                    method: student.id ? 'PUT' : 'POST',
                    body: JSON.stringify({
                        ...student,
                        schoolId: schoolId
                    })
                }).then(throwError)
                    .then(p => p.text())
                    .then(p => {

                        if (p) {
                            resolve({
                                ...student,
                                id: parseInt(p, 10)
                            })
                        } else {

                            reject()
                        }
                    })
            })
        // .catch(p => null)
    });
}

export const fetchStudentOrCreate = (student: any, schoolId: any) => {
    return studentExist(student, schoolId)
        .then((std: any) => {
            if (std)
                return std
            else
                return create(schoolId, student)
        })
}

export const fetchStudent = (student: any, schoolId: any) => {
    return fetch(`${apiUrl}/student?filter=grNo,eq,${student.grNo}&filter=schoolId,eq,${schoolId}`)
        .then(p => {
            if (p.status === 200)
                return p
            else
                throw 'Error'
        })
        .then(p => p.json())
        .then((data: any) => data.records)
}

export const postPoints = ({ schoolId, houseId, studentId, points, reasonId, teacherId }: any) => {
    return fetch(apiUrl + '/Points', {
        method: 'POST',
        body: JSON.stringify({
            schoolId,
            houseId,
            studentId,
            points,
            reasonId,
            teacherId
        })
    }).then(throwError)
        .then(p => p.text())
        .then(p => {
            if (p)
                return true
            else
                throw 'Something failed'
        })
}
