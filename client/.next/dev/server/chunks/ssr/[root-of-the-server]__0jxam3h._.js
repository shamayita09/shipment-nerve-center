module.exports = [
"[project]/shipment-tracker/client/components/ShipmentTable.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShipmentTable
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
const STATUS = {
    in_transit: {
        label: 'In transit',
        dot: 'var(--blue)',
        bg: 'var(--blue-dim)',
        border: 'var(--blue-border)',
        text: '#58a6ff'
    },
    delivered: {
        label: 'Delivered',
        dot: 'var(--green)',
        bg: 'var(--green-dim)',
        border: 'var(--green-border)',
        text: 'var(--green)'
    },
    pending: {
        label: 'Pending',
        dot: 'var(--text-3)',
        bg: 'var(--bg-3)',
        border: 'var(--border-2)',
        text: 'var(--text-3)'
    },
    info_received: {
        label: 'Info received',
        dot: 'var(--purple)',
        bg: 'var(--purple-dim)',
        border: 'rgba(188,140,255,0.2)',
        text: 'var(--purple)'
    },
    out_for_delivery: {
        label: 'Out for delivery',
        dot: 'var(--amber)',
        bg: 'var(--amber-dim)',
        border: 'var(--amber-border)',
        text: 'var(--amber)'
    },
    attempt_failed: {
        label: 'Attempt failed',
        dot: 'var(--red)',
        bg: 'var(--red-dim)',
        border: 'var(--red-border)',
        text: 'var(--red)'
    },
    exception: {
        label: 'Exception',
        dot: 'var(--red)',
        bg: 'var(--red-dim)',
        border: 'var(--red-border)',
        text: 'var(--red)'
    },
    unknown: {
        label: 'Unknown',
        dot: 'var(--text-4)',
        bg: 'var(--bg-3)',
        border: 'var(--border-2)',
        text: 'var(--text-4)'
    }
};
function ShipmentTable({ shipments, onSelect, selected }) {
    if (shipments.length === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            border: '1px dashed var(--border-2)',
            borderRadius: 10,
            padding: '4rem',
            textAlign: 'center'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                width: "32",
                height: "32",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "var(--text-4)",
                strokeWidth: "1.5",
                style: {
                    margin: '0 auto 12px',
                    display: 'block'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                    d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                }, void 0, false, {
                    fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                    lineNumber: 16,
                    columnNumber: 160
                }, this)
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: 13,
                    color: 'var(--text-4)'
                },
                children: "No shipments tracked yet. Add your first one."
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
        lineNumber: 15,
        columnNumber: 5
    }, this);
    const cols = '1.4fr 0.7fr 1fr 1.3fr 1fr 0.8fr 0.85fr';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            overflow: 'hidden',
            marginBottom: 16
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: {
                overflowX: 'auto'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    minWidth: 800
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: cols,
                            padding: '10px 18px',
                            borderBottom: '1px solid var(--border)',
                            background: 'var(--bg)'
                        },
                        children: [
                            'Tracking no.',
                            'Carrier',
                            'Description',
                            'Route',
                            'Status',
                            'ETA',
                            'Pred. delay'
                        ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    color: 'var(--text-3)',
                                    fontWeight: 500,
                                    letterSpacing: '0.04em',
                                    textTransform: 'uppercase'
                                },
                                children: h
                            }, h, false, {
                                fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                lineNumber: 29,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this),
                    shipments.map((s, i)=>{
                        const st = STATUS[s.status] || STATUS.unknown;
                        const isSelected = selected?.id === s.id;
                        const delay = parseFloat(s.predicted_delay_days) || 0;
                        const delayColor = delay > 3 ? 'var(--red)' : delay > 1 ? 'var(--amber)' : 'var(--green)';
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            onClick: ()=>onSelect(s),
                            style: {
                                display: 'grid',
                                gridTemplateColumns: cols,
                                padding: '14px 18px',
                                borderBottom: i < shipments.length - 1 ? '1px solid var(--border)' : 'none',
                                cursor: 'pointer',
                                background: isSelected ? 'rgba(28,110,243,0.06)' : 'transparent',
                                borderLeft: isSelected ? '2px solid var(--blue)' : '2px solid transparent',
                                transition: 'background 0.15s',
                                alignItems: 'center'
                            },
                            onMouseEnter: (e)=>{
                                if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                            },
                            onMouseLeave: (e)=>{
                                if (!isSelected) e.currentTarget.style.background = 'transparent';
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: 'var(--mono)',
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: 'var(--blue)',
                                        letterSpacing: '0.03em'
                                    },
                                    children: s.tracking_number
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                    lineNumber: 45,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 10,
                                            fontWeight: 600,
                                            color: 'var(--text-3)',
                                            background: 'var(--bg-3)',
                                            padding: '2px 7px',
                                            borderRadius: 4,
                                            letterSpacing: '0.04em'
                                        },
                                        children: s.carrier.toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                        lineNumber: 46,
                                        columnNumber: 22
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                    lineNumber: 46,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 13,
                                        color: 'var(--text-2)'
                                    },
                                    children: s.description || '—'
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                    lineNumber: 47,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 12,
                                        color: 'var(--text-3)'
                                    },
                                    children: [
                                        s.origin || '—',
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'var(--text-4)'
                                            },
                                            children: "→"
                                        }, void 0, false, {
                                            fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                            lineNumber: 48,
                                            columnNumber: 89
                                        }, this),
                                        " ",
                                        s.destination || '—'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                    lineNumber: 48,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 5,
                                            background: st.bg,
                                            border: '1px solid ' + st.border,
                                            color: st.text,
                                            padding: '3px 9px',
                                            borderRadius: 20,
                                            fontSize: 11,
                                            fontWeight: 500
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                style: {
                                                    width: 5,
                                                    height: 5,
                                                    borderRadius: '50%',
                                                    background: st.dot,
                                                    flexShrink: 0
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                                lineNumber: 51,
                                                columnNumber: 21
                                            }, this),
                                            st.label
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                        lineNumber: 50,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                    lineNumber: 49,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 12,
                                        color: 'var(--text-3)',
                                        fontFamily: 'var(--mono)'
                                    },
                                    children: s.eta ? new Date(s.eta).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short'
                                    }) : '—'
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                    lineNumber: 55,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: delayColor,
                                        fontFamily: 'var(--mono)'
                                    },
                                    children: delay > 0 ? '+' + delay + 'd' : 'On time'
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                    lineNumber: 58,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, s.id, true, {
                            fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                            lineNumber: 38,
                            columnNumber: 15
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                lineNumber: 26,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}),
"[project]/shipment-tracker/client/components/AddShipmentForm.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AddShipmentForm
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
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
    background: 'var(--bg)',
    border: '1px solid var(--border-2)',
    borderRadius: 7,
    padding: '9px 12px',
    color: 'var(--text-1)',
    fontSize: 13,
    fontFamily: 'var(--sans)',
    outline: 'none',
    transition: 'border-color 0.15s'
};
function AddShipmentForm({ onAdd, onCancel }) {
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            background: 'var(--bg-2)',
            border: '1px solid var(--blue-border)',
            borderRadius: 10,
            padding: '20px 22px',
            marginBottom: 20
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    background: 'var(--blue)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: 'var(--text-1)'
                                },
                                children: "New shipment"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: onCancel,
                        style: {
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-3)',
                            cursor: 'pointer',
                            fontSize: 20,
                            lineHeight: 1,
                            padding: 4
                        },
                        children: "×"
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
                    gap: 12,
                    marginBottom: 16
                },
                children: [
                    [
                        {
                            key: 'tracking_number',
                            label: 'Tracking number *',
                            placeholder: 'e.g. MSKU1234567'
                        },
                        {
                            key: 'description',
                            label: 'Description',
                            placeholder: 'e.g. Electronics batch'
                        },
                        {
                            key: 'origin',
                            label: 'Origin',
                            placeholder: 'e.g. Shanghai, CN'
                        },
                        {
                            key: 'destination',
                            label: 'Destination',
                            placeholder: 'e.g. Mumbai, IN'
                        }
                    ].map((field)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    style: {
                                        fontSize: 11,
                                        color: 'var(--text-3)',
                                        display: 'block',
                                        marginBottom: 5,
                                        fontWeight: 500
                                    },
                                    children: field.label
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    style: inp,
                                    value: form[field.key],
                                    onChange: (e)=>setForm({
                                            ...form,
                                            [field.key]: e.target.value
                                        }),
                                    placeholder: field.placeholder
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                    lineNumber: 48,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, field.key, true, {
                            fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: 11,
                                    color: 'var(--text-3)',
                                    display: 'block',
                                    marginBottom: 5,
                                    fontWeight: 500
                                },
                                children: "Carrier *"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                style: {
                                    ...inp
                                },
                                value: form.carrier,
                                onChange: (e)=>setForm({
                                        ...form,
                                        carrier: e.target.value
                                    }),
                                children: CARRIERS.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: c,
                                        style: {
                                            background: 'var(--bg-2)'
                                        },
                                        children: c.toUpperCase()
                                    }, c, false, {
                                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                        lineNumber: 54,
                                        columnNumber: 32
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: 10
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: handleSubmit,
                        disabled: loading,
                        style: {
                            background: 'var(--blue)',
                            color: 'white',
                            border: 'none',
                            padding: '9px 22px',
                            borderRadius: 7,
                            fontSize: 13,
                            fontWeight: 500,
                            cursor: loading ? 'wait' : 'pointer',
                            opacity: loading ? 0.7 : 1
                        },
                        children: loading ? 'Adding...' : 'Add shipment'
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: onCancel,
                        style: {
                            background: 'transparent',
                            border: '1px solid var(--border-2)',
                            color: 'var(--text-2)',
                            padding: '9px 18px',
                            borderRadius: 7,
                            fontSize: 13,
                            cursor: 'pointer'
                        },
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}),
"[project]/shipment-tracker/client/components/EventTimeline.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EventTimeline
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
function EventTimeline({ shipment, events, onClose }) {
    const delay = parseFloat(shipment.predicted_delay_days) || 0;
    const delayColor = delay > 3 ? 'var(--red)' : delay > 1 ? 'var(--amber)' : 'var(--green)';
    const delayDimBg = delay > 3 ? 'var(--red-dim)' : delay > 1 ? 'var(--amber-dim)' : 'var(--green-dim)';
    const delayBorder = delay > 3 ? 'var(--red-border)' : delay > 1 ? 'var(--amber-border)' : 'var(--green-border)';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '20px 22px',
            marginBottom: 16
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 11,
                                    color: 'var(--text-3)',
                                    fontWeight: 500,
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase',
                                    marginBottom: 6
                                },
                                children: "Shipment history"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                lineNumber: 12,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: 'var(--mono)',
                                    fontSize: 15,
                                    fontWeight: 600,
                                    color: 'var(--blue)',
                                    marginBottom: 4
                                },
                                children: shipment.tracking_number
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                lineNumber: 13,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    color: 'var(--text-3)'
                                },
                                children: [
                                    shipment.carrier.toUpperCase(),
                                    " · ",
                                    shipment.origin || '—',
                                    " → ",
                                    shipment.destination || '—'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                lineNumber: 14,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    background: delayDimBg,
                                    border: '1px solid ' + delayBorder,
                                    borderRadius: 8,
                                    padding: '10px 18px',
                                    textAlign: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 10,
                                            color: 'var(--text-3)',
                                            fontWeight: 500,
                                            letterSpacing: '0.05em',
                                            textTransform: 'uppercase',
                                            marginBottom: 4
                                        },
                                        children: "Predicted delay"
                                    }, void 0, false, {
                                        fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                        lineNumber: 18,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: 'var(--mono)',
                                            fontSize: 20,
                                            fontWeight: 700,
                                            color: delayColor
                                        },
                                        children: delay > 0 ? '+' + delay + 'd' : 'On time'
                                    }, void 0, false, {
                                        fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                        lineNumber: 19,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                lineNumber: 17,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                style: {
                                    background: 'var(--bg-3)',
                                    border: '1px solid var(--border-2)',
                                    color: 'var(--text-3)',
                                    cursor: 'pointer',
                                    width: 32,
                                    height: 32,
                                    borderRadius: 7,
                                    fontSize: 18,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
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
                        lineNumber: 16,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            events.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: 13,
                    color: 'var(--text-4)'
                },
                children: "No events recorded yet."
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                lineNumber: 26,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    paddingLeft: 22,
                    position: 'relative'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            left: 5,
                            top: 8,
                            bottom: 8,
                            width: 1,
                            background: 'var(--border-2)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this),
                    events.map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'relative',
                                marginBottom: 22
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: 'absolute',
                                        left: -17,
                                        top: 4,
                                        width: 9,
                                        height: 9,
                                        borderRadius: '50%',
                                        background: i === 0 ? 'var(--blue)' : 'var(--bg-4)',
                                        border: '1.5px solid ' + (i === 0 ? 'var(--blue)' : 'var(--border-2)')
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                    lineNumber: 32,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        color: i === 0 ? 'var(--text-1)' : 'var(--text-2)',
                                        fontWeight: i === 0 ? 500 : 400,
                                        marginBottom: 3
                                    },
                                    children: e.raw_status
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                    lineNumber: 33,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 11,
                                        color: 'var(--text-3)',
                                        fontFamily: 'var(--mono)'
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
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
"[project]/shipment-tracker/client/components/StatsBar.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StatsBar
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
const Stat = ({ label, value, color, dimBg, icon })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '16px 18px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    width: 30,
                    height: 30,
                    background: dimBg,
                    borderRadius: 7,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 14
                },
                children: icon
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                lineNumber: 4,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: 26,
                    fontWeight: 700,
                    color: color || 'var(--text-1)',
                    lineHeight: 1,
                    marginBottom: 5,
                    fontFamily: 'var(--mono)'
                },
                children: value
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                lineNumber: 7,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: 12,
                    color: 'var(--text-3)'
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                lineNumber: 8,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
        lineNumber: 3,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
