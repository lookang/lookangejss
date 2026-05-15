
import { type FC } from 'react';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  icon: FC<{ className?: string }>;
  promptTemplate: string;
}

export interface ApiKeys {
  openAI: string;
  claude: string;
}
