
export interface SynthesisResult {
  acknowledgment: string;
  strategy: string;
  artifact: string;
}

export enum SynthesisStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  ARCHITECTING = 'ARCHITECTING',
  REFINING = 'REFINING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}
