import { useParams } from "react-router-dom";
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";
import ServiceDanhMuc from "@/service/ServiceDanhMuc";
import ServiceNhanHang from "@/service/ServiceNhanHang";
import useAsync from "@/hook/useAsync";
import ServiceHangHoa from "@/service/ServiceHangHoa";


export function HangHoaChiTiet() {
    const { id } = useParams()
    const [form] = Form.useForm();
    const { data: DanhMuc } = useAsync(() => ServiceDanhMuc.getAllDanhMuc())
    const { data: NhanHang } = useAsync(() => ServiceNhanHang.getAllNhanHang())

    useEffect(() => {
        if (id != "add") {
            (async () => {
                const res = await ServiceHangHoa.getHangHoa(id)
                if (res) {
                    form.setFieldsValue({
                        MaHH: res[0].MaHH,
                        TenHH: res[0].TenHH,
                        GiaBan: res[0].GiaBan,
                        GhiChu: res[0].GhiChu,
                        DanhMuc: res[0].DanhMuc,
                        MaNhanHang: res[0].MaNhanHang,

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
                "MaHH": values.MaHH,
                "TenHH": values.TenHH,
                "GiaBan": values.GiaBan,
                "GhiChu": values.GhiChu,
                "MaNhanHang": values.MaNhanHang,
                "DanhMuc": values.DanhMuc,
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


    };





    return (
        <div className="mt-32 mb-8 flex flex-col gap-12">
            <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="MaHH"
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
                            name="TenHH"
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
                            name="DanhMuc"
                            label="Danh mục"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn danh mục',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn danh mục">
                                {
                                    Array.isArray(DanhMuc) &&
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

