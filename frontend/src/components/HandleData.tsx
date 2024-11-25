import { SocialNetwork, UserHandle } from "@/types";

interface HandleDataProps {
  user: UserHandle;
}

export default function HandleData({ user }: HandleDataProps) {
  const links: SocialNetwork[] = JSON.parse(user.links).filter(
    (link: SocialNetwork) => link.enabled
  );

  return (
    <div className="space-y-6 text-white">
      <p className="text-center text-4xl font-black">{user.handle}</p>
      {user.image && (
        <img src={user.image} className="max-w-64 w-full mx-auto" />
      )}

      <p className="text-lg font-bold text-center">{user.description}</p>

      <div className="mt-20 flex flex-col gap-6">
        {links.length ? (
          links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className="bg-white px-4 py-3 flex items-center gap-5 rounded-lg text-slate-800 capitalize font-bold"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src={`/social/icon_${link.name}.svg`}
                alt={`Icono red social ${link.name}`}
                className="w-10 h-10"
              />
              Visita mi {link.name}
            </a>
          ))
        ) : (
          <p>No hay enlaces en este perfil</p>
        )}
      </div>
    </div>
  );
}
