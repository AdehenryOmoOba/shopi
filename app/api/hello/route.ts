import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import {getServerSession} from 'next-auth'

export async function GET() {
  const sessionData = await getServerSession(authOptions)
  
  return NextResponse.json(sessionData)
}