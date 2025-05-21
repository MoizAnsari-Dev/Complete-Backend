import {Client as workflowClient} from '@upstash/workflow';
import dotenv from 'dotenv';
dotenv.config();

const workflow = new workflowClient({
  baseUrl: process.env.WORKFLOW_URL,
  token: process.env.WORKFLOW_TOKEN,
});
