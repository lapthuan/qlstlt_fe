import { useParams } from "react-router-dom";
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";
import useAsync from "@/hook/useAsync";
import ServiceEmployee from "@/service/ServiceEmployee";
import ServiceAccount from "@/service/ServiceAccount";


const TaiKhoanChiTiet = () => {

    const { id } = useParams()
    const [form] = Form.useForm();
    const { data: nhanvien } = useAsync(() => ServiceEmployee.getAllEmployee())


    useEffect(() => {
        if (id != "add") {
            (async () => {
                const res = await ServiceAccount.getAccount(id)
                if (res) {
                    form.setFieldsValue({
                        TenTK: res[0].TenTK,
                        MaNV: res[0].MaNV,
                        Matkhau: res[0].Matkhau,
                        Quyen: res[0].Quyen === 1 ? "Admin" : "User",
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
                "TenTK": values.TenTK,
                "MaNV": values.MaNV,
                "Matkhau": values.Matkhau,
                "Quyen": values.Quyen,
            }

            const res = await ServiceAccount.editAccount(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {
            const body = {
                "TenTK": values.TenTK,
                "MaNV": values.MaNV,
                "Matkhau": values.Matkhau,
                "Quyen": values.Quyen,
            }

            const res = await ServiceAccount.createAccount(body)

            if (res.message == "Đã tồn tại") {
                message.warning("Tài khoản đã tồn tại hoặc nhân viên đã có tài khoản!")
            } else if (res.message == "Thêm siêu thị mới thành công") {
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
                            name="TenTK"
                            label="Tài khoản"

                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tài khoản người dùng',
                                },
                            ]}
                        >
                            <Input disabled={id != "add" ? true : false} placeholder="Nhập tài khoản" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="Matkhau"
                            label="Mật khẩu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mật khẩu',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập mật khẩu" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>                  
                    <Col span={8}>
                        <Form.Item
                            name="Quyen"
                            label="Quyền"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn quyền',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn quyền">
                                <Option value="1">Admin</Option>
                                <Option value="0">User</Option>
                            </Select>
                        </Form.Item>
                        </Col>
                    <Col span={12}>
                        <Form.Item
                            name="MaNV"
                            label="Nhân viên"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn nhân viên cho tài khoản',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn nhân viên">
                                {
                                    Array.isArray(nhanvien) &&
                                    nhanvien?.map((item, i) => (
                                        <Option key={i + 1} value={item.MaNV}>{item.HoTen}</Option>

                                    ))}

                            </Select>
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

export default TaiKhoanChiTiet;