

import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";



import { authorsTableData } from "@/data";
import useAsync from "@/hook/useAsync";
import ServiceHangHoa from "@/service/ServiceHangHoa";
import { Link, useParams } from "react-router-dom";
import { Button, Form, message, Popconfirm } from "antd";
import ServiceSieuThi from "@/service/ServiceSieuThi";
import ServiceKhuyenMai from "@/service/ServiceKhuyenMai";
import dayjs from "dayjs";
import DrawerKhuyenMai from "@/component/drawer/drawerKhuyenMai";
import { useState } from "react";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
import ServiceOrder from "@/service/ServiceOrder";
import DrawerHoaDon from "@/component/drawer/drawerHoaDon";
import ServiceDeliveryReceipt from "@/service/ServiceDeliveryReceipt";
import DrawerPhieuNhap from "@/component/drawer/drawerPhieuNhap";



const ChiTietPhieuNhap = () => {
    const [form] = Form.useForm();
    const { id } = useParams()
    const { data: phieuNhap } = useAsync(() => ServiceDeliveryReceipt.getDeliveryReceiptDetail(id))
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState("add");
    const [MaHH, setMaHH] = useState("");

    const confirm = async (idDH, MaHangHoa) => {
        const body = {
            "MaDH": idDH,
            "MaHH": MaHangHoa
        }
        const res = await ServiceOrder.deleteOrderDetail(body)
        if (res.message == "Xóa chi tiết đơn hàng thành công") {
            message.success("Xóa dữ liệu thành công")
            setTimeout(() => {
                window.location.reload()
            }, 3000);
        }
        else
            message.error("Lỗi xóa dữ liệu, Dữ liệu này đang tồn tại ở bảng khác")
    }

    const handleEditClick = (id) => {
        setMaHH(id)
        setOpen(true)

    };
    const handleCreateClick = () => {
        setMaHH("")
        setOpen(true)

    };
    return (
        <div className="mt-32 mb-8 flex flex-col gap-12">
            <Button type="dashed" onClick={() => handleCreateClick()} icon={<PlusIcon className="text-black" />}>
                Thêm chi tiết
            </Button>
            <DrawerPhieuNhap form={form} open={open} id={id} MaHH={MaHH} setOpen={setOpen} />
            <Card>
                <CardHeader variant="gradient" color={"gray"
                } className="mb-8 p-6">
                    <Typography variant="h6" color={"white"}>
                        Danh sách phiếu nhập chi tiết
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["Mã phiếu nhập", "Giá nhập ", "Giá bán", "Số lượng ", "Thành tiền", "ĐVT", "Tên hàng hóa", ""].map((el) => (
                                    <th
                                        key={el}
                                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                    >
                                        <Typography
                                            variant="small"
                                            className="text-[11px] font-bold uppercase text-blue-gray-400"
                                        >
                                            {el}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {phieuNhap.map(
                                ({ MaPN, GiaNhap, GiaBan, SoLuong, ThanhTien, DVT, MaHH, TenHH }, key) => {
                                    const className = `py-3 px-5 ${key === authorsTableData.length - 1
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                        }`;

                                    return (
                                        <tr key={key + 1}>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {MaPN}
                                                </Typography>
                                            </td>

                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {GiaNhap}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {GiaBan}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {SoLuong}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {ThanhTien}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {DVT}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {TenHH}
                                                </Typography>
                                            </td>

                                            <td className={className}>
                                                <div className="flex ">

                                                    <Button onClick={() => handleEditClick(MaHH)} type="dashed">Sửa</Button>



                                                    <Popconfirm
                                                        title="Xóa dữ liệu"
                                                        description="Bạn chắc xóa dữ liệu này?"
                                                        onConfirm={() => confirm(MaKM, MaHH)}
                                                        okText="Đồng ý"
                                                        cancelText="Hủy"
                                                        okButtonProps={{ style: { backgroundColor: '#4096ff', } }}
                                                    >
                                                        <Button danger>Xóa</Button>
                                                    </Popconfirm>
                                                </div>

                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
}

export default ChiTietPhieuNhap;