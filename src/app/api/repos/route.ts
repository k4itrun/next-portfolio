import { meta } from "@9ll-fun/config";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

interface IRepository {
 name: string;
 full_name: string;
 owner: {
  login: string;
 };
 description: string;
 stargazers_count: number;
 language: string;
 forks: number;
}

export async function GET(_request: NextRequest) {
 let repos: IRepository[] | [] = [];
 try {
  const res = await axios.get(`https://api.github.com/users/${meta.accounts.github.username}/repos`);
  repos = res?.data;
  return NextResponse.json(repos);
 } catch (_error) {
  return NextResponse.json({ message: "Internal server error" }, { status: 500 });
 }
}
