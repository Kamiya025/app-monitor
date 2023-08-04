export interface SumaryAllLogs {
  flowDatas: FlowData[]
  serviceDatas: ServiceData[]
}

export interface ServiceData {
  instanceName: string
  serviceName: string
  hostName: string
  netName: string
  numberRequest: number
  totalProcessingTime: number
  avgProcessingTime: number
}
export interface FlowData {
  flowName: string
  sourceInstanceName: string
  destInstanceName: string
  hostName: string
  netName: string
  numberRequest: number
  totalProcessingTime: number
  avgProcessingTime: number
}
export interface InstanceLog {
  requested_time: number
  response_time: number
  processing_time: number
  request_id: string
  status_code: string
  correlation_id: string
  url: string
  sourceService: string
  destService: string
  serviceName: string
  instanceName: string
  hostName: string
  netName: string
  sourceHostName: string
  sourceNetName: string
  sourceInstanceName: string
}
export interface CorrelationLogs {
  requested_time: number
  response_time: number
  processing_time: number
  request_id: string
  status_code: string
  correlation_id: string
  url: string
  sourceService: string
  destService: string
  serviceName: string
  instanceName: string
  hostName: string
  netName: string
  sourceHostName: string
  sourceNetName: string
  sourceInstanceName: string
}
export interface LastData {
  value: number
  unit: string
}
export type InstanceLogSort = "processing_time" | "requested_time"
