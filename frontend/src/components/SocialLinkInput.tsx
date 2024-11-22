import { SocialLink } from "@/types";
import { Switch } from "@/components/ui/switch";

interface SocialLinkInputProps {
  link: SocialLink;
  handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnableLink: (socialNetwork: string) => void;
}

export default function SocialLinkInput({
  link,
  handleUrlChange,
  handleEnableLink,
}: SocialLinkInputProps) {
  return (
    <div className="bg-white shadow-sm p-5 flex items-center gap-x-3">
      <div
        className="w-12 h-12 bg-cover"
        style={{ backgroundImage: `url(/social/icon_${link.name}.svg)` }}
      ></div>
      <input
        type="text"
        className="flex-1 p-2"
        value={link.url}
        onChange={handleUrlChange}
        name={link.name}
      />

      <Switch
        checked={link.enabled}
        onCheckedChange={() => handleEnableLink(link.name)}
        className={`${link.enabled ? "bg-blue-500" : "bg-gray-300"}`}
      />
    </div>
  );
}
