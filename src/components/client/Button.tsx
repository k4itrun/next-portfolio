import { ButtonProps } from "@/interfaces";

type ButtonState = "loading" | "disabled" | "success" | "error" | "default";

const Button = ({
  children,
  className = "",
  disabled = false,
  state = "default",
  ...props
}: ButtonProps & { state?: ButtonState }) => {

  const baseClasses = "px-4 py-2 rounded-lg min-h-[44px] relative overflow-hidden transition-all duration-200";
  
  const stateClasses = {
    default: "bg-color-layout text-white hover:bg-color-hover hover:shadow-lg hover:scale-105",
    loading: "bg-gray-500 text-gray-200 cursor-wait",
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    disabled: "bg-gray-300 text-gray-400 cursor-not-allowed",
  };

  const classNames = `${baseClasses} ${stateClasses[state]} ${className}`;
  return (
    <button
      className={classNames}
      disabled={state === "disabled" || state === "loading"}
      {...props}
    >
      {state === "loading" ? (
        <span className="loader"></span> 
      ) : (
        <span
          className="absolute inset-0 bg-white opacity-0 transition-opacity duration-200 group-hover:opacity-10 group-active:opacity-20"
        />
      )}
      {children}
    </button>
  );
};

export default Button;