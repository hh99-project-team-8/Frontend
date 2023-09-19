"use client";

import { SessionInterface } from "@/lib/getCurrentUser";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState } from "react";

type UserSectionProps = {
  user: SessionInterface["user"];
};

const UserSection: React.FC<UserSectionProps> = ({ user }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex items-center gap-6">
      <Link href="/uploads/new">
        <button
          type="button"
          className="px-7 py-3 md:py-3.5 bg-neutral-950 text-white text-[13px] rounded-full font-semibold transition hover:bg-neutral-600 duration-300 flex"
        >
          Share work
        </button>
      </Link>
      <div className="flex justify-center items-center z-10 flex-col relative">
        <Menu as="div">
          <Menu.Button
            className="flex justify-center items-center"
            onMouseEnter={() => setOpenModal(true)}
          >
            {user?.image && (
              <Image
                src={user.image}
                width={32}
                height={32}
                className="rounded-full"
                alt="user profile image"
              />
            )}
          </Menu.Button>

          <Transition
            show={openModal}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="flex items-center justify-start flex-col absolute right-[0px]  mt-6 p-7 min-w-[300px] rounded-xl bg-white border border-neutral-200 shadow-xs"
              onMouseLeave={() => setOpenModal(false)}
            >
              <div className="flex flex-col items-center gap-y-4">
                {user?.image && (
                  <Image
                    src={user?.image}
                    className="rounded-full"
                    width={80}
                    height={80}
                    alt="profile Image"
                  />
                )}
                <p className="font-medium text-[15px]">{user?.name}</p>
              </div>

              <div className="flex flex-col gap-3 pt-10 items-start w-full">
                <Menu.Item>
                  <Link
                    href={`/profile/${user?.id}`}
                    className="text-sm text-neutral-700"
                  >
                    Work Preferences
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href={`/profile/${user?.id}`}
                    className="text-sm text-neutral-700"
                  >
                    Settings
                  </Link>
                </Menu.Item>
              </div>
              <div className="w-full flex items-center justify-start border-t border-nav-border mt-5 pt-5">
                <Menu.Item>
                  <button
                    type="button"
                    className="text-[15px]"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default UserSection;
