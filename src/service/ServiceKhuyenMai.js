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
    },

    getALKhuyenMaiCT: async (id) => {
        return requests.get(`/ctkhuyenmai/${id}`);
    },
    getALKhuyenMaiCTDetail: async (maHH, maKH) => {
        return requests.get(`/ctkhuyenmai/details?maHH=${maHH}&maKM=${maKH}`);
    },
    createKhuyenMaiCT: async (body) => {
        return requests.post(`/ctkhuyenmai`, body);
    },
    editKhuyenMaiCT: async (body) => {
        return requests.put(`/ctkhuyenmai`, body);
    },
    deleteKhuyenMaiCT: async (body) => {
        return requests.post(`/ctkhuyenmai/delete`, body);
    }
}

export default ServiceKhuyenMai;