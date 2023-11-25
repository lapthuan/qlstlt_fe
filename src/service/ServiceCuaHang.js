import requests from "./httpService";

const ServiceCuaHang = {
    getAllCuaHang: async () => {
        return requests.get(`/sieuthi`);
    },


}

export default ServiceCuaHang;