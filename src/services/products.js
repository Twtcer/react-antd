import { get, post, del } from '../utils/request';

function list(page = 1) {
    return get("/api/v1/admin/products", { page });
}

function add(product) {
    return post("/api/v1/admin/products", product);
}

function edit(id, product) {
    post(`/api/v1/admin/products/${id}`, product);
}

function delOne(id) {
    return del('/api/v1/admin/products', id);
}

export {
    add,
    list,
    delOne,
    edit
}

