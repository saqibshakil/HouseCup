import { sumUrl, apiUrl, throwError } from './base';
export const getPointsPerHouses = (schoolId) => fetch(`${sumUrl}${schoolId}`)
    .then(p => {
    if (p.status === 200)
        return p;
    else
        throw 'Error';
})
    .then(p => p.json());
export const studentExist = (student, schoolId) => {
    return fetch(apiUrl + `/student?filter=schoolId,eq,${schoolId}&filter=grNo,eq,${student.grNo}`)
        .then(p => {
        if (p.status === 200)
            return p;
        else
            throw 'Error';
    })
        .then(p => p.json())
        .then(data => data.records)
        .then((students) => {
        if (students.length)
            return students[0];
        else
            return undefined;
    });
};
export const create = (schoolId, student) => {
    return new Promise(function (resolve, reject) {
        const urlAppendage = student.id ? '/' + student.id : '';
        fetch(apiUrl + '/student' + urlAppendage, {
            method: student.id ? 'PUT' : 'POST',
            body: JSON.stringify(Object.assign({}, student, { schoolId: schoolId }))
        }).then(throwError)
            .then(p => p.text())
            .then(p => {
            if (p) {
                resolve(Object.assign({}, student, { id: student.id ? student.id : p, schoolId }));
            }
            else {
                reject();
            }
        });
    });
};
export const fetchStudentOrCreate = (student, schoolId) => {
    return studentExist(student, schoolId)
        .then((std) => {
        if (std)
            return std;
        else
            return create(schoolId, student);
    });
};
export const fetchStudent = (student, schoolId) => {
    return fetch(`${apiUrl}/student?filter=grNo,eq,${student.grNo}&filter=schoolId,eq,${schoolId}`)
        .then(p => {
        if (p.status === 200)
            return p;
        else
            throw 'Error';
    })
        .then(p => p.json())
        .then((data) => data.records);
};
export const postPoints = ({ schoolId, houseId, studentId, points, reasonId, teacherId }) => {
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
            return true;
        else
            throw 'Something failed';
    });
};
//# sourceMappingURL=home.js.map