import { apiUrl } from './base';
export const loadTeacherByKeyCode = (keycode) => {
    return new Promise(function (resolve, reject) {
        fetch(apiUrl + `/user?filter=keyCode,eq,${keycode}&join=teacher`, {
            method: 'GET'
        }).then(p => {
            if (p.status == 200)
                return p;
            else
                throw "Error";
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
            .catch(p => {
            reject();
        });
    });
};
//# sourceMappingURL=teacher.js.map