"use client";

import { ColorModeButton } from "@/components/ui/color-mode";
import { Box, Button, Color, Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Box>
                <VStack>
                    <ColorModeButton />
                    <Heading>Welcome to Budget-tracker</Heading>
                    <Link href="/login">
                        <Button>Go to Login</Button>
                    </Link>
                    <Link href="/register">
                        <Button>Go to Register</Button>
                    </Link>
                </VStack>
            </Box>
        </>
    );
}
