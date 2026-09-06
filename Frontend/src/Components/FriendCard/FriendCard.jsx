import { Link } from 'react-router-dom'
import { getLanguageFlag } from '../../lib/languageFlag.jsx'
import Avatar from '../Avatar/Avatar.jsx'

export default function FriendCard({friend}) {
    
return (
    <div className='streamify-card streamify-card-hover'>
        <div className='p-4'>
            <div className='flex items-center gap-3 mb-3'>
                <Avatar user={friend} alt={friend.name} size='size-12' />
                <h3 className='font-semibold truncate min-w-0'>{friend.name}</h3>
            </div>

            <div className='flex flex-wrap gap-1.5 mb-3'>
                <span className='badge streamify-badge text-xs'>
                    {getLanguageFlag(friend.nativeLanguage)}
                    native: {friend.nativeLanguage}
                </span>
                <span className='badge streamify-badge streamify-badge-outline text-xs'>
                    {getLanguageFlag(friend.learningLanguage)}
                    learning: {friend.learningLanguage}
                </span>
            </div>

            <Link to={`/chat/${friend._id}`} className='btn btn-outline w-full rounded-xl'>
                Message
            </Link>
        </div>
    </div>
)
}
