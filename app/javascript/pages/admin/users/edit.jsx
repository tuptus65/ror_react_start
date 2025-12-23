import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react'
import AdminLayout from "~/layouts/AdminLayout";
import { useI18n } from "~/utils/useI18n";
import { LiaArrowLeftSolid } from "react-icons/lia";
import { admin_user_path, admin_users_path } from '~/routes.js';

import Form from './form'

export default function Edit({ user }) {
  const {t} = useI18n()
  const {data, setData, put, processing, errors, reset } = useForm({
    user: {
      name: user.name,
      email: user.email,
      roles: user.roles,
      avatar: user.avatar,
      password: "",
      password_confirmation: "",
    }
  });

  const submit = (e) => {
    e.preventDefault();

    put(admin_user_path(user.id), {
      onFinish: () => {reset('password', 'password_confirmation')},
    });
  };

  return (
    <AdminLayout>
      <Head title={t('users.edit.title')} />

      <div className="mx-auto md:w-2/3 w-full mt-4 py-8 px-8 pt-8 rounded-md shadow shadow-md shadow-black-200 ">
        <div className="flex justify-between">
        <h1 className="font-bold text-4xl">{t('users.edit.title')}</h1>
          <Link
              href={admin_users_path()}
              className="ml-2 rounded-lg py-3 px-5 bg-gray-200 inline-block font-medium hover:bg-gray-300 border-gray-200 hover:border-gray-300"
          >
            <LiaArrowLeftSolid className="inline"/> {t('common.List')}
          </Link>

        </div>
        <Form
            data={data}
            setData={setData}
            processing={processing}
            errors={errors}
            submit={submit}
        />
      </div>
    </AdminLayout>
  )
}
