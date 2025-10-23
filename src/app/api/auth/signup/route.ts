import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = createClient();
  const { email, password, name } = await request.json();

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ user: data.user });
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
 }
}