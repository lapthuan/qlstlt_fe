import { authorsTableData, projectsTableData } from "@/data";
import useAsync from "@/hook/useAsync";
import ServiceOrder from "@/service/ServiceOrder";
import { Link } from "react-router-dom";
import { useMaterialTailwindController } from "@/context";
import Modal from "antd/es/modal/Modal";
import ModalHangHoa from "@/component/modal/modalHangHoa";
import { useState } from "react";
import { Button, message, Popconfirm } from "antd";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Tooltip,
    Progress,
} from "@material-tailwind/react";
import dayjs from "dayjs";
const HoaDon = () => {
    const { data: donhang } = useAsync(() => ServiceOrder.getAllOrder())
        const confirm = async (id) => {
    
            const res = await ServiceOrder.deleteOrder(id)
            if (res.message == "Xóa đơn hàng thành công") {
                message.success("Xóa dữ liệu thành công")
                setTimeout(() => {
                    window.location.reload()
                }, 3000);
            }
            else
                message.error("Lỗi xóa dữ liệu, Dữ liệu này đang tồn tại ở bảng khác")
        }
    return (
        <div className="mt-32 mb-8 flex flex-col gap-12">
            <Link to={"./add"}> <Button >Thêm dữ liệu</Button></Link>

            <Card>
                <CardHeader variant="gradient" color={"gray"
                } className="mb-8 p-6">
                    <Typography variant="h6" color={"white"}>
                        Danh sách đơn hàng
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["Mã đơn hàng", "Tên khách hàng","Tên nhân viên", "Ngày mua", "Thanh toán","Chi tiết","Hành động"].map((el) => (
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
                            {donhang.map(
                                ({ MaDH,MaKH, MaNV, NgayDH,ThanhToan}, key) => {
                                    const className = `py-3 px-5 ${key === authorsTableData.length - 1
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                        }`;

                                    return (
                                        <tr key={key + 1}>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {MaDH}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {MaKH}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {MaNV}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {dayjs(NgayDH).format("DD-MM-YYYY HH:mm:ss")}
                                                </Typography>
                                            </td>
                                           
                                           
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {ThanhToan}
                                                </Typography>
                                            </td>

                                            <td className={className}>
                                                <Link to={`../chi-tiet-don-hang/${MaDH}`}> <Button type="dashed" >Xem</Button>      </Link>
                                            </td>
                                            
                                            <td className={className}>
                                                <div className="flex ">
                                                    <Link to={`./${MaDH}`}>
                                                        <Button type="dashed">Sửa</Button>
                                                </Link>


                                                <Popconfirm
                                                    title="Xóa dữ liệu"
                                                    description="Bạn chắc xóa dữ liệu này?"
                                                    onConfirm={() => confirm(MaDH)}
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
        </div >
    );
}

export default HoaDon;