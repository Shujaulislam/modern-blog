import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Define the exact shape of the data we expect
const contactSchema = z.object({
  type: z.enum(['individual', 'company']),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  message: z.string().min(1, 'Message is required'),
});

// Infer the type from the schema
type ContactFormData = z.infer<typeof contactSchema>;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData: ContactFormData = contactSchema.parse(body);
    
    // Create the contact with validated data
    const contact = await prisma.contact.create({
      data: {
        type: validatedData.type,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone ?? null,
        company: validatedData.company ?? null,
        position: validatedData.position ?? null,
        message: validatedData.message,
      },
    });
    
    return NextResponse.json(
      { message: 'Contact form submitted successfully', id: contact.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation failed', errors: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
