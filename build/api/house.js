import { apiUrl, throwError } from './base';
export const create = (school, house) => {
    return new Promise(function (resolve, reject) {
        const urlAppendage = house.id ? '/' + house.id : '';
        fetch(apiUrl + '/house' + urlAppendage, {
            method: house.id ? 'PUT' : 'POST',
            body: JSON.stringify(Object.assign({}, house, { schoolId: school.id }))
        }).then(throwError)
            .then(p => p.text())
            .then(p => {
            if (p) {
                resolve(Object.assign({}, house, { id: parseInt(p, 10) }));
            }
            else {
                reject();
            }
        });
        // .catch(p => null)
    });
};
export const del = (id) => new Promise(function (resolve, reject) {
    fetch(apiUrl + '/house/' + id, {
        method: 'DELETE'
    }).then(throwError)
        .then(res => res.text())
        .then(() => resolve())
        .catch(() => reject('Unable to delete'));
});
//# sourceMappingURL=house.js.map