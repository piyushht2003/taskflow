export async function emitWorkspaceEvent(workspaceId: string, eventType: string = "workspace-event", payload: any = {}) {
    if (!workspaceId) return;
    
    try {
        const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";
        console.log(`[Socket Emitter] Emitting ${eventType} to ${workspaceId} via ${socketUrl}/emit`);
        const response = await fetch(`${socketUrl}/emit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ workspaceId, event: eventType, payload })
        });
        
        if (!response.ok) {
            console.error("[Socket Emitter] Failed to emit workspace event:", await response.text());
        } else {
            console.log(`[Socket Emitter] Successfully emitted ${eventType}`);
        }
    } catch (e) {
        console.error("[Socket Emitter] Socket emitter failed:", e);
    }
}
