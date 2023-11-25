import requests from "./httpService";

const ServiceTinh = {
    getAllTinh: async () => {
        return requests.get(`/tinh`);
    },
    getTinh: async (id) => {
        return requests.get(`/tinh/${id}`);
    },

}

export default ServiceTinh;