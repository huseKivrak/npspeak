const ELEVENLABS_BASE_URL = 'https://api.elevenlabs.io/v1';

export async function GET(request: Request) {
	const response = await fetch(`${ELEVENLABS_BASE_URL}/voices`, {
		headers: {
			'xi-api-key': process.env.ELEVENLABS_API_KEY!,
		},
	});
	const data = await response.json();
	return Response.json(data);
}
