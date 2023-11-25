import { Button, Col, DatePicker, Drawer, Form, Input, message, Row, Select, Space } from 'antd';
import dayjs from 'dayjs';

import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import ServiceKhuyenMai from '@/service/ServiceKhuyenMai';
import ServiceHangHoa from '@/service/ServiceHangHoa';
import useAsync from '@/hook/useAsync';
import ServiceOrder from '@/service/ServiceOrder';
const { Option } = Select;

const DrawerHoaDon = ({ form, open, setOpen, id, MaHH }) => {

    const { data: HangHoa } = useAsync(() => ServiceHangHoa.getAllHangHoa())

    const onClose = () => {
        setOpen(false);

    };
    useEffect(() => {
        console.log('MaHH', MaHH)
        if (MaHH != "") {
            (async () => {
                const res = await ServiceOrder.getAOrderDetails(MaHH, id)
                if (res) {
                    form.setFieldsValue({
                        MaHH: res[0].MaHH,
                        SL: res[0].SL,
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
            const resHH = await ServiceHangHoa.getHangHoa(values.MaHH)
            const thanhTien = resHH[0].GiaBan * values.SL


            const body = {
                "idMaHH": MaHH,
                "MaDH": id,
                "MaHH": values.MaHH,
                "SL": values.SL,
                "DVT": values.DVT,
                "ThanhTien": thanhTien
            }
            const res = await ServiceOrder.editOrderDetail(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")
            }

        } else {
            const resHH = await ServiceHangHoa.getHangHoa(values.MaHH)
            const thanhTien = resHH[0].GiaBan * values.SL

            const body = {

                "MaDH": id,
                "MaHH": values.MaHH,
                "SL": values.SL,
                "DVT": values.DVT,
                "ThanhTien": thanhTien
            }

            const res = await ServiceOrder.createOrderDetail(body)

            if (res.message == "Đã tồn tại") {
                message.warning("Mã sản phẩm đã tồn tại!")
            } else if (res.message == "Thêm chi tiết đơn hàng mới thành công") {
                message.success("Thêm khuyến mãi mới thành công")
            }
        }


    };

    return (
        <>

            <Drawer
                title={MaHH != "" ? "Sửa chi tiết đơn hàng" : "Thêm chi tiết đơn hàng"}
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
                                name="SL"
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
                                        message: 'Hãy nhập đơn vị tính',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập đơn vị tính" />
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
export default DrawerHoaDon;