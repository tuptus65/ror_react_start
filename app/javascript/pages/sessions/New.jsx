import React from 'react'
import AppLayout from "~/layouts/AppLayout";
import TextInput from "../../components/TextInput";
import InputLabel from "../../components/InputLabel";
import PrimaryButton from "../../components/PrimaryButton";
import { useI18n } from "@/utils/useI18n";
import {Head, useForm, usePage } from "@inertiajs/react";
import { login_path } from "@/routes.js";

function New() {
  const {t} = useI18n();
  const {data, setData, post, processing, reset} = useForm({
    name: "",
    password: "",
  });

  const { flash } = usePage().props;
  const alert = flash?.alert;

  const submit = (e) => {
    e.preventDefault();

    post(login_path(), {
      onFinish: () => reset('password'),
    });
  };

  return (
      <AppLayout>
        <Head title={ t('session.new.Login') }/>
        <div className="flex flex-col max-w-md mx-auto mt-8 bg-gray-50 rounded-md shadow-md" >
          {alert && (
              <div className="p-4 mt-4 mx-4 text-white rounded-md bg-red-600">
                {alert}
              </div>
          )}
          <form onSubmit={submit} className="shadow-md p-6">
            <div>
              <InputLabel htmlFor="name" value={t('session.new.name')}  />
              <TextInput
                  type="text"
                  id="name"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('name', e.target.value)}
              />
            </div>
            <div>
              <InputLabel htmlFor="password" value={t('session.new.password')}/>
              <TextInput
                  type="password"
                  id="password"
                  name="password"
                  value={data.password}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('password', e.target.value)}
              />
            </div>
            <PrimaryButton
                className="mt-4"
                disabled={processing}
                type="submit"
            >
              {t('session.new.Login')}
            </PrimaryButton>
          </form>
        </div>
      </AppLayout>
  );
}

export default New