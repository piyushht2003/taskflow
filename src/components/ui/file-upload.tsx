"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";

interface FileUploadProps {
  onUpload: (url: string) => void;
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const hasCloudinary = !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!hasCloudinary) {
    return (
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        className="w-full border-dashed border-2 bg-secondary/20 gap-2 opacity-50 cursor-not-allowed"
        onClick={() => alert("Please add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME to your .env file to enable uploads.")}
      >
        <UploadCloud className="w-4 h-4" />
        Upload Attachment (Cloudinary Not Configured)
      </Button>
    );
  }

  return (
    <CldUploadWidget 
      uploadPreset="taskflow_preset"
      onSuccess={(result: any) => {
        if (result.info && result.info.secure_url) {
          onUpload(result.info.secure_url);
        }
      }}
    >
      {({ open }) => {
        return (
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            className="w-full border-dashed border-2 hover:bg-secondary/50 gap-2"
            onClick={() => {
              try {
                open?.();
              } catch (error) {
                console.error(error);
                alert("The upload widget is still loading or was blocked by an ad-blocker.");
              }
            }}
          >
            <UploadCloud className="w-4 h-4" />
            Upload Attachment
          </Button>
        );
      }}
    </CldUploadWidget>
  );
}
