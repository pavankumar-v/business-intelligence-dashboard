"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, XIcon, Loader2, UploadIcon } from "lucide-react";
import prettyBytes from "pretty-bytes";
import { ErrorCode } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dropzone,
  DropzoneDescription,
  DropzoneGroup,
  DropzoneInput,
  DropzoneTitle,
  DropzoneUploadIcon,
  DropzoneZone,
} from "@/components/ui/dropzone";
import {
  FileList,
  FileListAction,
  FileListDescription,
  FileListHeader,
  FileListIcon,
  FileListInfo,
  FileListItem,
  FileListName,
  FileListSize,
} from "@/components/ui/file-list";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { uploadCsv } from "@/services/metrics.service";
import {
  TypographyH3,
  TypographyMuted,
  TypographySmall,
} from "../ui/typography";

// 10 MB max file size
const MAX_FILE_SIZE = 10e6;

const FormSchema = z.object({
  transactions: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "File exceeds max file size")
    .refine((file) => file.name.endsWith(".csv"), "Only CSV files are allowed")
    .nullable(),
  users: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "File exceeds max file size")
    .refine((file) => file.name.endsWith(".csv"), "Only CSV files are allowed")
    .nullable(),
});

export function CsvUploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      transactions: null,
      users: null,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.transactions || !data.users) {
      toast.error("Both files are required", {
        description: "Please upload both transactions and users CSV files.",
        position: "top-center",
      });
      return;
    }

    setIsUploading(true);

    try {
      const response = await uploadCsv(data.transactions, data.users);

      toast.success(response.message || "Files uploaded successfully!", {
        description:
          "Your CSV files have been uploaded and are being processed.",
        position: "top-center",
        duration: 10000,
      });

      // Reset form and close modal
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Upload error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while uploading files.";
      const responseMessage = (
        error as { response?: { data?: { message?: string } } }
      )?.response?.data?.message;

      toast.error("Upload failed", {
        description: responseMessage || errorMessage,
        position: "top-center",
      });
    } finally {
      setIsUploading(false);
    }
  }

  const removeFile = (fieldName: "transactions" | "users") => {
    form.setValue(fieldName, null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Transactions
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="mb-2 flex items-center gap-2">
            <TypographyH3 withIndicator>
              Upload Transactions & Users
            </TypographyH3>
          </DialogTitle>
          <DialogDescription>
            Upload your transactions and users CSV files to process the data.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            {/* Side by side dropzones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="transactions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Transactions CSV
                    </FormLabel>

                    <Dropzone
                      accept={{
                        "text/csv": [".csv"],
                      }}
                      multiple={false}
                      onDropAccepted={(acceptedFiles) => {
                        if (acceptedFiles[0]) {
                          form.setValue("transactions", acceptedFiles[0]);
                        }
                      }}
                    >
                      <DropzoneZone className="border shadow-none rounded-xl">
                        <DropzoneInput
                          disabled={field.disabled || isUploading}
                          name={field.name}
                        />
                        <DropzoneGroup className="gap-4">
                          <UploadIcon className="text-violet-500" />
                          <DropzoneGroup>
                            <TypographySmall className="text-center">
                              Transactions
                            </TypographySmall>
                            <TypographyMuted className="text-xs text-center">
                              You can upload files up to 10MB in size. Supported
                              formats: CSV.
                            </TypographyMuted>
                          </DropzoneGroup>
                        </DropzoneGroup>
                      </DropzoneZone>
                    </Dropzone>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="users"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Users CSV
                    </FormLabel>

                    <Dropzone
                      accept={{
                        "text/csv": [".csv"],
                      }}
                      multiple={false}
                      onDropAccepted={(acceptedFiles) => {
                        if (acceptedFiles[0]) {
                          form.setValue("users", acceptedFiles[0]);
                        }
                      }}
                    >
                      <DropzoneZone className="border shadow-none rounded-xl">
                        <DropzoneInput
                          disabled={field.disabled || isUploading}
                          name={field.name}
                        />
                        <DropzoneGroup className="gap-4">
                          <UploadIcon className="text-green-500" />
                          <DropzoneGroup>
                            <TypographySmall className="text-center">
                              Users
                            </TypographySmall>
                            <TypographyMuted className="text-xs text-center">
                              You can upload files up to 10MB in size. Supported
                              formats: CSV.
                            </TypographyMuted>
                          </DropzoneGroup>
                        </DropzoneGroup>
                      </DropzoneZone>
                    </Dropzone>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* File Lists */}
            {(form.watch("transactions") || form.watch("users")) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Transactions File List */}
                <div>
                  {form.watch("transactions") && (
                    <FileList>
                      <FileListItem>
                        <FileListHeader>
                          <FileListIcon />
                          <FileListInfo>
                            <FileListName>
                              {form.watch("transactions")!.name}
                            </FileListName>
                            <FileListDescription>
                              <FileListSize>
                                {form.watch("transactions")!.size}
                              </FileListSize>
                            </FileListDescription>
                          </FileListInfo>
                          <FileListAction
                            onClick={() => removeFile("transactions")}
                          >
                            <XIcon />
                            <span className="sr-only">Remove</span>
                          </FileListAction>
                        </FileListHeader>
                      </FileListItem>
                    </FileList>
                  )}
                </div>

                {/* Users File List */}
                <div>
                  {form.watch("users") && (
                    <FileList>
                      <FileListItem>
                        <FileListHeader>
                          <FileListIcon />
                          <FileListInfo>
                            <FileListName>
                              {form.watch("users")!.name}
                            </FileListName>
                            <FileListDescription>
                              <FileListSize>
                                {form.watch("users")!.size}
                              </FileListSize>
                            </FileListDescription>
                          </FileListInfo>
                          <FileListAction onClick={() => removeFile("users")}>
                            <XIcon />
                            <span className="sr-only">Remove</span>
                          </FileListAction>
                        </FileListHeader>
                      </FileListItem>
                    </FileList>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    Upload
                    <Upload className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