function StatsBar({ shipments }) {
    const total = shipments.length;
    const inTransit = shipments.filter((s)=>s.status === 'in_transit').length;
    const delivered = shipments.filter((s)=>s.status === 'delivered').length;
    const atRisk = shipments.filter((s)=>s.predicted_delay_days > 2).length;
    const avgDelay = total > 0 ? (shipments.reduce((a, s)=>a + (s.predicted_delay_days || 0), 0) / total).toFixed(1) : '0.0';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 12,
            marginBottom: 28
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Stat, {
                label: "Total shipments",
                value: total,
                color: "var(--text-1)",
                dimBg: "var(--blue-dim)",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "#58a6ff",
                    strokeWidth: "2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                        d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                        lineNumber: 22,
                        columnNumber: 108
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                    lineNumber: 22,
                    columnNumber: 15
                }, this)
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Stat, {
                label: "In transit",
                value: inTransit,
                color: "var(--green)",
                dimBg: "var(--green-dim)",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "#3fb950",
                    strokeWidth: "2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("polyline", {
                        points: "22 12 18 12 15 21 9 3 6 12 2 12"
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                        lineNumber: 24,
                        columnNumber: 108
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                    lineNumber: 24,
                    columnNumber: 15
                }, this)
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Stat, {
                label: "Delivered",
                value: delivered,
                color: "var(--text-2)",
                dimBg: "var(--bg-3)",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "#8b949e",
                    strokeWidth: "2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("polyline", {
                        points: "20 6 9 17 4 12"
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                        lineNumber: 26,
                        columnNumber: 108
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                    lineNumber: 26,
                    columnNumber: 15
                }, this)
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Stat, {
                label: "At risk",
                value: atRisk,
                color: atRisk > 0 ? 'var(--amber)' : 'var(--text-2)',
                dimBg: atRisk > 0 ? 'var(--amber-dim)' : 'var(--bg-3)',
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: atRisk > 0 ? '#d29922' : '#8b949e',
                    strokeWidth: "2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                            d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                        }, void 0, false, {
                            fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                            lineNumber: 28,
                            columnNumber: 135
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("line", {
                            x1: "12",
                            y1: "9",
                            x2: "12",
                            y2: "13"
                        }, void 0, false, {
                            fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                            lineNumber: 28,
                            columnNumber: 235
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("line", {
                            x1: "12",
                            y1: "17",
                            x2: "12.01",
                            y2: "17"
                        }, void 0, false, {
                            fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                            lineNumber: 28,
                            columnNumber: 273
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                    lineNumber: 28,
                    columnNumber: 15
                }, this)
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Stat, {
                label: "Avg delay",
                value: avgDelay + 'd',
                color: parseFloat(avgDelay) > 1 ? 'var(--red)' : 'var(--green)',
                dimBg: parseFloat(avgDelay) > 1 ? 'var(--red-dim)' : 'var(--green-dim)',
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: parseFloat(avgDelay) > 1 ? '#f85149' : '#3fb950',
                    strokeWidth: "2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("circle", {
                            cx: "12",
                            cy: "12",
                            r: "10"
                        }, void 0, false, {
                            fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                            lineNumber: 30,
                            columnNumber: 149
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("polyline", {
                            points: "12 6 12 12 16 14"
                        }, void 0, false, {
                            fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                            lineNumber: 30,
                            columnNumber: 181
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                    lineNumber: 30,
                    columnNumber: 15
                }, this)
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/shipment-tracker/client/components/StatsBar.js",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
"[project]/shipment-tracker/client/components/Header.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
function Header({ pulse, onAdd }) {
    const today = new Date().toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
        style: {
            background: 'var(--bg)',
            borderBottom: '1px solid var(--border)',
            padding: '0 24px',
            height: 62,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 100
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            width: 36,
                            height: 36,
                            background: 'var(--blue)',
                            borderRadius: 9,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                            width: "18",
                            height: "18",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "white",
                            strokeWidth: "2.2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                    d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/Header.js",
                                    lineNumber: 9,
                                    columnNumber: 104
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("polyline", {
                                    points: "3.27 6.96 12 12.01 20.73 6.96"
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/Header.js",
                                    lineNumber: 9,
                                    columnNumber: 237
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("line", {
                                    x1: "12",
                                    y1: "22.08",
                                    x2: "12",
                                    y2: "12"
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/Header.js",
                                    lineNumber: 9,
                                    columnNumber: 287
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/shipment-tracker/client/components/Header.js",
                            lineNumber: 9,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/Header.js",
                        lineNumber: 8,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 15,
                                    fontWeight: 600,
                                    color: 'var(--text-1)',
                                    letterSpacing: '-0.3px',
                                    lineHeight: 1.2
                                },
                                children: "Shipment Nerve Center"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/Header.js",
                                lineNumber: 12,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 11,
                                    color: 'var(--text-3)',
                                    marginTop: 1
                                },
                                children: "Global Trade Operations"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/Header.js",
                                lineNumber: 13,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/components/Header.js",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/shipment-tracker/client/components/Header.js",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 12,
                            color: 'var(--text-3)'
                        },
                        children: today
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/Header.js",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 7,
                            background: pulse ? 'var(--amber-dim)' : 'var(--green-dim)',
                            border: '1px solid ' + (pulse ? 'var(--amber-border)' : 'var(--green-border)'),
                            borderRadius: 20,
                            padding: '5px 12px',
                            transition: 'all 0.4s'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    background: pulse ? 'var(--amber)' : 'var(--green)',
                                    transition: 'background 0.4s'
                                }
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/Header.js",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 600,
                                    color: pulse ? 'var(--amber)' : 'var(--green)',
                                    letterSpacing: '0.05em',
                                    transition: 'color 0.4s'
                                },
                                children: pulse ? 'UPDATING' : 'LIVE'
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/Header.js",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/components/Header.js",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: onAdd,
                        style: {
                            background: 'var(--blue)',
                            color: 'white',
                            border: 'none',
                            padding: '8px 18px',
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 500,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 16,
                                    lineHeight: 1
                                },
                                children: "+"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/Header.js",
                                lineNumber: 27,
                                columnNumber: 11
                            }, this),
                            " Track Shipment"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/components/Header.js",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/shipment-tracker/client/components/Header.js",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/shipment-tracker/client/components/Header.js",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
}),
"[project]/shipment-tracker/client/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$axios$29$__ = __turbopack_context__.i("[externals]/axios [external] (axios, esm_import, [project]/shipment-tracker/client/node_modules/axios)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$socket$2e$io$2d$client__$5b$external$5d$__$28$socket$2e$io$2d$client$2c$__esm_import$2c$__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$socket$2e$io$2d$client$29$__ = __turbopack_context__.i("[externals]/socket.io-client [external] (socket.io-client, esm_import, [project]/shipment-tracker/client/node_modules/socket.io-client)");
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$ShipmentTable$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/components/ShipmentTable.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$AddShipmentForm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/components/AddShipmentForm.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$EventTimeline$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/components/EventTimeline.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$StatsBar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/components/StatsBar.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$Header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/components/Header.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$axios$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$socket$2e$io$2d$client__$5b$external$5d$__$28$socket$2e$io$2d$client$2c$__esm_import$2c$__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$socket$2e$io$2d$client$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$axios$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$socket$2e$io$2d$client__$5b$external$5d$__$28$socket$2e$io$2d$client$2c$__esm_import$2c$__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$socket$2e$io$2d$client$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
const socket = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$socket$2e$io$2d$client__$5b$external$5d$__$28$socket$2e$io$2d$client$2c$__esm_import$2c$__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$socket$2e$io$2d$client$29$__["default"])('http://localhost:3001');
const API = 'http://localhost:3001/api';
function Home() {
    const [shipments, setShipments] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [adding, setAdding] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [pulse, setPulse] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const fetchShipments = async ()=>{
        try {
            const res = await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$axios$29$__["default"].get(API + '/shipments');
            setShipments(res.data.shipments);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };
    const fetchEvents = async (id)=>{
        const res = await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$axios$29$__["default"].get(API + '/shipments/' + id + '/events');
        setEvents(res.data.events);
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        fetchShipments();
        socket.on('shipment_updated', (data)=>{
            setPulse(true);
            setTimeout(()=>setPulse(false), 1200);
            setShipments((prev)=>prev.map((s)=>s.id === data.id ? {
                        ...s,
                        status: data.status
                    } : s));
        });
        return ()=>socket.off('shipment_updated');
    }, []);
    const handleSelect = (shipment)=>{
        setSelected(shipment);
        fetchEvents(shipment.id);
    };
    const handleAdd = async (form)=>{
        await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$axios$29$__["default"].post(API + '/shipments', form);
        fetchShipments();
        setAdding(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "Shipment Nerve Center"
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/pages/index.js",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1"
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/pages/index.js",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/shipment-tracker/client/pages/index.js",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    minHeight: '100vh',
                    background: 'var(--bg)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$Header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        pulse: pulse,
                        onAdd: ()=>setAdding(true)
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/pages/index.js",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                        style: {
                            maxWidth: 1400,
                            margin: '0 auto',
                            padding: '28px 24px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$StatsBar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                shipments: shipments
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/pages/index.js",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            adding && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$AddShipmentForm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                onAdd: handleAdd,
                                onCancel: ()=>setAdding(false)
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/pages/index.js",
                                lineNumber: 67,
                                columnNumber: 22
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 13,
                                            fontWeight: 600,
                                            color: 'var(--text-1)'
                                        },
                                        children: "Active shipments"
                                    }, void 0, false, {
                                        fileName: "[project]/shipment-tracker/client/pages/index.js",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 12,
                                            color: 'var(--text-3)',
                                            background: 'var(--bg-3)',
                                            padding: '2px 10px',
                                            borderRadius: 20
                                        },
                                        children: [
                                            shipments.length,
                                            " total"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/shipment-tracker/client/pages/index.js",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/shipment-tracker/client/pages/index.js",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'center',
                                    padding: '4rem',
                                    color: 'var(--text-4)',
                                    fontSize: 13
                                },
                                children: "Loading shipments..."
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/pages/index.js",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$ShipmentTable$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                shipments: shipments,
                                onSelect: handleSelect,
                                selected: selected
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/pages/index.js",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this),
                            selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$EventTimeline$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                shipment: selected,
                                events: events,
                                onClose: ()=>setSelected(null)
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/pages/index.js",
                                lineNumber: 79,
                                columnNumber: 24
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/pages/index.js",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/shipment-tracker/client/pages/index.js",
                lineNumber: 63,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0jxam3h._.js.map