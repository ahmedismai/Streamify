import React, { useEffect, useState } from 'react'

function getInitials(name) {
  return (name || 'Streamify User')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export default function Avatar({ user, src, alt = 'User Avatar', size = 'size-10', className = '' }) {
  const imageSrc = src || user?.profilePic || ''
  const displayName = user?.name || alt
  const [canShowImage, setCanShowImage] = useState(Boolean(imageSrc))

  useEffect(() => {
    setCanShowImage(Boolean(imageSrc))
  }, [imageSrc])

  return (
    <div className={`avatar ${!canShowImage ? 'placeholder' : ''} ${className}`}>
      <div className={`${size} rounded-full bg-primary/15 text-primary ring ring-primary/15 ring-offset-2 ring-offset-base-100`}>
        {canShowImage ? (
          <img
            src={imageSrc}
            alt={alt}
            referrerPolicy='no-referrer'
            onError={() => setCanShowImage(false)}
          />
        ) : (
          <span className='text-sm font-bold'>{getInitials(displayName)}</span>
        )}
      </div>
    </div>
  )
}
