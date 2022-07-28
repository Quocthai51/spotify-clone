import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;
  // allow the req if the following is true
  // 1. its a req for next auth session &
  //2.provider token is exist
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }


  // redirect user to login if they not have token
  if(!token && pathname !== "/login"){
    return NextResponse.rewrite(new URL('/login', req.url))
  }
}
