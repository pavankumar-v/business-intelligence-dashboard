import { cn } from "@/lib/utils";
import type { ClassNameValue } from "tailwind-merge";

type TypographyProps = React.HTMLAttributes<HTMLHeadingElement> & {
  icon?: React.ReactNode;
  withIndicator?: boolean;
  indicatorColor?: ClassNameValue;
};

export function TypographyH1({
  children,
  className,
  ...props
}: TypographyProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance text-text",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({
  children,
  className,
  ...props
}: TypographyProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 flex items-center gap-2 text-text",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({
  children,
  className,
  withIndicator,
  indicatorColor,
  ...props
}: TypographyProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight flex items-center gap-2 text-text",
        className
      )}
      {...props}
    >
      {withIndicator && (
        <div
          className={cn(
            "h-[30px] w-[14px] bg-blue-200 rounded text-text",
            indicatorColor
          )}
        ></div>
      )}
      {children}
    </h3>
  );
}

export function TypographyH4({
  children,
  className,
  indicatorColor,
  withIndicator,
  ...props
}: TypographyProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight flex items-center gap-2 text-text",
        className
      )}
      {...props}
    >
      {withIndicator && (
        <div
          className={cn(
            "h-[30px] w-[14px] bg-blue-200 rounded text-text",
            indicatorColor
          )}
        ></div>
      )}
      {children}
    </h4>
  );
}

export function TypographyP({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "leading-7 [&:not(:first-child)]:mt-6 text-text",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function TypographyBlockquote({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic text-text", className)}
      {...props}
    >
      {children}
    </blockquote>
  );
}

export function TypographyInlineCode({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <code
      className={cn(
        "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-text",
        className
      )}
      {...props}
    >
      {children}
    </code>
  );
}

export function TypographyLead({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-muted-foreground text-xl text-text", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function TypographyLarge({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("text-lg font-semibold text-text", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function TypographySmall({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <small
      className={cn("text-sm leading-none font-medium text-text", className)}
      {...props}
    >
      {children}
    </small>
  );
}

export function TypographyMuted({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)} {...props}>
      {children}
    </p>
  );
}
