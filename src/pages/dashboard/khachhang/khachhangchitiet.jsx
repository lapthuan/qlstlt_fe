import { useParams } from "react-router-dom";
import { Button, Col, Form, Input, message, Row, Select, Space,DatePicker } from "antd";
import { useEffect, useState } from "react";
import ServiceCuaHang from "@/service/ServiceCuaHang";
import ServiceCustomer from "@/service/ServiceCustomer";
import useAsync from "@/hook/useAsync";
const KhachHangChiTiet = () => {
    const { id } = useParams()
    const [form] = Form.useForm();
    const { data: sieuthi } = useAsync(() => ServiceCuaHang.getAllCuaHang())

    useEffect(() => {
        if (id != "add") {
            (async () => {
                const res = await ServiceCustomer.getACustomer(id)
                if (res) {
                    form.setFieldsValue({
                        MaKH: res[0].MaKH,
                        TenKH: res[0].TenKH,  
                        SDT: res[0].SDT,                 
                        DiaChi: res[0].DiaChi,
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
          
            const body = {
                
                "MaKH": values.MaKH,
                "TenKH": values.TenKH,
                "SDT": values.SDT,
                "DiaChi": values.DiaChi,
                "MaST": values.MaST,
            }

            const res = await ServiceCustomer.editCustomer(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {
           
            const body = {
                "MaKH": values.MaKH,
                "TenKH": values.TenKH,
                "SDT": values.SDT,
                "DiaChi": values.DiaChi,
                "MaST": values.MaST,
            }

            const res = await ServiceCustomer.createCustomer(body)

            if (res.message == "Đã tồn tại") {
                message.warning("Mã sản phẩm đã tồn tại!")
            } else if (res.message == "Thêm khách hàng mới thành công") {
                message.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }
        }
    };
    return (
        <div className="mt-32 mb-8 flex flex-col gap-12">
        <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="MaKH"
                        label="Mã khách hàng"

                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập mã khách hàng',
                            },
                        ]}
                    >
                        <Input disabled={id != "add" ? true : false} placeholder="Nhập mã khách hàng" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="TenKH"
                        label="Tên khách hàng"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập họ tên',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập họ tên" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
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
                                Array.isArray(sieuthi) &&
                                sieuthi.map((item, i) => (
                                    <Option key={i + 1} value={item.MaST}>{item.TenST}</Option>
                                ))}


                        </Select>
                    </Form.Item>
                </Col>
                <Col span={16}>
                <Form.Item
                        name="SDT"
                        label="Số điện thoại"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập số điện thoại',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>

                <Col span={24}>
                <Form.Item
                        name="DiaChi"
                        label="Địa chỉ"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập địa chỉ',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập địa chỉ" />
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

export default KhachHangChiTiet;