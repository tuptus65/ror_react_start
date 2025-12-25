import {usePage} from '@inertiajs/react'
import {useI18n} from "~/utils/useI18n";
import Select from "~/components/Select";
import InputLabel from "~/components/InputLabel";
import TextInput from "~/components/TextInput";
import InputError from "~/components/InputError";
import PrimaryButton from "~/components/PrimaryButton";
import FileInput from "~/components/FileInput";

export default function Form({data, setData, errors, processing, submit}) {
  const {t, h} = useI18n();
  const {roles} = usePage().props;
  return (
      <form onSubmit={submit} className="shadow-md rounded-md p-4 mt-4">
        <div className="my-5">
          <InputLabel htmlFor="name">{h('user', 'name')}</InputLabel>
          <TextInput
              type="text"
              name="name"
              id="name"
              value={data.user.name}
              className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
              onChange={(e) => setData('user.name', e.target.value)}
          />
          <InputError message={errors?.name?.join(', ')} className="mt-2"/>
        </div>

        <div className="my-5">
          <InputLabel htmlFor="email">{h('user', 'email')}</InputLabel>
          <TextInput
              type="text"
              name="email"
              id="email"
              value={data.user.email}
              className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
              onChange={(e) => setData('user.email', e.target.value)}
          />
          <InputError message={errors?.email?.join(', ')} className="mt-2"/>
        </div>

        <div className="my-5">
          <InputLabel htmlFor="password">{h('user', 'password')}</InputLabel>
          <TextInput
              type="password"
              name="password"
              id="password"
              value={data.user.password}
              autoComplete="new-password"
              className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full !bg-white"
              onChange={(e) => setData('user.password', e.target.value)}
          />
          <InputError message={errors?.password?.join(', ')} className="mt-2"/>
        </div>

        <div className="my-5">
          <InputLabel htmlFor="password_confirmation">{h('user', 'password_confirmation')}</InputLabel>
          <TextInput
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              value={data.user.password_confirmation}
              autoComplete="new-password"
              className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
              onChange={(e) => setData('user.password_confirmation', e.target.value)}
          />
          <InputError message={errors?.password_confirmation?.join(', ')} className="mt-2"/>
        </div>

        <div className="my-5">
          <InputLabel htmlFor="avatar">{h('user', 'avatar')}</InputLabel>
          <div className="flex justify-start items-center gap-2">
            {(data.user.avatar && data.user.avatar instanceof File) && (
                <img
                    src={URL.createObjectURL(data.user.avatar)}
                    className="mt-2 w-20 h-20 rounded-full object-cover"
                    alt="Avatar"
                />
            )}
            <FileInput
                name="avatar"
                id="avatar"
                className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700
               hover:file:bg-indigo-100 cursor-pointer"
                onChange={(e) =>
                    setData(
                        'user.avatar',
                        e.target.files[0],
                    )
                }
            />
          </div>
          <InputError message={errors.user?.avatar} className="mt-2"/>
        </div>

        <div className="my-5">
          <InputLabel htmlFor="roles">{h('user', 'roles')}</InputLabel>
          <Select
              id="roles"
              name="roles"
              selectedValues={data.user.roles}
              options={roles}
              className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full cursor-pointer"
              multiple={true}
              onChange={(e) => {
                const selectedOptions = Array.from(
                    e.target.options,
                )
                    .filter(
                        (option) => option.selected,
                    )
                    .map((option) => option.value);

                setData('user.roles', selectedOptions);
              }}
          />
          <InputError message={errors?.roles?.join(', ')} className="mt-2"/>
        </div>

        <div className="mt-4">
          <PrimaryButton className="ms-4" disabled={processing}>
            {t('common.Save')}
          </PrimaryButton>
        </div>
      </form>
  )
}
