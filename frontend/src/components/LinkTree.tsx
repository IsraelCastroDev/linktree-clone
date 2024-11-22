import { Link } from "react-router-dom";
import NavigationTabs from "./NavigationTabs";
import { Outlet } from "react-router-dom";
import { User } from "@/types";
import { useEffect, useState } from "react";
import { SocialNetwork } from "@/types";

interface ProfileProps {
  user: User;
}

export default function LinkTree({ user }: ProfileProps) {
  const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(
    JSON.parse(user.links).filter((link: SocialNetwork) => link.enabled)
  );

  useEffect(() => {
    setEnabledLinks(
      JSON.parse(user.links).filter((link: SocialNetwork) => link.enabled)
    );
  }, [user.links]);

  return (
    <>
      <header className="bg-slate-800 py-5">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
          <div className="w-full p-5 lg:p-0 md:w-1/3">
            <img src="/logo.svg" className="w-full block" />
          </div>
          <div className="md:w-1/3 md:flex md:justify-end">
            <button
              className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
              onClick={() => {}}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
      <div className="bg-gray-100  min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <NavigationTabs />

          <div className="flex justify-end">
            <Link
              className="font-bold text-right text-slate-800 text-2xl"
              to={""}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visitar Mi Perfil: /{user.handle}
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-1 ">
              <Outlet />
            </div>
            <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
              <p className="text-3xl text-center text-white font-semibold">
                {user.handle}
              </p>

              {user.image && (
                <img
                  src={user.image}
                  alt={`Imagen del usuario ${user.handle}`}
                  className="mx-auto max-w-[250px]"
                />
              )}

              <p className="text-center text-lg font-semibold text-white">
                {user.description}
              </p>

              <ul className="mt-10 flex flex-col gap-5">
                {enabledLinks.map((link) => (
                  <li
                    key={link.name}
                    className="bg-white px-5 py-2 gap-4 rounded-lg flex items-center"
                  >
                    <div
                      className="w-12 h-12 bg-cover"
                      style={{
                        backgroundImage: `url(/social/icon_${link.name}.svg)`,
                      }}
                    ></div>
                    <p className="capitalize">
                      Visita mi <span className="font-bold">{link.name}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
