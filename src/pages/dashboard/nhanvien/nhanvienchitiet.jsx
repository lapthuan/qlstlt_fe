import { useParams } from "react-router-dom";
import { Button, Col, Form, Input, message, Row, Select, Space,DatePicker } from "antd";
import { useEffect, useState } from "react";
import ServiceCuaHang from "@/service/ServiceCuaHang";
import ServiceEmployee from "@/service/ServiceEmployee";
import useAsync from "@/hook/useAsync";
import dayjs from "dayjs";
const NhanVienChiTiet = () => {
    const { id } = useParams()
    const [form] = Form.useForm();
    const { data: sieuthi } = useAsync(() => ServiceCuaHang.getAllCuaHang())

    useEffect(() => {
        if (id != "add") {
            (async () => {
                const res = await ServiceEmployee.getAEmployee(id)
                if (res) {
                    const ngaysinhfm = dayjs(res[0].NgaySinh, 'YYYY-MM-DD');
                    form.setFieldsValue({
                        MaNV: res[0].MaNV,
                        HoTen: res[0].HoTen,
                        GioiTinh: res[0].GioiTinh,
                        NgaySinh: ngaysinhfm,
                        DiaChi: res[0].DiaChi,
                        SDT: res[0].SDT,
                        Email: res[0].Email,
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
            const ngaysinh = dayjs(values.NgaySinh).format('YYYY-MM-DD')
            const body = {
                
                "MaNV": values.MaNV,
                "HoTen": values.HoTen,
                "GioiTinh": values.GioiTinh,
                "NgaySinh": ngaysinh,
                "DiaChi": values.DiaChi,
                "SDT": values.SDT,
                "Email": values.Email,
                "MaST": values.MaST,
            }

            const res = await ServiceEmployee.editEmployee(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {
            const ngaysinh = dayjs(values.NgaySinh).format('YYYY-MM-DD')
            const body = {
                
                "MaNV": values.MaNV,
                "HoTen": values.HoTen,
                "GioiTinh": values.GioiTinh,
                "NgaySinh": ngaysinh,
                "DiaChi": values.DiaChi,
                "SDT": values.SDT,
                "Email": values.Email,
                "MaST": values.MaST,
            }

            const res = await ServiceEmployee.createEmployee(body)

            if (res.message == "Đã tồn tại") {
                message.warning("Mã sản phẩm đã tồn tại!")
            } else if (res.message == "Thêm nhân viên mới thành công") {
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
                            name="MaNV"
                            label="Mã nhân viên"

                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã nhân viên',
                                },
                            ]}
                        >
                            <Input disabled={id != "add" ? true : false} placeholder="Nhập mã nhân viên" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="HoTen"
                            label="Tên nhân viên"
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
                            name="GioiTinh"
                            label="Giới tính"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn giới tính',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn giới tính">
                                <Option value="Nam">Nam</Option>
                                <Option value="Nu">Nữ</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="NgaySinh"
                            label="Ngày sinh"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn ngày sinh',
                                },
                            ]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                format="DD-MM-YYYY"
                                placeholder="Chọn ngày sinh" />
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
                                    Array.isArray(sieuthi) &&
                                    sieuthi.map((item, i) => (
                                        <Option key={i + 1} value={item.MaST}>{item.TenST}</Option>
                                    ))}


                            </Select>
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={16}>

                    <Col span={8}>
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

                    <Col span={8}>
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
                    <Col span={8}>
                    <Form.Item
                            name="Email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập email',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập email" />
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

export default NhanVienChiTiet;