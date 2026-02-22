import { useState, useEffect, useRef } from 'react'
import './App.css'
import { Heart, ArrowRight, Sparkles } from 'lucide-react'

function App() {
  const [currentPage, setCurrentPage] = useState<'gallery' | 'letter'>('gallery')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [visibleImages, setVisibleImages] = useState<boolean[]>([false, false, false, false, false, false])
  const [showLetterContent, setShowLetterContent] = useState(false)
  const letterRef = useRef<HTMLDivElement>(null)

  // Trigger image animations on mount
  useEffect(() => {
    const delays = [500, 650, 800, 950, 1100, 1250]
    delays.forEach((delay, index) => {
      setTimeout(() => {
        setVisibleImages(prev => {
          const newState = [...prev]
          newState[index] = true
          return newState
        })
      }, delay)
    })
  }, [])

  // Handle page transition
  const handleReadLetter = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPage('letter')
      setIsTransitioning(false)
      // Show letter content with delay
      setTimeout(() => setShowLetterContent(true), 400)
    }, 600)
  }

  const handleBackToGallery = () => {
    setIsTransitioning(true)
    setShowLetterContent(false)
    setTimeout(() => {
      setCurrentPage('gallery')
      setIsTransitioning(false)
    }, 600)
  }

  const roseImages = [
    { src: '/rose-heart.jpg', alt: 'Rose Heart', className: 'col-span-2 row-span-2', featured: true },
    { src: '/red-roses-1.jpg', alt: 'Red Roses Bouquet', className: 'col-span-1 row-span-1' },
    { src: '/black-roses-1.jpg', alt: 'Black Roses', className: 'col-span-1 row-span-1' },
    { src: '/mixed-roses.jpg', alt: 'Mixed Roses', className: 'col-span-2 row-span-1' },
    { src: '/red-rose-single.jpg', alt: 'Single Red Rose', className: 'col-span-1 row-span-1' },
    { src: '/black-rose-single.jpg', alt: 'Single Black Rose', className: 'col-span-1 row-span-1' },
  ]

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Floating Petals Background */}
      <FloatingPetals />
      
      {/* Page Transition Overlay */}
      <div 
        className={`fixed inset-0 bg-gradient-to-br from-rose-900 via-black to-red-950 z-50 transition-opacity duration-600 pointer-events-none ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Gallery Page */}
      {currentPage === 'gallery' && (
        <div className={`min-h-screen flex flex-col items-center justify-center px-4 py-8 transition-all duration-600 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {/* Header - Mobile Optimized */}
          <div className="text-center mb-6 sm:mb-8 z-10 px-2">
            <h1 
              className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-rose-600 mb-3 sm:mb-4 animate-fade-in-up"
              style={{ animationDelay: '300ms', animationFillMode: 'both' }}
            >
              For You, Hira
            </h1>
            <p 
              className="font-accent text-lg sm:text-xl md:text-2xl text-rose-300/80 animate-fade-in-up"
              style={{ animationDelay: '800ms', animationFillMode: 'both' }}
            >
              Some roses speak what words cannot...
            </p>
          </div>

          {/* Rose Gallery Grid - Mobile Optimized */}
          <div 
            className="grid grid-cols-2 gap-3 sm:gap-4 max-w-lg sm:max-w-2xl md:max-w-4xl w-full mb-8 z-10 px-2"
            style={{ perspective: '1200px' }}
          >
            {roseImages.map((image, index) => (
              <div
                key={index}
                className={`${image.className} ${image.featured ? 'order-first mx-auto max-w-[280px] sm:max-w-none' : ''} group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-500 hover:scale-105 hover:z-20 ${
                  visibleImages[index] ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  animation: visibleImages[index] ? getAnimationForIndex(index) : 'none',
                  animationFillMode: 'both',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${image.featured ? 'min-h-[200px] sm:min-h-[280px] md:min-h-[320px]' : 'min-h-[100px] sm:min-h-[140px] md:min-h-[160px]'}`}
                />
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
                  <p className="font-accent text-white text-xs sm:text-sm md:text-base">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button - Mobile Optimized */}
          <button
            onClick={handleReadLetter}
            className="group relative z-10 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 rounded-full text-white font-medium text-base sm:text-lg flex items-center gap-2 sm:gap-3 shadow-lg animate-glow-pulse hover:shadow-rose-500/50 hover:scale-105 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: '1500ms', animationFillMode: 'both' }}
          >
            <span>📝 Read My Note 💌</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-2" />
          </button>

          {/* Decorative Hearts */}
          <div className="fixed bottom-8 left-8 text-rose-500/30 animate-float">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <div className="fixed top-20 right-12 text-rose-400/20 animate-float" style={{ animationDelay: '1s' }}>
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <div className="fixed bottom-20 right-20 text-red-500/20 animate-float" style={{ animationDelay: '2s' }}>
            <Heart className="w-10 h-10 fill-current" />
          </div>
        </div>
      )}

      {/* Letter Page */}
      {currentPage === 'letter' && (
        <div className={`min-h-screen flex flex-col items-center justify-center px-4 py-8 transition-all duration-600 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {/* Back Button */}
          <button
            onClick={handleBackToGallery}
            className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 flex items-center gap-1 sm:gap-2 text-rose-300 hover:text-rose-400 transition-colors duration-300"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
            <span className="font-accent text-sm sm:text-lg">Back to Roses</span>
          </button>

          {/* Letter Container - Mobile Optimized */}
          <div 
            ref={letterRef}
            className="relative max-w-2xl w-full mx-3 sm:mx-4 bg-gradient-to-br from-white/95 to-rose-50/95 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10"
            style={{
              boxShadow: '0 30px 100px rgba(106, 4, 15, 0.3), 0 0 60px rgba(230, 57, 70, 0.1)',
            }}
          >
            {/* Letter Header Decoration */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-500 via-red-500 to-rose-600" />
            
            {/* Corner Decorations */}
            <div className="absolute top-4 left-4 text-rose-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="absolute top-4 right-4 text-rose-300">
              <Sparkles className="w-6 h-6" />
            </div>

            {/* Letter Content */}
            <div className="p-5 sm:p-8 md:p-12">
              {/* Salutation */}
              <div 
                className={`mb-6 transition-all duration-700 ${showLetterContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '200ms' }}
              >
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-rose-700 mb-2">
                  Moody Hira Mishal Sahiba
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-red-500 rounded-full" />
              </div>

              {/* Letter Body */}
              <div className="space-y-3 sm:space-y-4 text-gray-800">
                <p 
                  className={`font-body text-sm sm:text-base md:text-lg leading-relaxed transition-all duration-700 ${showLetterContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: '400ms' }}
                >
                  <span className="font-accent text-lg sm:text-xl text-rose-600">Dekho madam ji,</span> sab se pehle to yeh bata doon ke agar <span className="font-medium text-rose-700">"Narazgi World Cup"</span> hota na, to aap gold medal le aati <span className="text-xl sm:text-2xl">🏆</span>
                </p>

                <p 
                  className={`font-body text-sm sm:text-base md:text-lg leading-relaxed transition-all duration-700 ${showLetterContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: '550ms' }}
                >
                  Lekin mazaak apni jagah… sach yeh hai ke mujhe aapki narazgi se zyada <span className="font-medium text-rose-700">aapki khamoshi aur rude replies</span> chubhtay hain. Main jab aapse baat karne ki koshish karta hoon aur aap sirf short ya rude reply karti ho, to dil thoda sa sad ho jata hai.
                </p>

                <p 
                  className={`font-body text-sm sm:text-base md:text-lg leading-relaxed transition-all duration-700 ${showLetterContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: '700ms' }}
                >
                  Main perfect nahi hoon, galtiyan karta hoon… lekin <span className="font-medium text-rose-700">intention kabhi ghalat nahi hota.</span> Agar mujh se koi baat buri lagi hai, to please mujhe bata do. Main argue karne nahi, <span className="font-accent text-base sm:text-lg text-rose-600">samajhne ke liye tayyar hoon.</span>
                </p>

                <p 
                  className={`font-body text-sm sm:text-base md:text-lg leading-relaxed transition-all duration-700 ${showLetterContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: '850ms' }}
                >
                  Agar aap naraz ho to punishment ke taur pe <span className="font-medium text-rose-700">chocolate le lo</span> <span className="text-xl sm:text-2xl">🍫</span>
                </p>

                <p 
                  className={`font-body text-sm sm:text-base md:text-lg leading-relaxed transition-all duration-700 ${showLetterContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: '1000ms' }}
                >
                  Bas itna sa kehna hai… mujhe <span className="font-accent text-lg sm:text-xl text-rose-600">aapki hansi zyada pasand hai,</span> aapka gussa nahi. Aur main har haal mein cheezein theek karna chahta hoon, kyunki <span className="font-medium text-rose-700">aap mere liye important ho.</span>
                </p>

                <p 
                  className={`font-body text-sm sm:text-base md:text-lg leading-relaxed transition-all duration-700 ${showLetterContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: '1150ms' }}
                >
                  <span className="font-accent text-lg sm:text-xl text-rose-600">Thoda sa gussa kam aaj sy okay naw ?</span> Deal? <span className="text-xl sm:text-2xl">🤝❤️</span>
                </p>
              </div>

              {/* Closing */}
              <div 
                className={`mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-rose-200 transition-all duration-700 ${showLetterContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '1300ms' }}
              >
                <p className="font-accent text-base sm:text-lg text-gray-600 italic mb-2">
                  "Written By ma khud or kon..."
                </p>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 fill-current animate-heartbeat" />
                  <span className="font-display text-2xl sm:text-3xl text-rose-700">Fahad</span>
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 fill-current animate-heartbeat" />
                </div>
              </div>
            </div>

            {/* Bottom Decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-600 via-red-500 to-rose-500" />
          </div>

          {/* Floating Hearts Around Letter */}
          <div className="fixed top-1/4 left-10 text-rose-400/30 animate-float">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <div className="fixed top-1/3 right-16 text-red-400/20 animate-float" style={{ animationDelay: '0.5s' }}>
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <div className="fixed bottom-1/4 left-16 text-rose-500/25 animate-float" style={{ animationDelay: '1s' }}>
            <Heart className="w-10 h-10 fill-current" />
          </div>
          <div className="fixed bottom-1/3 right-10 text-red-500/20 animate-float" style={{ animationDelay: '1.5s' }}>
            <Heart className="w-7 h-7 fill-current" />
          </div>
        </div>
      )}
    </div>
  )
}

// Helper function to get animation based on index
function getAnimationForIndex(index: number): string {
  const animations = [
    'flipInLeft 1s var(--ease-heartbeat) forwards',
    'flipInRight 1s var(--ease-heartbeat) forwards',
    'scaleRotate 1s var(--ease-elastic) forwards',
    'slideInLeft 0.8s var(--ease-romantic) forwards',
    'slideInRight 0.8s var(--ease-romantic) forwards',
    'heartPulse 1s var(--ease-heartbeat) forwards',
  ]
  return animations[index] || 'fadeInUp 0.8s ease-out forwards'
}

// Floating Petals Component
function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Petal colors
    const colors = ['#e63946', '#ffb3c1', '#ffccd5', '#c1121f', '#6a040f']
    
    // Petal interface
    interface Petal {
      x: number
      y: number
      size: number
      color: string
      speedY: number
      speedX: number
      rotation: number
      rotationSpeed: number
      opacity: number
      update: () => void
      draw: (context: CanvasRenderingContext2D) => void
    }
    
    // Create petal factory
    const createPetal = (): Petal => {
      return {
        x: Math.random() * canvas.width,
        y: -50,
        size: Math.random() * 15 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.8,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.4 + 0.3,
        update() {
          this.y += this.speedY
          this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5
          this.rotation += this.rotationSpeed

          if (this.y > canvas.height + 50) {
            this.y = -50
            this.x = Math.random() * canvas.width
          }
        },
        draw(context: CanvasRenderingContext2D) {
          context.save()
          context.translate(this.x, this.y)
          context.rotate((this.rotation * Math.PI) / 180)
          context.globalAlpha = this.opacity
          context.fillStyle = this.color
          
          // Draw petal shape
          context.beginPath()
          context.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2)
          context.fill()
          
          context.restore()
        }
      }
    }

    // Create petals
    const petals: Petal[] = []
    for (let i = 0; i < 25; i++) {
      const petal = createPetal()
      petal.y = Math.random() * canvas.height
      petals.push(petal)
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      petals.forEach(petal => {
        petal.update()
        petal.draw(ctx)
      })
      
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  )
}

// Add keyframes for custom animations
const style = document.createElement('style')
style.textContent = `
  @keyframes flipInLeft {
    from {
      opacity: 0;
      transform: perspective(1200px) rotateY(-90deg) translateZ(-200px);
    }
    to {
      opacity: 1;
      transform: perspective(1200px) rotateY(0deg) translateZ(0);
    }
  }
  
  @keyframes flipInRight {
    from {
      opacity: 0;
      transform: perspective(1200px) rotateY(90deg) translateZ(-200px);
    }
    to {
      opacity: 1;
      transform: perspective(1200px) rotateY(0deg) translateZ(0);
    }
  }
  
  @keyframes scaleRotate {
    from {
      opacity: 0;
      transform: scale(0.5) rotate(-15deg);
    }
    to {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }
  
  @keyframes heartPulse {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`
document.head.appendChild(style)

export default App
