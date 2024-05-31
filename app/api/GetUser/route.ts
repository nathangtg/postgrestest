import pool from "@/lib/db/db";

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export async function GET(request: Request) {
  try {
    const { rows } = await pool.query<User>("SELECT * FROM users");

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: "No users found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while fetching users" }),
      { status: 500 }
    );
  }
}
