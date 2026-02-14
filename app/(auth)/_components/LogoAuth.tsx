import { useRouter } from "next/navigation";

export function LogoAuth() {
    const router = useRouter();

    return <div onClick={() => router.push("/")} className="mb-6 text-center cursor-pointer">
        <div className="text-4xl font-extrabold tracking-wide">TASCHEN</div>
    </div>

}