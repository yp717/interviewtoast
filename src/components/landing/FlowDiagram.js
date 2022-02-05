import React from "react"
import ReactFlow from "react-flow-renderer"
import { m } from "framer-motion"

export default ({ elements }) => {
  const flowRef = React.useRef(null)
  const [loading, setLoading] = React.useState(true)
  const onLoad = React.useCallback(reactFlowInstance => {
    flowRef.current = reactFlowInstance
    reactFlowInstance.fitView()
    setLoading(false)
  }, [])
  React.useEffect(() => {
    if (!loading) {
      flowRef.current.fitView()
    }
  }, [loading])
  React.useEffect(() => {
    function handleResize() {
      flowRef.current.fitView()
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full fade-in"
    >
      <ReactFlow
        ref={flowRef}
        nodesConnectable={false}
        elements={elements}
        onLoad={onLoad}
        nodesDraggable={true}
        paneMoveable={false}
        zoomOnScroll={false}
        panOnScroll={false}
      />
    </m.div>
  )
}
