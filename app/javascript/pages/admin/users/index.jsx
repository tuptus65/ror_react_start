import { Head, Link } from '@inertiajs/react'
import AdminLayout from "@/layouts/AdminLayout";
import Pagy from "@/components/Pagy";
import { useI18n } from "@/utils/useI18n";
import {edit_admin_user_path, new_admin_user_path, admin_user_path} from "@/routes.js";
import {LiaEdit, LiaTrashAlt} from "react-icons/lia";
import Table from "@/components/Table";
import TableHead from "@/components/TableHead";

export default function Index({ users, flash }) {
  const { t, h } = useI18n();
  const handleDelete = (id) => {
    if (window.confirm(t('common.Are_you_sure'))) {
      router.delete(admin_user_path(id), {preserveScroll: true})
    }
  }

  return (
      <AdminLayout>
        <Head title={t('users.index.title')}/>
        <div className="flex flex-col gap-2 w-full mt-2">
          <header className="shadow-md mb-2 w-full py-2 px-2 rounded-md">
            <h1 className="text-4xl font-serif font-bold">{t('users.index.title')}</h1>
          </header>
          <div className="flex justify-end">
            <Link href={new_admin_user_path()} className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-md">
              {t('users.index.new_user')}
            </Link>
          </div>
          <Table>
            <TableHead>
              <tr>
                <th className="px-6 py-3 text-left">{h('user','name')}</th>
                <th className="px-6 py-3 text-left">{h('user', 'email')}</th>
                <th className="px-6 py-3 text-left">{h('user', 'roles')}</th>
                <th></th>
              </tr>
            </TableHead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id} className="odd:bg-white even:bg-gray-100 hover:bg-gray-300">
                  <td className="px-6 py-3 text-left">{user.name}</td>
                  <td className="px-6 py-3 text-left">{user.email}</td>
                  <td className="px-6 py-3 text-left">{user.roles.join(', ')}</td>
                  <td className=" text-2xl">
                    <div className="flex gap-2">
                      {user.canEdit && (
                          <Link href={edit_admin_user_path(user.id)} className="text-blue-500 hover:text-blue-700">
                            <LiaEdit/>
                          </Link>
                      )}
                      {user.canDelete && (
                          <button
                              onClick={() => handleDelete(user.id)}
                              className="text-red-500 hover:text-red-700"
                          >
                            <LiaTrashAlt/>
                          </button>
                      )}
                    </div>
                  </td>
                </tr>
            ))}
            </tbody>
          </Table>
        </div>
        <Pagy/>
      </AdminLayout>
  );
}
