import { emitWorkspaceEvent } from "./src/lib/socket-emitter";

async function run() {
    console.log("Emitting test event...");
    await emitWorkspaceEvent("cmqgxc0yv000ledhky4scrmo0", "team-updated");
    console.log("Done");
}

run();
