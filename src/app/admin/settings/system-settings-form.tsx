"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { updateSystemSettings } from "@/actions/admin";

interface SystemSettings {
  id: string;
  platformName: string;
  description: string | null;
  maintenanceMode: boolean;
}

export function SystemSettingsForm({ settings }: { settings: SystemSettings }) {
  const [platformName, setPlatformName] = useState(settings.platformName);
  const [description, setDescription] = useState(settings.description || "");
  const [maintenanceMode, setMaintenanceMode] = useState(settings.maintenanceMode);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await updateSystemSettings({
        platformName,
        description,
        maintenanceMode
      });
      alert("System settings updated successfully.");
    } catch (error: any) {
      alert(error.message || "Failed to update settings");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Platform Name</label>
          <Input 
            value={platformName} 
            onChange={(e) => setPlatformName(e.target.value)} 
            placeholder="TaskFlow" 
            required 
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Platform Description</label>
          <Textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="A brief description of the platform for meta tags..." 
            rows={3}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-secondary/10 border border-border/50 rounded-lg">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Maintenance Mode</label>
            <p className="text-xs text-muted-foreground">
              Prevent non-admin users from accessing the platform.
            </p>
          </div>
          <Switch 
            checked={maintenanceMode}
            onCheckedChange={setMaintenanceMode}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  );
}
