(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime/runtime-types.d.ts" />
/// <reference path="../../../shared/runtime/dev-globals.d.ts" />
/// <reference path="../../../shared/runtime/dev-protocol.d.ts" />
/// <reference path="../../../shared/runtime/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateB.type === 'total') {
        // A total update replaces the entire chunk, so it supersedes any prior update.
        return updateB;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/shipment-tracker/client/components/ShipmentTable.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShipmentTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
const STATUS = {
    in_transit: {
        label: 'IN TRANSIT',
        color: 'var(--accent)',
        dim: 'var(--accent-dim)'
    },
    delivered: {
        label: 'DELIVERED',
        color: 'var(--green)',
        dim: 'var(--green-dim)'
    },
    pending: {
        label: 'PENDING',
        color: 'var(--text-secondary)',
        dim: 'rgba(136,150,179,0.1)'
    },
    info_received: {
        label: 'INFO RECEIVED',
        color: '#a78bfa',
        dim: 'rgba(167,139,250,0.1)'
    },
    out_for_delivery: {
        label: 'OUT FOR DEL.',
        color: 'var(--amber)',
        dim: 'var(--amber-dim)'
    },
    attempt_failed: {
        label: 'FAILED',
        color: 'var(--red)',
        dim: 'var(--red-dim)'
    },
    exception: {
        label: 'EXCEPTION',
        color: 'var(--red)',
        dim: 'var(--red-dim)'
    },
    unknown: {
        label: 'UNKNOWN',
        color: 'var(--text-muted)',
        dim: 'rgba(74,85,104,0.2)'
    }
};
function ShipmentTable({ shipments, onSelect, selected }) {
    if (shipments.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                border: '1px dashed rgba(255,255,255,0.08)',
                borderRadius: 12,
                padding: '4rem',
                textAlign: 'center'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.1em'
                },
                children: "NO SHIPMENTS TRACKED — ADD YOUR FIRST ONE"
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                lineNumber: 17,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
            lineNumber: 16,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: 'var(--navy-2)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            overflow: 'hidden',
            marginBottom: '1.5rem'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                overflowX: 'auto'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                style: {
                    width: '100%',
                    borderCollapse: 'collapse'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            style: {
                                borderBottom: '1px solid var(--border)',
                                background: 'var(--navy-3)'
                            },
                            children: [
                                'TRACKING #',
                                'CARRIER',
                                'DESCRIPTION',
                                'ROUTE',
                                'STATUS',
                                'ETA',
                                'PRED. DELAY'
                            ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    style: {
                                        padding: '12px 16px',
                                        textAlign: 'left',
                                        fontFamily: 'var(--mono)',
                                        fontSize: 10,
                                        color: 'var(--text-muted)',
                                        letterSpacing: '0.1em',
                                        fontWeight: 400,
                                        whiteSpace: 'nowrap'
                                    },
                                    children: h
                                }, h, false, {
                                    fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                    lineNumber: 29,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                            lineNumber: 27,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                        lineNumber: 26,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: shipments.map((s, i)=>{
                            const st = STATUS[s.status] || STATUS.unknown;
                            const isSelected = selected?.id === s.id;
                            const delay = s.predicted_delay_days || 0;
                            const delayColor = delay > 3 ? 'var(--red)' : delay > 1 ? 'var(--amber)' : 'var(--green)';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                onClick: ()=>onSelect(s),
                                style: {
                                    borderBottom: i < shipments.length - 1 ? '1px solid var(--border)' : 'none',
                                    cursor: 'pointer',
                                    background: isSelected ? 'var(--navy-4)' : 'transparent',
                                    transition: 'background 0.15s'
                                },
                                onMouseEnter: (e)=>{
                                    if (!isSelected) e.currentTarget.style.background = 'var(--navy-3)';
                                },
                                onMouseLeave: (e)=>{
                                    if (!isSelected) e.currentTarget.style.background = 'transparent';
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        style: {
                                            padding: '14px 16px',
                                            fontFamily: 'var(--mono)',
                                            fontSize: 12,
                                            color: 'var(--accent)',
                                            letterSpacing: '0.05em'
                                        },
                                        children: s.tracking_number
                                    }, void 0, false, {
                                        fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                        lineNumber: 52,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        style: {
                                            padding: '14px 16px',
                                            fontFamily: 'var(--mono)',
                                            fontSize: 11,
                                            color: 'var(--text-secondary)',
                                            letterSpacing: '0.08em'
                                        },
                                        children: s.carrier.toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                        lineNumber: 53,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        style: {
                                            padding: '14px 16px',
                                            fontSize: 13,
                                            color: 'var(--text-primary)'
                                        },
                                        children: s.description || '—'
                                    }, void 0, false, {
                                        fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                        lineNumber: 54,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        style: {
                                            padding: '14px 16px',
                                            fontSize: 12,
                                            color: 'var(--text-secondary)',
                                            whiteSpace: 'nowrap'
                                        },
                                        children: [
                                            s.origin || '—',
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'var(--text-muted)'
                                                },
                                                children: "→"
                                            }, void 0, false, {
                                                fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                                lineNumber: 56,
                                                columnNumber: 39
                                            }, this),
                                            " ",
                                            s.destination || '—'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                        lineNumber: 55,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        style: {
                                            padding: '14px 16px'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                background: st.dim,
                                                color: st.color,
                                                border: '1px solid ' + st.color.replace(')', ', 0.3)').replace('var(', 'rgba(').replace('--accent', '0,212,255').replace('--green', '0,229,160').replace('--amber', '255,176,32').replace('--red', '255,77,77').replace('--text-secondary', '136,150,179').replace('--text-muted', '74,85,104').replace('a78bfa', '167,139,250'),
                                                padding: '3px 10px',
                                                borderRadius: 6,
                                                fontFamily: 'var(--mono)',
                                                fontSize: 10,
                                                letterSpacing: '0.08em',
                                                whiteSpace: 'nowrap'
                                            },
                                            children: st.label
                                        }, void 0, false, {
                                            fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                            lineNumber: 59,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                        lineNumber: 58,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        style: {
                                            padding: '14px 16px',
                                            fontFamily: 'var(--mono)',
                                            fontSize: 12,
                                            color: 'var(--text-secondary)',
                                            whiteSpace: 'nowrap'
                                        },
                                        children: s.eta ? new Date(s.eta).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        }) : '—'
                                    }, void 0, false, {
                                        fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                        lineNumber: 63,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        style: {
                                            padding: '14px 16px',
                                            fontFamily: 'var(--mono)',
                                            fontSize: 13,
                                            fontWeight: 700,
                                            color: delayColor
                                        },
                                        children: delay > 0 ? '+' + delay + 'd' : 'ON TIME'
                                    }, void 0, false, {
                                        fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                        lineNumber: 66,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, s.id, true, {
                                fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                lineNumber: 40,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                lineNumber: 25,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
            lineNumber: 24,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = ShipmentTable;
var _c;
__turbopack_context__.k.register(_c, "ShipmentTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/shipment-tracker/client/components/AddShipmentForm.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AddShipmentForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
const CARRIERS = [
    'dhl',
    'fedex',
    'ups',
    'maersk',
    'msc',
    'cma_cgm',
    'other'
];
const inp = {
    width: '100%',
    background: 'var(--navy)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: '10px 14px',
    color: 'var(--text-primary)',
    fontSize: 13,
    fontFamily: 'var(--sans)',
    outline: 'none'
};
function AddShipmentForm({ onAdd, onCancel }) {
    _s();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        tracking_number: '',
        carrier: 'dhl',
        description: '',
        origin: '',
        destination: ''
    });
    const handleSubmit = async ()=>{
        if (!form.tracking_number) return;
        setLoading(true);
        await onAdd(form);
        setLoading(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: 'var(--navy-2)',
            border: '1px solid var(--accent-border)',
            borderRadius: 12,
            padding: '1.5rem',
            marginBottom: '1.5rem'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: 'var(--mono)',
                            fontSize: 11,
                            color: 'var(--accent)',
                            letterSpacing: '0.1em'
                        },
                        children: "NEW SHIPMENT"
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onCancel,
                        style: {
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            fontSize: 20,
                            lineHeight: 1
                        },
                        children: "×"
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: 12,
                    marginBottom: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontFamily: 'var(--mono)',
                                    fontSize: 10,
                                    color: 'var(--text-secondary)',
                                    letterSpacing: '0.08em',
                                    display: 'block',
                                    marginBottom: 6
                                },
                                children: "TRACKING NUMBER *"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                style: inp,
                                value: form.tracking_number,
                                onChange: (e)=>setForm({
                                        ...form,
                                        tracking_number: e.target.value
                                    }),
                                placeholder: "e.g. MSKU1234567"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontFamily: 'var(--mono)',
                                    fontSize: 10,
                                    color: 'var(--text-secondary)',
                                    letterSpacing: '0.08em',
                                    display: 'block',
                                    marginBottom: 6
                                },
                                children: "CARRIER *"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                style: {
                                    ...inp
                                },
                                value: form.carrier,
                                onChange: (e)=>setForm({
                                        ...form,
                                        carrier: e.target.value
                                    }),
                                children: CARRIERS.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: c,
                                        children: c.toUpperCase()
                                    }, c, false, {
                                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                        lineNumber: 43,
                                        columnNumber: 32
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontFamily: 'var(--mono)',
                                    fontSize: 10,
                                    color: 'var(--text-secondary)',
                                    letterSpacing: '0.08em',
                                    display: 'block',
                                    marginBottom: 6
                                },
                                children: "DESCRIPTION"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                style: inp,
                                value: form.description,
                                onChange: (e)=>setForm({
                                        ...form,
                                        description: e.target.value
                                    }),
                                placeholder: "e.g. Electronics batch"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontFamily: 'var(--mono)',
                                    fontSize: 10,
                                    color: 'var(--text-secondary)',
                                    letterSpacing: '0.08em',
                                    display: 'block',
                                    marginBottom: 6
                                },
                                children: "ORIGIN"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                style: inp,
                                value: form.origin,
                                onChange: (e)=>setForm({
                                        ...form,
                                        origin: e.target.value
                                    }),
                                placeholder: "e.g. Shanghai, CN"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontFamily: 'var(--mono)',
                                    fontSize: 10,
                                    color: 'var(--text-secondary)',
                                    letterSpacing: '0.08em',
                                    display: 'block',
                                    marginBottom: 6
                                },
                                children: "DESTINATION"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                style: inp,
                                value: form.destination,
                                onChange: (e)=>setForm({
                                        ...form,
                                        destination: e.target.value
                                    }),
                                placeholder: "e.g. Mumbai, IN"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: 10
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSubmit,
                        disabled: loading,
                        style: {
                            background: 'var(--accent)',
                            color: 'var(--navy)',
                            border: 'none',
                            padding: '10px 24px',
                            borderRadius: 8,
                            fontFamily: 'var(--mono)',
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: 'pointer',
                            letterSpacing: '0.05em'
                        },
                        children: loading ? 'ADDING...' : 'ADD SHIPMENT'
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onCancel,
                        style: {
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'var(--text-secondary)',
                            padding: '10px 20px',
                            borderRadius: 8,
                            fontFamily: 'var(--mono)',
                            fontSize: 12,
                            cursor: 'pointer',
                            letterSpacing: '0.05em'
                        },
                        children: "CANCEL"
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                lineNumber: 59,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s(AddShipmentForm, "TqUjPxA4gyHfhvCEtNHPjxxc0NE=");
_c = AddShipmentForm;
var _c;
__turbopack_context__.k.register(_c, "AddShipmentForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/shipment-tracker/client/components/EventTimeline.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EventTimeline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
function EventTimeline({ shipment, events, onClose }) {
    const delay = shipment.predicted_delay_days || 0;
    const delayColor = delay > 3 ? 'var(--red)' : delay > 1 ? 'var(--amber)' : 'var(--green)';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: 'var(--navy-2)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '1.5rem',
            marginTop: '0.5rem'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.5rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: 'var(--mono)',
                                    fontSize: 10,
                                    color: 'var(--text-muted)',
                                    letterSpacing: '0.1em',
                                    marginBottom: 6
                                },
                                children: "SHIPMENT HISTORY"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                lineNumber: 10,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: 'var(--mono)',
                                    fontSize: 16,
                                    color: 'var(--accent)',
                                    letterSpacing: '0.05em',
                                    marginBottom: 4
                                },
                                children: shipment.tracking_number
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                lineNumber: 11,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    color: 'var(--text-secondary)'
                                },
                                children: [
                                    shipment.carrier.toUpperCase(),
                                    " · ",
                                    shipment.origin,
                                    " → ",
                                    shipment.destination
                                ]
                            }, void 0, true, {
                                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                lineNumber: 12,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                        lineNumber: 9,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 16
                        },
                        children: [
                            delay > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: delay > 2 ? 'var(--amber-dim)' : 'var(--green-dim)',
                                    border: '1px solid ' + (delay > 2 ? 'rgba(255,176,32,0.3)' : 'rgba(0,229,160,0.3)'),
                                    borderRadius: 8,
                                    padding: '8px 16px',
                                    textAlign: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: 'var(--mono)',
                                            fontSize: 10,
                                            color: 'var(--text-secondary)',
                                            letterSpacing: '0.08em',
                                            marginBottom: 4
                                        },
                                        children: "PREDICTED DELAY"
                                    }, void 0, false, {
                                        fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                        lineNumber: 17,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: 'var(--mono)',
                                            fontSize: 20,
                                            fontWeight: 700,
                                            color: delayColor
                                        },
                                        children: [
                                            "+",
                                            delay,
                                            "d"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                        lineNumber: 18,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                lineNumber: 16,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                style: {
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    fontSize: 22,
                                    lineHeight: 1
                                },
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            events.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em'
                },
                children: "NO EVENTS RECORDED"
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                lineNumber: 26,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'relative',
                    paddingLeft: 24
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            left: 5,
                            top: 8,
                            bottom: 8,
                            width: 1,
                            background: 'var(--border)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this),
                    events.map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'relative',
                                marginBottom: 24
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: 'absolute',
                                        left: -19,
                                        top: 4,
                                        width: 9,
                                        height: 9,
                                        borderRadius: '50%',
                                        background: i === 0 ? 'var(--accent)' : 'var(--navy-4)',
                                        border: '1px solid ' + (i === 0 ? 'var(--accent)' : 'rgba(255,255,255,0.15)'),
                                        boxShadow: i === 0 ? '0 0 8px var(--accent)' : 'none'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                    lineNumber: 32,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        color: 'var(--text-primary)',
                                        marginBottom: 4
                                    },
                                    children: e.raw_status
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                    lineNumber: 33,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: 'var(--mono)',
                                        fontSize: 11,
                                        color: 'var(--text-muted)',
                                        letterSpacing: '0.05em'
                                    },
                                    children: [
                                        e.location,
                                        " · ",
                                        new Date(e.carrier_timestamp).toLocaleString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                    lineNumber: 34,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, e.id, true, {
                            fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                            lineNumber: 31,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                lineNumber: 28,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = EventTimeline;
var _c;
__turbopack_context__.k.register(_c, "EventTimeline");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/shipment-tracker/client/components/StatsBar.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StatsBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
function StatsBar({ shipments }) {
    const total = shipments.length;
    const inTransit = shipments.filter((s)=>s.status === 'in_transit').length;
    const delivered = shipments.filter((s)=>s.status === 'delivered').length;
    const delayed = shipments.filter((s)=>s.predicted_delay_days > 2).length;
    const avgDelay = total > 0 ? (shipments.reduce((a, s)=>a + (s.predicted_delay_days || 0), 0) / total).toFixed(1) : 0;
    const stats = [
        {
            label: 'TOTAL SHIPMENTS',
            value: total,
            color: 'var(--accent)',
            dim: 'var(--accent-dim)',
            border: 'var(--accent-border)'
        },
        {
            label: 'IN TRANSIT',
            value: inTransit,
            color: 'var(--green)',
            dim: 'var(--green-dim)',
            border: 'rgba(0,229,160,0.2)'
        },
        {
            label: 'DELIVERED',
            value: delivered,
            color: 'var(--text-secondary)',
            dim: 'rgba(136,150,179,0.1)',
            border: 'rgba(136,150,179,0.2)'
        },
        {
            label: 'AT RISK',
            value: delayed,
            color: 'var(--amber)',
            dim: 'var(--amber-dim)',
            border: 'rgba(255,176,32,0.2)'
        },
        {
            label: 'AVG DELAY',
            value: avgDelay + 'd',
            color: delayed > 0 ? 'var(--red)' : 'var(--green)',
            dim: delayed > 0 ? 'var(--red-dim)' : 'var(--green-dim)',
            border: delayed > 0 ? 'rgba(255,77,77,0.2)' : 'rgba(0,229,160,0.2)'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 12,
            marginBottom: '2rem'
        },
        children: stats.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: s.dim,
                    border: '1px solid ' + s.border,
                    borderRadius: 12,
                    padding: '1rem 1.25rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: 'var(--mono)',
                            fontSize: 10,
                            color: 'var(--text-secondary)',
                            letterSpacing: '0.1em',
                            marginBottom: 8
                        },
                        children: s.label
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                        lineNumber: 21,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: 'var(--mono)',
                            fontSize: 28,
                            fontWeight: 700,
                            color: s.color,
                            lineHeight: 1
                        },
                        children: s.value
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this)
                ]
            }, s.label, true, {
                fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                lineNumber: 20,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = StatsBar;
var _c;
__turbopack_context__.k.register(_c, "StatsBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/shipment-tracker/client/pages/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/node_modules/axios/lib/axios.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/shipment-tracker/client/node_modules/socket.io-client/build/esm/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$ShipmentTable$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/components/ShipmentTable.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$AddShipmentForm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/components/AddShipmentForm.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$EventTimeline$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/components/EventTimeline.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$StatsBar$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/components/StatsBar.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])('http://localhost:3001');
const API = 'http://localhost:3001/api';
function Home() {
    _s();
    const [shipments, setShipments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [adding, setAdding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pulse, setPulse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fetchShipments = async ()=>{
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(API + '/shipments');
        setShipments(res.data.shipments);
        setLoading(false);
    };
    const fetchEvents = async (id)=>{
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(API + '/shipments/' + id + '/events');
        setEvents(res.data.events);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            fetchShipments();
            socket.on('shipment_updated', {
                "Home.useEffect": (data)=>{
                    setPulse(true);
                    setTimeout({
                        "Home.useEffect": ()=>setPulse(false)
                    }["Home.useEffect"], 1000);
                    setShipments({
                        "Home.useEffect": (prev)=>prev.map({
                                "Home.useEffect": (s)=>s.id === data.id ? {
                                        ...s,
                                        status: data.status
                                    } : s
                            }["Home.useEffect"])
                    }["Home.useEffect"]);
                }
            }["Home.useEffect"]);
            return ({
                "Home.useEffect": ()=>socket.off('shipment_updated')
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    const handleSelect = (shipment)=>{
        setSelected(shipment);
        fetchEvents(shipment.id);
    };
    const handleAdd = async (form)=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post(API + '/shipments', form);
        fetchShipments();
        setAdding(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                    children: "Shipment Nerve Center"
                }, void 0, false, {
                    fileName: "[project]/shipment-tracker/client/pages/index.js",
                    lineNumber: 56,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/pages/index.js",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    minHeight: '100vh',
                    background: 'var(--navy)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        style: {
                            borderBottom: '1px solid var(--border)',
                            padding: '0 2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            height: 64
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 32,
                                            height: 32,
                                            background: 'var(--accent-dim)',
                                            border: '1px solid var(--accent-border)',
                                            borderRadius: 8,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "16",
                                            height: "16",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "var(--accent)",
                                            strokeWidth: "2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                                            }, void 0, false, {
                                                fileName: "[project]/shipment-tracker/client/pages/index.js",
                                                lineNumber: 62,
                                                columnNumber: 114
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/shipment-tracker/client/pages/index.js",
                                            lineNumber: 62,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/shipment-tracker/client/pages/index.js",
                                        lineNumber: 61,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: 'var(--mono)',
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    color: 'var(--text-primary)',
                                                    letterSpacing: '0.05em'
                                                },
                                                children: "SHIPMENT NERVE CENTER"
                                            }, void 0, false, {
                                                fileName: "[project]/shipment-tracker/client/pages/index.js",
                                                lineNumber: 65,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 11,
                                                    color: 'var(--text-secondary)',
                                                    letterSpacing: '0.08em'
                                                },
                                                children: "LIVE TRACKING DASHBOARD"
                                            }, void 0, false, {
                                                fileName: "[project]/shipment-tracker/client/pages/index.js",
                                                lineNumber: 66,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/shipment-tracker/client/pages/index.js",
                                        lineNumber: 64,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/shipment-tracker/client/pages/index.js",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 20
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 8
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: 7,
                                                    height: 7,
                                                    borderRadius: '50%',
                                                    background: pulse ? 'var(--amber)' : 'var(--green)',
                                                    transition: 'background 0.3s',
                                                    boxShadow: '0 0 8px ' + (pulse ? 'var(--amber)' : 'var(--green)')
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/shipment-tracker/client/pages/index.js",
                                                lineNumber: 71,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: 'var(--mono)',
                                                    fontSize: 11,
                                                    color: 'var(--text-secondary)',
                                                    letterSpacing: '0.05em'
                                                },
                                                children: pulse ? 'UPDATING' : 'LIVE'
                                            }, void 0, false, {
                                                fileName: "[project]/shipment-tracker/client/pages/index.js",
                                                lineNumber: 72,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/shipment-tracker/client/pages/index.js",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setAdding(true),
                                        style: {
                                            background: 'var(--accent-dim)',
                                            border: '1px solid var(--accent-border)',
                                            color: 'var(--accent)',
                                            padding: '8px 16px',
                                            borderRadius: 8,
                                            fontSize: 13,
                                            fontFamily: 'var(--mono)',
                                            cursor: 'pointer',
                                            letterSpacing: '0.05em'
                                        },
                                        children: "+ NEW SHIPMENT"
                                    }, void 0, false, {
                                        fileName: "[project]/shipment-tracker/client/pages/index.js",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/shipment-tracker/client/pages/index.js",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/pages/index.js",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        style: {
                            padding: '2rem',
                            maxWidth: 1400,
                            margin: '0 auto'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$StatsBar$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                shipments: shipments
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/pages/index.js",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this),
                            adding && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$AddShipmentForm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                onAdd: handleAdd,
                                onCancel: ()=>setAdding(false)
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/pages/index.js",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this),
                            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'center',
                                    padding: '4rem',
                                    color: 'var(--text-secondary)',
                                    fontFamily: 'var(--mono)',
                                    fontSize: 13,
                                    letterSpacing: '0.1em'
                                },
                                children: "LOADING SHIPMENTS..."
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/pages/index.js",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$ShipmentTable$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                shipments: shipments,
                                onSelect: handleSelect,
                                selected: selected
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/pages/index.js",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this),
                            selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$EventTimeline$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                shipment: selected,
                                events: events,
                                onClose: ()=>setSelected(null)
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/pages/index.js",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/pages/index.js",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/shipment-tracker/client/pages/index.js",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Home, "PRPyLnVO8Riq/u+5f3DImolxjNY=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/shipment-tracker/client/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/shipment-tracker/client/pages/index.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if ("TURBOPACK compile-time truthy", 1) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/shipment-tracker/client/pages/index\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/shipment-tracker/client/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__08ezvb3._.js.map