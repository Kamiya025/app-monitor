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
