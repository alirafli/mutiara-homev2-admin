import * as React from "react";
import { cn } from "@/lib/utils";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [eyeType, setEyeType] = React.useState("password");
    const [toggleIcon, setToggleIcon] = React.useState(true);

    const handleToggle = () => {
      if (eyeType === "password") {
        setToggleIcon(true);
        setEyeType("text");
      } else {
        setToggleIcon(false);
        setEyeType("password");
      }
    };
    return (
      <div className="relative">
        <input
          type={type === "password" ? eyeType : type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />

        {type === "password" && (
          <span
            className="absolute flex justify-end items-center cursor-pointer bottom-2 right-3"
            onClick={handleToggle}
          >
            {!toggleIcon ? (
              <IoEyeOutline size={25} />
            ) : (
              <IoEyeOffOutline size={25} />
            )}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
