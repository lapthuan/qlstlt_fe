
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";



import { authorsTableData } from "@/data";
import useAsync from "@/hook/useAsync";
import { Link } from "react-router-dom";
import { Button, message, Popconfirm } from "antd";
import ServiceAccount from "@/service/ServiceAccount";



const Account = () => {
    const { data: account } = useAsync(() => ServiceAccount.getAllAccount())

console.log(account);
    const confirm = async (id) => {

        console.log(id);
        const res = await ServiceAccount.deleteAccount(id)
        if (res.message == "Xóa tài khoản thành công") {
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
                        Danh sách tài khoản
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["Tài khoản", "Mật khẩu", "Quyền", "Nhân viên", ""].map((el) => (
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
                            {account.map(
                                ({ TenTK, MaNV, Matkhau, Quyen}, key) => {
                                    const className = `py-3 px-5 ${key === authorsTableData.length - 1
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                        }`;

                                    return (
                                        <tr key={key + 1}>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {TenTK}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {Matkhau}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {Quyen === 1 ? (
                                                        <div className="p-1 bg-red-500 text-white text-center rounded-full ml-auto mr-auto">
                                                            <span className="text-center">Admin</span>
                                                        </div>
                                                    
                                                        ) : ( <div className="p-1 bg-green-500 text-white text-center rounded-full ml-auto mr-auto">
                                                        <span className="text-center">User</span>
                                                    </div>)}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {MaNV}
                                                </Typography>
                                            </td>                 
                                            <td className={className}>
                                                <div className="flex ">
                                                    <Link to={`./${TenTK}`}>
                                                        <Button type="dashed">Sửa</Button>
                                                    </Link>


                                                    <Popconfirm
                                                        title="Xóa dữ liệu"
                                                        description="Bạn chắc xóa dữ liệu này?"
                                                        onConfirm={() => confirm(TenTK)}
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

export default Account;