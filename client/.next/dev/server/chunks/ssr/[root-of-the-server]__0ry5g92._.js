module.exports = [
"[project]/shipment-tracker/client/components/ShipmentTable.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShipmentTable
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
const STATUS_COLORS = {
    in_transit: {
        bg: '#dbeafe',
        color: '#1d4ed8'
    },
    delivered: {
        bg: '#dcfce7',
        color: '#15803d'
    },
    pending: {
        bg: '#f3f4f6',
        color: '#374151'
    },
    info_received: {
        bg: '#ede9fe',
        color: '#6d28d9'
    },
    out_for_delivery: {
        bg: '#fef9c3',
        color: '#a16207'
    },
    attempt_failed: {
        bg: '#fee2e2',
        color: '#dc2626'
    },
    exception: {
        bg: '#fee2e2',
        color: '#dc2626'
    },
    unknown: {
        bg: '#f3f4f6',
        color: '#374151'
    }
};
function ShipmentTable({ shipments, onSelect, selected }) {
    if (shipments.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: {
                textAlign: 'center',
                padding: '3rem',
                background: '#f9fafb',
                borderRadius: 12,
                border: '1px dashed #e5e7eb'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                style: {
                    color: '#9ca3af',
                    margin: 0
                },
                children: "No shipments yet. Add one above."
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            overflowX: 'auto',
            marginBottom: '2rem'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("table", {
            style: {
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 14
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("thead", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                        style: {
                            borderBottom: '2px solid #e5e7eb'
                        },
                        children: [
                            'Tracking #',
                            'Carrier',
                            'Description',
                            'Origin',
                            'Destination',
                            'Status',
                            'ETA',
                            'Predicted Delay'
                        ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                style: {
                                    padding: '10px 12px',
                                    textAlign: 'left',
                                    color: '#6b7280',
                                    fontWeight: 500
                                },
                                children: h
                            }, h, false, {
                                fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                lineNumber: 27,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tbody", {
                    children: shipments.map((s)=>{
                        const style = STATUS_COLORS[s.status] || STATUS_COLORS.unknown;
                        const isSelected = selected?.id === s.id;
                        const delay = s.predicted_delay_days;
                        const delayColor = delay > 3 ? '#dc2626' : delay > 1 ? '#d97706' : '#16a34a';
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                            onClick: ()=>onSelect(s),
                            style: {
                                borderBottom: '1px solid #f3f4f6',
                                cursor: 'pointer',
                                background: isSelected ? '#f0f9ff' : 'white'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: '12px',
                                        fontWeight: 500
                                    },
                                    children: s.tracking_number
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                    lineNumber: 39,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: '12px',
                                        textTransform: 'uppercase',
                                        fontSize: 12,
                                        fontWeight: 600
                                    },
                                    children: s.carrier
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                    lineNumber: 40,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: '12px'
                                    },
                                    children: s.description || '-'
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                    lineNumber: 41,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: '12px'
                                    },
                                    children: s.origin || '-'
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                    lineNumber: 42,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: '12px'
                                    },
                                    children: s.destination || '-'
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                    lineNumber: 43,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: '12px'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: style.bg,
                                            color: style.color,
                                            padding: '3px 10px',
                                            borderRadius: 99,
                                            fontSize: 12,
                                            fontWeight: 500
                                        },
                                        children: s.status.replace(/_/g, ' ')
                                    }, void 0, false, {
                                        fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                        lineNumber: 45,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                    lineNumber: 44,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: '12px'
                                    },
                                    children: s.eta ? new Date(s.eta).toLocaleDateString() : '-'
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                    lineNumber: 49,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: '12px',
                                        fontWeight: 500,
                                        color: delayColor
                                    },
                                    children: delay > 0 ? '+' + delay + ' days' : 'On time'
                                }, void 0, false, {
                                    fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                                    lineNumber: 50,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, s.id, true, {
                            fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                            lineNumber: 38,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
                    lineNumber: 31,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
            lineNumber: 23,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/shipment-tracker/client/components/ShipmentTable.js",
        lineNumber: 22,
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
    'other'
];
function AddShipmentForm({ onAdd }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
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
        setForm({
            tracking_number: '',
            carrier: 'dhl',
            description: '',
            origin: '',
            destination: ''
        });
        setLoading(false);
        setOpen(false);
    };
    const inp = {
        width: '100%',
        padding: '8px 12px',
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        fontSize: 14,
        outline: 'none',
        boxSizing: 'border-box'
    };
    if (!open) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
        onClick: ()=>setOpen(true),
        style: {
            marginBottom: '1.5rem',
            padding: '10px 20px',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer'
        },
        children: "+ Add Shipment"
    }, void 0, false, {
        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
        lineNumber: 28,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: '1.5rem',
            marginBottom: '1.5rem'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                style: {
                    margin: '0 0 1rem',
                    fontSize: 16,
                    fontWeight: 600
                },
                children: "Add New Shipment"
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: 12,
                    marginBottom: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: 12,
                                    color: '#6b7280',
                                    display: 'block',
                                    marginBottom: 4
                                },
                                children: "Tracking Number *"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                style: inp,
                                value: form.tracking_number,
                                onChange: (e)=>setForm({
                                        ...form,
                                        tracking_number: e.target.value
                                    }),
                                placeholder: "e.g. TEST123456"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: 12,
                                    color: '#6b7280',
                                    display: 'block',
                                    marginBottom: 4
                                },
                                children: "Carrier *"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                style: inp,
                                value: form.carrier,
                                onChange: (e)=>setForm({
                                        ...form,
                                        carrier: e.target.value
                                    }),
                                children: CARRIERS.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: c,
                                        children: c.toUpperCase()
                                    }, c, false, {
                                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                        lineNumber: 44,
                                        columnNumber: 32
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: 12,
                                    color: '#6b7280',
                                    display: 'block',
                                    marginBottom: 4
                                },
                                children: "Description"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                style: inp,
                                value: form.description,
                                onChange: (e)=>setForm({
                                        ...form,
                                        description: e.target.value
                                    }),
                                placeholder: "e.g. Electronics batch"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: 12,
                                    color: '#6b7280',
                                    display: 'block',
                                    marginBottom: 4
                                },
                                children: "Origin"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                style: inp,
                                value: form.origin,
                                onChange: (e)=>setForm({
                                        ...form,
                                        origin: e.target.value
                                    }),
                                placeholder: "e.g. Shanghai, CN"
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
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: 12,
                                    color: '#6b7280',
                                    display: 'block',
                                    marginBottom: 4
                                },
                                children: "Destination"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                style: inp,
                                value: form.destination,
                                onChange: (e)=>setForm({
                                        ...form,
                                        destination: e.target.value
                                    }),
                                placeholder: "e.g. Mumbai, IN"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: handleSubmit,
                        disabled: loading,
                        style: {
                            padding: '8px 20px',
                            background: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: 8,
                            fontSize: 14,
                            fontWeight: 500,
                            cursor: 'pointer'
                        },
                        children: loading ? 'Adding...' : 'Add Shipment'
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>setOpen(false),
                        style: {
                            padding: '8px 16px',
                            background: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: 8,
                            fontSize: 14,
                            cursor: 'pointer'
                        },
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/shipment-tracker/client/components/AddShipmentForm.js",
        lineNumber: 34,
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: '1.5rem',
            marginTop: '1rem'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                style: {
                                    margin: 0,
                                    fontSize: 16,
                                    fontWeight: 600
                                },
                                children: shipment.tracking_number
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                lineNumber: 7,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: 0,
                                    color: '#6b7280',
                                    fontSize: 13
                                },
                                children: [
                                    shipment.carrier.toUpperCase(),
                                    " — ",
                                    shipment.origin,
                                    " to ",
                                    shipment.destination
                                ]
                            }, void 0, true, {
                                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                lineNumber: 8,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                        lineNumber: 6,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        style: {
                            background: 'none',
                            border: 'none',
                            fontSize: 20,
                            cursor: 'pointer',
                            color: '#9ca3af'
                        },
                        children: "x"
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                        lineNumber: 10,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                lineNumber: 5,
                columnNumber: 7
            }, this),
            events.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                style: {
                    color: '#9ca3af',
                    fontSize: 14
                },
                children: "No events yet."
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                lineNumber: 13,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                children: events.map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 16,
                            marginBottom: 20
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 12,
                                            height: 12,
                                            borderRadius: '50%',
                                            background: i === 0 ? '#2563eb' : '#d1d5db',
                                            flexShrink: 0,
                                            marginTop: 3
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                        lineNumber: 19,
                                        columnNumber: 17
                                    }, this),
                                    i < events.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 2,
                                            flex: 1,
                                            background: '#e5e7eb',
                                            marginTop: 4
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                        lineNumber: 20,
                                        columnNumber: 43
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                lineNumber: 18,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    paddingBottom: 8
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        style: {
                                            margin: 0,
                                            fontWeight: 500,
                                            fontSize: 14
                                        },
                                        children: e.raw_status
                                    }, void 0, false, {
                                        fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                        lineNumber: 23,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        style: {
                                            margin: '2px 0 0',
                                            fontSize: 12,
                                            color: '#6b7280'
                                        },
                                        children: [
                                            e.location,
                                            " · ",
                                            new Date(e.carrier_timestamp).toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                        lineNumber: 24,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                                lineNumber: 22,
                                columnNumber: 15
                            }, this)
                        ]
                    }, e.id, true, {
                        fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                        lineNumber: 17,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
                lineNumber: 15,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/shipment-tracker/client/components/EventTimeline.js",
        lineNumber: 4,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$ShipmentTable$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/components/ShipmentTable.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$AddShipmentForm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/components/AddShipmentForm.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$EventTimeline$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shipment-tracker/client/components/EventTimeline.js [ssr] (ecmascript)");
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
const socket = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$socket$2e$io$2d$client__$5b$external$5d$__$28$socket$2e$io$2d$client$2c$__esm_import$2c$__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$socket$2e$io$2d$client$29$__["default"])('http://localhost:3001');
const API = 'http://localhost:3001/api';
function Home() {
    const [shipments, setShipments] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const fetchShipments = async ()=>{
        const res = await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$axios$29$__["default"].get(API + '/shipments');
        setShipments(res.data.shipments);
        setLoading(false);
    };
    const fetchEvents = async (id)=>{
        const res = await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$node_modules$2f$axios$29$__["default"].get(API + '/shipments/' + id + '/events');
        setEvents(res.data.events);
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        fetchShipments();
        socket.on('shipment_updated', (data)=>{
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
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            fontFamily: 'sans-serif',
            maxWidth: 1100,
            margin: '0 auto',
            padding: '2rem'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '2rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                style: {
                                    margin: 0,
                                    fontSize: 24,
                                    fontWeight: 700
                                },
                                children: "Shipment Nerve Center"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/pages/index.js",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: 0,
                                    color: '#666',
                                    fontSize: 14
                                },
                                children: "Live tracking dashboard"
                            }, void 0, false, {
                                fileName: "[project]/shipment-tracker/client/pages/index.js",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/shipment-tracker/client/pages/index.js",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            background: '#22c55e',
                            boxShadow: '0 0 0 3px #dcfce7'
                        }
                    }, void 0, false, {
                        fileName: "[project]/shipment-tracker/client/pages/index.js",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/shipment-tracker/client/pages/index.js",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$AddShipmentForm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                onAdd: handleAdd
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/pages/index.js",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                style: {
                    color: '#666'
                },
                children: "Loading shipments..."
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/pages/index.js",
                lineNumber: 58,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$ShipmentTable$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                shipments: shipments,
                onSelect: handleSelect,
                selected: selected
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/pages/index.js",
                lineNumber: 60,
                columnNumber: 9
            }, this),
            selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$shipment$2d$tracker$2f$client$2f$components$2f$EventTimeline$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                shipment: selected,
                events: events,
                onClose: ()=>setSelected(null)
            }, void 0, false, {
                fileName: "[project]/shipment-tracker/client/pages/index.js",
                lineNumber: 63,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/shipment-tracker/client/pages/index.js",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ry5g92._.js.map