import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
      console.log(req.body)
      const user = {id: '1', name: 'ade', email: 'ade@gmail.com', phone: '08031112345'}
      const jwt = 'bh90345894@&*#*#*()))_*&JJ&U&'
      return NextResponse.json({success: true, jwt, user})
  } catch (error: any) {
    return NextResponse.json({message: error.message})
  }
}