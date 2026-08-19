export default function GridBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 opacity-100"
      style={{
        backgroundSize: '40px 40px',
        backgroundImage: `
          linear-gradient(to right, var(--color-border) 1px, transparent 1px),
          linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
        `
      }}
    />
  )
}
