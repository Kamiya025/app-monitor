import { useEffect, useState } from "react"
import { Flow } from "../../components/flow"
import { InstanceLog } from "../../components/instance-log"
import { FlowData, InstanceLogSort } from "../../model"

export default function Home() {
  const [instanceSelect, setInstanceSelect] = useState<any>(undefined)
  const [edgeSelect, setEdgeSelect] = useState<FlowData | undefined>(undefined)
  const [correlationSelect, setCorrelationSelect] = useState<string>("")
  const [time, setTime] = useState<number>(5)

  const [instanceSort, setInstanceSort] =
    useState<InstanceLogSort>("requested_time")
  useEffect(() => {
    if (!instanceSelect) setCorrelationSelect("")
  }, [instanceSelect])

  return (
    <main className={"h-screen bg-lime-100"}>
      <div className="grid grid-cols-12">
        {edgeSelect && (
          <div className=" flex flex-col max-w-xs gap-3 p-1 bg-white/30 fixed top-0 mx-auto z-50">
            <div>
              <span className="font-bold">Source:</span>
              {edgeSelect.sourceInstanceName}
            </div>
            <div>
              <span className="font-bold">Dest:</span>
              {edgeSelect.destInstanceName}
            </div>
            <div>
              <span className="font-bold">Number Request:</span>
              {edgeSelect.numberRequest}
            </div>
            <div>
              <span className="font-bold">AVG Process:</span>
              {edgeSelect.avgProcessingTime}
            </div>
          </div>
        )}
        {/* <div className=" flex gap-3 p-1 bg-white fixed top-0 mx-auto z-50">
          <span
            className={`${time === 5 && "bg-slate-300"} p-2`}
            onClick={() => setTime(5)}
          >
            5 min
          </span>
          <span
            className={`${time === 10 && "bg-slate-300"} p-2`}
            onClick={() => setTime(10)}
          >
            10 min
          </span>
          <span
            className={`${time === 15 && "bg-slate-300"} p-2`}
            onClick={() => setTime(15)}
          >
            15 min
          </span>
        </div> */}
        <div className="col-span-9 bg-lime-100 bg-opacity-25 justify-center h-screen">
          <Flow
            time={time}
            instanceSelect={instanceSelect}
            setInstanceSelect={setInstanceSelect}
            setEdgeSelect={setEdgeSelect}
            correlationSelect={correlationSelect}
          />
        </div>
        <div className="col-span-3 p-5 right-0 top-0 bg-grey-1 border rounded-lg bg-slate-50 overflow-scroll h-screen">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <label className="font-bold mx-2 ">Sort by:</label>
              <select
                id="sort"
                className="border-2 rounded px-2 border-black"
                onChange={(e) => {
                  setInstanceSort(e.currentTarget.value as InstanceLogSort)
                }}
              >
                <option
                  value="requested_time"
                  selected={instanceSort === "requested_time"}
                >
                  Requested Time
                </option>
                <option
                  value="processing_time"
                  selected={instanceSort === "processing_time"}
                >
                  Processing Time
                </option>
              </select>
            </div>
            <div>
              <span className="font-bold text-lg uppercase">
                instanceSelect:
              </span>
              <span> {instanceSelect?.hostName ?? "[Chưa chọn]"}</span>
            </div>
            <div className=" shadow rounded">
              {instanceSelect && (
                <InstanceLog
                  data={instanceSelect}
                  sort={instanceSort}
                  setcorrelationSelect={setCorrelationSelect}
                  time={time}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="inline w-14 overflow-x-auto h-5 grow"></div>
    </main>
  )
}
