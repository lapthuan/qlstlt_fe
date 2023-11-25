import { authorsTableData, projectsTableData } from "@/data";
import useAsync from "@/hook/useAsync";
import ServiceEmployee from "@/service/ServiceEmployee";
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
const NhanVien = () => {
    const { data: nhanvien } = useAsync(() => ServiceEmployee.getAllEmployee())
    console.log(nhanvien);
    
        const confirm = async (id) => {
    
            const res = await ServiceEmployee.deleteEmployee(id)
            if (res.message == "Xóa nhân viên thành công") {
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
                        Danh sách siêu thị
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["Mã nhân vên", "Tên nhân viên", "Giới tính", "Ngày sinh", "Địa chỉ", "SĐT", "Email", "Tên siêu thị","Hành động"].map((el) => (
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
                            {nhanvien.map(
                                ({ MaNV,HoTen,GioiTinh,NgaySinh,DiaChi, SDT, Email,MaST}, key) => {
                                    const className = `py-3 px-5 ${key === authorsTableData.length - 1
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                        }`;

                                    return (
                                        <tr key={key + 1}>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {MaNV}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {HoTen}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {GioiTinh}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {NgaySinh}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {DiaChi}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {SDT}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {Email}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {MaST}
                                                </Typography>
                                            </td>
                                            
                                            <td className={className}>
                                                <div className="flex ">
                                                    <Link to={`./${MaNV}`}>
                                                        <Button type="dashed">Sửa</Button>
                                                </Link>


                                                <Popconfirm
                                                    title="Xóa dữ liệu"
                                                    description="Bạn chắc xóa dữ liệu này?"
                                                    onConfirm={() => confirm(MaNV)}
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

export default NhanVien;