interface SpinnerProps {
  primary?: string
  secondary?: string
  tertiary?: string
  width?: number
  height?: number
  speed?: number
  text?: string
}

export function Spinner({
  primary = '#8BE9FD',
  secondary = '#BD93F9',
  tertiary = '#FF79C6',
  width = 128,
  height = 128,
  speed = 1,
  text,
}: SpinnerProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      width={`${width}px`}
      height={`${height}px`}
      viewBox={`0 0 ${width} ${height}`}
      xmlSpace="preserve"
      className="rounded-full shadow-[0_0_32px_4px_inset,0_0_32px_4px] shadow-purple"
      aria-label={text ?? 'loading...'}
    >
      <g>
        <path
          fill={primary}
          d="M99.359,10.919a60.763,60.763,0,1,0,0,106.162A63.751,63.751,0,1,1,99.359,10.919Z"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 64 64"
          to="360 64 64"
          dur={`${1080 / speed}ms`}
          repeatCount="indefinite"
        />
      </g>
      <g>
        <path
          fill={secondary}
          d="M28.641,117.081a60.763,60.763,0,1,0,0-106.162A63.751,63.751,0,1,1,28.641,117.081Z"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 64 64"
          to="360 64 64"
          dur={`${1620 / speed}ms`}
          repeatCount="indefinite"
        />
      </g>
      <g>
        <path
          fill={tertiary}
          d="M117.081,99.313a60.763,60.763,0,1,0-106.162,0A63.751,63.751,0,1,1,117.081,99.313Z"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 64 64"
          to="360 64 64"
          dur={`${3240 / speed}ms`}
          repeatCount="indefinite"
        />
      </g>
    </svg>
  )
}

interface FullPageSpinnerProps {
  primary?: string
  secondary?: string
  tertiary?: string
  text?: string
}
export function FullPageSpinner({
  primary = '#8BE9FD',
  secondary = '#BD93F9',
  tertiary = '#FF79C6',
  text,
}: FullPageSpinnerProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background text-base text-slate-500">
      <Spinner
        primary={primary}
        secondary={secondary}
        tertiary={tertiary}
        width={128}
        height={128}
        speed={0.8}
        text={text}
      />
      {text && text.length !== 0 && <span className="hidden">{text}</span>}
    </div>
  )
}
