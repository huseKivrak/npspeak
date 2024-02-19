'use server';
import fs from 'fs';
import {v4 as uuidv4} from 'uuid';
import {BASE_URL, ELEVENLABS_API_HEADERS} from '../utils/elevenlabs/api';

export async function CreateVoiceClone(prevState: any, formData: FormData) {
	//todo: add audio file to db
	// const cookieStore = cookies();
	// const supabase = createClient(cookieStore);

	console.log('formData: ', formData);

	try {
		const response = await fetch(`${BASE_URL}/voices/add`, {
			method: 'POST',
			headers: ELEVENLABS_API_HEADERS,
			body: formData,
		});

		const data = await response.json();
		console.log('voice:', data.voice_id);
		//todo: add voice_id to db    return { message:`${data.voice_id}` };
	} catch (error) {
		return {message: `Error: ${error}`};
	}
}

export async function CreateAudioClip(prevState: any, formData: FormData) {
	const voice_id = formData.get('voice_id');

	const userText = formData.get('text');
	console.log('voice_id: ', voice_id);
	console.log('text: ', userText);

	const requestBody = JSON.stringify({
		model_id: 'eleven_multilingual_v2',
		text: userText,
	});

	try {
		const response = await fetch(`${BASE_URL}/text-to-speech/${voice_id}`, {
			method: 'POST',
			headers: {
				...ELEVENLABS_API_HEADERS,
				'Content-Type': 'application/json',
			},
			body: requestBody,
		});
		console.log('response: ', response);
		if (response.ok) {
			const blob = await response.blob();
			const buffer = await blob.arrayBuffer();
			const fileName = `${uuidv4()}.mp3`;
			const filePath = `public/${fileName}`;
			console.log('filePath: ', filePath);
			fs.writeFileSync(filePath, Buffer.from(buffer));
			console.log('** file writing complete** ');
			//todo: add audio file to db/storage

			//todo: redirect to `/text-to-speech/${audio_id}` or similiar
			return {message: 'audio recording complete', audioUrl: `${fileName}`};
		}
	} catch (error) {
		console.error(error);
		return {message: `Error: ${error}`};
	}
}
