"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, XIcon, CheckCircle2, Loader2 } from "lucide-react";
import prettyBytes from "pretty-bytes";
import { ErrorCode } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dropzone,
  DropzoneDescription,
  DropzoneInput,
  DropzoneTitle,
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
import { Card } from "../ui/card";
import { TypographyH3 } from "../ui/typography";
import { uploadCsv } from "@/services/metrics.service";

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
  const [jobId, setJobId] = useState<string | null>(null);

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
    setJobId(null);

    try {
      const response = await uploadCsv(data.transactions, data.users);

      toast.success(response.message || "Files uploaded successfully!", {
        description: `Job ID: ${response.data.job_id}`,
        position: "top-center",
      });

      setJobId(response.data.job_id);

      // Reset form
      form.reset();
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error("Upload failed", {
        description:
          error.response?.data?.message ||
          error.message ||
          "An error occurred while uploading files.",
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
    <Card className="bg-background">
      <TypographyH3 indicatorColor="bg-accent-indicator-purple" withIndicator>
        Upload Transactions & Users
      </TypographyH3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-2xl space-y-6"
        >
          {/* Transactions CSV Upload */}
          <Dropzone
            maxSize={MAX_FILE_SIZE}
            accept={{ "text/csv": [".csv"] }}
            multiple={false}
            onDropAccepted={(acceptedFiles) => {
              if (acceptedFiles[0]) {
                form.setValue("transactions", acceptedFiles[0]);
              }
            }}
            onDropRejected={(fileRejections) => {
              fileRejections.forEach((fileRejection) => {
                if (
                  fileRejection.errors.some(
                    (err) => err.code === ErrorCode.FileTooLarge
                  )
                ) {
                  toast.error("File size too large.", {
                    description: `File '${
                      fileRejection.file.name
                    }' exceeds ${prettyBytes(MAX_FILE_SIZE)}.`,
                  });
                } else if (
                  fileRejection.errors.some(
                    (err) => err.code === ErrorCode.FileInvalidType
                  )
                ) {
                  toast.error("Invalid file type.", {
                    description: "Only CSV files are allowed.",
                  });
                }
              });
            }}
          >
            {({ maxSize }) => (
              <FormField
                control={form.control}
                name="transactions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transactions CSV</FormLabel>
                    <DropzoneZone className="flex justify-center border">
                      <FormControl>
                        <DropzoneInput
                          disabled={field.disabled || isUploading}
                          name={field.name}
                          onBlur={field.onBlur}
                          ref={field.ref}
                        />
                      </FormControl>
                      <div className="flex items-center gap-6">
                        <Upload />
                        <div className="grid gap-0.5">
                          <DropzoneTitle>
                            Browse to upload transactions file
                          </DropzoneTitle>
                          <DropzoneDescription>
                            {`Maximum file size: ${prettyBytes(maxSize ?? 0)}`}
                          </DropzoneDescription>
                        </div>
                      </div>
                    </DropzoneZone>
                    <FormDescription>
                      Drag and drop is supported.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </Dropzone>

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
                  <FileListAction onClick={() => removeFile("transactions")}>
                    <XIcon />
                    <span className="sr-only">Remove</span>
                  </FileListAction>
                </FileListHeader>
              </FileListItem>
            </FileList>
          )}

          {/* Users CSV Upload */}
          <Dropzone
            maxSize={MAX_FILE_SIZE}
            accept={{ "text/csv": [".csv"] }}
            multiple={false}
            onDropAccepted={(acceptedFiles) => {
              if (acceptedFiles[0]) {
                form.setValue("users", acceptedFiles[0]);
              }
            }}
            onDropRejected={(fileRejections) => {
              fileRejections.forEach((fileRejection) => {
                if (
                  fileRejection.errors.some(
                    (err) => err.code === ErrorCode.FileTooLarge
                  )
                ) {
                  toast.error("File size too large.", {
                    description: `File '${
                      fileRejection.file.name
                    }' exceeds ${prettyBytes(MAX_FILE_SIZE)}.`,
                  });
                } else if (
                  fileRejection.errors.some(
                    (err) => err.code === ErrorCode.FileInvalidType
                  )
                ) {
                  toast.error("Invalid file type.", {
                    description: "Only CSV files are allowed.",
                  });
                }
              });
            }}
          >
            {({ maxSize }) => (
              <FormField
                control={form.control}
                name="users"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Users CSV</FormLabel>
                    <DropzoneZone className="flex justify-center border">
                      <FormControl>
                        <DropzoneInput
                          disabled={field.disabled || isUploading}
                          name={field.name}
                          onBlur={field.onBlur}
                          ref={field.ref}
                        />
                      </FormControl>
                      <div className="flex items-center gap-6">
                        <Upload />
                        <div className="grid gap-0.5">
                          <DropzoneTitle>
                            Browse to upload users file
                          </DropzoneTitle>
                          <DropzoneDescription>
                            {`Maximum file size: ${prettyBytes(maxSize ?? 0)}`}
                          </DropzoneDescription>
                        </div>
                      </div>
                    </DropzoneZone>
                    <FormDescription>
                      Drag and drop is supported.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </Dropzone>

          {form.watch("users") && (
            <FileList>
              <FileListItem>
                <FileListHeader>
                  <FileListIcon />
                  <FileListInfo>
                    <FileListName>{form.watch("users")!.name}</FileListName>
                    <FileListDescription>
                      <FileListSize>{form.watch("users")!.size}</FileListSize>
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

          {/* Success Message */}
          {jobId && (
            <div className="rounded-lg border border-green-500 bg-green-50 dark:bg-green-950 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-green-900 dark:text-green-100">
                    Upload Successful
                  </h4>
                  <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                    Your files have been uploaded and are being processed.
                  </p>
                  <p className="mt-2 font-mono text-xs text-green-800 dark:text-green-200">
                    Job ID: {jobId}
                  </p>
                </div>
              </div>
            </div>
          )}

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
        </form>
      </Form>
    </Card>
  );
}
