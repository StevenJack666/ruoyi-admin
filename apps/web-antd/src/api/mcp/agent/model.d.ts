export interface Agent {
  id: number;
  marketName: string;
  description: string;
  configJson: string;
  status: number;
  toolIds: string;
  skillIds?: any;
}

export interface McpTool {
  keyword?: string;
  type?: string;
  status?: string;
}
