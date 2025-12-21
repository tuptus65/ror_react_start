export default function User({ user }) {
  return (
    <div>
      <p className="my-5">
        <strong className="block font-medium mb-1">Name:</strong>
        {user.name?.toString()}
      </p>
      <p className="my-5">
        <strong className="block font-medium mb-1">Email:</strong>
        {user.email?.toString()}
      </p>
      <p className="my-5">
        <strong className="block font-medium mb-1">Password digest:</strong>
        {user.password_digest?.toString()}
      </p>
      <p className="my-5">
        <strong className="block font-medium mb-1">Avatar:</strong>
        {user.avatar?.toString()}
      </p>
      <p className="my-5">
        <strong className="block font-medium mb-1">Roles mask:</strong>
        {user.roles_mask?.toString()}
      </p>
      <p className="my-5">
        <strong className="block font-medium mb-1">Confirmed at:</strong>
        {user.confirmed_at?.toString()}
      </p>
    </div>
  )
}
