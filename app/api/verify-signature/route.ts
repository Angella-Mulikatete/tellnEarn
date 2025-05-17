import mongoose from 'mongoose';
import Signature from '../../../utils/models/sign-message';
import { NextRequest } from 'next/server'; // Import NextRequest

export async function GET(request: NextRequest) { // Use NextRequest and export named GET
  const userAddress = request.nextUrl.searchParams.get('userAddress');
  const campaignId = request.nextUrl.searchParams.get('campaignId');

  if (!userAddress || !campaignId) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 }); // Use Response.json
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const claim = await Signature.findOne({
      userAddress,
      campaignId,
    });

    return Response.json({
      claimed: !!claim,
    }, { status: 200 }); // Use Response.json
  } catch (error) {
    console.error('Error fetching claim:', error);
    return Response.json({ error: 'Failed to fetch claim status' }, { status: 500 }); // Use Response.json
  }
}

// No default export
