import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

// GET /api/posts - Get all blog posts
export async function GET() {
  try {
    await connectDB();
    const posts = await BlogPost.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: posts });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { title, content, excerpt, author, tags } = body;

    if (!title || !content || !excerpt || !author) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const post = await BlogPost.create({
      title,
      content,
      excerpt,
      author,
      tags: tags || [],
    });

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
}