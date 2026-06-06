import { NextResponse } from 'next/server';
import { DEFAULT_SERVICES } from '@/lib/constants';

/**
 * GET /api/services
 * Returns the list of all available services.
 */
export async function GET() {
  return NextResponse.json({ services: DEFAULT_SERVICES });
}

/**
 * POST /api/services
 * Mock-creates a new service and returns a generated ID.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, duration_minutes, fee } = body;

    if (!name) {
      return NextResponse.json({ error: 'Service name is required' }, { status: 400 });
    }

    const generatedId = `srv-${Date.now().toString(36)}`;

    return NextResponse.json({
      success: true,
      service: {
        id: generatedId,
        name,
        description: description || '',
        duration_minutes: duration_minutes || 30,
        fee: fee || 0,
        sort_order: DEFAULT_SERVICES.length,
        is_active: true,
        icon: body.icon || '🏥',
      },
    }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

/**
 * PATCH /api/services
 * Mock-updates an existing service.
 */
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Service ${id} updated successfully`,
      updated_fields: Object.keys(updates),
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
