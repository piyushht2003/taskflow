"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { inviteUser } from "@/app/actions/invite-actions";

export function InviteMemberModal({ workspaceId, currentUserRole }: { workspaceId: string, currentUserRole: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("DEVELOPER");
  const [customRole, setCustomRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [invitedUrl, setInvitedUrl] = useState("");

  const handleInvite = async () => {
    const finalRole = role === "CUSTOM" ? customRole.trim() : role;
    if (!finalRole) return;
    
    setLoading(true);
    try {
      const invite = await inviteUser(email, workspaceId, finalRole);
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      setInvitedUrl(`${origin}/invite/${invite.token}`);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = email.trim() !== "" && (role !== "CUSTOM" || customRole.trim() !== "");

  return (
    <Dialog open={open} onOpenChange={(v) => { 
      setOpen(v); 
      if(!v) {
        setInvitedUrl("");
        setEmail("");
        setRole("DEVELOPER");
        setCustomRole("");
      } 
    }}>
      <DialogTrigger render={<Button />}>
        <Plus className="w-4 h-4 mr-2"/> Invite Member
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite to Workspace</DialogTitle>
        </DialogHeader>
        {!invitedUrl ? (
          <div className="space-y-4 pt-4">
            <Input placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
            <Select value={role} onValueChange={(val) => val && setRole(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                {currentUserRole === "ADMIN" && <SelectItem value="ADMIN">Admin</SelectItem>}
                <SelectItem value="MANAGER">Manager</SelectItem>
                <SelectItem value="DEVELOPER">Developer</SelectItem>
                <SelectItem value="DESIGNER">Designer</SelectItem>
                <SelectItem value="CUSTOM">Custom Role...</SelectItem>
              </SelectContent>
            </Select>
            {role === "CUSTOM" && (
              <Input 
                placeholder="Enter custom role (e.g. Marketing Lead)" 
                value={customRole} 
                onChange={e => setCustomRole(e.target.value)} 
                autoFocus
              />
            )}
            <Button className="w-full" onClick={handleInvite} disabled={!isFormValid || loading}>
              Send Invitation
            </Button>
          </div>
        ) : (
          <div className="space-y-4 pt-4 text-center">
            <p className="text-sm text-muted-foreground">Share this link with the user (In production, an email would be sent):</p>
            <div className="p-3 bg-secondary rounded text-xs break-all">
              {invitedUrl}
            </div>
            <Button className="w-full" onClick={() => setOpen(false)}>Done</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
