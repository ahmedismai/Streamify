import React from 'react'
import { LANGUAGE_TO_FLAG } from '../../constants'
import { Link } from 'react-router-dom'

export default function FriendCard({friend}) {
    
return (
    <div className='Card bg-base-200 hover:shadow-md transition-shadow'>
        <div className='card-body p-4'>
            <div className='flex items-center gap-3 mb-3'>
                <div className='avatar size-12'>
                    <img src={friend.profilePic} alt={friend.name} />
                </div>
                <h3 className='font-semibold truncate'>{friend.name}</h3>
            </div>

            <div className='flex flex-wrap gap-1.5 mb-3'>
                <span className='badge badge-secondary text-xs'>
                    {getLanguageFlag(friend.nativeLanguage)}
                    native: {friend.nativeLanguage}
                </span>
                <span className='badge badge-outline text-xs'>
                    {getLanguageFlag(friend.learningLanguage)}
                    learning: {friend.learningLanguage}
                </span>
            </div>

            <Link to={`/chat/${friend._id}`} className='btn btn-outline w-full'>
                Message
            </Link>
        </div>
    </div>
)
}

export function getLanguageFlag(language) {
    if (!language) {
        return null
    }
    const langLower = language.toLowerCase()
    const countryCode = LANGUAGE_TO_FLAG[langLower]

    if (countryCode) {
        return (
            <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt={`${langLower} flag`} className='h-3 mr-1 inline-block' />
        )
    }
    return null
}