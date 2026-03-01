import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json({ error: "Missing reCAPTCHA token" }, { status: 400 });
        }

        const secret = process.env.RECAPTCHA_SECRET_KEY;
        if (!secret) {
            console.error("RECAPTCHA_SECRET_KEY is not defined");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${secret}&response=${token}`,
        });

        const verifyData = await verifyRes.json();

        if (!verifyData.success || verifyData.score < 0.5) {
            return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Signin reCAPTCHA verification error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
