import { meta } from '@k4itrun/config';
import axios from 'axios';
import { NextRequest, NextResponse } from "next/server";

interface Repository {
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

export async function GET(request: NextRequest) {
  let repos: Repository[] | null = null;
  try {
    const res = await axios.get(`https://api.github.com/users/${meta.accounts.github.username}/repos`);
    repos = res?.data;
    return NextResponse.json(repos);
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}