import { faker } from '@faker-js/faker';
import { Tables, TablesInsert } from '../../types/supabase';
import { capitalize } from '../../utils/formatHelpers';
import { DefaultDialogueTypes } from '../../lib/constants';
import { db } from '.';
import { campaign_npcs, campaigns, npc_dialogues, npcs } from './schema';

const titlePrefixes = [
  'The Quest for',
  'The Search for',
  'A Journey into',
  'The Hunt for',
];
const voiceIds = [
  '21m00Tcm4TlvDq8ikWAM',
  '29vD33N1CtxCmqQRPOHJ',
  '2EiwWnXFnvU5JabPnv8n',
  '5Q0t7uMcjvnagumLfvZi',
  'AZnzlk1XvdvUeBnXmlld',
  'CYw3kZ02Hs0563khs1Fj',
  'D38z5RcWu1voky8WS1ja',
  'EXAVITQu4vr4xnSDxMaL',
  'ErXwobaYiN019PkySvjV',
  'GBv7mTt0atIp3Br8iCZE',
  'IKne3meq5aSn9XLyUdCD',
  'JBFqnCBsd6RMkjVDRZzb',
  'LcfcDJNUP1GQjkzn1xUU',
  'MF3mGyEYCl7XYWbV9V6O',
  'N2lVS1w4EtoT3dr4eOWO',
  'ODq5zmih8GrVes37Dizd',
  'SOYHLrjzK2X1ezoPC6cr',
  'TX3LPaxmHKxFdv7VOQHJ',
  'ThT5KcBeYPX3keUQqHPh',
  'TxGEqnHWrfWFTfGW9XjX',
  'VR6AewLTigWG4xSOukaG',
  'XB0fDUnXU5powFXDhCwa',
  'Xb7hH8MSUJpSbSDYk0k2',
  'XrExE9yKIg1WjnnlVkGX',
  'ZQe5CZNOzWyzPSCn5a3c',
  'Zlb1dXrM653N07WRdFW3',
  'bVMeCyTHy58xNoL34h3p',
  'flq6f7yk4E4fJM5XTYuZ',
  'g5CIjZEefAph4nQFvHAz',
  'iP95p4xoKVk53GoZ742B',
  'jBpfuIE2acCO8z3wKNLl',
  'jsCqWAovK2LkecY7zXl4',
  'nPczCjzI2devNBz1zQrb',
  'oWAxZDx7w5VEj9dCyTzz',
  'onwK4e9ZLuTAKqWW03F9',
  'pFZP5JQG7iQjIQuC4Bku',
  'pMsXgVXv3BLzUgSXRplE',
  'pNInz6obpgDQGcFmaJgB',
  'piTKgcLEGmPE4e6mEKli',
  'pqHfZKP75CvOlQylNhV4',
  't0jbNlBVZ17f02VDIeMI',
  'yoZ06aMxZJJ28mfd3POQ',
  'z9fAnlkpzviPz146aGWa',
  'zcAOhNBS3c14rBihAFp1',
  'zrHiDhphv9ZnVXBqCLjz',
  'knrPHWnBmmDHMoiMeP3l', //this is the santa voice, not available through API
];

const dialogueTypeIds = DefaultDialogueTypes.map(
  (dialogueType) => dialogueType.value
);

// Generating seed data

const createCampaignTitle = (): string => {
  const prefix = faker.helpers.arrayElement(titlePrefixes);
  const title = faker.company
    .catchPhrase()
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
  return `${prefix} ${title}`;
};

const createNPCName = (): string => {
  const name = faker.person.firstName();
  const animal = faker.animal.type();
  const adjective = faker.company.catchPhraseAdjective();
  return `${name} the ${adjective} ${capitalize(animal)}`;
};

const createCampaigns = (
  count: number,
  userId: string
): TablesInsert<'campaigns'>[] => {
  return Array.from({ length: count }, () => ({
    campaign_name: createCampaignTitle(),
    description: faker.lorem.sentences(),
    user_id: userId,
  }));
};

