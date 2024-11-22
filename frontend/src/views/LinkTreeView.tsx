import SocialLinkInput from "@/components/SocialLinkInput";
import { social } from "@/data/social";
import { SocialLink } from "@/types";
import { isValidUrl } from "@/utils";
import { CircleAlertIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function LinkTreeView() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(social);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = socialLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    );
    setSocialLinks(updatedLinks);
  };

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
    </div>
  );
}
