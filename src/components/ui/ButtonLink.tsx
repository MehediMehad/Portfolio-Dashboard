import Link from "next/link";
import { LucideIcon } from "lucide-react";
import cn from "@/lib/cn";

interface ButtonLinkProps {
  href: string;
  download?: string;
  target?: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
  icon?: LucideIcon;
}

const ButtonLink = ({
  href,
  download,
  target,
  title,
  className,
  children,
  icon: Icon,
}: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      download={download}
      target={target}
      title={title}
      className={cn(
        "relative inline-flex items-center px-6 py-3 text-white border rounded-md shadow-md transition-all duration-300",
        "bg-gradient-to-r from-[#3a1c61] to-[#7b1198] hover:shadow-lg",
        "text-[0.7rem] leading-[14px] tracking-[1.2px] font-normal",
        className
      )}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </Link>
  );
};

export default ButtonLink;
