import { motion } from 'framer-motion'

const animationVariants = {
  blurInUp: {
    container: (stagger) => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: stagger,
        },
      },
    }),
    child: {
      hidden: {
        opacity: 0,
        filter: 'blur(10px)',
        y: 20,
      },
      visible: (custom) => ({
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
          duration: custom?.duration ?? 0.5,
          ease: [0.25, 0.4, 0.25, 1],
        },
      }),
    },
  },
  blurIn: {
    container: (stagger) => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: stagger,
        },
      },
    }),
    child: {
      hidden: {
        opacity: 0,
        filter: 'blur(12px)',
      },
      visible: (custom) => ({
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
          duration: custom?.duration ?? 0.5,
          ease: [0.25, 0.4, 0.25, 1],
        },
      }),
    },
  },
  fadeInUp: {
    container: (stagger) => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: stagger,
        },
      },
    }),
    child: {
      hidden: {
        opacity: 0,
        y: 24,
      },
      visible: (custom) => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: custom?.duration ?? 0.45,
          ease: [0.215, 0.61, 0.355, 1],
        },
      }),
    },
  },
  popIn: {
    container: (stagger) => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: stagger,
        },
      },
    }),
    child: {
      hidden: {
        opacity: 0,
        scale: 0.7,
        y: 10,
      },
      visible: (custom) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: 'spring',
          damping: 20,
          stiffness: 260,
          duration: custom?.duration ?? 0.4,
        },
      }),
    },
  },
}

export function TextAnimate({
  children,
  animation = 'blurInUp',
  by = 'word',
  duration = 0.5,
  delay = 0,
  staggerDuration = 0.03,
  className = '',
  as: Component = 'span',
  startOnView = true,
  once = true,
  viewportMargin = '-10%',
}) {
  const text = typeof children === 'string' ? children : String(children || '')

  if (!text) return null

  const selectedAnimation = animationVariants[animation] || animationVariants.blurInUp

  // Calculate stagger step
  const stagger = by === 'character' ? staggerDuration : staggerDuration * 2.5

  const containerVariants = selectedAnimation.container(stagger)
  const childVariants = selectedAnimation.child

  const words = text.split(' ')

  const motionProps = startOnView
    ? {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once, margin: viewportMargin },
      }
    : {
        initial: 'hidden',
        animate: 'visible',
      }

  return (
    <Component className={`inline-block ${className}`}>
      <motion.span
        variants={containerVariants}
        {...motionProps}
        transition={{ delayChildren: delay }}
        className="inline-block"
      >
        {by === 'character' ? (
          words.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap">
              {word.split('').map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  custom={{ duration }}
                  variants={childVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
              {wordIndex < words.length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          ))
        ) : (
          words.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap">
              <motion.span
                custom={{ duration }}
                variants={childVariants}
                className="inline-block"
              >
                {word}
              </motion.span>
              {wordIndex < words.length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          ))
        )}
      </motion.span>
    </Component>
  )
}

export default TextAnimate
