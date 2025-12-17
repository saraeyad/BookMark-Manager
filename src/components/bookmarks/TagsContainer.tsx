import { useTags } from "@/context/TagContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { type TagsType } from "@/types";
import type { CheckedState } from "@radix-ui/react-checkbox";

function TagsContainer({ tag }: { tag: TagsType[0] }) {
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
    <li className="flex items-center justify-between py-2 hover:bg-muted/50 rounded-md px-2 -mx-2 transition-colors">
      <div className="flex items-center gap-2.5 cursor-pointer">
        <Checkbox
          className="cursor-pointer border-muted-foreground/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          id={tag.name}
          checked={isChecked}
          onCheckedChange={(check: CheckedState) =>
            handleChangeTags(check, tag.name)
          }
        />
        <Label
          htmlFor={tag.name}
          className={`text-sm cursor-pointer ${
            isChecked ? "text-foreground font-medium" : "text-muted-foreground"
          }`}
        >
          {tag.name}
        </Label>
      </div>
      <span className="text-xs font-medium text-muted-foreground bg-muted rounded-full px-2 py-0.5 min-w-[24px] text-center">
        {tag.count}
      </span>
    </li>
  );
}

export default TagsContainer;
