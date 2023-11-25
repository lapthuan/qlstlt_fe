import requests from "./httpService";

const ServiceKhuyenMai = {
    getAllKhuyenMai: async () => {
        return requests.get(`/khuyenmai`);
    },
    getALKhuyenMai: async (id) => {
        return requests.get(`/khuyenmai/${id}`);
    },
    createKhuyenMai: async (body) => {
        return requests.post(`/khuyenmai`, body);
    },
    editKhuyenMai: async (body) => {
        return requests.put(`/khuyenmai`, body);
    },
    deleteKhuyenMai: async (id) => {
        return requests.delete(`/khuyenmai/${id}`);
    }
}

export default ServiceKhuyenMai;