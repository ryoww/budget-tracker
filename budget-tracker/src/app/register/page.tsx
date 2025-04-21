import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [viewName, setViewName] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        setError("");

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
            setError("パスワードは6文字以上で、英字と数字を含む必要があります。");
            return;
        }

        try {
        } catch (error) {
            setError("登録に失敗しました。");
        }
    };
}
