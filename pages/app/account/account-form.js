// Import the new component
import Avatar from './avatar'

// ...

return (
  <div className="form-widget">
    {/* Add to the body */}
    <Avatar
      uid={user.id}
      url={avatar_url}
      size={150}
      onUpload={(url) => {
        setAvatarUrl(url)
        updateProfile({ fullname, username, website, avatar_url: url })
      }}
    />
    {/* ... */}
  </div>
)