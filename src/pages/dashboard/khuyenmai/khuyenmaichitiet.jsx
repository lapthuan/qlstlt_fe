import { useParams } from "react-router-dom";
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";
import ServiceDanhMuc from "@/service/ServiceDanhMuc";
import ServiceNhanHang from "@/service/ServiceNhanHang";
import useAsync from "@/hook/useAsync";
import ServiceHangHoa from "@/service/ServiceHangHoa";
import ServiceKhuyenMai from "@/service/ServiceKhuyenMai";


export function KhuyenMaiChiTiet() {
    const { id } = useParams()
    const [form] = Form.useForm();

    useEffect(() => {
        if (id != "add") {
            (async () => {
                const res = await ServiceKhuyenMai.getALKhuyenMai(id)
                if (res) {
                    form.setFieldsValue({
                        MaKM: res[0].MaKM,
                        Ten: res[0].Ten,
                        NoiDung: res[0].NoiDung,
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
                "MaKM": values.MaKM,
                "Ten": values.Ten,
                "NoiDung": values.NoiDung,
            }

            const res = await ServiceKhuyenMai.editKhuyenMai(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")
            }

        } else {
            const body = {
                "MaKM": values.MaKM,
                "Ten": values.Ten,
                "NoiDung": values.NoiDung,
            }

            const res = await ServiceKhuyenMai.createKhuyenMai(body)

            if (res.message == "Đã tồn tại") {
                message.warning("Mã sản phẩm đã tồn tại!")
            } else if (res.message == "Thêm khuyến mãi mới thành công") {
                message.success("Thêm khuyến mãi mới thành công")
            }
        }


    };





    return (
        <div className="mt-32 mb-8 flex flex-col gap-12">
            <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="MaKM"
                            label="Mã khuyến mãi"

                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã khuyến mãi',
                                },
                            ]}
                        >
                            <Input disabled={id != "add" ? true : false} placeholder="Nhập mã khuyến mãi" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="Ten"
                            label="Tên "
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên ',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên " />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="NoiDung"
                            label="Nội dung"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập nội dung',
                                },
                            ]}
                        >
                            <Input.TextArea rows={4} placeholder="Nhập nội dung" />
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

