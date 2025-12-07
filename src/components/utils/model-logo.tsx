import claudLogo from "@/assets/claude.png";
import chatGpt from "@/assets/models/chatgpt.png";
import { Circle, CircleDashed } from "lucide-react";

const ModelLogo = ({ name }: { name: string }) => {
  const logo = getLogo(name.toLocaleLowerCase());

  return (
    <div>
      {logo ? (
        <img
          src={logo}
          alt={name}
          className="w-9 h-9 left-[-14px] top-[-5px] rounded-md bg-accent p-2 dark:bg-gray-200"
        />
      ) : (
        <CircleDashed className="w-9 h-9 left-[-14px] top-[-5px] rounded-md bg-accent p-2 dark:bg-black" />
      )}
    </div>
  );
};

export default ModelLogo;

const getLogo = (name: string): string | null => {
  if (name.includes("claude")) {
    return claudLogo;
  }
  if (name.includes("gpt")) {
    return chatGpt;
  }

  return null;
};
