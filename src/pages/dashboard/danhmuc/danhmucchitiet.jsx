import { useParams } from "react-router-dom";
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";
import ServiceDanhMuc from "@/service/ServiceDanhMuc";
import useAsync from "@/hook/useAsync";

const DanhMucChiTiet = () => {
    const { id } = useParams()
    const [form] = Form.useForm();

    useEffect(() => {
        if (id != "add") {
            (async () => {
                const res = await ServiceDanhMuc.getALDanhMuc(id)
                console.log(res);
                if (res) {
                    form.setFieldsValue({
                        MaDanhMuc: res[0].MaDanhMuc,
                        Ten: res[0].Ten,
                        GhiChu: res[0].GhiChu,
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
                "MaDanhMuc": values.MaDanhMuc,
                "Ten": values.Ten,              
                "GhiChu": values.GhiChu,
            }

            const res = await ServiceDanhMuc.editDanhMuc(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

            }

        } else {
            const body = {
                "MaDanhMuc": values.MaDanhMuc,
                "Ten": values.Ten,              
                "GhiChu": values.GhiChu,
            }

            const res = await ServiceDanhMuc.createDanhMuc(body)

            if (res.message == "Đã tồn tại") {
                message.warning("Mã danh mục đã tồn tại!")
            } else if (res.message == "Thêm danh mục hàng hóa mới thành công") {
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
                            name="MaDanhMuc"
                            label="Mã danh mục"

                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã danh mục',
                                },
                            ]}
                        >
                            <Input disabled={id != "add" ? true : false} placeholder="Nhập mã danh mục" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="Ten"
                            label="Tên danh mục"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên danh mục',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên danh mục" />
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

export default DanhMucChiTiet;