import { useParams } from "react-router-dom";
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";
import ServiceCuaHang from "@/service/ServiceCuaHang";
import ServiceEmployee from "@/service/ServiceEmployee";
import useAsync from "@/hook/useAsync";
const NhanVienChiTiet = () => {
    const { id } = useParams()
    const [form] = Form.useForm();
    const { data: sieuthi } = useAsync(() => ServiceCuaHang.getAllCuaHang())

    useEffect(() => {
        if (id != "add") {
            (async () => {
                const res = await ServiceEmployee.getAEmployee(id)
                console.log(res);
                if (res) {
                    form.setFieldsValue({
                        MaNV: res[0].MaNV,
                        HoTen: res[0].HoTen,
                        GioiTinh: res[0].GioiTinh,
                        NgaySinh: res[0].NgaySinh,
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
            const body = {
                "MaNV": values.MaNV,
                "HoTen": values.HoTen,
                "GioiTinh": values.GioiTinh,
                "NgaySinh": values.NgaySinh,
                "DiaChi": values.DiaChi,
                "SDT": values.SDT,
                "Email": values.Email,
                "MaST": values.MaST,
            }

            const res = await ServiceHangHoa.editHangHoa(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {
            const body = {
                "MaNV": values.MaNV,
                "HoTen": values.HoTen,
                "GioiTinh": values.GioiTinh,
                "NgaySinh": values.NgaySinh,
                "DiaChi": values.DiaChi,
                "SDT": values.SDT,
                "Email": values.Email,
                "MaST": values.MaST,
            }

            const res = await ServiceHangHoa.createHangHoa(body)

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
                            label="Mã sản phẩm"

                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã sản phẩm',
                                },
                            ]}
                        >
                            <Input disabled={id != "add" ? true : false} placeholder="Nhập mã sản phẩm" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="HoTen"
                            label="Tên sản phẩm"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên sản phẩm',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên sản phẩm" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
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
                            <Select placeholder="Chọn danh mục">
                                {
                                    Array.isArray(si) &&
                                    DanhMuc?.map((item, i) => (
                                        <Option key={i + 1} value={item.MaDanhMuc}>{item.Ten}</Option>

                                    ))}

                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="MaNhanHang"
                            label="Nhãn hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn nhãn hàng',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn nhãn hàng">
                                {
                                    Array.isArray(NhanHang) &&
                                    NhanHang?.map((item, i) => (
                                        <Option key={i + 1} value={item.MaNhanHang}>{item.Ten}</Option>

                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>


                </Row>

                <Row gutter={16}>

                    <Col span={12}>
                        <Form.Item
                            name="GiaBan"
                            label="Giá"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập giá',
                                },
                            ]}
                        >
                            <Input type="number" placeholder="Nhập giá sản phẩm" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="GhiChu"
                            label="Ghi chú"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy Ghi chú',
                                },
                            ]}
                        >
                            <Input.TextArea rows={4} placeholder="Nhập Ghi chú" />
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