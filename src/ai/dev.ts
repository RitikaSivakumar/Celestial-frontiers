'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/ai-chatbot-mood-analysis.ts';
import '@/ai/flows/ai-chatbot-diary-entry-analysis.ts';
import '@/ai/flows/early-disease-detection.ts';
import '@/ai/flows/joke-flow.ts';
