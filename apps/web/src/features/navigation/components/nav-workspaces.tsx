import type { LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@open-learn/ui/components/sidebar";

interface NavWorkspaceItem {
  name: string;
  subtitle: string;
  to: "/" | "/ai" | "/todos";
  icon: LucideIcon;
}

interface NavWorkspacesProps {
  items: readonly NavWorkspaceItem[];
}

export default function NavWorkspaces({ items }: NavWorkspacesProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild size="lg" tooltip={item.name}>
                <Link to={item.to}>
                  <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-none border bg-background">
                    <item.icon />
                  </div>
                  <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{item.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{item.subtitle}</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
