import React, { useState, useContext, useEffect, useCallback } from "react"
import { m as motion, usePresence, AnimatePresence } from "framer-motion"
import md5 from "md5"
const ToastContext = React.createContext()

const transition = { type: "spring", stiffness: 500, damping: 50, mass: 1 }

function ListItem({ children, onClick, remove, id, duration }) {
  const [isPresent, safeToRemove] = usePresence()

  const animations = {
    layout: true,
    initial: "out",
    style: {
      position: isPresent ? "static" : "absolute",
    },
    animate: isPresent ? "in" : "out",
    whileTap: "tapped",
    variants: {
      in: { scaleY: 1, opacity: 1 },
      out: { scaleY: 0, opacity: 0, zIndex: -1 },
      tapped: { scale: 0.98, opacity: 0.5, transition: { duration: 0.1 } },
    },
    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition,
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      remove(id)
    }, duration)
    return () => clearTimeout(timeout)
  }, [id, remove])

  return (
    <motion.div {...animations} className="z-90" onClick={onClick}>
      {children}
    </motion.div>
  )
}

export const ToastProvider = ({ children, ...props }) => {
  const [items, setItems] = useState([])

  const fireToast = useCallback(
    (RC, duration = 3000) =>
      setItems(items => [
        { id: md5(Math.random()), duration, Component: RC },
        ...items,
      ]),
    [setItems]
  )
  const remove = useCallback(
    itemId => {
      setItems(items => [...items.filter(({ id }) => id !== itemId)])
    },
    [setItems]
  )

  return (
    <ToastContext.Provider
      value={{
        fireToast,
      }}
      {...props}
    >
      <div className="absolute bottom-0 right-0 mr-5 mb-12 z-30">
        <AnimatePresence>
          {items.map(({ id, Component, duration }, i) => (
            <ListItem key={id} id={id} remove={remove} duration={duration}>
              {Component}
            </ListItem>
          ))}
        </AnimatePresence>
      </div>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)

export default ToastContext
