import ServiceEmployee from "@/service/ServiceEmployee";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export function SignIn() {
    const [taikhoan, setTaiKhoan] = useState()
    const [matkhau, setMatKhau] = useState()
    const navigate = useNavigate();
    const handlerLogin = async () => {
        const body = {
            taikhoan: taikhoan,
            matkhau: matkhau
        }
        const res = await ServiceEmployee.loginEmployee(body)

        if (res.message) {
            message.warning("Sai tài khoản hoặc mật khẩu")
        } else {
            message.success("Đăng nhập thành công")
            localStorage.setItem("user", JSON.stringify(res[0]));
            navigate("/")
        }
    }
    return (
        <section className="m-8 flex gap-4">
            <div className="w-full lg:w-3/5 mt-24">
                <div className="text-center">
                    <Typography variant="h2" className="font-bold mb-4">Đăng nhâp</Typography>
                    <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Đăng nhập quản lí siêu thị mini.</Typography>
                </div>
                <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Tài khoản
                        </Typography>
                        <Input
                            size="lg"
                            onChange={(e) => setTaiKhoan(e.target.value)}
                            placeholder="Nhập tài khoản"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Mật khẩu
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            onChange={(e) => setMatKhau(e.target.value)}
                            placeholder="Nhập mật khẩu"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>

                    <Button onClick={handlerLogin} className="mt-6" fullWidth>
                        Đăng nhập
                    </Button>



                </form>

            </div>
            <div className="w-2/5 h-full hidden lg:block">
                <img
                    src="/img/pattern.png"
                    className="h-full w-full object-cover rounded-3xl"
                />
            </div>

        </section>
    );
}

export default SignIn;
