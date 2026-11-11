"use client";

import { useState } from "react";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteJob, updateJob } from "@/lib/actions/jobs";

// one row of the getJobs() result
type Job = {
  id: string;
  title: string;
  company: string;
  category: string;
  jobType: string;
  isRemote: boolean;
  location: string;
  deadline: string;
  minSalary: number | null;
  maxSalary: number | null;
  payFrequency: string;
  responsibilities: string;
  qualifications: string;
};

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Marketing",
  "Finance",
  "Operations",
];
const PAY_FREQUENCIES = ["per hour", "per day", "per month", "per year"];

// shared field styling (same look as the add-jobs page)
const inputClass =
  "h-10 rounded-[10px] border-[#303034] bg-[#19191c] px-3.5 text-sm text-white placeholder:text-[#8f8f96] focus-visible:border-[#6052ff] focus-visible:ring-[#6052ff]/20";

export function JobRowActions({ job }: { job: Job }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isRemote, setIsRemote] = useState(job.isRemote);

  const handleUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const result = await updateJob(job.id, new FormData(event.currentTarget));

    if (result.success) {
      toast.success("Job updated!", {
        description: "Your changes are live.",
      });
      setEditOpen(false);
    } else {
      toast.error("Failed to update job", {
        description: "Please try again.",
      });
    }
  };

  const handleDelete = async () => {
    const result = await deleteJob(job.id);

    if (result.success) {
      toast.success("Job post deleted");
    } else {
      toast.error("Failed to delete job", {
        description: "Please try again.",
      });
    }
    setDeleteOpen(false);
  };

  return (
    <>
      {/* Update button */}
      <Button
        type="button"
        onClick={() => setEditOpen(true)}
        className="h-8 gap-1.5 rounded-lg border border-[#2e2e35] bg-[#1c1c22] px-2.5 text-xs font-medium text-white hover:bg-[#26262c]"
      >
        <Pencil className="size-3.5" />
        Update
      </Button>

      {/* Delete button */}
      <Button
        type="button"
        aria-label="Delete job post"
        onClick={() => setDeleteOpen(true)}
        className="size-8 rounded-lg border border-[#2e2e35] bg-[#1c1c22] p-0 text-[#8f8f96] hover:bg-[#f87171]/10 hover:text-[#f87171]"
      >
        <Trash2 className="size-3.5" />
      </Button>

      {/* 3-dot menu (Edit / Delete) */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              aria-label="More options"
              className="size-8 rounded-lg bg-transparent p-0 text-[#8f8f96] hover:bg-white/5 hover:text-white"
            />
          }
        >
          <Ellipsis className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-32 border-[#26262b] bg-[#131317]">
          <DropdownMenuItem
            onClick={() => setEditOpen(true)}
            className="gap-2 text-sm text-white focus:bg-white/5"
          >
            <Pencil className="size-3.5" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="gap-2 text-sm text-[#f87171] focus:bg-[#f87171]/10 focus:text-[#f87171]"
          >
            <Trash2 className="size-3.5" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto border-[#26262b] bg-[#131317] sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Job Post</DialogTitle>
            <DialogDescription className="text-[#8f8f96]">
              Update the listing details. Changes go live immediately.
            </DialogDescription>
          </DialogHeader>

          <form
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={handleUpdate}
          >
            {/* Hidden state field (Switch below) */}
            <input
              type="hidden"
              name="isRemote"
              value={isRemote ? "true" : "false"}
            />

            <div>
              <Label htmlFor={`edit-title-${job.id}`} className="mb-1.5 text-white">
                Job Title
              </Label>
              <Input
                id={`edit-title-${job.id}`}
                name="title"
                defaultValue={job.title}
                required
                className={inputClass}
              />
            </div>
            <div>
              <Label htmlFor={`edit-company-${job.id}`} className="mb-1.5 text-white">
                Company Name
              </Label>
              <Input
                id={`edit-company-${job.id}`}
                name="company"
                defaultValue={job.company}
                required
                className={inputClass}
              />
            </div>

            <div>
              <Label className="mb-1.5 text-white">Job Category</Label>
              <Select name="category" defaultValue={job.category}>
                <SelectTrigger
                  aria-label="Job Category"
                  className="w-full rounded-[10px] border-[#303034] bg-[#19191c] px-3.5 text-white data-[size=default]:h-10 focus-visible:border-[#6052ff] hover:text-white"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {JOB_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1.5 text-white">Job Type</Label>
              <Select name="jobType" defaultValue={job.jobType}>
                <SelectTrigger
                  aria-label="Job Type"
                  className="w-full rounded-[10px] border-[#303034] bg-[#19191c] px-3.5 text-white data-[size=default]:h-10 focus-visible:border-[#6052ff] hover:text-white"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor={`edit-location-${job.id}`} className="mb-1.5 text-white">
                Location
              </Label>
              <Input
                id={`edit-location-${job.id}`}
                name="location"
                defaultValue={job.location}
                placeholder="New York, USA"
                className={inputClass}
              />
            </div>
            <div>
              <Label htmlFor={`edit-deadline-${job.id}`} className="mb-1.5 text-white">
                Application Deadline
              </Label>
              <Input
                id={`edit-deadline-${job.id}`}
                name="deadline"
                type="date"
                defaultValue={job.deadline}
                className={`${inputClass} [color-scheme:dark]`}
              />
            </div>

            <div>
              <Label htmlFor={`edit-min-${job.id}`} className="mb-1.5 text-white">
                Min Salary / Rate
              </Label>
              <Input
                id={`edit-min-${job.id}`}
                name="minSalary"
                type="number"
                defaultValue={job.minSalary ?? ""}
                className={inputClass}
              />
            </div>
            <div>
              <Label htmlFor={`edit-max-${job.id}`} className="mb-1.5 text-white">
                Max Salary / Rate
              </Label>
              <Input
                id={`edit-max-${job.id}`}
                name="maxSalary"
                type="number"
                defaultValue={job.maxSalary ?? ""}
                className={inputClass}
              />
            </div>

            <div>
              <Label className="mb-1.5 text-white">Frequency</Label>
              <Select name="payFrequency" defaultValue={job.payFrequency}>
                <SelectTrigger
                  aria-label="Frequency"
                  className="w-full rounded-[10px] border-[#303034] bg-[#19191c] px-3.5 text-white data-[size=default]:h-10 focus-visible:border-[#6052ff] hover:text-white"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAY_FREQUENCIES.map((frequency) => (
                    <SelectItem key={frequency} value={frequency}>
                      {frequency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-[10px] border border-[#26262b] bg-[#0b0b0e] px-3.5 py-2.5 sm:mt-6">
              <p className="text-sm font-medium text-white">
                Remote Work Allowed
              </p>
              <Switch
                checked={isRemote}
                onCheckedChange={setIsRemote}
                aria-label="Remote Work Allowed"
                className="data-[size=default]:h-5! data-[size=default]:w-9! data-unchecked:bg-[#26262b]! data-checked:bg-[#19191c]! border-[#303034] [&_[data-slot=switch-thumb]]:bg-white!"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor={`edit-resp-${job.id}`} className="mb-1.5 text-white">
                Key Responsibilities
              </Label>
              <Textarea
                id={`edit-resp-${job.id}`}
                name="responsibilities"
                rows={4}
                defaultValue={job.responsibilities}
                className="rounded-[10px] border-[#303034] bg-[#19191c] px-3.5 py-2.5 text-sm leading-relaxed text-white placeholder:text-[#8f8f96] focus-visible:border-[#6052ff] focus-visible:ring-[#6052ff]/20"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor={`edit-qual-${job.id}`} className="mb-1.5 text-white">
                Qualifications & Requirements
              </Label>
              <Textarea
                id={`edit-qual-${job.id}`}
                name="qualifications"
                rows={4}
                defaultValue={job.qualifications}
                className="rounded-[10px] border-[#303034] bg-[#19191c] px-3.5 py-2.5 text-sm leading-relaxed text-white placeholder:text-[#8f8f96] focus-visible:border-[#6052ff] focus-visible:ring-[#6052ff]/20"
              />
            </div>

            <DialogFooter className="sm:col-span-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditOpen(false)}
                className="h-10 rounded-xl border-[#2e2e35] bg-transparent text-sm text-white hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-10 rounded-xl bg-[#6052ff] px-5 text-sm font-medium text-white hover:bg-[#756aff]"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="border-[#26262b] bg-[#131317] sm:max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete this job post?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#8f8f96]">
              “{job.title}” at {job.company} will be permanently removed. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl border-[#2e2e35] bg-transparent text-sm text-white hover:bg-white/5">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="rounded-xl bg-[#ef4444] text-sm font-medium text-white hover:bg-[#f87171]"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
