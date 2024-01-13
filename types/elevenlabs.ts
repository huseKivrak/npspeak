export interface ElevenLabsVoice {
  voice_id: string;
  category: string;
  name: string;
  preview_url: string;
  labels: {[key: string]: string};
}