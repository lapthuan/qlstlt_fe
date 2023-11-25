import requests from "./httpService";

const ServiceDeliveryReceipt = {
    getAllDeliveryReceipt: async () => {
        return requests.get(`/phieunhap`);
    },
    getDeliveryReceipt: async (id) => {
        return requests.get(`/phieunhap/${id}`);
    },
    createDeliveryReceipt: async (body) => {
        return requests.post(`/phieunhap`, body);
    },
    editDeliveryReceipt: async (body, id) => {
        return requests.put(`/phieunhap`, body);
    },
    deleteDeliveryReceipt: async (id) => {
        return requests.delete(`/phieunhap/${id}`);
    },
    getDeliveryReceiptDetail: async (id) => {
        return requests.get(`/ctphieunhap/${id}`);
    },
    getDeliveryReceiptDetails: async (maHH, maPN) => {
        return requests.get(`/ctphieunhap/details?maHH=${maHH}&maPN=${maPN}`);
    },
    createDeliveryReceiptDetail: async (body) => {
        return requests.post(`/ctphieunhap`, body);
    },
    editDeliveryReceiptDetail: async (body) => {
        return requests.put(`/ctphieunhap/`, body);
    },
    deleteDeliveryReceiptDetail: async (body) => {
        return requests.post(`/ctphieunhap/delete`, body);
    },
}

export default ServiceDeliveryReceipt;