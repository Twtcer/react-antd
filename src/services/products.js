import { get, post, del, put } from '../utils/request';

function query(page = 1, per = 2) {
    return get("/api/v1/admin/products", { page, per });
}

function getOneById(id) {
    return get(`/api/v1/admin/products/${id}`);
}

function add(product) {
    return post("/api/v1/admin/products", product);
}

function edit(id, product) {
    return put(`/api/v1/admin/products/${id}`, product);
}

function delOne(id) {
    return del(`/api/v1/admin/products/${id}`);
}

function modifOne(id, product) {
    return put(`/api/v1/admin/products/${id}`, product);
}

export {
    add,
    query,
    delOne,
    edit,
    getOneById,
    modifOne
}

