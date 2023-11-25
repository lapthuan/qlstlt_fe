import { useParams } from "react-router-dom";
import { Button, Col, Form, Input, message, Row, Select, Space,DatePicker } from "antd";
import { useEffect, useState } from "react";
import ServiceEmployee from "@/service/ServiceEmployee";
import ServiceCustomer from "@/service/ServiceCustomer";
import ServiceOrder from "@/service/ServiceOrder";
import useAsync from "@/hook/useAsync";
import dayjs from "dayjs";
const HoaDonChiTiet = () => {
    const { id } = useParams()
    const [form] = Form.useForm();
    const { data: khachhang } = useAsync(() => ServiceCustomer.getAllCustomer())
    const { data: nhanvien } = useAsync(() => ServiceEmployee.getAllEmployee())
    console.log(id);
    useEffect(() => {
        if (id != "add") {
            (async () => {
                const res = await ServiceOrder.getOrder(id)
                console.log(res);
                if (res) {          
                    const ngay = dayjs(res[0].NgayDH, 'YYYY-MM-DD');
                    form.setFieldsValue({
                        MaDH: res[0].MaDH,
                        NgayDH: ngay,
                        ThanhToan: res[0].ThanhToan,
                        MaNV: res[0].MaNV,                 
                        MaKH: res[0].MaKH,  
                    });
                }
            })();
        } else {
            form.resetFields()
        }
    }, [id])
    const onFinish = async (values) => {

        if (id != "add") {
            const ngay = dayjs(values.NgayDH).format('YYYY-MM-DD')
          
            const body = {
                
                "MaDH": values.MaDH,
                "NgayDH": ngay,
                "ThanhToan": values.ThanhToan,
                "MaNV": values.MaNV,
                "MaKH": values.MaKH,
            }

            const res = await ServiceOrder.editOrder(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {
           
            const ngay = dayjs(values.NgayDH).format('YYYY-MM-DD')
          
            const body = {
                
                "MaDH": values.MaDH,
                "NgayDH": ngay,
                "ThanhToan": values.ThanhToan,
                "MaNV": values.MaNV,
                "MaKH": values.MaKH,
            }

            const res = await ServiceOrder.createOrder(body)

            if (res.message == "Đã tồn tại") {
                message.warning("Mã sản phẩm đã tồn tại!")
            } else if (res.message == "Thêm đơn hàng mới thành công") {
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
                        name="MaDH"
                        label="Mã đơn"

                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập mã đơn',
                            },
                        ]}
                    >
                        <Input disabled={id != "add" ? true : false} placeholder="Nhập mã đơn" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="MaKH"
                        label="Khách hàng"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy chọn khách hàng',
                            },
                        ]}
                    >
                        <Select placeholder="Chọn khách hàng">
                            {
                                Array.isArray(khachhang) &&
                                khachhang.map((item, i) => (
                                    <Option key={i + 1} value={item.MaKH}>{item.TenKH}</Option>
                                ))}


                        </Select>
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
            </Row>

            <Row gutter={16}>
            <Col span={12}>
                        <Form.Item
                            name="NgayDH"
                            label="Ngày mua"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn ngày mua',
                                },
                            ]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                format="DD-MM-YYYY"
                                placeholder="Chọn ngày mua" />
                        </Form.Item>
                    </Col>
                <Col span={12}>
                <Form.Item
                        name="ThanhToan"
                        label="Hình thức thanh toán"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập hình thức thanh toán',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập hình thức thanh toán" />
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

export default HoaDonChiTiet;