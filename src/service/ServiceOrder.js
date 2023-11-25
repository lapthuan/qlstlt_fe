import requests from "./httpService";

const ServiceOrder = {
    getAllOrder: async () => {
        return requests.get(`/donhang`);
    },
    getOrder: async (id) => {
        return requests.get(`/donhang/${id}`);
    },
    createOrder: async (body) => {
        return requests.post(`/donhang`, body);
    },
    editOrder: async (body, id) => {
        return requests.put(`/donhang`, body);
    },
    deleteOrder: async (id) => {
        return requests.delete(`/donhang/${id}`);
    },
    getOrderDetail: async () => {
        return requests.get(`/ctdonhang`);
    },
    getAOrderDetail: async (id) => {
        return requests.get(`/ctdonhang/${id}`);
    },
    getAOrderDetails: async (mahh, madh) => {
        return requests.get(`/ctdonhang/details?mahh=${mahh}&madh=${madh}`);
    },
    createOrderDetail: async (body) => {
        return requests.post(`/ctdonhang`, body);
    },
    editOrderDetail: async (body) => {
        return requests.put(`/ctdonhang/`, body);
    },
    deleteOrderDetail: async (body) => {
        return requests.post(`/ctdonhang/delete`, body);
    }
}

export default ServiceOrder;