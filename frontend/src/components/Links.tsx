import { useSortable } from "@dnd-kit/sortable";
import { SocialNetwork } from "@/types";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  link: SocialNetwork;
}

export default function Links({ link }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: link.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      key={link.name}
      className="bg-white px-5 py-2 gap-4 rounded-lg flex items-center"
      {...attributes}
      {...listeners}
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
  );
}
