export interface APiResponse {
  message: string;
  operation: 'SUCCESS' | 'FAILED';
  data: any;
}
