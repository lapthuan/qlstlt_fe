import { useParams } from "react-router-dom";
import { Button, Col, Form, Input, message, Row, Select, Space,DatePicker } from "antd";
import { useEffect, useState } from "react";
import ServiceEmployee from "@/service/ServiceEmployee";
import ServiceCuaHang from "@/service/ServiceCuaHang";
import ServiceDeliveryReceipt from "@/service/ServiceDeliveryReceipt";
import useAsync from "@/hook/useAsync";
import dayjs from "dayjs";
const PhieuNhapChiTiet = () => {
    const { id } = useParams()
    const [form] = Form.useForm();
    const { data: cuahang } = useAsync(() => ServiceCuaHang.getAllCuaHang())
    const { data: nhanvien } = useAsync(() => ServiceEmployee.getAllEmployee())
    console.log(id);
    useEffect(() => {
        if (id != "add") {
            (async () => {
                const res = await ServiceDeliveryReceipt.getDeliveryReceipt(id)
                console.log(res);
                if (res) {          
                    const ngay = dayjs(res[0].NgayNhap, 'YYYY-MM-DD');
                    form.setFieldsValue({
                        MaPN: res[0].MaPN,
                        NgayNhap: ngay,
                        GhiChu: res[0].GhiChu,
                        MaNV: res[0].MaNV,                 
                        MaST: res[0].MaST,  
                    });
                }
            })();
        } else {
            form.resetFields()
        }
    }, [id])
    const onFinish = async (values) => {

        if (id != "add") {
            const ngay = dayjs(values.NgayNhap).format('YYYY-MM-DD')
          
            const body = {
                
                "MaPN": values.MaPN,
                "NgayNhap": ngay,
                "GhiChu": values.GhiChu,
                "MaNV": values.MaNV,
                "MaST": values.MaST,
            }

            const res = await ServiceDeliveryReceipt.editDeliveryReceipt(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {
           
            const ngay = dayjs(values.NgayNhap).format('YYYY-MM-DD')
          
            const body = {
                
                "MaPN": values.MaPN,
                "NgayNhap": ngay,
                "GhiChu": values.GhiChu,
                "MaNV": values.MaNV,
                "MaST": values.MaST,
            }

            const res = await ServiceDeliveryReceipt.createDeliveryReceipt(body)

            if (res.message == "Đã tồn tại") {
                message.warning("Mã phiếu nhập đã tồn tại!")
            } else if (res.message == "Thêm phiếu nhập mới thành công") {
                message.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }
        }
    };
    return (
        <div className="mt-32 mb-8 flex flex-col gap-12">
        <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="MaPN"
                        label="Mã phiếu"

                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập mã phiếu nhập',
                            },
                        ]}
                    >
                        <Input disabled={id != "add" ? true : false} placeholder="Nhập mã phiếu nhập" />
                    </Form.Item>
                </Col>
              
                 <Col span={8}>
                    <Form.Item
                        name="MaNV"
                        label="Nhân viên"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy chọn nhân viên',
                            },
                        ]}
                    >
                        <Select placeholder="Chọn nhân viên">
                            {
                                Array.isArray(nhanvien) &&
                                nhanvien.map((item, i) => (
                                    <Option key={i + 1} value={item.MaNV}>{item.HoTen}</Option>
                                ))}


                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="MaST"
                        label="Siêu thị"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy chọn siêu thị',
                            },
                        ]}
                    >
                        <Select placeholder="Chọn siêu thị">
                            {
                                Array.isArray(cuahang) &&
                                cuahang.map((item, i) => (
                                    <Option key={i + 1} value={item.MaST}>{item.TenST}</Option>
                                ))}


                        </Select>
                    </Form.Item>
                </Col> 
            </Row>

            <Row gutter={16}>
            <Col span={12}>
                        <Form.Item
                            name="NgayNhap"
                            label="Ngày nhập hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn ngày nhập hàng',
                                },
                            ]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                format="DD-MM-YYYY"
                                placeholder="Chọn ngày nhập hàng" />
                        </Form.Item>
                    </Col>
                <Col span={12}>
                <Form.Item
                        name="GhiChu"
                        label="Ghi chú"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập ghi chú',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập ghi chú" />
                    </Form.Item>
                </Col>
                
            </Row>
            <Form.Item

            >
                <Space align="end">

                    <Button htmlType="submit" primary>
                        {id != "add" ? "Sửa" : " Thêm"}
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    </div>

    );
}

export default PhieuNhapChiTiet;