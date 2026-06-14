"use client";

import { useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CldUploadWidget } from "next-cloudinary";
import { Camera, Loader2 } from "lucide-react";
import { updateProfileImage } from "@/app/actions/profile-actions";
import { User } from "@prisma/client";

export function ProfilePictureUpload({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();
  const hasCloudinary = !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const handleUpload = (url: string) => {
    startTransition(() => {
      updateProfileImage(url);
    });
  };

  return (
    <div className="relative group w-20 h-20 shrink-0">
      <Avatar className="w-20 h-20 border-2 border-border shadow-sm">
        <AvatarImage src={user.image || ""} />
        <AvatarFallback className="text-2xl">{user.name?.charAt(0) || "U"}</AvatarFallback>
      </Avatar>

      {hasCloudinary ? (
        <CldUploadWidget 
          uploadPreset="taskflow_preset"
          options={{
            multiple: false,
            cropping: true,
            croppingAspectRatio: 1,
            showSkipCropButton: false
          }}
          onSuccess={(result: any) => {
            if (result.info && result.info.secure_url) {
              handleUpload(result.info.secure_url);
            }
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => {
                try {
                  open?.();
                } catch (error) {
                  console.error(error);
                  alert("The upload widget is still loading or was blocked by an ad-blocker. Please wait a moment or disable your ad-blocker.");
                }
              }}
              disabled={isPending}
              className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50 cursor-pointer"
            >
              {isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : <Camera className="w-6 h-6" />}
            </button>
          )}
        </CldUploadWidget>
      ) : (
        <button
          type="button"
          onClick={() => alert("Cloudinary is not configured. Please add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME.")}
          className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Camera className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
