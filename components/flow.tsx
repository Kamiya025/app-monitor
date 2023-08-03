import { useEffect, useRef, useState } from "react"
import "reactflow/dist/style.css"
import { useGetSumaryAllLogs } from "../hooks/query/get"
import { SumaryAllLogs } from "../model"

import Cytoscape from "cytoscape"
import COSEBilkent from "cytoscape-cose-bilkent"
import popper from "cytoscape-popper"
import dynamic from "next/dynamic"
Cytoscape.use(COSEBilkent)
Cytoscape.use(popper)

const CytoscapeComponent = dynamic(() => import("react-cytoscapejs"), {
  ssr: false,
})

export const Flow = () => {
  const sumaryAllLogs = useGetSumaryAllLogs()
  if (sumaryAllLogs.status === "loading") return <>Loading....</>
  if (sumaryAllLogs.status === "error") return <>Lỗi....</>
  if (sumaryAllLogs.status === "success")
    return <FlowView data={sumaryAllLogs.data} />
}
const FlowView = (props: {
  data: SumaryAllLogs
  nodeSelectId?: string
  zoom?: number
}) => {
  const cyRef = useRef<cytoscape.Core>()

  const [elements, setElements] = useState<cytoscape.ElementDefinition[]>([])

  useEffect(() => {
    let initialNodes = [
      {
        data: {
          id: "-unknown-unknown",
          label: "Client",
          group: "nodes",
          // bg: "#f37021",
        },
      },

      ...props.data.serviceDatas.map((item) => {
        return {
          data: {
            id: item.instanceName ?? item.serviceName,
            label: item.instanceName
              ? `${item.hostName}`
              : item.serviceName ?? "",
            group: "nodes",
            type: item.instanceName ? "child" : "parent",
            parent: item.instanceName ? item.serviceName : undefined,
            bg: item.instanceName ? "#f37021" : "#ffffff",
          },
        }
      }),
    ]
    let initialEdges = props.data.flowDatas.map((val, index) => ({
      data: {
        // id: index,
        source: val.sourceInstanceName.includes("-unknown-unknown")
          ? "-unknown-unknown"
          : val.sourceInstanceName,
        target: val.destInstanceName.includes("-unknown-unknown")
          ? "-unknown-unknown"
          : val.destInstanceName,
        label: "",
        bg:
          val.numberRequest <= 100
            ? "#0bbf2c"
            : val.numberRequest <= 1000
            ? "#f5c542"
            : "#f54242",
      },
    }))
    setElements([...initialNodes, ...initialEdges])
  }, [])

  const addAction = (cy: Cytoscape.Core) => {
    if (!cy) {
      // alert('none')
      return
    }
  }

  const layout = {
    name: "cose-bilkent",
    // other options
    rankDir: "TB",
    padding: 26,
    nodeDimensionsIncludeLabels: true,
    idealEdgeLength: 250,
    edgeElasticity: 20,
    nodeRepulsion: 4300,
  }

  const cytoscapeStylesheet: Array<cytoscape.Stylesheet> = [
    {
      selector: "node",
      style: {
        // a single "padding" is not supported in the types :(
        "padding-top": "2",
        "padding-bottom": "2",
        "padding-left": "10",
        "padding-right": "10",
        "active-bg-size": 0,
        "selection-box-border-width": 0,
        "selection-box-color": "#f54242",
        "text-transform": "uppercase",
      },
    },
    {
      selector: "node[label]",
      style: {
        width: "label",
        height: "label",
        label: "data(label)",
        "font-size": "10",
        "text-max-width": "20",
        color: "white",
        "text-halign": "center",
        "text-valign": "center",
      },
    },
    {
      selector: "node[bg]",
      style: {
        backgroundColor: "data(bg)",
      },
    },
    {
      selector: "node[type='parent']",
      css: {
        display: "element",
        "border-width": 2,
        "ghost-opacity": 2,
        backgroundColor: "light-grey",
        color: "black",
        "font-size": 15,
        "text-halign": "center",
        "text-valign": "top",
        shape: "polygon",
      },
    },
    {
      selector: "node[type='child']",
      css: {
        shape: "round-rectangle",
        "selection-box-border-width": 10,
      },
    },
    {
      selector: "edge",
      style: {
        "curve-style": "straight",
        "edge-distances": "node-position",
        "target-arrow-shape": "triangle-backcurve",
        "arrow-scale": 2,
        width: 2,
      },
    },
    {
      selector: "edge[bg]",
      style: {
        color: "data(bg)",
        "text-outline-color": "data(bg)",
        "outside-texture-bg-color": "data(bg)",
        "line-color": "data(bg)",
        "source-arrow-color": "data(bg)",
        "target-arrow-color": "data(bg)",
      },
    },
    {
      selector: "edge[label]",
      style: {
        label: "data(label)",
        "font-size": "8",
        "text-background-color": "white",
        "text-background-opacity": 1,
        "text-background-padding": "2px",
        "text-border-color": "black",
        "text-border-style": "solid",
        "text-border-width": 0.5,
        "text-border-opacity": 1,
        "text-rotation": "autorotate",
        "text-events": "yes",
        "background-image-smoothing": "yes",
      },
    },
  ]

  return (
    <div className="flex w-[100wh] h-[100vh] !bg-white">
      <CytoscapeComponent
        boxSelectionEnabled={true}
        cy={(cy): void => {
          cyRef.current = cy
          addAction(cy)
        }}
        layout={layout}
        stylesheet={cytoscapeStylesheet}
        elements={elements}
        className="w-screen h-screen !bg-white"
      ></CytoscapeComponent>
    </div>
  )
}
