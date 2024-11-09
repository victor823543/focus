import { useEffect, useState } from 'react'

// Custom hook to get the current viewport width
function useViewportWidth(): number {
  // Initialize the state with the current window width
  const [width, setWidth] = useState<number>(window.innerWidth)

  useEffect(() => {
    // Function to handle the window resize event
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    // Add the event listener for window resize
    window.addEventListener('resize', handleResize)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Return the current width
  return width
}

export default useViewportWidth
