import { useTags } from "@/context/TagContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { type TagsType } from "@/schemas";
import type { CheckedState } from "@radix-ui/react-checkbox";

interface TagsContainerProps {
  tag: TagsType[0];
}

function TagsContainer({ tag }: TagsContainerProps) {
  const { tags, setTags } = useTags();

  function handleChangeTags(check: CheckedState, name: string) {
    if (check === true) {
      setTags((prev: string[]) => [...prev, name]);
    } else {
      setTags((prev: string[]) => prev.filter((p: string) => p !== name));
    }
  }

  const isChecked = tags.includes(tag.name);

  return (
    <div className="flex items-center justify-between py-2 px-2 -mx-2 rounded-md  transition-colors cursor-pointer group">
      <div className="flex items-center gap-2.5">
        <Checkbox
          className="cursor-pointer border-muted-foreground/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-colors"
          id={tag.name}
          checked={isChecked}
          onCheckedChange={(check: CheckedState) =>
            handleChangeTags(check, tag.name)
          }
        />
        <Label
          htmlFor={tag.name}
          className={`text-sm cursor-pointer transition-colors ${
            isChecked
              ? "text-foreground font-medium"
              : "text-muted-foreground group-hover:text-foreground"
          }`}
        >
          {tag.name}
        </Label>
      </div>
      <span
        className={`text-xs font-medium rounded-full px-2 py-0.5 min-w-[24px] text-center transition-colors ${
          isChecked
            ? "bg-primary/20 text-primary"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {tag.count}
      </span>
    </div>
  );
}

export default TagsContainer;
