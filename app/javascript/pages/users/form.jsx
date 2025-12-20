import { Form as InertiaForm } from '@inertiajs/react'

export default function Form({ user, submitText, ...formProps }) {
  return (
    <InertiaForm
      transform={data => ({ user: data })}
      className="contents"
      {...formProps}
    >
      {({ errors, processing }) => (
        <>
          <div className="my-5">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={user.name}
              className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
            />
            {errors.name && (
              <div className="text-red-500 px-3 py-2 font-medium">
                {errors.name.join(', ')}
              </div>
            )}
          </div>

          <div className="my-5">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              defaultValue={user.email}
              className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
            />
            {errors.email && (
              <div className="text-red-500 px-3 py-2 font-medium">
                {errors.email.join(', ')}
              </div>
            )}
          </div>

          <div className="my-5">
            <label htmlFor="password_digest">Password digest</label>
            <input
              type="text"
              name="password_digest"
              id="password_digest"
              defaultValue={user.password_digest}
              className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
            />
            {errors.password_digest && (
              <div className="text-red-500 px-3 py-2 font-medium">
                {errors.password_digest.join(', ')}
              </div>
            )}
          </div>

          <div className="my-5">
            <label htmlFor="avatar">Avatar</label>
            <input
              type="text"
              name="avatar"
              id="avatar"
              defaultValue={user.avatar}
              className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
            />
            {errors.avatar && (
              <div className="text-red-500 px-3 py-2 font-medium">
                {errors.avatar.join(', ')}
              </div>
            )}
          </div>

          <div className="my-5">
            <label htmlFor="roles_mask">Roles mask</label>
            <input
              type="number"
              name="roles_mask"
              id="roles_mask"
              defaultValue={user.roles_mask}
              className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
            />
            {errors.roles_mask && (
              <div className="text-red-500 px-3 py-2 font-medium">
                {errors.roles_mask.join(', ')}
              </div>
            )}
          </div>

          <div className="my-5">
            <label htmlFor="confirmed_at">Confirmed at</label>
            <input
              type="datetime-local"
              name="confirmed_at"
              id="confirmed_at"
              defaultValue={user.confirmed_at}
              className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
            />
            {errors.confirmed_at && (
              <div className="text-red-500 px-3 py-2 font-medium">
                {errors.confirmed_at.join(', ')}
              </div>
            )}
          </div>

          <div className="inline">
            <button
              type="submit"
              disabled={processing}
              className="rounded-lg py-3 px-5 bg-blue-600 text-white inline-block font-medium cursor-pointer"
            >
              {submitText}
            </button>
          </div>
        </>
      )}
    </InertiaForm>
  )
}
