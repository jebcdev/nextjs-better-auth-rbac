"use server";

import { seedUsers } from "./01-users";

const main = async () => {
    console.log("🌱 Starting seed...");

    await Promise.all([seedUsers()]);

    console.log("✅ Seed completed!");
};

main().catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
});
