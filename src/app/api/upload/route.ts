import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const data = await request.formData()
    const file = data.get("file") as File | null

    if (!file) {
      return new NextResponse("No file provided", { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`

    // Upload to Cloudinary with preset
    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: "modern-blog",
      upload_preset: "modern-blog",
      allowed_formats: ["jpg", "png", "gif"],
      max_file_size: 10000000, // 10MB
    })

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    })
  } catch (error) {
    console.error("[UPLOAD_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
