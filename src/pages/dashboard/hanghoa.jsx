
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



import { authorsTableData, projectsTableData } from "@/data";
import useAsync from "@/hook/useAsync";
import ServiceHangHoa from "@/service/ServiceHangHoa";
import { Link } from "react-router-dom";
import { useMaterialTailwindController } from "@/context";
import Modal from "antd/es/modal/Modal";
import ModalHangHoa from "@/component/modal/modalHangHoa";
import { useState } from "react";



export function HangHoa() {
    const [controller, dispatch] = useMaterialTailwindController();
    const { sidenavColor, sidenavType, openSidenav } = controller;
    const { data: hangHoa } = useAsync(() => ServiceHangHoa.getAllHangHoa())

    const { id, setID } = useState()



    return (
        <div className="mt-32 mb-8 flex flex-col gap-12">
            <ModalHangHoa id={id} />
            <Card>
                <CardHeader variant="gradient" color={
                    sidenavColor === "dark" ? "gray" : sidenavColor
                } className="mb-8 p-6">
                    <Typography variant="h6" color={sidenavColor === "white" ? "gray" : "white"}>
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
                                        <tr key={MaHH}>
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

                                                    <Chip
                                                        variant="gradient"
                                                        color={"green"}
                                                        value={"Sửa"}
                                                        className="py-0.5 px-2 mx-2 text-[11px] font-medium w-fit"
                                                    />



                                                    <Chip
                                                        variant="gradient"
                                                        color={"red"}
                                                        value={"Xóa"}
                                                        className="py-0.5 px-2 text-[11px] font-medium w-fit"
                                                    />
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

