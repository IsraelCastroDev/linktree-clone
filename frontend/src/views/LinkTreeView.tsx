import { updateProfile } from "@/api/linktreeAPI";
import SocialLinkInput from "@/components/SocialLinkInput";
import { social } from "@/data/social";
import { SocialLink, SocialNetwork, User } from "@/types";
import { isValidUrl } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, CircleAlertIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LinkTreeView() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(social);
  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["get-user"])!;

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onError(error) {
      toast(error.message, {
        icon: <CircleAlertIcon className="h-6 w-6" />,
      });
    },
    onSuccess() {
      toast("Enlace agregado correctamente", {
        icon: <CheckCircle className="h-6 w-6" />,
      });
    },
  });

  useEffect(() => {
    const updatedData = socialLinks.map((item) => {
      const userLink = JSON.parse(user.links).find(
        (link: SocialNetwork) => link.name === item.name
      );
      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled };
      }
      return item;
    });

    setSocialLinks(updatedData);
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = socialLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    );
    setSocialLinks(updatedLinks);
  };

  const links: SocialNetwork[] = JSON.parse(user.links);

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = socialLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url)) return { ...link, enabled: !link.enabled };
        toast("Url no válida", {
          icon: <CircleAlertIcon className="w-6 h-6" />,
        });
      }
      return link;
    });
    setSocialLinks(updatedLinks);

    let updatedItems: SocialNetwork[] = [];

    const selectedSocialNetwork = updatedLinks.find(
      (link) => link.name === socialNetwork
    );

    if (selectedSocialNetwork?.enabled) {
      const id = links.filter((link) => link.id).length + 1;

      if (links.some((link) => link.name === socialNetwork)) {
        updatedItems = links.map((link) => {
          if (link.name === socialNetwork) {
            return {
              ...link,
              enabled: true,
              id,
            };
          } else {
            return link;
          }
        });
      } else {
        const newItem = { ...selectedSocialNetwork, id };
        updatedItems = [...links, newItem];
      }
    } else {
      const indexToUpdate = links.findIndex(
        (link) => link.name === socialNetwork
      );
      updatedItems = links.map((link) => {
        if (link.name === socialNetwork) {
          return {
            ...link,
            id: 0,
            enabled: false,
          };
        } else if (link.id > indexToUpdate) {
          return {
            ...link,
            id: link.id - 1,
          };
        } else {
          return link;
        }
      });
    }

    queryClient.setQueryData(["get-user"], (prevData: User) => {
      return { ...prevData, links: JSON.stringify(updatedItems) };
    });
  };

  return (
    <div className="space-y-3">
      {socialLinks.map((link) => (
        <SocialLinkInput
          link={link}
          key={link.name}
          handleUrlChange={handleUrlChange}
          handleEnableLink={handleEnableLink}
        />
      ))}
      <button
        onClick={() => mutate(user)}
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-800 font-bold relative disabled:opacity-45 disabled:cursor-default"
        disabled={isPending}
      >
        {isPending ? "Guardando cambios..." : "Guardar cambios"}
      </button>
    </div>
  );
}
