


import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";



import { authorsTableData } from "@/data";
import useAsync from "@/hook/useAsync";
import ServiceHangHoa from "@/service/ServiceHangHoa";
import { Link } from "react-router-dom";
import { Button, message, Popconfirm } from "antd";
import ServiceSieuThi from "@/service/ServiceSieuThi";
import ServiceBranch from "@/service/ServiceBranch";






const ChiNhanh = () => {
    const { data: chiNhanh } = useAsync(() => ServiceBranch.getAllBranch())




    return (

        <div className="mt-32 mb-8 flex flex-col gap-12">


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
                                {["Mã siêu thị", "Tên siêu thị", "Địa chỉ", "Số điện thoại", "Email", "Mã chi nhánh"].map((el) => (
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
                            {chiNhanh.map(
                                ({ MaCN, TenCN, DiaChi, TenTinh }, key) => {
                                    const className = `py-3 px-5 ${key === authorsTableData.length - 1
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                        }`;

                                    return (
                                        <tr key={key + 1}>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {MaCN}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {TenCN}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {DiaChi}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {TenTinh}
                                                </Typography>
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

export default ChiNhanh;