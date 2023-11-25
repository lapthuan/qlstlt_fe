import requests from "./httpService";

const ServiceSieuThi = {
    getAllSieuThi: async () => {
        return requests.get(`/sieuthi`);
    },
    getASieuThi: async (id) => {
        return requests.get(`/sieuthi/${id}`);
    },
    createSieuThi: async (body) => {
        return requests.post(`/sieuthi`, body);
    },
    editSieuThi: async (body) => {
        return requests.put(`/sieuthi/`, body);
    },
    deleteSieuThi: async (id) => {
        return requests.delete(`/sieuthi/${id}`);
    }

}

export default ServiceSieuThi;