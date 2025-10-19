"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Plus, MoreHorizontal, Search } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Standard = {
  id: number;
  name: string;
  code: string;
  description?: string;
  subjectsCount: number;
};

const initialStandards: Standard[] = [
  {
    id: 1,
    name: "O Levels",
    code: "O-LVL",
    description: "Ordinary Levels curriculum",
    subjectsCount: 9,
  },
  {
    id: 2,
    name: "A Levels",
    code: "A-LVL",
    description: "Advanced Levels curriculum",
    subjectsCount: 6,
  },
  {
    id: 3,
    name: "Grade 8",
    code: "GR-08",
    description: "Middle school standard",
    subjectsCount: 7,
  },
  {
    id: 4,
    name: "Grade 9",
    code: "GR-09",
    description: "Middle school standard",
    subjectsCount: 8,
  },
];

export default function StandardsPage() {
  const [standards, setStandards] = useState<Standard[]>(initialStandards);
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Standard | null>(null);
  const [draft, setDraft] = useState<Partial<Standard>>({});
  const router = useRouter();

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return standards.filter(
      (st) =>
        st.name.toLowerCase().includes(s) ||
        st.code.toLowerCase().includes(s) ||
        (st.description || "").toLowerCase().includes(s)
    );
  }, [standards, search]);

  function resetDraft() {
    setDraft({});
  }

  function handleCreate() {
    if (!draft.name) return;
    const next: Standard = {
      id: standards.length ? Math.max(...standards.map((s) => s.id)) + 1 : 1,
      name: draft.name.trim(),
      // code: draft.code.trim().toUpperCase(),
      description: draft.description?.trim(),
      subjectsCount: 0,
    };
    setStandards((prev) => [next, ...prev]);
    setCreateOpen(false);
    toast.success("Standard created");
    resetDraft();
  }

  function handleEditOpen(st: Standard) {
    setDraft(st);
    setEditOpen(true);
  }

  function handleUpdate() {
    if (!draft.id || !draft.name) return;
    setStandards((prev) =>
      prev.map((s) =>
        s.id === draft.id
          ? {
              ...s,
              name: draft.name!.trim(),
              // code: draft.code!.trim().toUpperCase(),-
              description: draft.description?.trim(),
            }
          : s
      )
    );
    setEditOpen(false);
    toast.success("Standard updated");
    resetDraft();
  }

  function confirmDelete(st: Standard) {
    setPendingDelete(st);
  }

  function handleDeleteConfirmed() {
    if (!pendingDelete) return;
    setStandards((prev) => prev.filter((s) => s.id !== pendingDelete.id));
    toast.success("Standard deleted");
    setPendingDelete(null);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-pretty">
            Standards
          </h1>
          <div className="text-muted-foreground flex items-center gap-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  <BreadcrumbSeparator />
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/standards">
                    Standards
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <p className="text-muted-foreground">Manage Standards.</p>
        </div>

        {/* Create Standard Drawer */}
        <Drawer
          open={createOpen}
          onOpenChange={setCreateOpen}
          direction="bottom"
        >
          <DrawerTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" />
              Create Standard
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-background">
            <DrawerHeader>
              <DrawerTitle>Create new standard</DrawerTitle>
              <DrawerDescription>
                Provide basic information to create a standard/class.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="mb-4" htmlFor="std-name">
                    Name
                  </Label>
                  <Input
                    id="std-name"
                    maxLength={25}
                    value={draft.name || ""}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, name: e.target.value }))
                    }
                    placeholder="e.g., O Levels"
                  />
                </div>
                {/* <div>
                  <Label 
                  className="mb-4"
                  htmlFor="std-code">Code</Label>
                  <Input
                    id="std-code"
                    value={draft.code || ""}
                    onChange={(e) => setDraft((d) => ({ ...d, code: e.target.value }))}
                    placeholder="e.g., O-LVL"
                  />
                </div> */}
              </div>
              <div>
                <Label className="mb-4" htmlFor="std-desc">
                  Description
                </Label>
                <Textarea
                  id="std-desc"
                  maxLength={100}
                  value={draft.description || ""}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, description: e.target.value }))
                  }
                  placeholder="Short description"
                />
              </div>
            </div>
            <DrawerFooter>
              <Button onClick={handleCreate}>Save</Button>
              <DrawerClose asChild>
                <Button variant="secondary" onClick={resetDraft}>
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Search standards..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid of Standards */}
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
        {filtered.map((st) => (
          <Card key={st.id} className="group relative overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-lg">{st.name}</CardTitle>
                  {/* <CardDescription>{st.code}</CardDescription> */}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleEditOpen(st)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => confirmDelete(st)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground min-h-10">
                {st.description || "No description provided."}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{st.subjectsCount} subjects</Badge>
                <Button
                  className="text-sm"
                  onClick={() =>
                    router.push(
                      `/admin/standards/${st.id}?name=${encodeURIComponent(
                        st.name
                      )}`
                    )
                  }
                >
                  Manage subjects
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Drawer */}
      <Drawer open={editOpen} onOpenChange={setEditOpen} direction="bottom">
        <DrawerContent className="bg-background">
          <DrawerHeader>
            <DrawerTitle>Edit standard</DrawerTitle>
            <DrawerDescription>
              Update details for this standard/class.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  className="mt-4"
                  value={draft.name || ""}
                  maxLength={25}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, name: e.target.value }))
                  }
                />
              </div>
              {/* <div>
                <Label htmlFor="edit-code">Code</Label>
                <Input
                  id="edit-code"
                  value={draft.code || ""}
                  onChange={(e) => setDraft((d) => ({ ...d, code: e.target.value }))}
                />
              </div> */}
            </div>
            <div>
              <Label htmlFor="edit-desc">Description</Label>
              <Textarea
                id="edit-desc"
                className="mt-4"
                value={draft.description || ""}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, description: e.target.value }))
                }
              />
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handleUpdate}>Save changes</Button>
            <DrawerClose asChild>
              <Button variant="secondary" onClick={resetDraft}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete standard?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. It will permanently remove{" "}
              <span className="font-medium">{pendingDelete?.name}</span> and its
              associations.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirmed}
              className="bg-destructive dark:text-white hover:dark:text-zinc-800"
            >
              Confirm delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
