"use client";
import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

type Subject = {
  id: number;
  name: string;
  code: string;
};

const initialSubjects: Subject[] = [
  { id: 1, name: "Mathematics", code: "MATH" },
  { id: 2, name: "Physics", code: "PHYS" },
  { id: 3, name: "Chemistry", code: "CHEM" },
  { id: 4, name: "Biology", code: "BIO" },
];

export default function StandardDetailPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const standardId = params?.id;
  console.log(params, name, standardId, "params");
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Subject | null>(null);
  const [draft, setDraft] = useState<Partial<Subject>>({});

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return subjects.filter(
      (subj) =>
        subj.name.toLowerCase().includes(s) ||
        subj.code.toLowerCase().includes(s)
    );
  }, [subjects, search]);

  function resetDraft() {
    setDraft({});
  }

  function handleCreate() {
    if (!draft.name) return;
    const next: Subject = {
      id: subjects.length ? Math.max(...subjects.map((s) => s.id)) + 1 : 1,
      name: draft.name.trim(),
      // code: draft.code.trim().toUpperCase(),
    };
    setSubjects((prev) => [next, ...prev]);
    toast.success("Subject created");
    setCreateOpen(false);
    resetDraft();
  }

  function openEdit(subj: Subject) {
    setDraft(subj);
    setEditOpen(true);
  }

  function handleUpdate() {
    if (!draft.id || !draft.name ) return;
    setSubjects((prev) =>
      prev.map((s) =>
        s.id === draft.id
          ? {
              ...s,
              name: draft.name!.trim(),
              // code: draft.code!.trim().toUpperCase(),
            }
          : s 
      )
    );
    setEditOpen(false);
    resetDraft();
    toast.success("Subject updated");
  }

  function confirmDelete(subj: Subject) {
    setPendingDelete(subj);
  }

  function handleDeleteConfirmed() {
    if (!pendingDelete) return;
    setSubjects((prev) => prev.filter((s) => s.id !== pendingDelete.id));
    setPendingDelete(null);
    toast.success("Subject deleted");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-pretty">
            Subjects
          </h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/dashboard">
                  Dashboard
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/standards">
                  Standards
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/`}>Standard {name}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <p className="text-muted-foreground">
            Manage subjects for Standard {name}.
          </p>
        </div>

        {/* Create Subject Drawer */}
        <Drawer
          open={createOpen}
          onOpenChange={setCreateOpen}
          direction="bottom"
        >
          <DrawerTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Subject
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-background">
            <DrawerHeader>
              <DrawerTitle>Create subject</DrawerTitle>
              <DrawerDescription>
                Add a new subject for this standard.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label 
                  className="mb-4"
                  htmlFor="subj-name">Subject Name</Label>
                  <Input
                    id="subj-name"
                    value={draft.name || ""}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, name: e.target.value }))
                    }
                    placeholder="e.g., Mathematics"
                  />
                </div>
                {/* <div>
                  <Label htmlFor="subj-code">Code</Label>
                  <Input
                    id="subj-code"
                    value={draft.code || ""}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, code: e.target.value }))
                    }
                    placeholder="e.g., MATH"
                  />
                </div> */}
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
          placeholder="Search subjects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Subjects Table */}
      <Card>
        <CardHeader>
          <CardTitle>Subjects</CardTitle>
          <CardDescription>
            View and manage subjects for this standard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  {/* <TableHead>Code</TableHead> */}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((subj) => (
                  <TableRow key={subj.id}>
                    <TableCell className="font-medium">{subj.name}</TableCell>
                    {/* <TableCell>{subj.code}</TableCell> */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openEdit(subj)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => confirmDelete(subj)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center text-muted-foreground"
                    >
                      No subjects found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Subject Drawer */}
      <Drawer open={editOpen} onOpenChange={setEditOpen} direction="bottom">
        <DrawerContent className="bg-background">
          <DrawerHeader>
            <DrawerTitle>Edit subject</DrawerTitle>
            <DrawerDescription>
              Update this subject&apos;s details.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label 
                className="mb-4"
                htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={draft.name || ""}
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
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, code: e.target.value }))
                  }
                />
              </div> */}
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
            <AlertDialogTitle>Delete subject?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. It will permanently remove{" "}
              <span className="font-medium">{pendingDelete?.name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirmed}
              className="bg-destructive  text-white hover:dark:text-zinc-800"
            >
              Confirm delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
