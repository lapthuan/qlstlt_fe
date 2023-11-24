import useAsync from '@/hook/useAsync';
import ServiceDanhMuc from '@/service/ServiceDanhMuc';
import ServiceHangHoa from '@/service/ServiceHangHoa';
import ServiceNhanHang from '@/service/ServiceNhanHang';
import {
    ModalForm,
    ProForm,
    ProFormDateRangePicker,
    ProFormSelect,
    ProFormText,
} from '@ant-design/pro-components';
import { EllipsisVerticalIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button } from '@material-tailwind/react';
import { Form, message } from 'antd';
const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};
const ModalHangHoa = ({ id }) => {

    const { data: danhMuc } = useAsync(() => ServiceDanhMuc.getAllDanhMuc())
    const { data: nhanHang } = useAsync(() => ServiceNhanHang.getAllNhanHang())

    let dataDanhMuc = []
    danhMuc?.map((item, i) => {
        dataDanhMuc.push({
            value: item.MaDanhMuc,
            label: item.Ten,
        })
    })
    let dataNhanHang = []
    nhanHang?.map((item, i) => {
        dataNhanHang.push({
            value: item.MaNhanHang,
            label: item.Ten,
        })
    })



    const [form] = Form.useForm();
    return (
        <>

            <ModalForm
                title="Thêm dữ liệu"
                trigger={
                    <Button type="primary" >

                        Thêm dữ liệu
                    </Button >
                }
                form={form}

                modalProps={{
                    destroyOnClose: true,
                    onCancel: () => console.log('run'),
                }}
                submitTimeout={2000}
                onFinish={async (values) => {
                    await waitTime(2000);


                    if (id) {
                        const body = {
                            "reqMaMH": values.mamh,
                            "reqMaLH": values.malh,
                            "reqMaNH": values.manh,
                            "reqMaGiamGia": values.magiamgia,
                            "reqTenMH": values.tenmh,
                            "reqGiamGia": values.giamgia,
                            "reqMoTa": values.mota,
                            "reqDVT": values.dvt,
                        }

                        const res = await ServiceHangHoa.editHangHoa(body)

                        if (res.message) {
                            message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

                        }

                    } else {
                        const body = {
                            "MaHH": values.MaHH,
                            "TenHH": values.TenHH,
                            "GiaBan": values.GiaBan,
                            "GhiChu": values.GhiChu,
                            "MaNhanHang": values.MaNhanHang,
                            "DanhMuc": values.DanhMuc,
                        }

                        const res = await ServiceHangHoa.createHangHoa(body)

                        if (res.message == "Đã tồn tại") {
                            message.warning("Mã sản phẩm đã tồn tại!")
                        } else if (res.message == "Thêm hàng hóa mới thành công") {
                            message.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!")

                        }
                    }

                    return true;
                }}
                submitter={{
                    searchConfig: {
                        submitText: "Thêm",
                        resetText: "Hủy",

                    },
                    submitButtonProps: { style: { backgroundColor: '#4096ff', } }
                }}
            >
                <ProForm.Group>
                    <ProFormText
                        width="md"
                        name="MaHH"
                        label="Mã hàng hóa"
                        tooltip="Không được đặt trùng"
                        placeholder="Nhập mã hàng hóa"
                    />

                    <ProFormText
                        width="md"
                        name="TenHH"
                        label="Tên "
                        placeholder="Tên hàng hóa"
                    />
                </ProForm.Group>

                <ProForm.Group>
                    <ProFormSelect
                        request={async () => dataDanhMuc}
                        width="md"
                        name="DanhMuc"
                        label="Danh mục"
                        placeholder={"Chọn danh mục"}
                    />
                    <ProFormSelect
                        request={async () => dataNhanHang}
                        width="md"
                        name="MaNhanHang"
                        placeholder={"Chọn nhãn hàng"}
                        label="Nhãn hàng"
                    />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormText
                        width="md"
                        name="GiaBan"
                        label="Giá bán"
                        placeholder="Nhập giá bán"
                    />

                    <ProFormText
                        width="md"
                        name="GhiChu"
                        label="Ghi chú "
                        placeholder="Nhập ghi chú"
                    />
                </ProForm.Group>


            </ModalForm >
        </>
    );
}

export default ModalHangHoa;