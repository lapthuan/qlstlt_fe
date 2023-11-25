import { authorsTableData, projectsTableData } from "@/data";
import useAsync from "@/hook/useAsync";
import ServiceDanhMuc from "@/service/ServiceDanhMuc";
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

const DanhMuc = () => {
    const { data: danhmuc } = useAsync(() => ServiceDanhMuc.getALDanhMuc())


    const confirm = async (id) => {

        const res = await ServiceHangHoa.deleteHangHoa(id)
        if (res.message == "Xóa danh mục thành công") {
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
                        Danh sách hàng hóa
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["Mã Hàng hóa", "Tên hàng hóa", "Giá bán", "Ghi chú", "Nhãn hàng", "Danh mục", ""].map((el) => (
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
                            {hangHoa.map(
                                ({ MaHH, TenHH, GiaBan, GhiChu, NhanHang, DanhMuc }, key) => {
                                    const className = `py-3 px-5 ${key === authorsTableData.length - 1
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                        }`;

                                    return (
                                        <tr key={key + 1}>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {MaHH}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {TenHH}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {GiaBan}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {GhiChu}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {NhanHang}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {DanhMuc}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <div className="flex ">
                                                    <Link to={`./${MaHH}`}>
                                                        <Button type="dashed">Sửa</Button>
                                                </Link>


                                                <Popconfirm
                                                    title="Xóa dữ liệu"
                                                    description="Bạn chắc xóa dữ liệu này?"
                                                    onConfirm={() => confirm(MaHH)}
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

export default DanhMuc;