import requests from "./httpService";

const ServiceHangHoa = {
    getAllHangHoa: async () => {
        return requests.get(`/hanghoa`);
    },
    getHangHoa: async (id) => {
        return requests.get(`/hanghoa/${id}`);
    },
    createHangHoa: async (body) => {
        return requests.post(`/hanghoa`, body);
    },
    editHangHoa: async (body, id) => {
        return requests.put(`/hanghoa/`, body);
    },
    deleteHangHoa: async (id) => {
        return requests.delete(`/hanghoa/${id}`);
    }
}

export default ServiceHangHoa;