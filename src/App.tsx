import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './App.scss'

function App() {
  const [entered, setEntered] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    audioRef.current = new Audio('/assets/lastcry.mp3')

    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0.25,
      },
      {
        opacity: 1,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      }
    )
  }, [])

  const enterSite = async () => {
    try {
      await audioRef.current?.play()
    } catch {}

    gsap.to(screenRef.current, {
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      onComplete: () => {
        setEntered(true)
      },
    })
  }

  return (
    <>
      {!entered && (
        <div
          ref={screenRef}
          className="loading-screen"
          onClick={enterSite}
        >
          <div className="loading-content">
            <h1
              ref={titleRef}
              className="loading-title"
            >
              CLICK TO ENTER
            </h1>
          </div>
        </div>
      )}

      <main>
        <h1 className="header-text">
          LastCry
        </h1>

        <p className="bio">
          WE DO NOT CONDONE VIOLENCE
        </p>
      </main>
    </>
  )
}

export default App