const createNPCs = (count: number, userId: string): TablesInsert<'npcs'>[] => {
  return Array.from({ length: count }, () => ({
    npc_name: createNPCName(),
    description: faker.lorem.sentence(),
    user_id: userId,
    voice_id: faker.helpers.arrayElement(voiceIds),
  }));
};

const createNPCDialogues = (
  count: number,
  npcId: number,
  userId: string
): TablesInsert<'npc_dialogues'>[] => {
  return Array.from({ length: count }, () => ({
    dialogue_type_id: faker.helpers.arrayElement(dialogueTypeIds),
    npc_id: npcId,
    text: faker.hacker.phrase(),
    user_id: userId,
  }));
};

// Database seeding

const insertCampaigns = async (count: number, userId: string) => {
  const campaignRows = createCampaigns(count, userId);
  const insertedCampaigns: Tables<'campaigns'>[] = await db
    .insert(campaigns)
    .values(campaignRows)
    .returning();
  console.log(`Successfully seeded ${campaignRows.length} campaigns.`);
  return insertedCampaigns.map((campaign) => campaign.id);
};

const insertNPCs = async (count: number, userId: string) => {
  const npcRows = createNPCs(count, userId);
  const insertedNPCs: Tables<'npcs'>[] = await db
    .insert(npcs)
    .values(npcRows)
    .returning();
  console.log(`Successfully seeded ${npcRows.length} NPCs.`);
  return insertedNPCs.map((npc) => npc.id);
};

const insertNPCDialogues = async (
  count: number,
  npcIds: number[],
  userId: string
) => {
  const npcDialogueRows = npcIds
    .map((npcId) => createNPCDialogues(count, npcId, userId))
    .flat();

  const insertedNPCDialogues: Tables<'npc_dialogues'>[] = await db
    .insert(npc_dialogues)
    .values(npcDialogueRows)
    .returning();
  console.log(`Successfully seeded ${npcDialogueRows.length} NPC dialogues.`);
  return insertedNPCDialogues.map((npcDialogue) => npcDialogue.id);
};

const createCampaignNPCs = (campaignIds: number[], npcIds: number[]) => {
  const shuffledNPCIds = faker.helpers.shuffle(npcIds);
  const npcsPerCampaign = Math.floor(npcIds.length / campaignIds.length);
  const extraNPCs = npcIds.length % campaignIds.length;

  let npcIndex = 0;
  const allCampaignNPCs: Tables<'campaign_npcs'>[] = [];

  campaignIds.forEach((campaignId, index) => {
    //add extra npcs to the first few campaigns
    const endIndex = npcIndex + npcsPerCampaign + (index < extraNPCs ? 1 : 0);
    const campaignNPCIds = shuffledNPCIds.slice(npcIndex, endIndex);

    const campaignNPCRows = campaignNPCIds.map((npcId) => ({
      campaign_id: campaignId,
      npc_id: npcId,
    }));
    allCampaignNPCs.push(...campaignNPCRows);
    npcIndex = endIndex;
  });

  return allCampaignNPCs;
};

const insertCampaignNPCs = async (
  allCampaignNPCs: Tables<'campaign_npcs'>[]
) => {
  const insertedCampaignNPCs = await db
    .insert(campaign_npcs)
    .values(allCampaignNPCs)
    .returning();

  console.log(
    `Successfully seeded ${insertedCampaignNPCs.length} campaign NPCs.`
  );
};

const seedDatabase = async (
  campaignsPerUser: number,
  npcsPerUser: number,
  dialoguePerNPC: number,
  userId: string
) => {
  const userCampaigns = await insertCampaigns(campaignsPerUser, userId);
  const userNPCs = await insertNPCs(npcsPerUser, userId);
  const allCampaignNPCs = createCampaignNPCs(userCampaigns, userNPCs);
  await insertCampaignNPCs(allCampaignNPCs);
  await insertNPCDialogues(dialoguePerNPC, userNPCs, userId);
  console.log('Database seeding complete.');
};

export default seedDatabase(3, 12, 16, '29173d36-05cb-4f2c-a5e2-6f9e41fd026c');
