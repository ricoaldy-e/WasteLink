import { ElementType, HTMLAttributes, ComponentPropsWithoutRef } from "react";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as"> &
  Pick<HTMLAttributes<HTMLElement>, "children" | "style" | "className">;

export default function Container<T extends ElementType = "div">({
  as,
  children,
  style,
  className,
  ...props
}: ContainerProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag
      style={{
        width: "100%",
        maxWidth: "var(--container-max)",
        marginInline: "auto",
        paddingInline: "var(--container-padding)",
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  );
}
