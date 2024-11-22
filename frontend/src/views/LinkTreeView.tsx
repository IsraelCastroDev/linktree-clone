import SocialLinkInput from "@/components/SocialLinkInput";
import { social } from "@/data/social";
import { SocialLink } from "@/types";
import { useState } from "react";

export default function LinkTreeView() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(social);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = socialLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    );
    setSocialLinks(updatedLinks);
  };

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = socialLinks.map((link) =>
      link.name === socialNetwork ? { ...link, enabled: !link.enabled } : link
    );
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
