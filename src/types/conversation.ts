export interface Conversation {
  id: string;
  timestamp: string;
  duration: string;
  owner: string;
  talkRatio: number;
  tags: string[];
  summary: string;
}
