import Loading from "@/app/loading";
import {
    generateAsyncDescription,
    generateAsyncTitle,
} from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: await generateAsyncTitle("Panel de Administración"),
        description:
            await generateAsyncDescription("Panel de Administración"),
    };
}

export default async function AdminDashboardPage() {
    
    return (
        <>
            <main>
                <h1>Panel de Administración</h1>
                <Loading />
                
            </main>
        </>
    );
}
