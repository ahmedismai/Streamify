export function getAvatarUrl(user) {
  return user?.profilePic || `https://avatar.iran.liara.run/username?username=${encodeURIComponent(user?.name || 'Streamify User')}`
}
