import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/react/24/outline'
import {Link, usePage} from "@inertiajs/react";
import {login_path, logout_path, admin_root_path } from "@/routes";
import Avatar from "~/components/Avatar";

import turoxLogo from '../assets/turox_logo_full.png'

const navigation = [
  {name: 'Dashboard', href: '#', current: true},
  {name: 'Team', href: '#', current: false},
  {name: 'Projects', href: '#', current: false},
  {name: 'Calendar', href: '#', current: false},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function AppNavigation() {
  const {user} = usePage().props

  return (
      <Disclosure as="nav" className="relative border-b border-gray-300">
        <div className="container mx-auto">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton
                  className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                <span className="absolute -inset-0.5"/>
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden"/>
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block"/>
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <Link href="/">
                  <img
                      alt="Turox logo"
                      src={turoxLogo}
                      className="h-9 w-auto"
                  />
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                      <a
                          key={item.name}
                          href={item.href}
                          aria-current={item.current ? 'page' : undefined}
                          className={classNames(
                              item.current ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                              'rounded-md px-3 py-2 text-sm font-medium',
                          )}
                      >
                        {item.name}
                      </a>
                  ))}
                  {(user && user.canViewPanel) && (
                      <a
                          href={admin_root_path()}
                          className={
                              'rounded-md px-3 py-2 text-sm font-medium'
                          }
                      >
                        {'Panel'}
                      </a>

                  )}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              {user && (
                  <Menu as="div" className="relative ml-3">
                    <MenuButton
                        className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                      <span className="absolute -inset-1.5"/>
                      <span className="sr-only">Open user menu</span>
                      <Avatar
                        user={user}
                        size={48}
                      />
                    </MenuButton>

                    <MenuItems
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      <MenuItem>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                        >
                          Your profile
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                        >
                          Settings
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <Link
                            href={logout_path()}
                            method='delete'
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden w-full text-left"
                        >
                          Logout
                        </Link>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
              )}
              {!user && (
                  <Link href={login_path()}>
                    Login
                  </Link>
              )}
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
                <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                        'block rounded-md px-3 py-2 text-base font-medium',
                    )}
                >
                  {item.name}
                </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
  )
}

export default AppNavigation;