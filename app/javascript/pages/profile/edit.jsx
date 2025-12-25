import {Head, Link} from '@inertiajs/react';
import {useForm} from '@inertiajs/react'
import AdminLayout from "~/layouts/AdminLayout";
import {useI18n} from "~/utils/useI18n";
import {admin_user_path, admin_users_path, profile_path} from '~/routes.js';
import InputLabel from "~/components/InputLabel";
import TextInput from "~/components/TextInput";
import InputError from "~/components/InputError";
import FileInput from "~/components/FileInput";
import Select from "~/components/Select";
import PrimaryButton from "~/components/PrimaryButton";
import {LiaArrowLeftSolid} from "react-icons/lia";

function Edit({user}) {
  const {t, h} = useI18n()
  const {data, setData, put, processing, errors, reset} = useForm({
    user: {
      name: user.name,
      email: user.email,
      avatar: "",
      password: "",
      password_confirmation: "",
    }
  });

  const submit = (e) => {
    e.preventDefault();

    put(profile_path(), {
      onFinish: () => {
        reset('password', 'password_confirmation')
      },
    });
  };

  return (
      <AdminLayout>
        <Head title="Profile"/>

        <div className="mx-auto md:w-2/3 w-full mt-4 py-8 px-8 pt-8 rounded-md shadow shadow-md shadow-black-200 ">
          <div className="flex justify-between">
            <h1 className="font-bold text-4xl">{t('users.edit.title')}</h1>
          </div>
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

            <div className="mt-4">
              <PrimaryButton className="ms-4" disabled={processing}>
                {t('common.Save')}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </AdminLayout>
  );
}

export default Edit;