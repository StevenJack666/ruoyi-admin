export interface Bug {
  id: number;
  projectId: number;
  bugCode: string;
  title: string;
  severity: string;
  priority: string;
  status: string;
  foundVersion: string;
  fixedVersion: string;
  reproduceSteps: string;
  expectedResult: string;
  actualResult: string;
}
