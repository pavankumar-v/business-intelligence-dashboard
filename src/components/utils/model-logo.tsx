import claudLogo from "@/assets/claude.png";
import chatGpt from "@/assets/models/chatgpt.png";

const ModelLogo = ({ name }: { name: string }) => {
  return (
    <div>
      <img
        src={getLogo(name.toLocaleLowerCase())}
        alt={name}
        className="w-9 h-9 left-[-14px] top-[-5px] rounded-md bg-accent p-2"
      />
    </div>
  );
};

export default ModelLogo;

const getLogo = (name: string) => {
  if (name.includes("claude")) {
    return claudLogo;
  }
  if (name.includes("gpt")) {
    return chatGpt;
  }
  return chatGpt;
};
