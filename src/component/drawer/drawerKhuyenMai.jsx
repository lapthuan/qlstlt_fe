import { Button, Col, DatePicker, Drawer, Form, Input, message, Row, Select, Space } from 'antd';
import dayjs from 'dayjs';

import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import ServiceKhuyenMai from '@/service/ServiceKhuyenMai';
import ServiceHangHoa from '@/service/ServiceHangHoa';
import useAsync from '@/hook/useAsync';
const { Option } = Select;

const DrawerKhuyenMai = ({ form, open, setOpen, id, MaHH }) => {

    const { data: HangHoa } = useAsync(() => ServiceHangHoa.getAllHangHoa())

    const onClose = () => {
        setOpen(false);

    };
    useEffect(() => {
        console.log('MaHH', MaHH)
        if (MaHH != "") {
            (async () => {
                const res = await ServiceKhuyenMai.getALKhuyenMaiCTDetail(MaHH, id)
                const NgayApDungfm = dayjs(res[0].NgayApDung, 'YYYY-MM-DD');
                const NgayHetHanfm = dayjs(res[0].NgayHetHan, 'YYYY-MM-DD');
                if (res) {
                    form.setFieldsValue({
                        MucGiam: res[0].MucGiam,
                        NgayApDung: NgayApDungfm,
                        NgayHetHan: NgayHetHanfm,
                        MaHH: res[0].MaHH,
                    });
                }
            })();
        } else {
            form.resetFields()
        }
    }, [MaHH])

    const onFinish = async (values) => {

        if (MaHH != "") {
            const ngayapdung = dayjs(values.NgayApDung).format('YYYY-MM-DD')
            const ngayhethan = dayjs(values.NgayHetHan).format('YYYY-MM-DD')


            const body = {
                "idMaHH": MaHH,
                "MaKM": id,
                "MucGiam": values.MucGiam,
                "NgayApDung": ngayapdung,
                "NgayHetHan": ngayhethan,
                "MaHH": values.MaHH,
            }
            const res = await ServiceKhuyenMai.editKhuyenMaiCT(body)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")
            }

        } else {
            const ngayapdung = dayjs(values.NgayApDung).format('YYYY-MM-DD')
            const ngayhethan = dayjs(values.NgayHetHan).format('YYYY-MM-DD')


            const body = {

                "MaKM": id,
                "MucGiam": values.MucGiam,
                "NgayApDung": ngayapdung,
                "NgayHetHan": ngayhethan,
                "MaHH": values.MaHH,
            }

            const res = await ServiceKhuyenMai.createKhuyenMaiCT(body)

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
                title="Thêm chi tiết khuyến mãi"
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
                        <Col span={12}>
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
                        <Col span={12}>
                            <Form.Item
                                name="MucGiam"
                                label="Mức giảm"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập mức giảm',
                                    },
                                ]}
                            >
                                <Input type='number' placeholder="Nhập mức giảm" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="NgayApDung"
                                label="Ngày áp dụng"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy chọn ngày áp dụng',
                                    },
                                ]}
                            >
                                <DatePicker
                                    style={{ width: "100%" }}
                                    format="DD-MM-YYYY"
                                    placeholder="Chọn ngày áp dụng" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="NgayHetHan"
                                label="Ngày hết hạn"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy chọn ngày hết hạn',
                                    },
                                ]}
                            >
                                <DatePicker
                                    style={{ width: "100%" }}
                                    format="DD-MM-YYYY"
                                    placeholder="Chọn ngày hết hạn" />
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
export default DrawerKhuyenMai;