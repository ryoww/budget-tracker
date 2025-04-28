"use client";

import { PasswordInput, PasswordStrengthMeter } from "@/components/ui/password-input";
import { axiosClient } from "@/utils/axiosClient";
import { Box, Heading, VStack, Field, Input, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
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
            const res = await axiosClient.post("/register", {
                email,
                password,
                viewName,
            })

            router.push("/login");
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message);
            }
            else { 

                setError(error.message);
            }

        }
    };

    return <>
        <Box maxW="md" mx="auto" mt={8}>

            <Heading mb={6}>Register</Heading>

            <VStack spaceY={4} spaceX={4} align="stretch">
                <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <Field.RequiredIndicator />
                    <Input placeholder="example@example.com" /> 
                    <Field.ErrorText>{error}</Field.ErrorText>
                </Field.Root>

                <Field.Root>
                    <Field.Label>Password</Field.Label>
                    <Field.RequiredIndicator />
                    <PasswordInput placeholder="********" />
                    {/* <PasswordStrengthMeter value={2} /> */}
                    <Field.ErrorText>{error}</Field.ErrorText>
                    
                </Field.Root>

                <Stack m={0}>
                    <PasswordInput placeholder="********" />
                    <PasswordStrengthMeter value={0} />
                </Stack>



            </VStack>

        </Box>
    </>
}
