import { Button, Col, DatePicker, Drawer, Form, Input, message, Row, Select, Space } from 'antd';
import dayjs from 'dayjs';

import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import ServiceKhuyenMai from '@/service/ServiceKhuyenMai';
import ServiceHangHoa from '@/service/ServiceHangHoa';
import useAsync from '@/hook/useAsync';
import ServiceDeliveryReceipt from '@/service/ServiceDeliveryReceipt';
const { Option } = Select;

const DrawerPhieuNhap = ({ form, open, setOpen, id, MaHH }) => {

    const { data: HangHoa } = useAsync(() => ServiceHangHoa.getAllHangHoa())

    const onClose = () => {
        setOpen(false);

    };
    useEffect(() => {
        console.log('MaHH', MaHH)
        if (MaHH != "") {
            (async () => {
                const res = await ServiceDeliveryReceipt.getDeliveryReceiptDetails(MaHH, id)

                if (res) {
                    form.setFieldsValue({
                        MaHH: res[0].MaHH,
                        GiaNhap: res[0].GiaNhap,
                        GiaBan: res[0].GiaBan,
                        SoLuong: res[0].SoLuong,
                        DVT: res[0].DVT,
                    });
                }
            })();
        } else {
            form.resetFields()
        }
    }, [MaHH])

    const onFinish = async (values) => {

        if (MaHH != "") {
            const thanhTien = values.GiaNhap * values.SoLuong


            const body = {
                "idMaHH": MaHH,
                "MaHH": values.MaHH,
                "MaPN": id,
                "GiaNhap": values.GiaNhap,
                "GiaBan": values.GiaBan,
                "SoLuong": values.SoLuong,
                "ThanhTien": thanhTien,
                "DVT": values.DVT,
            }
            const res = await ServiceDeliveryReceipt.editDeliveryReceiptDetail(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")
            }

        } else {
            const thanhTien = values.GiaNhap * values.SoLuong

            const body = {


                "MaHH": values.MaHH,
                "MaPN": id,
                "GiaNhap": values.GiaNhap,
                "GiaBan": values.GiaBan,
                "SoLuong": values.SoLuong,
                "ThanhTien": thanhTien,
                "DVT": values.DVT,

            }

            const res = await ServiceDeliveryReceipt.createDeliveryReceiptDetail(body)

            if (res.message == "Đã tồn tại") {
                message.warning("Mã sản phẩm đã tồn tại!")
            } else if (res.message == "Thêm chi tiết khuyến mãi mới thành công") {
                message.success("Thêm khuyến mãi mới thành công")
            }
        }


    };

    return (
        <>

            <Drawer
                title={MaHH != "" ? "Sửa chi tiết phiếu nhập" : "Thêm chi tiết phiếu nhập"}
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}

            >
                <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="MaHH"
                                label="Hàng hóa"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy chọn hàng hóa',
                                    },
                                ]}
                            >
                                <Select placeholder="Chọn hàng hóa" disabled={MaHH != "" ? true : false}>
                                    {Array.isArray(HangHoa) &&
                                        HangHoa?.map((item, i) => (
                                            <Option key={i + 1} value={item.MaHH}>
                                                {item.TenHH}
                                            </Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="GiaNhap"
                                label="Giá nhập"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập giá nhập',
                                    },
                                ]}
                            >
                                <Input type='number' placeholder="Nhập giá nhập" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="GiaBan"
                                label="Giá bán"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập giá bán',
                                    },
                                ]}
                            >
                                <Input type='number' placeholder="Nhập giá bán" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="SoLuong"
                                label="Số lượng"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập số lượng',
                                    },
                                ]}
                            >
                                <Input type='number' placeholder="Nhập số lượng" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="DVT"
                                label="Đơn vị tính"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập Đơn vị tính',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập Đơn vị tính" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Space>
                            <Button onClick={onClose} type="dashed" danger>Hủy</Button>
                            <Button htmlType='submit' type="default" >
                                {MaHH != "" ? "Sửa" : "Thêm"}
                            </Button>
                        </Space>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};
export default DrawerPhieuNhap;