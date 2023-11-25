import { useParams } from "react-router-dom";
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";
import ServiceDanhMuc from "@/service/ServiceDanhMuc";
import ServiceNhanHang from "@/service/ServiceNhanHang";
import useAsync from "@/hook/useAsync";
import ServiceHangHoa from "@/service/ServiceHangHoa";
import ServiceBranch from "@/service/ServiceBranch";
import ServiceSieuThi from "@/service/ServiceSieuThi";

const SieuThiChiTiet = () => {

    const { id } = useParams()
    const [form] = Form.useForm();
    const { data: chiNhanh } = useAsync(() => ServiceBranch.getAllBranch())


    useEffect(() => {
        if (id != "add") {
            (async () => {
                const res = await ServiceSieuThi.getASieuThi(id)
                if (res) {
                    form.setFieldsValue({
                        MaST: res[0].MaST,
                        TenST: res[0].TenST,
                        DiaChi: res[0].DiaChi,
                        SDT: res[0].SDT,
                        Email: res[0].Email,
                        MaCN: res[0].MaCN,

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
                "MaST": values.MaST,
                "TenST": values.TenST,
                "DiaChi": values.DiaChi,
                "SDT": values.SDT,
                "Email": values.Email,
                "MaCN": values.MaCN,
            }

            const res = await ServiceSieuThi.editSieuThi(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {
            const body = {
                "MaST": values.MaST,
                "TenST": values.TenST,
                "DiaChi": values.DiaChi,
                "SDT": values.SDT,
                "Email": values.Email,
                "MaCN": values.MaCN,
            }

            const res = await ServiceSieuThi.createSieuThi(body)

            if (res.message == "Đã tồn tại") {
                message.warning("Mã sản phẩm đã tồn tại!")
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
                            name="MaST"
                            label="Mã siêu thị"

                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã siêu thị',
                                },
                            ]}
                        >
                            <Input disabled={id != "add" ? true : false} placeholder="Nhập mã siêu thị" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="TenST"
                            label="Tên siêu thị"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên siêu thị',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên siêu thị" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
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
                    <Col span={12}>
                        <Form.Item
                            name="SDT"
                            label="SĐT"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy số điện thoại',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>
                    </Col>


                </Row>

                <Row gutter={16}>

                    <Col span={12}>
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
                            <Input type="email" placeholder="Nhập email" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="MaCN"
                            label="Chi nhánh"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn chi nhánh',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn chi nhánh">
                                {
                                    Array.isArray(chiNhanh) &&
                                    chiNhanh?.map((item, i) => (
                                        <Option key={i + 1} value={item.MaCN}>{item.TenCN}</Option>

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

export default SieuThiChiTiet;