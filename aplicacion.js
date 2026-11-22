import * as ReactModule from 'react';
import * as ReactDomModule from 'react-dom/client';
import * as LucideModule from 'lucide-react';
const modules = Object.create(null);
modules["js/App.js"] = function(module, exports, require) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const react_1 = __importStar(require("react"));
const Header_js_1 = require("./components/Header.js");
const FlashcardsView_js_1 = require("./components/FlashcardsView.js");
const CircuitSimulator_js_1 = require("./components/CircuitSimulator.js");
const TroubleshootingScenarios_js_1 = require("./components/TroubleshootingScenarios.js");
const GamifiedQuiz_js_1 = require("./components/GamifiedQuiz.js");
const MultimeterGuideModal_js_1 = require("./components/MultimeterGuideModal.js");
const StudentReportModal_js_1 = require("./components/StudentReportModal.js");
const transistor_physics_js_1 = require("./utils/transistor-physics.js");
const flashcards_and_scenarios_js_1 = require("./data/flashcards-and-scenarios.js");
const lucide_react_1 = require("lucide-react");
function App() {
    const [activeTab, setActiveTab] = (0, react_1.useState)('flashcards');
    const [xp, setXp] = (0, react_1.useState)(() => {
        const saved = localStorage.getItem('efa_smr_xp');
        return saved ? parseInt(saved, 10) : 100;
    });
    const [masteredCards, setMasteredCards] = (0, react_1.useState)(() => {
        const saved = localStorage.getItem('efa_smr_mastered');
        return saved ? JSON.parse(saved) : ['fc-1'];
    });
    const [resolvedCases, setResolvedCases] = (0, react_1.useState)(() => {
        const saved = localStorage.getItem('efa_smr_cases');
        return saved ? JSON.parse(saved) : [];
    });
    const [showReportModal, setShowReportModal] = (0, react_1.useState)(false);
    const [lastXpNotification, setLastXpNotification] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        localStorage.setItem('efa_smr_xp', xp.toString());
    }, [xp]);
    (0, react_1.useEffect)(() => {
        localStorage.setItem('efa_smr_mastered', JSON.stringify(masteredCards));
    }, [masteredCards]);
    (0, react_1.useEffect)(() => {
        localStorage.setItem('efa_smr_cases', JSON.stringify(resolvedCases));
    }, [resolvedCases]);
    (0, react_1.useEffect)(() => {
        const params = new URLSearchParams(window.location.search);
        const tabParam = params.get('tab');
        if (tabParam && ['flashcards', 'simulator', 'troubleshooting', 'quiz', 'guide'].includes(tabParam)) {
            setActiveTab(tabParam);
        }
    }, []);
    const handleAddXp = (amount, reason) => {
        setXp((prev) => prev + amount);
        setLastXpNotification({ amount, reason });
        setTimeout(() => {
            setLastXpNotification((curr) => (curr?.reason === reason ? null : curr));
        }, 3500);
    };
    const handleToggleMastered = (id) => {
        setMasteredCards((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
    };
    const handleMarkCaseResolved = (id) => {
        if (!resolvedCases.includes(id)) {
            setResolvedCases((prev) => [...prev, id]);
        }
    };
    const levelInfo = (0, transistor_physics_js_1.calculateSmrLevel)(xp);
    return (react_1.default.createElement("div", { className: "min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-emerald-800 selection:text-white" }, react_1.default.createElement(Header_js_1.Header, { activeTab: activeTab, onSelectTab: setActiveTab, xp: xp, levelInfo: levelInfo, onOpenReport: () => setShowReportModal(true) }), react_1.default.createElement("main", { className: "flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8" }, activeTab === 'flashcards' && (react_1.default.createElement(FlashcardsView_js_1.FlashcardsView, { onAddXp: handleAddXp, masteredIds: masteredCards, onToggleMastered: handleToggleMastered })), activeTab === 'simulator' && (react_1.default.createElement(CircuitSimulator_js_1.CircuitSimulator, { onAddXp: handleAddXp })), activeTab === 'troubleshooting' && (react_1.default.createElement(TroubleshootingScenarios_js_1.TroubleshootingScenarios, { onAddXp: handleAddXp, resolvedCaseIds: resolvedCases, onMarkCaseResolved: handleMarkCaseResolved })), activeTab === 'quiz' && (react_1.default.createElement(GamifiedQuiz_js_1.GamifiedQuiz, { onAddXp: handleAddXp, onOpenReport: () => setShowReportModal(true) })), activeTab === 'guide' && (react_1.default.createElement(MultimeterGuideModal_js_1.MultimeterGuideModal, null))), lastXpNotification && (react_1.default.createElement("aside", { "aria-label": "Notificaci\u00F3n de experiencia", className: "fixed bottom-6 right-6 z-50 bg-emerald-950 text-white px-4 py-3 rounded-xl shadow-xl border border-emerald-700/60 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300" }, react_1.default.createElement("div", { className: "p-1.5 rounded-lg bg-emerald-700 text-amber-300" }, react_1.default.createElement(lucide_react_1.Zap, { className: "w-5 h-5 fill-amber-300 text-amber-300" })), react_1.default.createElement("div", null, react_1.default.createElement("div", { className: "text-xs font-bold font-mono text-amber-300" }, "+", lastXpNotification.amount, " XP Ganados"), react_1.default.createElement("div", { className: "text-2xs text-slate-300" }, lastXpNotification.reason)))), react_1.default.createElement(StudentReportModal_js_1.StudentReportModal, { isOpen: showReportModal, onClose: () => setShowReportModal(false), xp: xp, levelInfo: levelInfo, masteredCardsCount: masteredCards.length, totalCardsCount: flashcards_and_scenarios_js_1.FLASHCARDS_DATA.length, resolvedCasesCount: resolvedCases.length, totalCasesCount: flashcards_and_scenarios_js_1.DIAGNOSTIC_SCENARIOS.length }), react_1.default.createElement("footer", { className: "mt-auto border-t border-slate-200/80 bg-white py-6" }, react_1.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500" }, react_1.default.createElement("div", { className: "flex items-center gap-3" }, react_1.default.createElement("img", { src: "data:image/jpeg;base64,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", alt: "EFA Oretana", className: "h-7 w-auto object-contain grayscale hover:grayscale-0 transition-all opacity-80", referrerPolicy: "no-referrer" }), react_1.default.createElement("span", null, "EFA Oretana \u00B7 Ciclos Formativos de Grado Medio (CFGM) \u00B7 Montaje y Mantenimiento de Equipos")), react_1.default.createElement("div", { className: "flex items-center gap-4 text-xs" }, react_1.default.createElement("button", { onClick: () => setShowReportModal(true), className: "hover:text-emerald-800 transition-colors cursor-pointer font-medium" }, "Expediente SMR"), react_1.default.createElement("span", { "aria-hidden": "true" }, "\u00B7"), react_1.default.createElement("button", { onClick: () => setActiveTab('guide'), className: "hover:text-emerald-800 transition-colors cursor-pointer font-medium" }, "Protocolo Pol\u00EDmetro"), react_1.default.createElement("span", { "aria-hidden": "true" }, "\u00B7"), react_1.default.createElement("span", { className: "font-mono text-2xs text-slate-400" }, "v2.4 CFGM-SMR"))))));
}

};
modules["js/components/CircuitSimulator.js"] = function(module, exports, require) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitSimulator = void 0;
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const transistor_physics_js_1 = require("../utils/transistor-physics.js");
const CircuitSimulator = ({ onAddXp }) => {
    const [activeModel, setActiveModel] = (0, react_1.useState)('bjt');
    const [bjtType, setBjtType] = (0, react_1.useState)('NPN');
    const [bjtVin, setBjtVin] = (0, react_1.useState)(0.2);
    const [bjtVcc, setBjtVcc] = (0, react_1.useState)(12);
    const [bjtRb, setBjtRb] = (0, react_1.useState)(10000);
    const [bjtRc, setBjtRc] = (0, react_1.useState)(220);
    const [bjtBeta, setBjtBeta] = (0, react_1.useState)(100);
    const [mosfetVgs, setMosfetVgs] = (0, react_1.useState)(1.2);
    const [mosfetVdd, setMosfetVdd] = (0, react_1.useState)(12);
    const [mosfetVth, setMosfetVth] = (0, react_1.useState)(2.5);
    const [mosfetRdson, setMosfetRdson] = (0, react_1.useState)(0.006);
    const [mosfetPwm, setMosfetPwm] = (0, react_1.useState)(100);
    const [multimeterMode, setMultimeterMode] = (0, react_1.useState)('diode');
    const [redLead, setRedLead] = (0, react_1.useState)('Base');
    const [blackLead, setBlackLead] = (0, react_1.useState)('Emitter');
    const [hasInteractedWithMeter, setHasInteractedWithMeter] = (0, react_1.useState)(false);
    const bjtState = (0, react_1.useMemo)(() => {
        return (0, transistor_physics_js_1.simulateBjt)({
            type: bjtType,
            vcc: bjtVcc,
            vin: bjtVin,
            rb: bjtRb,
            rc: bjtRc,
            beta: bjtBeta,
        });
    }, [bjtType, bjtVcc, bjtVin, bjtRb, bjtRc, bjtBeta]);
    const mosfetState = (0, react_1.useMemo)(() => {
        return (0, transistor_physics_js_1.simulateMosfet)({
            type: 'N-Channel',
            vdd: mosfetVdd,
            vgs: mosfetVgs,
            vth: mosfetVth,
            rdson: mosfetRdson,
            rLoad: 6,
            pwmPercent: mosfetPwm,
        });
    }, [mosfetVdd, mosfetVgs, mosfetVth, mosfetRdson, mosfetPwm]);
    const multimeterResult = (0, react_1.useMemo)(() => {
        if (activeModel === 'bjt') {
            const compType = bjtType === 'NPN' ? 'BJT_NPN' : 'BJT_PNP';
            return (0, transistor_physics_js_1.testComponentJunction)(compType, redLead, blackLead);
        }
        else {
            return (0, transistor_physics_js_1.testComponentJunction)('MOSFET_N_GOOD', redLead, blackLead);
        }
    }, [activeModel, bjtType, redLead, blackLead]);
    const handleTestMeter = (red, black) => {
        setRedLead(red);
        setBlackLead(black);
        if (!hasInteractedWithMeter) {
            setHasInteractedWithMeter(true);
            onAddXp(25, 'Primera verificación con polímetro virtual');
        }
    };
    return (react_1.default.createElement("div", { className: "space-y-6" }, react_1.default.createElement("div", { className: "bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs" }, react_1.default.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4" }, react_1.default.createElement("div", null, react_1.default.createElement("div", { className: "text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1" }, "Laboratorio Virtual de Pruebas \u00B7 1\u00BA SMR"), react_1.default.createElement("h1", { className: "text-xl sm:text-2xl font-bold text-slate-900 tracking-tight" }, "Mapa Interactivo de Funcionamiento del Transistor"), react_1.default.createElement("p", { className: "text-sm text-slate-600 mt-0.5" }, "Ajusta las variables de polarizaci\u00F3n en tiempo real y observa la respuesta de corrientes, ca\u00EDdas de tensi\u00F3n y estados de conmutaci\u00F3n.")), react_1.default.createElement("div", { className: "flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg shrink-0" }, react_1.default.createElement("button", { onClick: () => {
            setActiveModel('bjt');
            setRedLead('Base');
            setBlackLead('Emitter');
        }, className: `px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all ${activeModel === 'bjt'
            ? 'bg-white text-emerald-900 shadow-xs font-bold'
            : 'text-slate-600 hover:text-slate-900'}` }, "Transistor BJT (Bipolar)"), react_1.default.createElement("button", { onClick: () => {
            setActiveModel('mosfet');
            setRedLead('Gate');
            setBlackLead('Source');
        }, className: `px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all ${activeModel === 'mosfet'
            ? 'bg-white text-emerald-900 shadow-xs font-bold'
            : 'text-slate-600 hover:text-slate-900'}` }, "MOSFET Canal N (VRM / PWM)")))), react_1.default.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6" }, react_1.default.createElement("div", { className: "lg:col-span-7 bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-4" }, react_1.default.createElement("div", { className: "flex items-center justify-between" }, react_1.default.createElement("div", { className: "flex items-center gap-2" }, react_1.default.createElement(lucide_react_1.Activity, { className: "w-4 h-4 text-emerald-700" }), react_1.default.createElement("h2", { className: "text-sm font-bold text-slate-900" }, activeModel === 'bjt' ? 'Esquema de Conmutación BJT' : 'Etapa de Potencia MOSFET (Placa Base / FAN)')), activeModel === 'bjt' ? (react_1.default.createElement("span", { className: `text-xs font-bold font-mono px-3 py-1 rounded-md uppercase tracking-wider ${bjtState.region === 'corte'
            ? 'bg-slate-100 text-slate-700 border border-slate-300'
            : bjtState.region === 'activa'
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-emerald-100 text-emerald-900 border border-emerald-300'}` }, "\u25CF Estado: ", bjtState.region)) : (react_1.default.createElement("span", { className: `text-xs font-bold font-mono px-3 py-1 rounded-md uppercase tracking-wider ${mosfetState.state === 'corte'
            ? 'bg-slate-100 text-slate-700 border border-slate-300'
            : 'bg-emerald-100 text-emerald-900 border border-emerald-300'}` }, "\u25CF ", mosfetState.isOn ? 'En Conducción (ON)' : 'En Corte (OFF)'))), react_1.default.createElement("div", { className: "relative bg-slate-950 rounded-xl p-4 border border-slate-800 text-slate-100 min-h-[300px] flex items-center justify-center overflow-hidden" }, react_1.default.createElement("div", { className: "w-full max-w-md" }, activeModel === 'bjt' ? (react_1.default.createElement("svg", { viewBox: "0 0 400 240", className: "w-full h-auto select-none", role: "img", "aria-label": "Simulador BJT" }, react_1.default.createElement("defs", null, react_1.default.createElement("pattern", { id: "circ-grid", width: "20", height: "20", patternUnits: "userSpaceOnUse" }, react_1.default.createElement("path", { d: "M 20 0 L 0 0 0 20", fill: "none", stroke: "#1e293b", strokeWidth: "0.5" }))), react_1.default.createElement("rect", { width: "400", height: "240", fill: "url(#circ-grid)" }), react_1.default.createElement("line", { x1: "60", y1: "30", x2: "280", y2: "30", stroke: "#ef4444", strokeWidth: "3" }), react_1.default.createElement("circle", { cx: "280", cy: "30", r: "4", fill: "#ef4444" }), react_1.default.createElement("text", { x: "60", y: "22", fill: "#ef4444", fontSize: "11", fontWeight: "bold", fontFamily: "monospace" }, "+", bjtVcc, "V V_CC"), react_1.default.createElement("line", { x1: "60", y1: "210", x2: "340", y2: "210", stroke: "#64748b", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "220", y1: "210", x2: "220", y2: "225", stroke: "#64748b", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "210", y1: "225", x2: "230", y2: "225", stroke: "#64748b", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "214", y1: "229", x2: "226", y2: "229", stroke: "#64748b", strokeWidth: "2" }), react_1.default.createElement("text", { x: "238", y: "226", fill: "#64748b", fontSize: "11", fontFamily: "monospace" }, "GND (0V)"), react_1.default.createElement("text", { x: "30", y: "115", fill: "#38bdf8", fontSize: "11", fontWeight: "bold", fontFamily: "monospace" }, "Vin: ", bjtVin.toFixed(2), "V"), react_1.default.createElement("line", { x1: "80", y1: "120", x2: "120", y2: "120", stroke: "#38bdf8", strokeWidth: "2.5" }), react_1.default.createElement("rect", { x: "120", y: "112", width: "36", height: "16", fill: "#1e293b", stroke: "#38bdf8", strokeWidth: "1.5", rx: "2" }), react_1.default.createElement("text", { x: "124", y: "124", fill: "#94a3b8", fontSize: "9", fontFamily: "monospace" }, bjtRb / 1000, "k"), react_1.default.createElement("line", { x1: "156", y1: "120", x2: "190", y2: "120", stroke: "#f8fafc", strokeWidth: "2.5" }), react_1.default.createElement("line", { x1: "220", y1: "30", x2: "220", y2: "60", stroke: "#ef4444", strokeWidth: "2.5" }), react_1.default.createElement("circle", { cx: "220", cy: "75", r: "15", fill: bjtState.lampBrightnessPercent > 0 ? '#fef08a' : '#334155', stroke: bjtState.lampBrightnessPercent > 0 ? '#eab308' : '#64748b', strokeWidth: "2", style: {
            filter: bjtState.lampBrightnessPercent > 20
                ? `drop-shadow(0 0 ${Math.min(20, bjtState.lampBrightnessPercent / 4)}px #facc15)`
                : 'none',
            opacity: Math.max(0.3, bjtState.lampBrightnessPercent / 100),
        } }), react_1.default.createElement("text", { x: "245", y: "79", fill: "#facc15", fontSize: "10", fontFamily: "monospace" }, "Carga (", bjtRc, "\u03A9)"), react_1.default.createElement("line", { x1: "220", y1: "90", x2: "220", y2: "105", stroke: "#f8fafc", strokeWidth: "2.5" }), react_1.default.createElement("circle", { cx: "210", cy: "120", r: "28", fill: "#0f172a", stroke: "#38bdf8", strokeWidth: "2" }), react_1.default.createElement("line", { x1: "195", y1: "104", x2: "195", y2: "136", stroke: "#38bdf8", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "196", y1: "112", x2: "220", y2: "105", stroke: "#f8fafc", strokeWidth: "2.5" }), react_1.default.createElement("line", { x1: "196", y1: "128", x2: "220", y2: "135", stroke: "#f8fafc", strokeWidth: "2.5" }), react_1.default.createElement("polygon", { points: bjtType === 'NPN' ? '216,131 222,137 212,137' : '204,124 200,131 209,130', fill: "#22c55e" }), react_1.default.createElement("line", { x1: "220", y1: "135", x2: "220", y2: "210", stroke: "#f8fafc", strokeWidth: "2.5" }), react_1.default.createElement("circle", { cx: "175", cy: "120", r: "4", fill: "#38bdf8" }), react_1.default.createElement("text", { x: "165", y: "112", fill: "#38bdf8", fontSize: "9", fontFamily: "monospace" }, "TP_B"), react_1.default.createElement("circle", { cx: "220", cy: "98", r: "4", fill: "#f59e0b" }), react_1.default.createElement("text", { x: "228", y: "102", fill: "#f59e0b", fontSize: "9", fontFamily: "monospace" }, "TP_C"), react_1.default.createElement("circle", { cx: "220", cy: "160", r: "4", fill: "#22c55e" }), react_1.default.createElement("text", { x: "228", y: "164", fill: "#22c55e", fontSize: "9", fontFamily: "monospace" }, "TP_E"), bjtState.icMilliAmps > 0 && (react_1.default.createElement("line", { x1: "220", y1: "35", x2: "220", y2: "205", stroke: "#22c55e", strokeWidth: "2", strokeDasharray: "4 4", className: "animate-pulse" })))) : (react_1.default.createElement("svg", { viewBox: "0 0 400 240", className: "w-full h-auto select-none", role: "img", "aria-label": "Simulador MOSFET" }, react_1.default.createElement("rect", { width: "400", height: "240", fill: "#090d16" }), react_1.default.createElement("line", { x1: "60", y1: "30", x2: "340", y2: "30", stroke: "#ef4444", strokeWidth: "3" }), react_1.default.createElement("text", { x: "345", y: "34", fill: "#ef4444", fontSize: "12", fontWeight: "bold", fontFamily: "monospace" }, "+12V (ATX)"), react_1.default.createElement("line", { x1: "60", y1: "210", x2: "340", y2: "210", stroke: "#64748b", strokeWidth: "3" }), react_1.default.createElement("text", { x: "240", y: "225", fill: "#64748b", fontSize: "11", fontFamily: "monospace" }, "GND"), react_1.default.createElement("line", { x1: "220", y1: "30", x2: "220", y2: "60", stroke: "#ef4444", strokeWidth: "2.5" }), react_1.default.createElement("rect", { x: "200", y: "60", width: "40", height: "30", rx: "4", fill: "#1e293b", stroke: "#38bdf8", strokeWidth: "1.5" }), react_1.default.createElement("text", { x: "206", y: "78", fill: "#38bdf8", fontSize: "9", fontWeight: "bold", fontFamily: "monospace" }, "FAN PC"), react_1.default.createElement("line", { x1: "220", y1: "90", x2: "220", y2: "105", stroke: "#f8fafc", strokeWidth: "2.5" }), react_1.default.createElement("circle", { cx: "210", cy: "125", r: "28", fill: "#0f172a", stroke: "#10b981", strokeWidth: "2" }), react_1.default.createElement("line", { x1: "80", y1: "125", x2: "190", y2: "125", stroke: "#38bdf8", strokeWidth: "2.5" }), react_1.default.createElement("line", { x1: "190", y1: "110", x2: "190", y2: "140", stroke: "#38bdf8", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "196", y1: "110", x2: "196", y2: "118", stroke: "#10b981", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "196", y1: "121", x2: "196", y2: "129", stroke: "#10b981", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "196", y1: "132", x2: "196", y2: "140", stroke: "#10b981", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "196", y1: "114", x2: "220", y2: "105", stroke: "#f8fafc", strokeWidth: "2.5" }), react_1.default.createElement("line", { x1: "196", y1: "136", x2: "220", y2: "145", stroke: "#f8fafc", strokeWidth: "2.5" }), react_1.default.createElement("line", { x1: "220", y1: "145", x2: "220", y2: "210", stroke: "#f8fafc", strokeWidth: "2.5" }), react_1.default.createElement("text", { x: "40", y: "118", fill: "#38bdf8", fontSize: "11", fontWeight: "bold", fontFamily: "monospace" }, "V_GS: ", mosfetVgs.toFixed(2), "V"), react_1.default.createElement("text", { x: "40", y: "134", fill: "#94a3b8", fontSize: "9", fontFamily: "monospace" }, "(Umbral: ", mosfetVth, "V)"), mosfetState.isOn && (react_1.default.createElement("line", { x1: "220", y1: "35", x2: "220", y2: "205", stroke: "#10b981", strokeWidth: "2.5", strokeDasharray: "4 4", className: "animate-pulse" }))))), react_1.default.createElement("div", { className: "absolute top-4 right-4 bg-slate-900/90 border border-slate-700 rounded-lg p-3 flex flex-col items-center" }, activeModel === 'bjt' ? (react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(lucide_react_1.Lightbulb, { className: "w-8 h-8 transition-colors duration-200", style: {
            color: bjtState.lampBrightnessPercent > 10 ? '#facc15' : '#64748b',
            filter: bjtState.lampBrightnessPercent > 20
                ? `drop-shadow(0 0 10px #facc15)`
                : 'none',
        } }), react_1.default.createElement("span", { className: "text-2xs font-mono font-bold mt-1 text-slate-200" }, "Brillo: ", bjtState.lampBrightnessPercent, "%"))) : (react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(lucide_react_1.Fan, { className: `w-8 h-8 text-emerald-400 ${mosfetState.fanSpeedRpm > 0 ? 'animate-spin' : ''}`, style: {
            animationDuration: mosfetState.fanSpeedRpm > 0
                ? `${Math.max(0.1, 3000 / mosfetState.fanSpeedRpm)}s`
                : '0s',
        } }), react_1.default.createElement("span", { className: "text-2xs font-mono font-bold mt-1 text-emerald-300" }, mosfetState.fanSpeedRpm, " RPM"))))), react_1.default.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3" }, activeModel === 'bjt' ? (react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement("div", { className: "bg-slate-50 rounded-lg p-2.5 border border-slate-200" }, react_1.default.createElement("div", { className: "text-2xs font-semibold text-slate-500 uppercase tracking-wider" }, "Corriente Base (I_B)"), react_1.default.createElement("div", { className: "text-sm font-bold font-mono text-sky-800 tabular-nums" }, bjtState.ibMicroAmps, " \u00B5A")), react_1.default.createElement("div", { className: "bg-slate-50 rounded-lg p-2.5 border border-slate-200" }, react_1.default.createElement("div", { className: "text-2xs font-semibold text-slate-500 uppercase tracking-wider" }, "Corriente Colector (I_C)"), react_1.default.createElement("div", { className: "text-sm font-bold font-mono text-emerald-800 tabular-nums" }, bjtState.icMilliAmps, " mA")), react_1.default.createElement("div", { className: "bg-slate-50 rounded-lg p-2.5 border border-slate-200" }, react_1.default.createElement("div", { className: "text-2xs font-semibold text-slate-500 uppercase tracking-wider" }, "Tensi\u00F3n Colector-Emisor (V_CE)"), react_1.default.createElement("div", { className: "text-sm font-bold font-mono text-amber-800 tabular-nums" }, bjtState.vce, " V")), react_1.default.createElement("div", { className: "bg-slate-50 rounded-lg p-2.5 border border-slate-200" }, react_1.default.createElement("div", { className: "text-2xs font-semibold text-slate-500 uppercase tracking-wider" }, "Disipaci\u00F3n T\u00E9rmica"), react_1.default.createElement("div", { className: "text-sm font-bold font-mono text-rose-800 tabular-nums flex items-center gap-1" }, react_1.default.createElement(lucide_react_1.Flame, { className: "w-3.5 h-3.5 text-rose-500 inline" }), react_1.default.createElement("span", null, (bjtState.powerDissipatedWatts * 1000).toFixed(1), " mW"))))) : (react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement("div", { className: "bg-slate-50 rounded-lg p-2.5 border border-slate-200" }, react_1.default.createElement("div", { className: "text-2xs font-semibold text-slate-500 uppercase tracking-wider" }, "Corriente Drenador (I_D)"), react_1.default.createElement("div", { className: "text-sm font-bold font-mono text-emerald-800 tabular-nums" }, (mosfetState.idMilliAmps / 1000).toFixed(2), " A")), react_1.default.createElement("div", { className: "bg-slate-50 rounded-lg p-2.5 border border-slate-200" }, react_1.default.createElement("div", { className: "text-2xs font-semibold text-slate-500 uppercase tracking-wider" }, "Ca\u00EDda V_DS"), react_1.default.createElement("div", { className: "text-sm font-bold font-mono text-sky-800 tabular-nums" }, (mosfetState.vds * 1000).toFixed(1), " mV")), react_1.default.createElement("div", { className: "bg-slate-50 rounded-lg p-2.5 border border-slate-200" }, react_1.default.createElement("div", { className: "text-2xs font-semibold text-slate-500 uppercase tracking-wider" }, "Resistencia R_DS(on)"), react_1.default.createElement("div", { className: "text-sm font-bold font-mono text-amber-800 tabular-nums" }, (mosfetState.channelResistanceOhms * 1000).toFixed(1), " m\u03A9")), react_1.default.createElement("div", { className: "bg-slate-50 rounded-lg p-2.5 border border-slate-200" }, react_1.default.createElement("div", { className: "text-2xs font-semibold text-slate-500 uppercase tracking-wider" }, "P\u00E9rdida en el VRM"), react_1.default.createElement("div", { className: "text-sm font-bold font-mono text-rose-800 tabular-nums" }, (mosfetState.powerLossWatts * 1000).toFixed(1), " mW"))))), react_1.default.createElement("div", { className: "bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5 flex items-start gap-3" }, react_1.default.createElement(lucide_react_1.Info, { className: "w-5 h-5 text-emerald-800 shrink-0 mt-0.5" }), react_1.default.createElement("div", { className: "text-xs text-emerald-950 leading-relaxed" }, react_1.default.createElement("span", { className: "font-bold" }, "Interpretaci\u00F3n Pedag\u00F3gica SMR: "), activeModel === 'bjt' ? bjtState.explanation : mosfetState.explanation))), react_1.default.createElement("div", { className: "lg:col-span-5 space-y-5" }, react_1.default.createElement("div", { className: "bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-4" }, react_1.default.createElement("div", { className: "flex items-center justify-between" }, react_1.default.createElement("div", { className: "flex items-center gap-2" }, react_1.default.createElement(lucide_react_1.Sliders, { className: "w-4 h-4 text-emerald-700" }), react_1.default.createElement("h3", { className: "text-sm font-bold text-slate-900" }, "Panel de Control de Polarizaci\u00F3n")), react_1.default.createElement("span", { className: "text-2xs text-slate-500" }, "Ajuste manual")), activeModel === 'bjt' ? (react_1.default.createElement("div", { className: "space-y-4" }, react_1.default.createElement("div", { className: "flex items-center justify-between text-xs" }, react_1.default.createElement("span", { className: "font-medium text-slate-700" }, "Tipo de BJT:"), react_1.default.createElement("div", { className: "flex gap-1" }, ['NPN', 'PNP'].map((t) => (react_1.default.createElement("button", { key: t, onClick: () => setBjtType(t), className: `px-3 py-1 rounded text-2xs font-bold cursor-pointer transition-colors ${bjtType === t
            ? 'bg-emerald-800 text-white'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}` }, t))))), react_1.default.createElement("div", null, react_1.default.createElement("div", { className: "flex justify-between text-xs mb-1" }, react_1.default.createElement("label", { htmlFor: "bjt-vin-slider", className: "font-medium text-slate-700" }, "Tensi\u00F3n de Entrada V_in (Base):"), react_1.default.createElement("span", { className: "font-mono font-bold text-emerald-800" }, bjtVin.toFixed(2), " V")), react_1.default.createElement("input", { id: "bjt-vin-slider", type: "range", min: "0", max: "5", step: "0.05", value: bjtVin, onChange: (e) => setBjtVin(parseFloat(e.target.value)), className: "w-full accent-emerald-700 cursor-pointer" }), react_1.default.createElement("div", { className: "flex justify-between text-3xs text-slate-400 font-mono mt-0.5" }, react_1.default.createElement("span", null, "0.0V (Corte)"), react_1.default.createElement("span", null, "0.7V (Umbral)"), react_1.default.createElement("span", null, "5.0V (Saturaci\u00F3n)"))), react_1.default.createElement("div", { className: "flex items-center gap-2 pt-1" }, react_1.default.createElement("span", { className: "text-2xs font-medium text-slate-500" }, "Estados t\u00EDpicos:"), react_1.default.createElement("button", { onClick: () => setBjtVin(0.0), className: "px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-2xs font-medium text-slate-700 cursor-pointer" }, "Corte (0V)"), react_1.default.createElement("button", { onClick: () => setBjtVin(0.85), className: "px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 text-2xs font-medium text-amber-800 cursor-pointer" }, "Activa (0.85V)"), react_1.default.createElement("button", { onClick: () => setBjtVin(3.3), className: "px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-2xs font-medium text-emerald-800 cursor-pointer" }, "Saturaci\u00F3n (3.3V)")), react_1.default.createElement("div", null, react_1.default.createElement("div", { className: "flex justify-between text-xs mb-1" }, react_1.default.createElement("label", { htmlFor: "bjt-rb-slider", className: "font-medium text-slate-700" }, "Resistencia de Base (R_B):"), react_1.default.createElement("span", { className: "font-mono font-bold text-slate-800" }, (bjtRb / 1000).toFixed(1), " k\u03A9")), react_1.default.createElement("input", { id: "bjt-rb-slider", type: "range", min: "1000", max: "50000", step: "1000", value: bjtRb, onChange: (e) => setBjtRb(parseInt(e.target.value)), className: "w-full accent-emerald-700 cursor-pointer" })), react_1.default.createElement("div", null, react_1.default.createElement("div", { className: "flex justify-between text-xs mb-1" }, react_1.default.createElement("label", { htmlFor: "bjt-beta-slider", className: "font-medium text-slate-700" }, "Ganancia de corriente (h_FE / \u03B2):"), react_1.default.createElement("span", { className: "font-mono font-bold text-slate-800" }, bjtBeta)), react_1.default.createElement("input", { id: "bjt-beta-slider", type: "range", min: "30", max: "300", step: "10", value: bjtBeta, onChange: (e) => setBjtBeta(parseInt(e.target.value)), className: "w-full accent-emerald-700 cursor-pointer" })))) : (react_1.default.createElement("div", { className: "space-y-4" }, react_1.default.createElement("div", null, react_1.default.createElement("div", { className: "flex justify-between text-xs mb-1" }, react_1.default.createElement("label", { htmlFor: "mosfet-vgs-slider", className: "font-medium text-slate-700" }, "Tensi\u00F3n Puerta-Surtidor (V_GS):"), react_1.default.createElement("span", { className: "font-mono font-bold text-emerald-800" }, mosfetVgs.toFixed(2), " V")), react_1.default.createElement("input", { id: "mosfet-vgs-slider", type: "range", min: "0", max: "10", step: "0.1", value: mosfetVgs, onChange: (e) => setMosfetVgs(parseFloat(e.target.value)), className: "w-full accent-emerald-700 cursor-pointer" }), react_1.default.createElement("div", { className: "flex justify-between text-3xs text-slate-400 font-mono mt-0.5" }, react_1.default.createElement("span", null, "0V"), react_1.default.createElement("span", null, "Umbral V_TH (", mosfetVth, "V)"), react_1.default.createElement("span", null, "10V (TTL ON)"))), react_1.default.createElement("div", null, react_1.default.createElement("div", { className: "flex justify-between text-xs mb-1" }, react_1.default.createElement("label", { htmlFor: "mosfet-pwm-slider", className: "font-medium text-slate-700" }, "Ciclo de Trabajo PWM (4 Pines):"), react_1.default.createElement("span", { className: "font-mono font-bold text-emerald-800" }, mosfetPwm, "%")), react_1.default.createElement("input", { id: "mosfet-pwm-slider", type: "range", min: "0", max: "100", step: "5", value: mosfetPwm, onChange: (e) => setMosfetPwm(parseInt(e.target.value)), className: "w-full accent-emerald-700 cursor-pointer" }), react_1.default.createElement("div", { className: "flex justify-between text-3xs text-slate-400 font-mono mt-0.5" }, react_1.default.createElement("span", null, "0% (Parado)"), react_1.default.createElement("span", null, "50% (Silencioso)"), react_1.default.createElement("span", null, "100% (Turbina)"))), react_1.default.createElement("div", { className: "flex items-center gap-2 pt-1" }, react_1.default.createElement("span", { className: "text-2xs font-medium text-slate-500" }, "Perfiles:"), react_1.default.createElement("button", { onClick: () => {
            setMosfetVgs(0);
            setMosfetPwm(0);
        }, className: "px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-2xs font-medium text-slate-700 cursor-pointer" }, "Apagado (0V)"), react_1.default.createElement("button", { onClick: () => {
            setMosfetVgs(5);
            setMosfetPwm(45);
        }, className: "px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-2xs font-medium text-emerald-800 cursor-pointer" }, "Curva Normal (45%)"), react_1.default.createElement("button", { onClick: () => {
            setMosfetVgs(10);
            setMosfetPwm(100);
        }, className: "px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 text-2xs font-medium text-rose-800 cursor-pointer" }, "Full Speed (100%)"))))), react_1.default.createElement("div", { className: "bg-slate-900 rounded-xl p-5 border border-slate-800 text-slate-100 space-y-4" }, react_1.default.createElement("div", { className: "flex items-center justify-between" }, react_1.default.createElement("div", { className: "flex items-center gap-2" }, react_1.default.createElement(lucide_react_1.Gauge, { className: "w-4 h-4 text-emerald-400" }), react_1.default.createElement("h3", { className: "text-sm font-bold text-white" }, "Pol\u00EDmetro Digital de Taller SMR")), react_1.default.createElement("div", { className: "flex gap-1" }, react_1.default.createElement("button", { onClick: () => setMultimeterMode('diode'), className: `px-2 py-0.5 rounded text-2xs font-mono font-bold cursor-pointer ${multimeterMode === 'diode'
            ? 'bg-emerald-600 text-white'
            : 'bg-slate-800 text-slate-400'}` }, "Modo Diodo (V)"))), react_1.default.createElement("div", { className: "bg-black/90 rounded-lg p-4 border border-emerald-950 font-mono text-center flex flex-col items-center justify-center relative overflow-hidden" }, react_1.default.createElement("div", { className: "text-3xs text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2" }, react_1.default.createElement("span", null, "POL\u00CDMETRO DIGITAL TRUE RMS"), multimeterResult.isConducting && (react_1.default.createElement("span", { className: "flex items-center gap-0.5 text-emerald-400" }, react_1.default.createElement(lucide_react_1.Volume2, { className: "w-3 h-3 animate-pulse" }), react_1.default.createElement("span", null, "BEEP")))), react_1.default.createElement("div", { className: "text-3xl sm:text-4xl font-black tracking-wider text-emerald-400 tabular-nums" }, multimeterResult.voltageDrop === 'OL'
        ? '0.L'
        : `${multimeterResult.voltageDrop.toFixed(2)} V`), react_1.default.createElement("div", { className: "text-2xs text-slate-400 mt-1" }, multimeterResult.isConducting
        ? 'Unión Semiconductora Conduciendo'
        : 'Circuito Abierto / Inversa')), react_1.default.createElement("div", { className: "space-y-3" }, react_1.default.createElement("div", { className: "flex items-center justify-between text-xs" }, react_1.default.createElement("div", { className: "flex items-center gap-2" }, react_1.default.createElement("span", { className: "w-3 h-3 rounded-full bg-red-600 inline-block" }), react_1.default.createElement("span", { className: "font-semibold text-slate-300" }, "Sonda Roja (+):")), react_1.default.createElement("div", { className: "flex gap-1" }, (activeModel === 'bjt'
        ? ['Base', 'Collector', 'Emitter']
        : ['Gate', 'Drain', 'Source']).map((lead) => (react_1.default.createElement("button", { key: lead, onClick: () => handleTestMeter(lead, blackLead), className: `px-2 py-1 rounded text-2xs font-mono cursor-pointer transition-colors ${redLead === lead
            ? 'bg-red-600 text-white font-bold'
            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}` }, lead[0], " (", lead, ")"))))), react_1.default.createElement("div", { className: "flex items-center justify-between text-xs" }, react_1.default.createElement("div", { className: "flex items-center gap-2" }, react_1.default.createElement("span", { className: "w-3 h-3 rounded-full bg-slate-700 border border-slate-500 inline-block" }), react_1.default.createElement("span", { className: "font-semibold text-slate-300" }, "Sonda Negra (-):")), react_1.default.createElement("div", { className: "flex gap-1" }, (activeModel === 'bjt'
        ? ['Base', 'Collector', 'Emitter']
        : ['Gate', 'Drain', 'Source']).map((lead) => (react_1.default.createElement("button", { key: lead, onClick: () => handleTestMeter(redLead, lead), className: `px-2 py-1 rounded text-2xs font-mono cursor-pointer transition-colors ${blackLead === lead
            ? 'bg-slate-600 text-white font-bold'
            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}` }, lead[0], " (", lead, ")")))))), react_1.default.createElement("div", { className: "bg-slate-800/80 rounded-lg p-3 text-xs border border-slate-700 text-slate-300 leading-relaxed" }, react_1.default.createElement("span", { className: "font-bold text-emerald-400" }, "Diagn\u00F3stico del T\u00E9cnico: "), multimeterResult.technicalInterpretation))))));
};
exports.CircuitSimulator = CircuitSimulator;

};
modules["js/components/FlashcardsView.js"] = function(module, exports, require) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashcardsView = void 0;
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const flashcards_and_scenarios_js_1 = require("../data/flashcards-and-scenarios.js");
const SchematicSvg_js_1 = require("./SchematicSvg.js");
const FlashcardsView = ({ onAddXp, masteredIds, onToggleMastered, }) => {
    const [selectedCategory, setSelectedCategory] = (0, react_1.useState)('todos');
    const [currentIndex, setCurrentIndex] = (0, react_1.useState)(0);
    const [isFlipped, setIsFlipped] = (0, react_1.useState)(false);
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const filteredCards = flashcards_and_scenarios_js_1.FLASHCARDS_DATA.filter((card) => {
        const matchesCategory = selectedCategory === 'todos' || card.category === selectedCategory;
        const matchesSearch = card.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });
    const currentCard = filteredCards[currentIndex] || filteredCards[0];
    const handleNext = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    };
    const handlePrev = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    };
    const handleMarkMastered = (cardId) => {
        if (!masteredIds.includes(cardId)) {
            onToggleMastered(cardId);
            onAddXp(20, 'Tarjeta didáctica dominada');
        }
        else {
            onToggleMastered(cardId);
        }
    };
    const isCurrentMastered = currentCard ? masteredIds.includes(currentCard.id) : false;
    return (react_1.default.createElement("div", { className: "space-y-6" }, react_1.default.createElement("div", { className: "bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs" }, react_1.default.createElement("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4" }, react_1.default.createElement("div", null, react_1.default.createElement("div", { className: "flex flex-wrap items-center gap-1.5 text-2xs sm:text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1" }, react_1.default.createElement("span", null, "1\u00BA CFGM SMR \u00B7 M\u00F3dulo MME"), react_1.default.createElement("span", { "aria-hidden": "true", className: "hidden sm:inline" }, "\u00B7"), react_1.default.createElement("span", { className: "hidden sm:inline" }, "Bloque Componentes Electr\u00F3nicos")), react_1.default.createElement("h1", { className: "text-xl sm:text-2xl font-bold text-slate-900 tracking-tight" }, "Tarjetas Did\u00E1cticas: El Transistor en la Inform\u00E1tica"), react_1.default.createElement("p", { className: "text-sm text-slate-600 mt-1 max-w-2xl" }, "Domina los principios del BJT, MOSFET de potencia, fototransistores y su verificaci\u00F3n con mult\u00EDmetro en placas base y fuentes ATX.")), react_1.default.createElement("div", { className: "flex items-center gap-3 bg-emerald-50/70 border border-emerald-200/60 rounded-lg px-4 py-3 shrink-0" }, react_1.default.createElement(lucide_react_1.BookmarkCheck, { className: "w-5 h-5 text-emerald-700" }), react_1.default.createElement("div", null, react_1.default.createElement("div", { className: "text-xs text-emerald-900 font-medium" }, "Tarjetas Dominadas"), react_1.default.createElement("div", { className: "text-lg font-bold font-mono text-emerald-950 tabular-nums" }, masteredIds.length, " ", react_1.default.createElement("span", { className: "text-xs text-emerald-700 font-sans" }, "/ ", flashcards_and_scenarios_js_1.FLASHCARDS_DATA.length))))), react_1.default.createElement("div", { className: "mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3" }, react_1.default.createElement("div", { className: "flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0" }, [
        { id: 'todos', label: 'Todas las tarjetas' },
        { id: 'concepto', label: 'Concepto & Zonas' },
        { id: 'bjt', label: 'BJT NPN/PNP' },
        { id: 'mosfet', label: 'MOSFET' },
        { id: 'smr_hardware', label: 'Placas & VRM' },
        { id: 'diagnostico', label: 'Polímetro' },
    ].map((cat) => (react_1.default.createElement("button", { key: cat.id, onClick: () => {
            setSelectedCategory(cat.id);
            setCurrentIndex(0);
            setIsFlipped(false);
        }, className: `px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors whitespace-nowrap shrink-0 ${selectedCategory === cat.id
            ? 'bg-emerald-800 text-white shadow-2xs'
            : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'}` }, cat.label)))), react_1.default.createElement("div", { className: "relative min-w-[200px] sm:w-64" }, react_1.default.createElement(lucide_react_1.Search, { className: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" }), react_1.default.createElement("input", { type: "text", placeholder: "Buscar concepto o f\u00F3rmula...", value: searchQuery, onChange: (e) => {
            setSearchQuery(e.target.value);
            setCurrentIndex(0);
            setIsFlipped(false);
        }, className: "w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all" })))), filteredCards.length > 0 && currentCard ? (react_1.default.createElement("div", { className: "max-w-3xl mx-auto space-y-4" }, react_1.default.createElement("div", { className: "flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 px-1 sm:px-2 text-xs text-slate-500" }, react_1.default.createElement("div", { className: "flex items-center gap-2" }, react_1.default.createElement("span", { className: "font-semibold text-emerald-800 text-2xs sm:text-xs" }, currentCard.levelLabel), react_1.default.createElement("span", { "aria-hidden": "true" }, "\u00B7"), react_1.default.createElement("span", { className: "font-mono tabular-nums text-2xs sm:text-xs" }, "Tarjeta ", currentIndex + 1, " de ", filteredCards.length)), react_1.default.createElement("div", { className: "flex items-center gap-2" }, react_1.default.createElement("button", { onClick: () => handleMarkMastered(currentCard.id), className: `flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${isCurrentMastered
            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'}` }, react_1.default.createElement(lucide_react_1.CheckCircle2, { className: `w-3.5 h-3.5 ${isCurrentMastered ? 'text-emerald-700' : 'text-slate-400'}` }), react_1.default.createElement("span", null, isCurrentMastered ? 'Dominada (+20 XP)' : 'Marcar Dominada')))), react_1.default.createElement("div", { className: "perspective-1000 min-h-[580px] cursor-pointer", onClick: () => setIsFlipped(!isFlipped), role: "button", tabIndex: 0, onKeyDown: (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                setIsFlipped(!isFlipped);
            }
        }, "aria-label": "Hacer clic o pulsar espacio para voltear tarjeta" }, react_1.default.createElement("div", { className: `relative w-full min-h-[580px] rounded-2xl transition-transform duration-500 transform-style-3d shadow-sm hover:shadow-md border border-slate-200 ${isFlipped ? 'rotate-y-180' : ''}` }, react_1.default.createElement("div", { className: "absolute inset-0 w-full h-full backface-hidden bg-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between" }, react_1.default.createElement("div", null, react_1.default.createElement("div", { className: "flex items-center justify-between gap-4 mb-4" }, react_1.default.createElement("span", { className: "text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/50" }, "Pregunta de Taller"), react_1.default.createElement("div", { className: "flex items-center gap-1 text-2xs text-slate-400" }, react_1.default.createElement(lucide_react_1.RotateCw, { className: "w-3.5 h-3.5 animate-spin-slow" }), react_1.default.createElement("span", null, "Clic para voltear"))), react_1.default.createElement("h2", { className: "text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug" }, currentCard.question), react_1.default.createElement("p", { className: "text-xs text-slate-500 mt-1 mb-5" }, currentCard.subtitle), currentCard.schematicType && (react_1.default.createElement("div", { className: "my-4 max-w-sm mx-auto" }, react_1.default.createElement(SchematicSvg_js_1.SchematicSvg, { type: currentCard.schematicType, className: "w-full h-36" }))), react_1.default.createElement("div", { className: "space-y-2 mt-4 bg-slate-50 rounded-xl p-4 border border-slate-100" }, react_1.default.createElement("div", { className: "text-xs font-semibold text-slate-700 flex items-center gap-1.5" }, react_1.default.createElement(lucide_react_1.Sparkles, { className: "w-3.5 h-3.5 text-amber-500" }), react_1.default.createElement("span", null, "Claves de observaci\u00F3n y an\u00E1lisis:")), react_1.default.createElement("ul", { className: "text-xs text-slate-600 space-y-1.5 list-disc list-inside" }, currentCard.frontKeyPoints.map((point, i) => (react_1.default.createElement("li", { key: i, className: "leading-relaxed" }, point)))))), react_1.default.createElement("div", { className: "pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400" }, react_1.default.createElement("div", { className: "flex gap-1.5" }, currentCard.tags.map((t) => (react_1.default.createElement("span", { key: t, className: "text-slate-500 font-mono text-2xs" }, "#", t)))), react_1.default.createElement("span", { className: "font-medium text-emerald-700" }, "Ver respuesta explicada \u2192"))), react_1.default.createElement("div", { className: "absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto" }, react_1.default.createElement("div", null, react_1.default.createElement("div", { className: "flex items-center justify-between gap-4 mb-3" }, react_1.default.createElement("span", { className: "text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/60" }, "Soluci\u00F3n T\u00E9cnica Rigurosa"), react_1.default.createElement("span", { className: "text-2xs text-slate-400" }, "Clic para volver a la pregunta")), react_1.default.createElement("h3", { className: "text-base sm:text-lg font-bold text-white tracking-tight" }, currentCard.backTitle), react_1.default.createElement("p", { className: "text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed" }, currentCard.explanation), currentCard.keyFormula && (react_1.default.createElement("div", { className: "my-3 bg-slate-800/90 rounded-lg p-3 border border-slate-700" }, react_1.default.createElement("div", { className: "text-2xs font-semibold text-emerald-400 uppercase tracking-wider mb-0.5" }, "F\u00F3rmula / Relaci\u00F3n Clave"), react_1.default.createElement("div", { className: "text-xs font-mono font-bold text-amber-300" }, currentCard.keyFormula))), react_1.default.createElement("div", { className: "mt-3 bg-emerald-950/40 rounded-lg p-3.5 border border-emerald-800/50" }, react_1.default.createElement("div", { className: "text-xs font-bold text-emerald-300 flex items-center gap-1.5 mb-1" }, react_1.default.createElement(lucide_react_1.Wrench, { className: "w-3.5 h-3.5 text-emerald-400" }), react_1.default.createElement("span", null, "Consejo Profesional de Taller SMR:")), react_1.default.createElement("p", { className: "text-xs text-slate-200 leading-relaxed" }, currentCard.smrTip))), react_1.default.createElement("div", { className: "pt-4 border-t border-slate-800 flex items-center justify-between" }, react_1.default.createElement("span", { className: "text-2xs text-slate-400" }, "1\u00BA CFGM SMR \u00B7 EFA Oretana"), react_1.default.createElement("div", { className: "flex items-center gap-2" }, react_1.default.createElement("button", { onClick: (e) => {
            e.stopPropagation();
            setIsFlipped(false);
        }, className: "px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 cursor-pointer" }, "Voltear"), react_1.default.createElement("button", { onClick: (e) => {
            e.stopPropagation();
            handleMarkMastered(currentCard.id);
        }, className: "px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white cursor-pointer shadow-xs" }, isCurrentMastered ? '✓ Dominada' : '+20 XP Dominar')))))), react_1.default.createElement("div", { className: "flex items-center justify-between px-2 pt-2" }, react_1.default.createElement("button", { onClick: handlePrev, className: "flex items-center gap-1 px-4 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium cursor-pointer shadow-2xs transition-colors" }, react_1.default.createElement(lucide_react_1.ChevronLeft, { className: "w-4 h-4" }), react_1.default.createElement("span", null, "Anterior")), react_1.default.createElement("button", { onClick: () => setIsFlipped(!isFlipped), className: "flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold cursor-pointer shadow-2xs transition-colors" }, react_1.default.createElement(lucide_react_1.RotateCw, { className: "w-3.5 h-3.5" }), react_1.default.createElement("span", null, "Voltear Tarjeta")), react_1.default.createElement("button", { onClick: handleNext, className: "flex items-center gap-1 px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer shadow-2xs transition-colors" }, react_1.default.createElement("span", null, "Siguiente"), react_1.default.createElement(lucide_react_1.ChevronRight, { className: "w-4 h-4" }))))) : (react_1.default.createElement("div", { className: "bg-white rounded-xl p-12 text-center border border-slate-200" }, react_1.default.createElement(lucide_react_1.Layers, { className: "w-10 h-10 text-slate-400 mx-auto mb-3" }), react_1.default.createElement("h3", { className: "text-base font-bold text-slate-800" }, "No se encontraron tarjetas"), react_1.default.createElement("p", { className: "text-xs text-slate-500 mt-1" }, "Prueba a seleccionar otra categor\u00EDa o borrar la b\u00FAsqueda."), react_1.default.createElement("button", { onClick: () => {
            setSelectedCategory('todos');
            setSearchQuery('');
        }, className: "mt-4 px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-medium cursor-pointer" }, "Ver todas las tarjetas")))));
};
exports.FlashcardsView = FlashcardsView;

};
modules["js/components/GamifiedQuiz.js"] = function(module, exports, require) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamifiedQuiz = void 0;
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const flashcards_and_scenarios_js_1 = require("../data/flashcards-and-scenarios.js");
const GamifiedQuiz = ({ onAddXp, onOpenReport }) => {
    const [currentIdx, setCurrentIdx] = (0, react_1.useState)(0);
    const [selectedOptionIdx, setSelectedOptionIdx] = (0, react_1.useState)(null);
    const [isAnswered, setIsAnswered] = (0, react_1.useState)(false);
    const [score, setScore] = (0, react_1.useState)(0);
    const [streak, setStreak] = (0, react_1.useState)(0);
    const [isFinished, setIsFinished] = (0, react_1.useState)(false);
    const currentQ = flashcards_and_scenarios_js_1.QUIZ_QUESTIONS[currentIdx];
    const handleSelectOption = (idx) => {
        if (isAnswered)
            return;
        setSelectedOptionIdx(idx);
        setIsAnswered(true);
        const isCorrect = idx === currentQ.correctIndex;
        if (isCorrect) {
            const bonusStreak = streak > 1 ? streak * 5 : 0;
            const gainedXp = 30 + bonusStreak;
            setScore((prev) => prev + 1);
            setStreak((prev) => prev + 1);
            onAddXp(gainedXp, `Respuesta correcta (${currentQ.pillar}) con racha x${streak + 1}`);
        }
        else {
            setStreak(0);
        }
    };
    const handleNext = () => {
        if (currentIdx < flashcards_and_scenarios_js_1.QUIZ_QUESTIONS.length - 1) {
            setCurrentIdx((prev) => prev + 1);
            setSelectedOptionIdx(null);
            setIsAnswered(false);
        }
        else {
            setIsFinished(true);
            onAddXp(50, '¡Desafío Gamificado completado!');
        }
    };
    const handleRestart = () => {
        setCurrentIdx(0);
        setSelectedOptionIdx(null);
        setIsAnswered(false);
        setScore(0);
        setStreak(0);
        setIsFinished(false);
    };
    return (react_1.default.createElement("div", { className: "max-w-3xl mx-auto space-y-6" }, react_1.default.createElement("div", { className: "bg-white rounded-xl p-5 border border-slate-200 shadow-2xs" }, react_1.default.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4" }, react_1.default.createElement("div", null, react_1.default.createElement("div", { className: "text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1" }, "Evaluaci\u00F3n Formativa Gamificada \u00B7 1\u00BA SMR"), react_1.default.createElement("h1", { className: "text-xl sm:text-2xl font-bold text-slate-900 tracking-tight" }, "Desaf\u00EDo de Competencias: El Transistor"), react_1.default.createElement("p", { className: "text-xs sm:text-sm text-slate-600 mt-0.5" }, "Demuestra tu destreza en los 4 pilares: Observaci\u00F3n, Consecuencia, Adaptaci\u00F3n y Pensamiento Cr\u00EDtico.")), react_1.default.createElement("div", { className: "flex items-center gap-3" }, react_1.default.createElement("div", { className: "flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-amber-900 font-mono text-xs font-bold" }, react_1.default.createElement(lucide_react_1.Flame, { className: "w-4 h-4 text-amber-500 fill-amber-500" }), react_1.default.createElement("span", null, "Racha: x", streak)), react_1.default.createElement("div", { className: "bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-emerald-950 font-mono text-xs font-bold" }, "Aciertos: ", score, " / ", flashcards_and_scenarios_js_1.QUIZ_QUESTIONS.length)))), !isFinished ? (react_1.default.createElement("div", { className: "bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5" }, react_1.default.createElement("div", { className: "flex items-center justify-between text-xs border-b border-slate-100 pb-3" }, react_1.default.createElement("div", { className: "flex items-center gap-2" }, react_1.default.createElement("span", { className: "font-bold text-emerald-800" }, currentQ.category), react_1.default.createElement("span", { "aria-hidden": "true" }, "\u00B7"), react_1.default.createElement("span", { className: "font-semibold text-slate-500" }, "Pilar: ", currentQ.pillar), react_1.default.createElement("span", { "aria-hidden": "true" }, "\u00B7"), react_1.default.createElement("span", { className: "text-2xs bg-slate-100 px-2 py-0.5 rounded font-mono text-slate-600" }, "Nivel ", currentQ.level)), react_1.default.createElement("span", { className: "font-mono text-slate-400" }, currentIdx + 1, " de ", flashcards_and_scenarios_js_1.QUIZ_QUESTIONS.length)), react_1.default.createElement("h2", { className: "text-base sm:text-lg font-bold text-slate-900 leading-snug" }, currentQ.question), react_1.default.createElement("div", { className: "space-y-3 pt-2" }, currentQ.options.map((optionText, idx) => {
        const isSelected = selectedOptionIdx === idx;
        const isCorrect = idx === currentQ.correctIndex;
        let btnStyles = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';
        if (isAnswered) {
            if (isCorrect) {
                btnStyles = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20 font-bold';
            }
            else if (isSelected) {
                btnStyles = 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-400/20';
            }
            else {
                btnStyles = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
            }
        }
        return (react_1.default.createElement("button", { key: idx, onClick: () => handleSelectOption(idx), disabled: isAnswered, className: `w-full text-left p-4 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyles}` }, react_1.default.createElement("div", { className: "flex items-center gap-3" }, react_1.default.createElement("span", { className: "w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center font-mono text-3xs font-bold text-slate-500 shrink-0" }, String.fromCharCode(65 + idx)), react_1.default.createElement("span", null, optionText)), isAnswered && (react_1.default.createElement("div", { className: "shrink-0" }, isCorrect && react_1.default.createElement(lucide_react_1.CheckCircle2, { className: "w-4 h-4 text-emerald-600" }), isSelected && !isCorrect && react_1.default.createElement(lucide_react_1.XCircle, { className: "w-4 h-4 text-rose-600" })))));
    })), isAnswered && (react_1.default.createElement("div", { className: `p-4 rounded-xl text-xs leading-relaxed border ${selectedOptionIdx === currentQ.correctIndex
            ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
            : 'bg-amber-50 border-amber-200 text-amber-950'}` }, react_1.default.createElement("div", { className: "font-bold flex items-center gap-1.5 mb-1" }, react_1.default.createElement(lucide_react_1.HelpCircle, { className: "w-4 h-4" }), react_1.default.createElement("span", null, selectedOptionIdx === currentQ.correctIndex
        ? '¡Respuesta Perfecta!'
        : 'Justificación Técnica de Aprendizaje:')), react_1.default.createElement("p", null, currentQ.explanation))), isAnswered && (react_1.default.createElement("div", { className: "pt-4 border-t border-slate-100 flex justify-end" }, react_1.default.createElement("button", { onClick: handleNext, className: "flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer shadow-xs transition-colors" }, react_1.default.createElement("span", null, currentIdx < flashcards_and_scenarios_js_1.QUIZ_QUESTIONS.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados Finales'), react_1.default.createElement(lucide_react_1.ArrowRight, { className: "w-4 h-4" })))))) : (react_1.default.createElement("div", { className: "bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center space-y-5" }, react_1.default.createElement("div", { className: "w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner" }, react_1.default.createElement(lucide_react_1.Trophy, { className: "w-8 h-8" })), react_1.default.createElement("div", null, react_1.default.createElement("span", { className: "text-xs font-bold text-emerald-800 uppercase tracking-wider font-mono" }, "Evaluaci\u00F3n Completada"), react_1.default.createElement("h2", { className: "text-2xl font-bold text-slate-900 tracking-tight mt-1" }, "Resultado: ", score, " de ", flashcards_and_scenarios_js_1.QUIZ_QUESTIONS.length, " Aciertos"), react_1.default.createElement("p", { className: "text-xs text-slate-600 mt-1 max-w-md mx-auto" }, score >= 7
        ? '¡Extraordinario dominio! Demuestras un alto nivel de observación y pensamiento crítico propio de un técnico especialista de SMR.'
        : score >= 5
            ? '¡Buen trabajo! Tienes las bases sólidas, repasa algunas tarjetas de MOSFETs y polarización para alcanzar la excelencia.'
            : 'Se recomienda repasar las tarjetas didácticas de taller antes de enfrentarte a placas base reales.')), react_1.default.createElement("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-3 pt-3" }, react_1.default.createElement("button", { onClick: handleRestart, className: "w-full sm:w-auto px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer" }, "Repetir Desaf\u00EDo"), react_1.default.createElement("button", { onClick: onOpenReport, className: "w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer shadow-xs" }, react_1.default.createElement(lucide_react_1.Award, { className: "w-4 h-4" }), react_1.default.createElement("span", null, "Ver Certificado de Taller EFA Oretana")))))));
};
exports.GamifiedQuiz = GamifiedQuiz;

};
modules["js/components/Header.js"] = function(module, exports, require) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
const Header = ({ activeTab, onSelectTab, xp, levelInfo, onOpenReport, }) => {
    return (react_1.default.createElement("header", { className: "sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-950/10 shadow-xs" }, react_1.default.createElement("div", { className: "max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-8" }, react_1.default.createElement("div", { className: "flex items-center gap-2 sm:gap-3 shrink-0" }, react_1.default.createElement("img", { src: "data:image/jpeg;base64,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", alt: "EFA Oretana", className: "h-8 sm:h-11 w-auto object-contain rounded-xs", referrerPolicy: "no-referrer" }), react_1.default.createElement("div", { className: "flex flex-col" }, react_1.default.createElement("span", { className: "text-sm sm:text-lg font-bold tracking-tight text-emerald-950 whitespace-nowrap" }, "EFA Oretana"), react_1.default.createElement("span", { className: "text-2xs sm:text-xs font-semibold text-emerald-700 tracking-wide whitespace-nowrap" }, "1\u00BA CFGM SMR"))), react_1.default.createElement("nav", { "aria-label": "Navegaci\u00F3n principal", className: "hidden lg:flex items-center gap-6 text-sm font-medium" }, react_1.default.createElement("button", { onClick: () => onSelectTab('flashcards'), className: `cursor-pointer transition-colors whitespace-nowrap py-1 ${activeTab === 'flashcards'
            ? 'text-emerald-800 font-bold border-b-2 border-emerald-700'
            : 'text-slate-600 hover:text-emerald-900'}` }, "Tarjetas Did\u00E1cticas"), react_1.default.createElement("button", { onClick: () => onSelectTab('simulator'), className: `cursor-pointer transition-colors whitespace-nowrap py-1 ${activeTab === 'simulator'
            ? 'text-emerald-800 font-bold border-b-2 border-emerald-700'
            : 'text-slate-600 hover:text-emerald-900'}` }, "Mapa de Funcionamiento"), react_1.default.createElement("button", { onClick: () => onSelectTab('troubleshooting'), className: `cursor-pointer transition-colors whitespace-nowrap py-1 ${activeTab === 'troubleshooting'
            ? 'text-emerald-800 font-bold border-b-2 border-emerald-700'
            : 'text-slate-600 hover:text-emerald-900'}` }, "Fallas de Taller SMR"), react_1.default.createElement("button", { onClick: () => onSelectTab('quiz'), className: `cursor-pointer transition-colors whitespace-nowrap py-1 ${activeTab === 'quiz'
            ? 'text-emerald-800 font-bold border-b-2 border-emerald-700'
            : 'text-slate-600 hover:text-emerald-900'}` }, "Desaf\u00EDo Gamificado"), react_1.default.createElement("button", { onClick: () => onSelectTab('guide'), className: `cursor-pointer transition-colors whitespace-nowrap py-1 ${activeTab === 'guide'
            ? 'text-emerald-800 font-bold border-b-2 border-emerald-700'
            : 'text-slate-600 hover:text-emerald-900'}` }, "Gu\u00EDa Pol\u00EDmetro")), react_1.default.createElement("div", { className: "flex items-center gap-3 shrink-0" }, react_1.default.createElement("button", { onClick: onOpenReport, className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 transition-all cursor-pointer shadow-2xs group", title: "Ver expediente del alumno y progreso gamificado", "aria-label": "Ver progreso del alumno" }, react_1.default.createElement("div", { className: "p-1 rounded-md bg-emerald-700 text-white group-hover:scale-105 transition-transform" }, react_1.default.createElement(lucide_react_1.Award, { className: "w-4 h-4" })), react_1.default.createElement("div", { className: "text-left hidden sm:block" }, react_1.default.createElement("div", { className: "text-xs font-bold leading-tight text-emerald-950 flex items-center gap-1.5" }, react_1.default.createElement("span", null, levelInfo.title), react_1.default.createElement("span", { className: "text-emerald-700 font-mono text-2xs" }, "(", levelInfo.level, "/3)")), react_1.default.createElement("div", { className: "text-2xs text-emerald-700 font-medium font-mono tabular-nums flex items-center gap-1" }, react_1.default.createElement(lucide_react_1.Zap, { className: "w-3 h-3 text-amber-500 fill-amber-500 inline" }), react_1.default.createElement("span", null, xp, " XP"))), react_1.default.createElement("div", { className: "sm:hidden font-mono text-xs font-bold text-emerald-900" }, xp, " XP")))), react_1.default.createElement("div", { className: "lg:hidden flex items-center justify-around border-t border-slate-100 px-2 py-2 overflow-x-auto gap-2 text-xs" }, react_1.default.createElement("button", { onClick: () => onSelectTab('flashcards'), className: `px-2.5 py-1 rounded-md font-medium whitespace-nowrap cursor-pointer ${activeTab === 'flashcards'
            ? 'bg-emerald-800 text-white'
            : 'text-slate-600 hover:bg-slate-100'}` }, "Tarjetas"), react_1.default.createElement("button", { onClick: () => onSelectTab('simulator'), className: `px-2.5 py-1 rounded-md font-medium whitespace-nowrap cursor-pointer ${activeTab === 'simulator'
            ? 'bg-emerald-800 text-white'
            : 'text-slate-600 hover:bg-slate-100'}` }, "Simulador"), react_1.default.createElement("button", { onClick: () => onSelectTab('troubleshooting'), className: `px-2.5 py-1 rounded-md font-medium whitespace-nowrap cursor-pointer ${activeTab === 'troubleshooting'
            ? 'bg-emerald-800 text-white'
            : 'text-slate-600 hover:bg-slate-100'}` }, "Fallas SMR"), react_1.default.createElement("button", { onClick: () => onSelectTab('quiz'), className: `px-2.5 py-1 rounded-md font-medium whitespace-nowrap cursor-pointer ${activeTab === 'quiz'
            ? 'bg-emerald-800 text-white'
            : 'text-slate-600 hover:bg-slate-100'}` }, "Desaf\u00EDo"), react_1.default.createElement("button", { onClick: () => onSelectTab('guide'), className: `px-2.5 py-1 rounded-md font-medium whitespace-nowrap cursor-pointer ${activeTab === 'guide'
            ? 'bg-emerald-800 text-white'
            : 'text-slate-600 hover:bg-slate-100'}` }, "Pol\u00EDmetro"))));
};
exports.Header = Header;

};
modules["js/components/MultimeterGuideModal.js"] = function(module, exports, require) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultimeterGuideModal = void 0;
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
const SchematicSvg_js_1 = require("./SchematicSvg.js");
const MultimeterGuideModal = () => {
    return (react_1.default.createElement("div", { className: "max-w-4xl mx-auto space-y-6" }, react_1.default.createElement("div", { className: "bg-white rounded-xl p-5 border border-slate-200 shadow-2xs" }, react_1.default.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4" }, react_1.default.createElement("div", null, react_1.default.createElement("div", { className: "text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1" }, "Gu\u00EDa R\u00E1pida de Taller \u00B7 1\u00BA CFGM SMR"), react_1.default.createElement("h1", { className: "text-xl sm:text-2xl font-bold text-slate-900 tracking-tight" }, "Protocolo de Comprobaci\u00F3n con Pol\u00EDmetro Digital"), react_1.default.createElement("p", { className: "text-xs sm:text-sm text-slate-600 mt-0.5" }, "Instrucciones paso a paso para medir transistores BJT, MOSFETs de potencia y l\u00EDneas de alimentaci\u00F3n en el laboratorio de hardware.")), react_1.default.createElement("div", { className: "bg-emerald-50 border border-emerald-200 text-emerald-900 px-3.5 py-2 rounded-lg text-xs font-bold font-mono" }, "EFA Oretana \u00B7 MME"))), react_1.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" }, react_1.default.createElement("div", { className: "bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-4" }, react_1.default.createElement("div", { className: "flex items-center gap-2" }, react_1.default.createElement("div", { className: "p-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold font-mono text-xs" }, "01"), react_1.default.createElement("h2", { className: "text-base font-bold text-slate-900" }, "Comprobaci\u00F3n de Transistor BJT (Bipolar)")), react_1.default.createElement("p", { className: "text-xs text-slate-600 leading-relaxed" }, "Se utiliza la ", react_1.default.createElement("strong", null, "escala de diodos"), " del pol\u00EDmetro. Un transistor BJT se comprueba considerando que la base act\u00FAa como punto com\u00FAn de dos diodos contrapuestos."), react_1.default.createElement(SchematicSvg_js_1.SchematicSvg, { type: "diode_test", className: "w-full h-36" }), react_1.default.createElement("div", { className: "space-y-2 text-xs" }, react_1.default.createElement("div", { className: "p-2.5 rounded-lg bg-slate-50 border border-slate-200" }, react_1.default.createElement("span", { className: "font-bold text-slate-900" }, "1. Transistor NPN:"), react_1.default.createElement("ul", { className: "list-disc list-inside text-slate-600 mt-1 space-y-1" }, react_1.default.createElement("li", null, "Sonda ROJA en Base + NEGRA en Emisor: ", react_1.default.createElement("strong", null, "0.6V a 0.7V"), " (ca\u00EDda directa)."), react_1.default.createElement("li", null, "Sonda ROJA en Base + NEGRA en Colector: ", react_1.default.createElement("strong", null, "0.6V a 0.68V"), " (ligeramente inferior a B-E)."), react_1.default.createElement("li", null, "Invertir sondas (Negra en Base): debe dar ", react_1.default.createElement("strong", null, "OL"), " (Open Loop)."), react_1.default.createElement("li", null, "Entre Colector y Emisor en cualquier sentido: siempre ", react_1.default.createElement("strong", null, "OL"), "."))), react_1.default.createElement("div", { className: "p-2.5 rounded-lg bg-slate-50 border border-slate-200" }, react_1.default.createElement("span", { className: "font-bold text-slate-900" }, "2. Transistor PNP:"), react_1.default.createElement("p", { className: "text-slate-600 mt-0.5" }, "La sonda NEGRA se coloca en la Base y la ROJA en Emisor y Colector para obtener la ca\u00EDda directa (~0.65V).")))), react_1.default.createElement("div", { className: "bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-4" }, react_1.default.createElement("div", { className: "flex items-center gap-2" }, react_1.default.createElement("div", { className: "p-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold font-mono text-xs" }, "02"), react_1.default.createElement("h2", { className: "text-base font-bold text-slate-900" }, "Comprobaci\u00F3n de MOSFET de Potencia (Placas Base)")), react_1.default.createElement("p", { className: "text-xs text-slate-600 leading-relaxed" }, "Los MOSFETs en encapsulado SMD (SO-8, PowerPAK, DPAK) en fases VRM se verifican identificando el diodo interno de protecci\u00F3n (Body Diode) y el aislamiento de Gate."), react_1.default.createElement(SchematicSvg_js_1.SchematicSvg, { type: "mosfet_n", className: "w-full h-36" }), react_1.default.createElement("div", { className: "space-y-2 text-xs" }, react_1.default.createElement("div", { className: "p-2.5 rounded-lg bg-slate-50 border border-slate-200" }, react_1.default.createElement("span", { className: "font-bold text-slate-900" }, "1. Prueba del Diodo Interno:"), react_1.default.createElement("p", { className: "text-slate-600 mt-0.5" }, "En Canal N: Sonda ROJA en Source + NEGRA en Drain -> marca entre ", react_1.default.createElement("strong", null, "0.45V y 0.55V"), ". Al invertir (Roja en Drain + Negra en Source) debe dar ", react_1.default.createElement("strong", null, "OL"), ".")), react_1.default.createElement("div", { className: "p-2.5 rounded-lg bg-slate-50 border border-slate-200" }, react_1.default.createElement("span", { className: "font-bold text-slate-900" }, "2. Aislamiento de la Puerta (Gate):"), react_1.default.createElement("p", { className: "text-slate-600 mt-0.5" }, "La Puerta (Gate) est\u00E1 aislada por SiO2. Con la sonda en Gate y en cualquier otro terminal debe dar siempre ", react_1.default.createElement("strong", null, "OL"), ". Si pita o da resistencia baja, la puerta est\u00E1 perforada.")), react_1.default.createElement("div", { className: "p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-950 font-medium" }, "\u26A0\uFE0F S\u00EDntoma de fallo habitual en placas base: Cortocircuito directo Drenador-Surtidor (0.00V / 0\u03A9). La fuente entra en protecci\u00F3n OCP.")))), react_1.default.createElement("div", { className: "bg-emerald-950 text-emerald-100 rounded-xl p-6 border border-emerald-900 space-y-3" }, react_1.default.createElement("div", { className: "flex items-center gap-2 text-white font-bold text-sm" }, react_1.default.createElement(lucide_react_1.ShieldAlert, { className: "w-5 h-5 text-amber-400" }), react_1.default.createElement("span", null, "Normas de Seguridad Obligatorias en el Taller de 1\u00BA SMR")), react_1.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-emerald-200 pt-1" }, react_1.default.createElement("div", { className: "bg-emerald-900/50 p-3 rounded-lg border border-emerald-800" }, react_1.default.createElement("span", { className: "font-bold text-white block mb-1" }, "1. Descarga de Condensadores:"), "En fuentes de alimentaci\u00F3n ATX, nunca medir semiconductores sin descargar antes los condensadores primarios de 400V con una resistencia de potencia de 1k\u03A9."), react_1.default.createElement("div", { className: "bg-emerald-900/50 p-3 rounded-lg border border-emerald-800" }, react_1.default.createElement("span", { className: "font-bold text-white block mb-1" }, "2. Protecci\u00F3n Antiest\u00E1tica (ESD):"), "La puerta de los transistores MOSFET se destruye con descargas est\u00E1ticas de tan solo 20V. Utilizar siempre pulsera antiest\u00E1tica conectada a toma de tierra."), react_1.default.createElement("div", { className: "bg-emerald-900/50 p-3 rounded-lg border border-emerald-800" }, react_1.default.createElement("span", { className: "font-bold text-white block mb-1" }, "3. Prohibido Forzar Fuentes:"), "Nunca puentear el cable verde con negro de la fuente ATX ante un cortocircuito comprobado en placa base; derretir\u00E1s las pistas internas de cobre.")))));
};
exports.MultimeterGuideModal = MultimeterGuideModal;

};
modules["js/components/SchematicSvg.js"] = function(module, exports, require) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchematicSvg = void 0;
const react_1 = __importDefault(require("react"));
const SchematicSvg = ({ type, className = 'w-full h-44', isConducting = false, }) => {
    if (type === 'bjt_npn') {
        return (react_1.default.createElement("svg", { viewBox: "0 0 280 180", className: `${className} bg-slate-900 rounded-lg p-2 text-slate-100 select-none`, role: "img", "aria-label": "Esquema Transistor BJT NPN" }, react_1.default.createElement("title", null, "Transistor BJT NPN"), react_1.default.createElement("defs", null, react_1.default.createElement("pattern", { id: "grid-npn", width: "20", height: "20", patternUnits: "userSpaceOnUse" }, react_1.default.createElement("path", { d: "M 20 0 L 0 0 0 20", fill: "none", stroke: "#1e293b", strokeWidth: "0.8" }))), react_1.default.createElement("rect", { width: "280", height: "180", fill: "url(#grid-npn)" }), react_1.default.createElement("circle", { cx: "140", cy: "90", r: "42", fill: "#0f172a", stroke: "#38bdf8", strokeWidth: "2.5" }), react_1.default.createElement("line", { x1: "40", y1: "90", x2: "120", y2: "90", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("rect", { x: "120", y: "66", width: "5", height: "48", fill: "#38bdf8", rx: "1" }), react_1.default.createElement("line", { x1: "123", y1: "78", x2: "160", y2: "55", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "160", y1: "55", x2: "230", y2: "55", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "123", y1: "102", x2: "160", y2: "125", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "160", y1: "125", x2: "230", y2: "125", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("polygon", { points: "152,114 163,127 146,125", fill: "#22c55e", stroke: "#22c55e", strokeWidth: "1" }), react_1.default.createElement("text", { x: "30", y: "85", fill: "#38bdf8", fontSize: "13", fontWeight: "bold", fontFamily: "monospace" }, "BASE (B)"), react_1.default.createElement("text", { x: "180", y: "45", fill: "#f59e0b", fontSize: "13", fontWeight: "bold", fontFamily: "monospace" }, "COLECTOR (C)"), react_1.default.createElement("text", { x: "180", y: "145", fill: "#22c55e", fontSize: "13", fontWeight: "bold", fontFamily: "monospace" }, "EMISOR (E)"), react_1.default.createElement("rect", { x: "10", y: "10", width: "80", height: "22", rx: "4", fill: "#1e293b", stroke: "#334155" }), react_1.default.createElement("text", { x: "18", y: "25", fill: "#22c55e", fontSize: "11", fontWeight: "bold", fontFamily: "monospace" }, "BJT \u00B7 NPN"), isConducting && (react_1.default.createElement("path", { d: "M 195 55 L 140 90 L 195 125", fill: "none", stroke: "#22c55e", strokeWidth: "2", strokeDasharray: "4 4", className: "animate-pulse" }))));
    }
    if (type === 'bjt_pnp') {
        return (react_1.default.createElement("svg", { viewBox: "0 0 280 180", className: `${className} bg-slate-900 rounded-lg p-2 text-slate-100 select-none`, role: "img", "aria-label": "Esquema Transistor BJT PNP" }, react_1.default.createElement("title", null, "Transistor BJT PNP"), react_1.default.createElement("circle", { cx: "140", cy: "90", r: "42", fill: "#0f172a", stroke: "#a855f7", strokeWidth: "2.5" }), react_1.default.createElement("line", { x1: "40", y1: "90", x2: "120", y2: "90", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("rect", { x: "120", y: "66", width: "5", height: "48", fill: "#a855f7", rx: "1" }), react_1.default.createElement("line", { x1: "123", y1: "102", x2: "160", y2: "125", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "160", y1: "125", x2: "230", y2: "125", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "123", y1: "78", x2: "160", y2: "55", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "160", y1: "55", x2: "230", y2: "55", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("polygon", { points: "135,70 126,82 143,80", fill: "#a855f7", stroke: "#a855f7", strokeWidth: "1" }), react_1.default.createElement("text", { x: "30", y: "85", fill: "#a855f7", fontSize: "13", fontWeight: "bold", fontFamily: "monospace" }, "BASE (B)"), react_1.default.createElement("text", { x: "180", y: "45", fill: "#22c55e", fontSize: "13", fontWeight: "bold", fontFamily: "monospace" }, "EMISOR (E)"), react_1.default.createElement("text", { x: "180", y: "145", fill: "#f59e0b", fontSize: "13", fontWeight: "bold", fontFamily: "monospace" }, "COLECTOR (C)"), react_1.default.createElement("rect", { x: "10", y: "10", width: "80", height: "22", rx: "4", fill: "#1e293b", stroke: "#334155" }), react_1.default.createElement("text", { x: "18", y: "25", fill: "#a855f7", fontSize: "11", fontWeight: "bold", fontFamily: "monospace" }, "BJT \u00B7 PNP")));
    }
    if (type === 'mosfet_n') {
        return (react_1.default.createElement("svg", { viewBox: "0 0 280 180", className: `${className} bg-slate-900 rounded-lg p-2 text-slate-100 select-none`, role: "img", "aria-label": "Esquema Transistor MOSFET Canal N" }, react_1.default.createElement("title", null, "MOSFET Canal N"), react_1.default.createElement("circle", { cx: "140", cy: "90", r: "44", fill: "#0f172a", stroke: "#10b981", strokeWidth: "2.5" }), react_1.default.createElement("line", { x1: "40", y1: "90", x2: "110", y2: "90", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "110", y1: "65", x2: "110", y2: "115", stroke: "#38bdf8", strokeWidth: "4" }), react_1.default.createElement("line", { x1: "117", y1: "65", x2: "117", y2: "78", stroke: "#10b981", strokeWidth: "3.5" }), react_1.default.createElement("line", { x1: "117", y1: "84", x2: "117", y2: "96", stroke: "#10b981", strokeWidth: "3.5" }), react_1.default.createElement("line", { x1: "117", y1: "102", x2: "117", y2: "115", stroke: "#10b981", strokeWidth: "3.5" }), react_1.default.createElement("line", { x1: "117", y1: "72", x2: "160", y2: "72", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "160", y1: "72", x2: "160", y2: "40", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "160", y1: "40", x2: "230", y2: "40", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "117", y1: "90", x2: "150", y2: "90", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("polygon", { points: "123,90 135,84 135,96", fill: "#10b981" }), react_1.default.createElement("line", { x1: "117", y1: "108", x2: "160", y2: "108", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "150", y1: "90", x2: "160", y2: "108", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "160", y1: "108", x2: "160", y2: "140", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "160", y1: "140", x2: "230", y2: "140", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("text", { x: "30", y: "85", fill: "#38bdf8", fontSize: "13", fontWeight: "bold", fontFamily: "monospace" }, "GATE (G)"), react_1.default.createElement("text", { x: "180", y: "32", fill: "#f59e0b", fontSize: "13", fontWeight: "bold", fontFamily: "monospace" }, "DRAIN (D)"), react_1.default.createElement("text", { x: "180", y: "158", fill: "#10b981", fontSize: "13", fontWeight: "bold", fontFamily: "monospace" }, "SOURCE (S)"), react_1.default.createElement("rect", { x: "10", y: "10", width: "105", height: "22", rx: "4", fill: "#1e293b", stroke: "#334155" }), react_1.default.createElement("text", { x: "16", y: "25", fill: "#10b981", fontSize: "11", fontWeight: "bold", fontFamily: "monospace" }, "MOSFET N-CH")));
    }
    if (type === 'diode_test') {
        return (react_1.default.createElement("svg", { viewBox: "0 0 280 180", className: `${className} bg-slate-900 rounded-lg p-2 text-slate-100 select-none`, role: "img", "aria-label": "Modelo de dos diodos para comprobaci\u00F3n con mult\u00EDmetro" }, react_1.default.createElement("title", null, "Modelo 2 Diodos BJT para Mult\u00EDmetro"), react_1.default.createElement("rect", { x: "30", y: "75", width: "220", height: "32", rx: "6", fill: "#1e293b", stroke: "#475569" }), react_1.default.createElement("polygon", { points: "115,79 115,103 135,91", fill: "#f59e0b", stroke: "#f59e0b" }), react_1.default.createElement("line", { x1: "135", y1: "79", x2: "135", y2: "103", stroke: "#f59e0b", strokeWidth: "3" }), react_1.default.createElement("polygon", { points: "165,79 165,103 145,91", fill: "#22c55e", stroke: "#22c55e" }), react_1.default.createElement("line", { x1: "145", y1: "79", x2: "145", y2: "103", stroke: "#22c55e", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "140", y1: "91", x2: "140", y2: "40", stroke: "#38bdf8", strokeWidth: "3" }), react_1.default.createElement("circle", { cx: "140", cy: "40", r: "4", fill: "#38bdf8" }), react_1.default.createElement("text", { x: "110", y: "30", fill: "#38bdf8", fontSize: "13", fontWeight: "bold", fontFamily: "monospace" }, "BASE (\u00C1nodo Com\u00FAn)"), react_1.default.createElement("line", { x1: "50", y1: "91", x2: "115", y2: "91", stroke: "#f59e0b", strokeWidth: "3" }), react_1.default.createElement("circle", { cx: "50", cy: "91", r: "4", fill: "#f59e0b" }), react_1.default.createElement("text", { x: "25", y: "130", fill: "#f59e0b", fontSize: "11", fontWeight: "bold", fontFamily: "monospace" }, "COLECTOR"), react_1.default.createElement("text", { x: "25", y: "145", fill: "#94a3b8", fontSize: "10", fontFamily: "monospace" }, "(Ca\u00EDda ~0.63V)"), react_1.default.createElement("line", { x1: "165", y1: "91", x2: "230", y2: "91", stroke: "#22c55e", strokeWidth: "3" }), react_1.default.createElement("circle", { cx: "230", cy: "91", r: "4", fill: "#22c55e" }), react_1.default.createElement("text", { x: "195", y: "130", fill: "#22c55e", fontSize: "11", fontWeight: "bold", fontFamily: "monospace" }, "EMISOR"), react_1.default.createElement("text", { x: "195", y: "145", fill: "#94a3b8", fontSize: "10", fontFamily: "monospace" }, "(Ca\u00EDda ~0.65V)"), react_1.default.createElement("rect", { x: "10", y: "10", width: "115", height: "20", rx: "4", fill: "#0f172a", stroke: "#334155" }), react_1.default.createElement("text", { x: "15", y: "24", fill: "#38bdf8", fontSize: "10", fontWeight: "bold", fontFamily: "monospace" }, "TEST POL\u00CDMETRO")));
    }
    return (react_1.default.createElement("svg", { viewBox: "0 0 280 180", className: `${className} bg-slate-900 rounded-lg p-2 text-slate-100 select-none`, role: "img", "aria-label": "Esquema Fase VRM Placa Base" }, react_1.default.createElement("title", null, "Fase de Alimentaci\u00F3n VRM Buck Converter"), react_1.default.createElement("line", { x1: "20", y1: "40", x2: "70", y2: "40", stroke: "#eab308", strokeWidth: "3" }), react_1.default.createElement("text", { x: "15", y: "30", fill: "#eab308", fontSize: "11", fontWeight: "bold", fontFamily: "monospace" }, "+12V EPS"), react_1.default.createElement("rect", { x: "70", y: "28", width: "38", height: "24", rx: "4", fill: "#1e293b", stroke: "#38bdf8", strokeWidth: "2" }), react_1.default.createElement("text", { x: "73", y: "44", fill: "#38bdf8", fontSize: "9", fontWeight: "bold", fontFamily: "monospace" }, "Q1 High"), react_1.default.createElement("line", { x1: "108", y1: "40", x2: "160", y2: "40", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "130", y1: "40", x2: "130", y2: "90", stroke: "#f8fafc", strokeWidth: "3" }), react_1.default.createElement("rect", { x: "111", y: "90", width: "38", height: "24", rx: "4", fill: "#1e293b", stroke: "#38bdf8", strokeWidth: "2" }), react_1.default.createElement("text", { x: "114", y: "106", fill: "#38bdf8", fontSize: "9", fontWeight: "bold", fontFamily: "monospace" }, "Q2 Low"), react_1.default.createElement("line", { x1: "130", y1: "114", x2: "130", y2: "140", stroke: "#64748b", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "120", y1: "140", x2: "140", y2: "140", stroke: "#64748b", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "124", y1: "144", x2: "136", y2: "144", stroke: "#64748b", strokeWidth: "2" }), react_1.default.createElement("path", { d: "M 160 40 Q 170 28 180 40 Q 190 28 200 40 Q 210 28 220 40", fill: "none", stroke: "#f59e0b", strokeWidth: "3.5" }), react_1.default.createElement("text", { x: "175", y: "24", fill: "#f59e0b", fontSize: "10", fontWeight: "bold", fontFamily: "monospace" }, "Choke"), react_1.default.createElement("line", { x1: "220", y1: "40", x2: "265", y2: "40", stroke: "#22c55e", strokeWidth: "3" }), react_1.default.createElement("circle", { cx: "265", cy: "40", r: "4", fill: "#22c55e" }), react_1.default.createElement("text", { x: "215", y: "65", fill: "#22c55e", fontSize: "11", fontWeight: "bold", fontFamily: "monospace" }, "V_CORE CPU"), react_1.default.createElement("text", { x: "215", y: "78", fill: "#94a3b8", fontSize: "9", fontFamily: "monospace" }, "(1.2V / 40A)"), react_1.default.createElement("line", { x1: "240", y1: "40", x2: "240", y2: "110", stroke: "#f8fafc", strokeWidth: "2" }), react_1.default.createElement("line", { x1: "230", y1: "110", x2: "250", y2: "110", stroke: "#0ea5e9", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "230", y1: "116", x2: "250", y2: "116", stroke: "#0ea5e9", strokeWidth: "3" }), react_1.default.createElement("line", { x1: "240", y1: "116", x2: "240", y2: "130", stroke: "#64748b", strokeWidth: "2" }), react_1.default.createElement("text", { x: "230", y: "145", fill: "#94a3b8", fontSize: "8", fontFamily: "monospace" }, "Condensador"), react_1.default.createElement("rect", { x: "10", y: "148", width: "90", height: "18", rx: "3", fill: "#0f172a", stroke: "#334155" }), react_1.default.createElement("text", { x: "15", y: "160", fill: "#38bdf8", fontSize: "9", fontWeight: "bold", fontFamily: "monospace" }, "ETAPA BUCK VRM")));
};
exports.SchematicSvg = SchematicSvg;

};
modules["js/components/StudentReportModal.js"] = function(module, exports, require) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentReportModal = void 0;
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
const StudentReportModal = ({ isOpen, onClose, xp, levelInfo, masteredCardsCount, totalCardsCount, resolvedCasesCount, totalCasesCount, }) => {
    if (!isOpen)
        return null;
    const handlePrint = () => {
        window.print();
    };
    return (react_1.default.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200" }, react_1.default.createElement("div", { className: "bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto", role: "dialog", "aria-modal": "true", "aria-labelledby": "report-modal-title" }, react_1.default.createElement("button", { onClick: onClose, className: "absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors", "aria-label": "Cerrar ventana" }, react_1.default.createElement(lucide_react_1.X, { className: "w-5 h-5" })), react_1.default.createElement("div", { className: "text-center pb-6 border-b border-slate-100" }, react_1.default.createElement("img", { src: "data:image/jpeg;base64,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", alt: "EFA Oretana", className: "h-14 mx-auto mb-3 object-contain", referrerPolicy: "no-referrer" }), react_1.default.createElement("div", { className: "text-2xs font-mono font-bold text-emerald-800 uppercase tracking-widest" }, "Centro de Formaci\u00F3n Profesional EFA Oretana \u00B7 Ciudad Real"), react_1.default.createElement("h2", { id: "report-modal-title", className: "text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1" }, "Certificaci\u00F3n de Competencias T\u00E9cnicas en Semiconductores"), react_1.default.createElement("p", { className: "text-xs text-slate-500 mt-1" }, "Ciclo Formativo de Grado Medio en Sistemas Microinform\u00E1ticos y Redes (1\u00BA SMR)")), react_1.default.createElement("div", { className: "my-6 bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-xl p-5 border border-emerald-800 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-4" }, react_1.default.createElement("div", { className: "flex items-center gap-4" }, react_1.default.createElement("div", { className: "w-14 h-14 rounded-full bg-emerald-800/80 border-2 border-emerald-400 flex items-center justify-center text-amber-300 shrink-0" }, react_1.default.createElement(lucide_react_1.Award, { className: "w-8 h-8" })), react_1.default.createElement("div", { className: "text-center sm:text-left" }, react_1.default.createElement("div", { className: "text-2xs text-emerald-300 uppercase tracking-wider font-mono" }, "Rango Alcanzado"), react_1.default.createElement("div", { className: "text-lg font-bold text-white tracking-tight" }, levelInfo.title), react_1.default.createElement("div", { className: "text-xs text-emerald-200 mt-0.5" }, "Nivel ", levelInfo.level, " de 3 \u00B7 Especialista de Hardware"))), react_1.default.createElement("div", { className: "text-center sm:text-right bg-emerald-950/60 px-4 py-2.5 rounded-lg border border-emerald-700/50" }, react_1.default.createElement("div", { className: "text-2xs text-emerald-400 font-mono uppercase tracking-wider" }, "Experiencia Acumulada"), react_1.default.createElement("div", { className: "text-2xl font-black font-mono text-amber-400 flex items-center justify-center sm:justify-end gap-1" }, react_1.default.createElement(lucide_react_1.Zap, { className: "w-5 h-5 text-amber-400 fill-amber-400" }), react_1.default.createElement("span", null, xp, " XP")))), react_1.default.createElement("div", { className: "grid grid-cols-2 gap-3 mb-6" }, react_1.default.createElement("div", { className: "bg-slate-50 rounded-xl p-4 border border-slate-200 text-center" }, react_1.default.createElement(lucide_react_1.BookOpen, { className: "w-5 h-5 text-emerald-700 mx-auto mb-1.5" }), react_1.default.createElement("div", { className: "text-xl font-bold font-mono text-slate-900" }, masteredCardsCount, " / ", totalCardsCount), react_1.default.createElement("div", { className: "text-2xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5" }, "Tarjetas Did\u00E1cticas Dominadas")), react_1.default.createElement("div", { className: "bg-slate-50 rounded-xl p-4 border border-slate-200 text-center" }, react_1.default.createElement(lucide_react_1.Cpu, { className: "w-5 h-5 text-emerald-700 mx-auto mb-1.5" }), react_1.default.createElement("div", { className: "text-xl font-bold font-mono text-slate-900" }, resolvedCasesCount, " / ", totalCasesCount), react_1.default.createElement("div", { className: "text-2xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5" }, "Casos de Taller Resueltos"))), react_1.default.createElement("div", { className: "space-y-2 mb-6" }, react_1.default.createElement("div", { className: "text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5" }, react_1.default.createElement(lucide_react_1.ShieldCheck, { className: "w-4 h-4 text-emerald-700" }), react_1.default.createElement("span", null, "Competencias Evaluadas en el Laboratorio:")), react_1.default.createElement("div", { className: "space-y-2 text-xs" }, react_1.default.createElement("div", { className: "flex items-start gap-2.5 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/50" }, react_1.default.createElement(lucide_react_1.CheckCircle2, { className: "w-4 h-4 text-emerald-700 shrink-0 mt-0.5" }), react_1.default.createElement("div", null, react_1.default.createElement("span", { className: "font-bold text-emerald-950" }, "Observaci\u00F3n Rigurosa: "), react_1.default.createElement("span", { className: "text-slate-600" }, "Capacidad para medir con pol\u00EDmetro (escala de diodos y continuidad) sin emitir juicios apresurados."))), react_1.default.createElement("div", { className: "flex items-start gap-2.5 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/50" }, react_1.default.createElement(lucide_react_1.CheckCircle2, { className: "w-4 h-4 text-emerald-700 shrink-0 mt-0.5" }), react_1.default.createElement("div", null, react_1.default.createElement("span", { className: "font-bold text-emerald-950" }, "Deducci\u00F3n de Consecuencias: "), react_1.default.createElement("span", { className: "text-slate-600" }, "Comprensi\u00F3n del disparo de protecciones OCP/SCP en fuentes ATX ante cortocircuitos en VRM."))), react_1.default.createElement("div", { className: "flex items-start gap-2.5 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/50" }, react_1.default.createElement(lucide_react_1.CheckCircle2, { className: "w-4 h-4 text-emerald-700 shrink-0 mt-0.5" }), react_1.default.createElement("div", null, react_1.default.createElement("span", { className: "font-bold text-emerald-950" }, "Adaptaci\u00F3n T\u00E9cnica: "), react_1.default.createElement("span", { className: "text-slate-600" }, "Descarte de acciones destructivas (puentes de fuente) y priorizaci\u00F3n de mantenimiento preventivo."))), react_1.default.createElement("div", { className: "flex items-start gap-2.5 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/50" }, react_1.default.createElement(lucide_react_1.CheckCircle2, { className: "w-4 h-4 text-emerald-700 shrink-0 mt-0.5" }), react_1.default.createElement("div", null, react_1.default.createElement("span", { className: "font-bold text-emerald-950" }, "Pensamiento Cr\u00EDtico: "), react_1.default.createElement("span", { className: "text-slate-600" }, "Selecci\u00F3n de MOSFETs de reemplazo con baja R_DS(on) y verificaci\u00F3n de seguridad el\u00E9ctrica."))))), react_1.default.createElement("div", { className: "pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3" }, react_1.default.createElement("div", { className: "text-2xs text-slate-400 font-mono" }, "Documento de autoevaluaci\u00F3n generado en el entorno SMR EFA Oretana"), react_1.default.createElement("div", { className: "flex items-center gap-2 w-full sm:w-auto" }, react_1.default.createElement("button", { onClick: handlePrint, className: "w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors" }, react_1.default.createElement(lucide_react_1.Printer, { className: "w-3.5 h-3.5" }), react_1.default.createElement("span", null, "Imprimir / Guardar PDF")), react_1.default.createElement("button", { onClick: onClose, className: "w-full sm:w-auto px-5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer transition-colors" }, "Cerrar"))))));
};
exports.StudentReportModal = StudentReportModal;

};
modules["js/components/TroubleshootingScenarios.js"] = function(module, exports, require) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TroubleshootingScenarios = void 0;
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const flashcards_and_scenarios_js_1 = require("../data/flashcards-and-scenarios.js");
const TroubleshootingScenarios = ({ onAddXp, resolvedCaseIds, onMarkCaseResolved, }) => {
    const [selectedCaseId, setSelectedCaseId] = (0, react_1.useState)(flashcards_and_scenarios_js_1.DIAGNOSTIC_SCENARIOS[0].id);
    const [activeStepIndex, setActiveStepIndex] = (0, react_1.useState)(0);
    const [selectedAnswers, setSelectedAnswers] = (0, react_1.useState)({});
    const [showFeedback, setShowFeedback] = (0, react_1.useState)(false);
    const [activeTestPointId, setActiveTestPointId] = (0, react_1.useState)(null);
    const currentCase = flashcards_and_scenarios_js_1.DIAGNOSTIC_SCENARIOS.find((c) => c.id === selectedCaseId) ||
        flashcards_and_scenarios_js_1.DIAGNOSTIC_SCENARIOS[0];
    const currentStep = currentCase.steps[activeStepIndex];
    const selectedOptionId = selectedAnswers[activeStepIndex];
    const selectedOption = currentStep.options.find((o) => o.id === selectedOptionId);
    const isCaseCompleted = resolvedCaseIds.includes(currentCase.id);
    const handleSelectOption = (optionId) => {
        if (showFeedback && selectedOption?.isCorrect)
            return;
        setSelectedAnswers((prev) => ({ ...prev, [activeStepIndex]: optionId }));
        setShowFeedback(true);
        const option = currentStep.options.find((o) => o.id === optionId);
        if (option?.isCorrect) {
            onAddXp(25, `Fase superada: ${currentStep.title}`);
        }
    };
    const handleNextStep = () => {
        setShowFeedback(false);
        if (activeStepIndex < currentCase.steps.length - 1) {
            setActiveStepIndex((prev) => prev + 1);
        }
        else {
            if (!isCaseCompleted) {
                onMarkCaseResolved(currentCase.id);
                onAddXp(60, `¡Caso de taller ${currentCase.title} resuelto!`);
            }
        }
    };
    const handleResetCase = () => {
        setSelectedAnswers({});
        setActiveStepIndex(0);
        setShowFeedback(false);
        setActiveTestPointId(null);
    };
    const getPillarIcon = (phase) => {
        switch (phase) {
            case 'observacion':
                return react_1.default.createElement(lucide_react_1.Eye, { className: "w-4 h-4 text-sky-600" });
            case 'consecuencia':
                return react_1.default.createElement(lucide_react_1.AlertTriangle, { className: "w-4 h-4 text-amber-600" });
            case 'adaptacion':
                return react_1.default.createElement(lucide_react_1.RotateCcw, { className: "w-4 h-4 text-emerald-600" });
            case 'pensamiento_critico':
                return react_1.default.createElement(lucide_react_1.Brain, { className: "w-4 h-4 text-purple-600" });
            default:
                return react_1.default.createElement(lucide_react_1.Sparkles, { className: "w-4 h-4 text-emerald-600" });
        }
    };
    return (react_1.default.createElement("div", { className: "space-y-6" }, react_1.default.createElement("div", { className: "bg-white rounded-xl p-5 border border-slate-200 shadow-2xs" }, react_1.default.createElement("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4" }, react_1.default.createElement("div", null, react_1.default.createElement("div", { className: "text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1" }, "Resoluci\u00F3n de Fallas T\u00E9cnicas \u00B7 1\u00BA CFGM SMR"), react_1.default.createElement("h1", { className: "text-xl sm:text-2xl font-bold text-slate-900 tracking-tight" }, "Taller de Diagn\u00F3stico y Pensamiento Cr\u00EDtico"), react_1.default.createElement("p", { className: "text-sm text-slate-600 mt-1 max-w-2xl" }, "Enfr\u00E9ntate a aver\u00EDas reales de ordenadores y perif\u00E9ricos. Utiliza el pol\u00EDmetro, observa s\u00EDntomas, deduce consecuencias y aplica pensamiento cr\u00EDtico profesional.")), react_1.default.createElement("div", { className: "flex items-center gap-2" }, react_1.default.createElement("span", { className: "text-xs font-medium text-slate-600" }, "Casos Resueltos:"), react_1.default.createElement("span", { className: "text-sm font-bold font-mono text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200" }, resolvedCaseIds.length, " / ", flashcards_and_scenarios_js_1.DIAGNOSTIC_SCENARIOS.length))), react_1.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-100" }, flashcards_and_scenarios_js_1.DIAGNOSTIC_SCENARIOS.map((c, idx) => {
        const isResolved = resolvedCaseIds.includes(c.id);
        const isSelected = c.id === selectedCaseId;
        return (react_1.default.createElement("button", { key: c.id, onClick: () => {
                setSelectedCaseId(c.id);
                handleResetCase();
            }, className: `text-left p-3 rounded-lg border text-xs transition-all cursor-pointer ${isSelected
                ? 'bg-emerald-900 text-white border-emerald-950 shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'}` }, react_1.default.createElement("div", { className: "flex items-center justify-between mb-1" }, react_1.default.createElement("span", { className: `font-mono text-2xs font-bold ${isSelected ? 'text-emerald-300' : 'text-emerald-800'}` }, "CASO 0", idx + 1), isResolved && (react_1.default.createElement("span", { className: "text-2xs font-bold text-emerald-400 flex items-center gap-0.5" }, react_1.default.createElement(lucide_react_1.CheckCircle2, { className: "w-3.5 h-3.5 inline" }), react_1.default.createElement("span", null, "Resuelto")))), react_1.default.createElement("div", { className: "font-bold line-clamp-1" }, c.title.split(':')[1] || c.title), react_1.default.createElement("div", { className: `text-2xs mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}` }, c.difficultyLabel)));
    }))), react_1.default.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6" }, react_1.default.createElement("div", { className: "lg:col-span-5 space-y-4" }, react_1.default.createElement("div", { className: "bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-4" }, react_1.default.createElement("div", { className: "flex items-center justify-between" }, react_1.default.createElement("div", { className: "flex items-center gap-2" }, react_1.default.createElement(lucide_react_1.CircuitBoard, { className: "w-4 h-4 text-emerald-700" }), react_1.default.createElement("h2", { className: "text-sm font-bold text-slate-900" }, "Banco de Inspecci\u00F3n de Hardware")), react_1.default.createElement("span", { className: "text-2xs text-slate-500 font-mono" }, "Puntos de Prueba (TP)")), react_1.default.createElement("div", { className: "bg-slate-900 rounded-xl p-4 border border-slate-800 text-slate-100 space-y-3" }, react_1.default.createElement("div", { className: "text-2xs text-slate-400 font-mono" }, "Contexto de Taller:"), react_1.default.createElement("div", { className: "text-xs font-semibold text-emerald-400 bg-emerald-950/60 p-2.5 rounded border border-emerald-800/40" }, currentCase.hardwareContext), react_1.default.createElement("div", { className: "text-2xs text-slate-400 font-mono pt-1" }, "S\u00EDntoma Inicial Reportado:"), react_1.default.createElement("div", { className: "text-xs text-slate-200 bg-slate-800/80 p-3 rounded border border-slate-700 leading-relaxed" }, currentCase.initialSymptom)), react_1.default.createElement("div", null, react_1.default.createElement("div", { className: "text-xs font-bold text-slate-800 mb-2 flex items-center justify-between" }, react_1.default.createElement("span", null, "Haz clic en un punto de prueba con el pol\u00EDmetro:"), react_1.default.createElement("span", { className: "text-2xs text-emerald-700 font-normal" }, "Sondas conectadas")), react_1.default.createElement("div", { className: "space-y-2" }, currentCase.testPoints.map((tp) => {
        const isActive = activeTestPointId === tp.id;
        return (react_1.default.createElement("button", { key: tp.id, onClick: () => {
                setActiveTestPointId(tp.id);
                onAddXp(5, `Medición en ${tp.label}`);
            }, className: `w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${isActive
                ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200'}` }, react_1.default.createElement("div", { className: "flex items-center justify-between" }, react_1.default.createElement("span", { className: "text-xs font-bold text-slate-900" }, tp.label), react_1.default.createElement("span", { className: `text-2xs px-2 py-0.5 rounded font-mono font-bold ${tp.status === 'defectuoso'
                ? 'bg-rose-100 text-rose-800'
                : tp.status === 'alerta'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'}` }, tp.status === 'defectuoso' ? 'FALLA' : tp.status === 'alerta' ? 'ATENCIÓN' : 'OK')), react_1.default.createElement("div", { className: "text-2xs text-slate-500 mt-0.5" }, tp.location), isActive && (react_1.default.createElement("div", { className: "mt-2.5 pt-2 border-t border-emerald-200/60 bg-white rounded p-2.5 space-y-1" }, react_1.default.createElement("div", { className: "flex items-center justify-between text-2xs font-mono" }, react_1.default.createElement("span", { className: "text-slate-500" }, "Lectura Diodo:"), react_1.default.createElement("span", { className: "font-bold text-emerald-800" }, tp.diodeReading === 'OL' ? 'OL (Abierto)' : `${tp.diodeReading} V`)), react_1.default.createElement("div", { className: "flex items-center justify-between text-2xs font-mono" }, react_1.default.createElement("span", { className: "text-slate-500" }, "Tensi\u00F3n / Resistencia:"), react_1.default.createElement("span", { className: "font-bold text-slate-800" }, tp.voltageReading)), react_1.default.createElement("div", { className: "text-2xs text-emerald-950 font-medium mt-1 pt-1 border-t border-slate-100" }, "\uD83D\uDCA1 ", tp.hint)))));
    }))))), react_1.default.createElement("div", { className: "lg:col-span-7 space-y-4" }, react_1.default.createElement("div", { className: "bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-5" }, react_1.default.createElement("div", { className: "flex items-center justify-between border-b border-slate-100 pb-4" }, react_1.default.createElement("div", { className: "flex items-center gap-1.5 sm:gap-3" }, currentCase.steps.map((st, i) => {
        const isDone = selectedAnswers[i] && currentCase.steps[i].options.find(o => o.id === selectedAnswers[i])?.isCorrect;
        const isCurrent = i === activeStepIndex;
        return (react_1.default.createElement("div", { key: st.phase, className: `flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${isCurrent
                ? 'bg-emerald-900 text-white font-bold'
                : isDone
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-500'}` }, getPillarIcon(st.phase), react_1.default.createElement("span", { className: "hidden sm:inline capitalize" }, st.phase.replace('_', ' ')), react_1.default.createElement("span", { className: "sm:hidden font-mono" }, i + 1)));
    })), react_1.default.createElement("button", { onClick: handleResetCase, className: "text-2xs text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer" }, react_1.default.createElement(lucide_react_1.RotateCcw, { className: "w-3 h-3" }), react_1.default.createElement("span", null, "Reiniciar"))), react_1.default.createElement("div", null, react_1.default.createElement("div", { className: "flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1" }, react_1.default.createElement("span", null, currentStep.title)), react_1.default.createElement("p", { className: "text-xs text-slate-500 mb-3" }, currentStep.instruction), react_1.default.createElement("h3", { className: "text-base font-bold text-slate-900 tracking-tight leading-snug bg-slate-50 p-4 rounded-xl border border-slate-200/70" }, currentStep.question), react_1.default.createElement("div", { className: "space-y-3 mt-4" }, currentStep.options.map((option) => {
        const isSelected = selectedOptionId === option.id;
        let optionStyles = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';
        if (showFeedback && isSelected) {
            if (option.isCorrect) {
                optionStyles = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20';
            }
            else {
                optionStyles = 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-400/20';
            }
        }
        else if (isSelected) {
            optionStyles = 'bg-slate-100 border-slate-400 text-slate-900';
        }
        return (react_1.default.createElement("button", { key: option.id, onClick: () => handleSelectOption(option.id), className: `w-full text-left p-4 rounded-xl border transition-all text-xs leading-relaxed cursor-pointer flex items-start gap-3 ${optionStyles}` }, react_1.default.createElement("div", { className: "mt-0.5 shrink-0" }, showFeedback && isSelected ? (option.isCorrect ? (react_1.default.createElement(lucide_react_1.CheckCircle2, { className: "w-4 h-4 text-emerald-600" })) : (react_1.default.createElement(lucide_react_1.XCircle, { className: "w-4 h-4 text-rose-600" }))) : (react_1.default.createElement("div", { className: `w-4 h-4 rounded-full border flex items-center justify-center text-3xs font-mono font-bold ${isSelected ? 'border-slate-800 text-slate-800' : 'border-slate-300 text-slate-400'}` }, "\u25CF"))), react_1.default.createElement("span", { className: "font-medium" }, option.text)));
    })), showFeedback && selectedOption && (react_1.default.createElement("div", { className: `mt-5 p-4 rounded-xl border text-xs leading-relaxed ${selectedOption.isCorrect
            ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
            : 'bg-rose-50 border-rose-200 text-rose-950'}` }, react_1.default.createElement("div", { className: "font-bold flex items-center gap-1.5 mb-1" }, selectedOption.isCorrect ? (react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(lucide_react_1.CheckCircle2, { className: "w-4 h-4 text-emerald-700" }), react_1.default.createElement("span", null, "\u00A1Razonamiento Correcto! (+25 XP)"))) : (react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(lucide_react_1.ShieldAlert, { className: "w-4 h-4 text-rose-700" }), react_1.default.createElement("span", null, "Riesgo o Diagn\u00F3stico Err\u00F3neo:")))), react_1.default.createElement("p", null, selectedOption.feedback)))), react_1.default.createElement("div", { className: "pt-4 border-t border-slate-100 flex items-center justify-between" }, react_1.default.createElement("div", { className: "flex items-center gap-2" }, react_1.default.createElement("span", { className: "text-xs font-semibold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 font-mono" }, "Pilar ", activeStepIndex + 1, " de ", currentCase.steps.length), react_1.default.createElement("span", { className: "text-2xs text-slate-500 font-medium capitalize" }, currentStep.phase.replace('_', ' '))), showFeedback && selectedOption?.isCorrect && (react_1.default.createElement("button", { onClick: handleNextStep, className: "flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer shadow-xs transition-colors" }, react_1.default.createElement("span", null, activeStepIndex < currentCase.steps.length - 1
        ? 'Siguiente Pilar →'
        : '¡Finalizar Caso con Éxito! 🏆'), react_1.default.createElement(lucide_react_1.ArrowRight, { className: "w-4 h-4" })))), isCaseCompleted && activeStepIndex === currentCase.steps.length - 1 && (react_1.default.createElement("div", { className: "mt-4 p-4 rounded-xl bg-emerald-950 text-emerald-100 text-xs leading-relaxed border border-emerald-800" }, react_1.default.createElement("div", { className: "font-bold text-white flex items-center gap-1.5 mb-1" }, react_1.default.createElement(lucide_react_1.Sparkles, { className: "w-4 h-4 text-amber-400" }), react_1.default.createElement("span", null, "Conclusi\u00F3n T\u00E9cnico-Formativa EFA Oretana:")), react_1.default.createElement("p", { className: "text-emerald-200" }, currentCase.summaryLearning))))))));
};
exports.TroubleshootingScenarios = TroubleshootingScenarios;

};
modules["js/data/flashcards-and-scenarios.js"] = function(module, exports, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUIZ_QUESTIONS = exports.DIAGNOSTIC_SCENARIOS = exports.FLASHCARDS_DATA = void 0;
exports.FLASHCARDS_DATA = [
    {
        id: 'fc-1',
        category: 'concepto',
        level: 1,
        levelLabel: 'Nivel 1 · Fundamentos',
        question: '¿Qué es un transistor y cuáles son sus dos funciones esenciales en informática?',
        subtitle: 'El bloque fundamental de toda la arquitectura computacional moderna',
        frontKeyPoints: [
            'Dispositivo semiconductor de 3 terminales',
            'Sustituto de las antiguas válvulas de vacío',
            'Control de grandes flujos mediante señales diminutas'
        ],
        schematicType: 'bjt_npn',
        backTitle: 'Interruptor Digital y Amplificador Analógico',
        explanation: 'Un transistor es un componente semiconductor con tres patillas capaz de controlar el flujo de corriente entre dos de ellas mediante una señal eléctrica aplicada a la tercera. En informática (hardware de PC), funciona principalmente como INTERRUPTOR DIGITAL ULTRARRÁPIDO (estados 0 y 1 lógicos en CPU, GPU y memoria RAM) y como CONMUTADOR DE POTENCIA en fuentes ATX y placas base.',
        keyFormula: 'I_E = I_B + I_C  |  V_CE(sat) ≈ 0.2V',
        smrTip: 'En 1º SMR, el 95% de las veces que analices un transistor en placa base o fuente lo encontrarás trabajando en conmutación (abierto o cerrado), nunca como amplificador de audio analógico.',
        tags: ['Concepto', 'Semiconductores', 'Conmutación', 'Hardware']
    },
    {
        id: 'fc-2',
        category: 'concepto',
        level: 1,
        levelLabel: 'Nivel 1 · Fundamentos',
        question: '¿Cuáles son las 3 zonas de trabajo de un transistor bipolar (BJT)?',
        subtitle: 'Comprender cómo responde según la polarización aplicada a su base',
        frontKeyPoints: [
            'Zona de Corte (Cutoff)',
            'Zona Activa o Lineal (Active)',
            'Zona de Saturación (Saturation)'
        ],
        schematicType: 'bjt_npn',
        backTitle: 'Zonas de Operación: Corte, Activa y Saturación',
        explanation: '1. CORTE: I_B = 0, no hay paso de corriente entre colector y emisor (interruptor abierto, circuito desconectado). 2. ACTIVA: I_C = β · I_B, corriente de salida proporcional a la entrada (amplificador). 3. SATURACIÓN: Conducción máxima permitida por la carga exterior, la caída de tensión V_CE es mínima (~0.2V, interruptor cerrado).',
        keyFormula: 'Corte: I_C = 0 | Saturación: V_CE ≈ 0.2V',
        smrTip: 'Para controlar un relé, un altavoz piezoeléctrico de la BIOS (beeper) o un LED de encendido, el transistor debe trabajar SIEMPRE en Corte (apagado) o Saturación (encendido total), nunca en activa.',
        tags: ['Zonas de Trabajo', 'BJT', 'Corte', 'Saturación']
    },
    {
        id: 'fc-3',
        category: 'bjt',
        level: 1,
        levelLabel: 'Nivel 1 · BJT',
        question: 'BJT NPN vs PNP: ¿Cómo diferenciarlos por su símbolo y polarización?',
        subtitle: 'La regla mnemotécnica de la flecha del emisor en los esquemas de taller',
        frontKeyPoints: [
            'NPN: Flecha sale hacia afuera',
            'PNP: Flecha entra hacia adentro',
            'Regla: NPN = No Pica Nada / PNP = Pica No Pica'
        ],
        schematicType: 'bjt_npn',
        backTitle: 'Sentido de la Corriente y Polaridad de la Base',
        explanation: 'En el transistor NPN, la base necesita una tensión más positiva que el emisor (+0.7V) para conducir, y la corriente fluye de Colector a Emisor (la flecha del símbolo SALE). En el PNP, la base debe ser más negativa que el emisor, y la corriente fluye de Emisor a Colector (la flecha ENTRA).',
        keyFormula: 'NPN: V_BE > 0.7V para encender | PNP: V_EB > 0.7V',
        smrTip: 'En electrónica digital de PC, el NPN se usa frecuentemente como "Low-Side Switch" (conmutando el polo negativo a masa GND).',
        tags: ['BJT', 'NPN', 'PNP', 'Símbolo']
    },
    {
        id: 'fc-4',
        category: 'mosfet',
        level: 2,
        levelLabel: 'Nivel 2 · MOSFET',
        question: '¿Qué significa MOSFET y por qué domina las placas base y fuentes ATX frente al BJT?',
        subtitle: 'Metal-Oxide-Semiconductor Field-Effect Transistor',
        frontKeyPoints: [
            'Puerta (Gate) aislada por óxido de silicio (SiO2)',
            'Control por TENSIÓN (V_GS), no por corriente',
            'Consumo de corriente estática casi nulo en la puerta',
            'Velocidades de conmutación en nanosegundos'
        ],
        schematicType: 'mosfet_n',
        backTitle: 'Control por Campo Eléctrico y Altísima Eficiencia',
        explanation: 'El MOSFET se controla aplicando una diferencia de potencial entre Puerta y Surtidor (V_GS). Al estar la puerta aislada eléctricamente por una capa microscópica de dióxido de silicio, la corriente de puerta es prácticamente CERO. Esto permite que el microcontrolador o chipset no se sobrecargue y que la conmutación sea hiperveloz.',
        keyFormula: 'I_G ≈ 0 A | V_GS > V_TH para conducir',
        smrTip: 'Sin los MOSFETs no existirían los procesadores modernos ni las fuentes de alimentación con certificación 80 Plus Platinum.',
        tags: ['MOSFET', 'Eficiencia', 'Placas Base', 'SMR']
    },
    {
        id: 'fc-5',
        category: 'mosfet',
        level: 2,
        levelLabel: 'Nivel 2 · MOSFET',
        question: 'Terminales del MOSFET: ¿Qué son Gate, Drain y Source?',
        subtitle: 'Correspondencia directa con la Base, Colector y Emisor del BJT',
        frontKeyPoints: [
            'Gate (Puerta / G): Terminal de control aislado',
            'Drain (Drenador / D): Por donde entra la corriente principal',
            'Source (Surtidor o Fuente / S): Por donde sale la corriente'
        ],
        schematicType: 'mosfet_n',
        backTitle: 'Equivalencia de Terminales BJT vs MOSFET',
        explanation: 'Base (B) equivale a Gate (G); Colector (C) equivale a Drain (D); Emisor (E) equivale a Source (S). En un MOSFET Canal N de enriquecimiento (el más común en placas base), cuando aplicas tensión positiva en Gate (V_GS > V_TH), se crea un canal de electrones que permite a la corriente viajar de Drain a Source.',
        keyFormula: 'Canal N: V_GS > V_TH  |  R_DS(on) ultra baja (mΩ)',
        smrTip: 'Cuidado con la electricidad estática (ESD): la finísima capa de óxido de la Puerta (Gate) puede perforarse si manipulas un MOSFET sin pulsera antiestática conectada a tierra en el taller.',
        tags: ['Gate', 'Drain', 'Source', 'ESD']
    },
    {
        id: 'fc-6',
        category: 'smr_hardware',
        level: 2,
        levelLabel: 'Nivel 2 · Hardware de PC',
        question: '¿Qué es el parámetro R_DS(on) y por qué es crítico en las fases VRM de la placa base?',
        subtitle: 'Resistencia entre Drenador y Surtidor en estado de conducción plena',
        frontKeyPoints: [
            'Se mide en milióhmios (mΩ, ej. 2 a 10 mΩ)',
            'Determina cuánto calor genera el MOSFET al alimentar la CPU',
            'P = I² · R_DS(on)'
        ],
        schematicType: 'vrm_phase',
        backTitle: 'Pérdidas por Efecto Joule en la Alimentación del Procesador',
        explanation: 'Una CPU moderna puede consumir 150 Amperios a 1.2 Voltios. La potencia disipada en calor es P = I² · R. Si un MOSFET tiene R_DS(on) = 5 mΩ (0.005 Ω), disipará infinitamente menos calor que uno de 20 mΩ. Menor R_DS(on) = placa base más fría, mayor estabilidad para overclocking y mayor longevidad de los condensadores electrolíticos.',
        keyFormula: 'P_disipada = (I_Drain)² · R_DS(on)',
        smrTip: 'Si los disipadores metálicos que rodean el zócalo de la CPU queman al tacto o la pasta térmica de los thermal pads está reseca, los MOSFETs trabajarán a más de 90°C y pueden entrar en cortocircuito.',
        tags: ['VRM', 'R_DS(on)', 'CPU', 'Temperatura']
    },
    {
        id: 'fc-7',
        category: 'diagnostico',
        level: 2,
        levelLabel: 'Nivel 2 · Diagnóstico en Taller',
        question: '¿Cómo se comprueba un transistor BJT con el polímetro en prueba de diodos?',
        subtitle: 'El modelo equivalente de los dos diodos PN contrapuestos',
        frontKeyPoints: [
            'Poner el multímetro en el icono del diodo (prueba de unión PN)',
            'BJT NPN: Sonda ROJA en Base, NEGRA en Emisor y Colector',
            'Lectura esperada: 0.6V a 0.7V en directa; "OL" en inversa'
        ],
        schematicType: 'diode_test',
        backTitle: 'Prueba de las Uniones Base-Emisor y Base-Colector',
        explanation: 'Un transistor bipolar se comporta internamente como dos diodos unidos por la base. En un NPN: 1) Rojo en Base + Negro en Emisor -> ~0.65V. 2) Rojo en Base + Negro en Colector -> ~0.63V (ligeramente inferior a B-E). 3) Invertir las sondas (Negro en Base) -> debe dar "OL" (Open Loop). 4) Entre Colector y Emisor -> SIEMPRE debe dar "OL" en ambos sentidos. Si marca 0.00V o pita, está en cortocircuito.',
        keyFormula: 'V_BE directa ≈ 0.65V  |  V_BC directa ≈ 0.63V  |  C-E = OL',
        smrTip: 'Esta prueba permite además identificar cuál patilla es el emisor: la unión Base-Emisor tiene un dopado más alto y da una caída de tensión ligeramente MAYOR (ej. 670 mV) que Base-Colector (ej. 650 mV).',
        tags: ['Polímetro', 'Diodo', 'Diagnóstico', 'Taller SMR']
    },
    {
        id: 'fc-8',
        category: 'diagnostico',
        level: 3,
        levelLabel: 'Nivel 3 · Diagnóstico Avanzado',
        question: '¿Cómo detectar un MOSFET de placa base quemado en corto sin desoldarlo?',
        subtitle: 'Síntoma: La fuente ATX hace "clic" y apaga los ventiladores al instante',
        frontKeyPoints: [
            'Causa: Activación de la protección OCP/SCP de la fuente',
            'Medición en el conector EPS 12V de 4/8 pines con polímetro en continuidad',
            'Pita entre los pines amarillos (+12V) y negros (GND)'
        ],
        schematicType: 'vrm_phase',
        backTitle: 'Cortocircuito High-Side en el Módulo Regulador de Tensión (VRM)',
        explanation: 'Cuando el MOSFET superior (High-Side) del VRM se perfora, se convierte en un puente directo (0 Ohmios) entre la línea de 12V de la fuente y la línea de salida hacia la CPU o masa a través del Low-Side. La fuente detecta cortocircuito y salta su circuito de protección en menos de 10 milisegundos para evitar que los 12V destruyan el silicio de la CPU.',
        keyFormula: 'R_medida ≈ 0.0 Ω  |  V_drop = 0.00 V',
        smrTip: 'NUNCA puentear el cable verde con uno negro de la fuente ATX con una placa en corto conectada; forzarás la corriente y derretirás las pistas internas de cobre de la placa base.',
        tags: ['VRM', 'Cortocircuito', 'OCP', 'Seguridad']
    },
    {
        id: 'fc-9',
        category: 'smr_hardware',
        level: 3,
        levelLabel: 'Nivel 3 · Periféricos y Sensores',
        question: '¿Qué es un fototransistor y dónde se utiliza en el parque informático de una empresa?',
        subtitle: 'Transistores controlados por fotones de luz en lugar de corriente en la base',
        frontKeyPoints: [
            'La base es activada por fotones de luz infrarroja o visible',
            'Sensores ópticos de paso de papel en impresoras',
            'Sensores de intrusión en cajas de servidores rack (Chassis Intrusion)',
            'Encoders de velocidad de rodillos y ventiladores'
        ],
        schematicType: 'bjt_npn',
        backTitle: 'Optoacopladores y Barreras Infrarrojas',
        explanation: 'En un fototransistor, la unión base-colector está expuesta a través de una lente transparente. Cuando recibe luz (habitualmente emitida por un LED infrarrojo emparejado), se generan pares electrón-hueco que inyectan corriente de base y hacen que el transistor conduzca. Si una hoja de papel o la chapa de un servidor corta el haz, el fototransistor entra en CORTE y la salida pasa a nivel lógico ALTO (5V o 3.3V).',
        keyFormula: 'Con luz: Saturación (V_out ≈ 0V) | Sin luz: Corte (V_out = V_CC)',
        smrTip: 'Si una impresora de la empresa da "atasco de papel fantasma", comprueba primero con un hisopo y alcohol isopropílico si la lente del fototransistor tiene toner acumulado antes de desmontar los engranajes.',
        tags: ['Fototransistor', 'Impresoras', 'Sensores', 'Mantenimiento']
    },
    {
        id: 'fc-10',
        category: 'smr_hardware',
        level: 2,
        levelLabel: 'Nivel 2 · Control Térmico',
        question: '¿Cómo regula un transistor la velocidad de un ventilador de 3 pines vs 4 pines (PWM)?',
        subtitle: 'Control por tensión analógica vs Modulación por Ancho de Pulsos (PWM)',
        frontKeyPoints: [
            'Ventilador 3 pines: Transistor regulando tensión continua (5V a 12V)',
            'Ventilador 4 pines: MOSFET conmutando a alta frecuencia (25 kHz)',
            'El cuarto cable envía pulsos de control directo al circuito integrado interno'
        ],
        schematicType: 'mosfet_n',
        backTitle: 'Eficiencia Térmica del Control PWM vs Lineal',
        explanation: 'En ventiladores de 3 pines clásicos, el transistor de la placa debía disipar como calor la caída de tensión sobrante (ej. para entregar 7V, el transistor se tragaba 5V a 0.3A = 1.5W de calor). En ventiladores PWM de 4 pines, el MOSFET interno conmuta a 25.000 veces por segundo: o está 100% abierto (0 corriente) o 100% saturado (caída de tensión casi cero). Eficiencia superior al 95%.',
        keyFormula: 'Duty Cycle (%) = (T_on / T_periodo) · 100',
        smrTip: 'Si en el taller un ventilador de 3 pines se queda al 100% de ruido aunque lo bajes por BIOS, es muy probable que el transistor de conmutación de esa cabecera FAN se haya quedado fundido en cortocircuito permanente.',
        tags: ['PWM', 'Ventiladores', 'Placa Base', 'Refrigeración']
    }
];
exports.DIAGNOSTIC_SCENARIOS = [
    {
        id: 'case-vrm-short',
        title: 'Caso 1: Placa base que no enciende y fuente ATX en protección (VRM CPU)',
        hardwareContext: 'Aula 204 SMR · Placa base Asus Prime B550M-A con procesador AMD Ryzen 5',
        initialSymptom: 'Al presionar el pulsador frontal de la torre, los ventiladores amagan con girar medio segundo, se escucha un "clic" en la fuente de alimentación BeQuiet! 600W y el equipo se apaga por completo. El LED verde de standby (+5VSB) de la placa permanece encendido.',
        difficulty: 3,
        difficultyLabel: 'Nivel 3 · Avanzado (VRM de Placa Base)',
        estimatedTimeMin: 12,
        testPoints: [
            {
                id: 'tp-eps12v',
                label: 'Conector EPS 12V (CPU 8 pines)',
                location: 'Toma superior izquierda junto al zócalo AM4',
                diodeReading: 0.01,
                voltageReading: '0.00 V (0.2 Ω respecto a masa GND)',
                status: 'defectuoso',
                hint: '¡Continuidad directa entre la línea de 12V y tierra! Debería marcar al menos cientos de ohmios o diodo normal.'
            },
            {
                id: 'tp-mosfet-high1',
                label: 'MOSFET High-Side Fase 1 (Q1)',
                location: 'Encapsulado PowerPAK SO-8 Fase 1 VRM',
                diodeReading: 0.53,
                voltageReading: 'Aislamiento normal D-S en inversa',
                status: 'normal',
                hint: 'Diodo interno de protección mide 0.53V. Este transistor está en buen estado.'
            },
            {
                id: 'tp-mosfet-high2',
                label: 'MOSFET High-Side Fase 2 (Q3)',
                location: 'Encapsulado PowerPAK SO-8 Fase 2 VRM',
                diodeReading: 0.00,
                voltageReading: '0.00 V en ambos sentidos (Drenador a Surtidor)',
                status: 'defectuoso',
                hint: '¡PUNTOS EN CORTO! El drenador y el surtidor están fundidos internamente.'
            },
            {
                id: 'tp-pwm-ic',
                label: 'Controlador PWM VRM (ASP1106G)',
                location: 'Chip integrado adyacente a inductores',
                diodeReading: 0.68,
                voltageReading: 'Línea VCC 5V normal',
                status: 'normal',
                hint: 'Las señales de control parecen íntegras.'
            }
        ],
        steps: [
            {
                phase: 'observacion',
                title: 'Fase 1: Observación Rigurosa de Síntomas y Mediciones',
                instruction: 'Analiza los datos del polímetro en el conector EPS y en los transistores del VRM.',
                question: '¿Qué evidencia concluyente arroja la prueba con el multímetro en el punto de prueba Q3 (MOSFET High-Side de Fase 2)?',
                options: [
                    {
                        id: 'obs-1',
                        text: 'El MOSFET está abierto y no conduce corriente hacia la CPU.',
                        isCorrect: false,
                        feedback: 'Incorrecto. Si estuviera abierto marcaría OL (Open Loop) y no provocaría el disparo de la protección de la fuente.'
                    },
                    {
                        id: 'obs-2',
                        text: 'Existe un cortocircuito franco (0.00V / 0Ω) entre Drenador y Surtidor, uniendo los 12V directos a masa a través de la fase.',
                        isCorrect: true,
                        feedback: '¡Excelente observación! El semiconductor sufrió una rotura por avalancha térmica y su unión D-S se ha perforado.'
                    },
                    {
                        id: 'obs-3',
                        text: 'El pulsador de encendido de la torre tiene un cable pelado.',
                        isCorrect: false,
                        feedback: 'No concuerda con las mediciones en los componentes del VRM de la placa base.'
                    }
                ]
            },
            {
                phase: 'consecuencia',
                title: 'Fase 2: Consecuencia y Causa Técnica',
                instruction: 'Predice el impacto de este fallo en el resto del ecosistema del ordenador.',
                question: '¿Por qué la fuente de alimentación se apaga tras el "clic" en vez de suministrar corriente normalmente?',
                options: [
                    {
                        id: 'con-1',
                        text: 'Se activa el circuito de protección OCP/SCP (sobrecorriente/cortocircuito) de la fuente ATX para evitar el incendio del cableado y placa.',
                        isCorrect: true,
                        feedback: '¡Correcto! Las fuentes modernas con certificación ATX supervisan el riel de 12V y cortan la oscilación de potencia en milisegundos.'
                    },
                    {
                        id: 'con-2',
                        text: 'Porque el procesador ha enviado una orden por el bus I2C para suspender el equipo.',
                        isCorrect: false,
                        feedback: 'El procesador ni siquiera llega a inicializarse porque la tensión nunca alcanza el estado Power Good.'
                    },
                    {
                        id: 'con-3',
                        text: 'Porque la pila botón CR2032 de la BIOS está descargada.',
                        isCorrect: false,
                        feedback: 'Una pila agotada provoca pérdida de hora y configuración CMOS, jamás el disparo de protección de la fuente.'
                    }
                ]
            },
            {
                phase: 'adaptacion',
                title: 'Fase 3: Adaptación del Diagnóstico en el Taller SMR',
                instruction: 'Un compañero de clase te sugiere: "Vamos a puentear el cable verde con negro de la fuente ATX con un clip para obligarla a arrancar".',
                question: 'Como futuro técnico SMR, ¿cómo adaptas tu procedimiento y evalúas esta propuesta?',
                options: [
                    {
                        id: 'ada-1',
                        text: 'Rechazar la maniobra tajantemente: puentear la fuente anulando su protección inyectará más de 40A en las pistas de cobre de la placa, fundiéndolas y pudiendo destruir la CPU.',
                        isCorrect: true,
                        feedback: '¡Impecable criterio profesional! Forzar el encendido de una fuente ante un corto evidente es una negligencia que destruye hardware.'
                    },
                    {
                        id: 'ada-2',
                        text: 'Aceptar el consejo, ya que así veremos de dónde sale humo para encontrar la falla más rápido.',
                        isCorrect: false,
                        feedback: '¡Peligro! Provocarás daños irreparables en la placa multicapa, riesgo de quemaduras y humo tóxico.'
                    },
                    {
                        id: 'ada-3',
                        text: 'Cambiar la memoria RAM de ranura para ver si el corto desaparece.',
                        isCorrect: false,
                        feedback: 'La RAM se alimenta de la línea de 1.2V/1.35V generada por su propio VRM independiente, no del conector EPS 12V de CPU.'
                    }
                ]
            },
            {
                phase: 'pensamiento_critico',
                title: 'Fase 4: Pensamiento Crítico y Resolución Definitiva',
                instruction: 'Decide el plan de reparación o sustitución con rigor técnico y criterio económico.',
                question: '¿Cuál es el protocolo técnico profesional adecuado para devolver el equipo a producción?',
                options: [
                    {
                        id: 'crit-1',
                        text: 'Desoldar el MOSFET Q3 con estación de aire caliente, verificar que el corto desaparece de la línea EPS, comprobar el diodo bootstrap del driver y soldar un MOSFET equivalente con igual o menor R_DS(on) y mismo amperaje.',
                        isCorrect: true,
                        feedback: '¡Resolución de nivel especialista SMR! Confirmar el driver evita que el nuevo MOSFET vuelva a quemarse inmediatamente por polarización incorrecta.'
                    },
                    {
                        id: 'crit-2',
                        text: 'Poner más pasta térmica sobre el procesador y volver a probar.',
                        isCorrect: false,
                        feedback: 'La pasta térmica no repara un transistor de silicio perforado mecánicamente.'
                    },
                    {
                        id: 'crit-3',
                        text: 'Cortar los dos cables amarillos del conector de la fuente que van a esa fase.',
                        isCorrect: false,
                        feedback: 'Una chapuza inaceptable que desequilibra las fases y quemará el resto de inductores.'
                    }
                ]
            }
        ],
        summaryLearning: 'Los MOSFETs de canal N de las fases VRM soportan corrientes extremas. Cuando fallan, casi siempre lo hacen en cortocircuito entre drenador y surtidor. En 1º SMR, el polímetro en escala de diodos/continuidad en el conector EPS 12V es la herramienta más rápida para diagnosticarlo sin desmontar el disipador.'
    },
    {
        id: 'case-fan-pwm',
        title: 'Caso 2: Ventilador de caja siempre al 100% de RPM sin control PWM',
        hardwareContext: 'Taller de reparación · Torre de sobremesa de secretaría de centro educativo',
        initialSymptom: 'El usuario se queja de un ruido insoportable de "turbina de avión". En la configuración UEFI/BIOS, la velocidad del ventilador de chasis marca 4200 RPM continuas. Cambiar el perfil a "Silent" o modificar la curva de temperatura no altera en absoluto la velocidad del ventilador.',
        difficulty: 2,
        difficultyLabel: 'Nivel 2 · Intermedio (Control de Periféricos)',
        estimatedTimeMin: 8,
        testPoints: [
            {
                id: 'tp-fan-header',
                label: 'Cabecera SYS_FAN1 (Pines 1, 2 y 3)',
                location: 'Borde inferior de la placa base',
                diodeReading: 0.00,
                voltageReading: '12.0 V fijos en el pin positivo con masa continua',
                status: 'alerta',
                hint: 'Tensión máxima inalterable independientemente de la carga de la CPU.'
            },
            {
                id: 'tp-bjt-q2',
                label: 'Transistor BJT SMD SOT-23 (Q2 Conmutador FAN)',
                location: 'Junto a la cabecera SYS_FAN1 en la placa base',
                diodeReading: 0.02,
                voltageReading: '0.02 V entre Colector y Emisor (C-E)',
                status: 'defectuoso',
                hint: '¡Continuidad anormal entre Colector y Emisor con la placa apagada!'
            },
            {
                id: 'tp-superio-pin',
                label: 'Pin de control PWM del Chip Super I/O (Nuvoton NCT6798D)',
                location: 'Pin 42 del chip Super I/O',
                diodeReading: 0.65,
                voltageReading: 'Onda cuadrada PWM varía correctamente del 20% al 80%',
                status: 'normal',
                hint: 'El chip Super I/O genera la señal de control perfectamente.'
            }
        ],
        steps: [
            {
                phase: 'observacion',
                title: 'Fase 1: Observación de Señales de Control vs Potencia',
                instruction: 'Compara la señal que sale del chip Super I/O con el estado del transistor Q2.',
                question: '¿Qué revela el hecho de que el Super I/O emita la señal correcta pero el transistor Q2 marque 0.02V entre Colector y Emisor?',
                options: [
                    {
                        id: 'fan-obs-1',
                        text: 'El transistor BJT de conmutación está en cortocircuito permanente (fundido internamente), alimentando el ventilador al 100% sin importar la señal lógica de la base.',
                        isCorrect: true,
                        feedback: '¡Exacto! El transistor actúa como un interruptor soldado en posición "CERRADO".'
                    },
                    {
                        id: 'fan-obs-2',
                        text: 'El ventilador tiene los rodamientos atascados.',
                        isCorrect: false,
                        feedback: 'Si los rodamientos estuvieran atascados, el ventilador giraría lento o no giraría, no a 4200 RPM constantes.'
                    },
                    {
                        id: 'fan-obs-3',
                        text: 'Falta actualizar la versión de firmware del BIOS.',
                        isCorrect: false,
                        feedback: 'El Super I/O ya genera la señal PWM correcta, el fallo es físico a nivel de hardware.'
                    }
                ]
            },
            {
                phase: 'consecuencia',
                title: 'Fase 2: Consecuencia del Fallo Semiconductor',
                instruction: 'Reflexiona sobre qué ocurriría si ignoramos la causa semiconductora.',
                question: '¿Qué consecuencia inmediata tiene cambiar el ventilador por otro nuevo idéntico?',
                options: [
                    {
                        id: 'fan-con-1',
                        text: 'El nuevo ventilador funcionará a la perfección y respetará el perfil silencioso.',
                        isCorrect: false,
                        feedback: 'No, porque la placa base seguirá entregando 12V constantes por el transistor fundido.'
                    },
                    {
                        id: 'fan-con-2',
                        text: 'El nuevo ventilador girará exactamente igual de rápido y ruidoso al 100%, gastando dinero del cliente inútilmente sin solucionar la avería.',
                        isCorrect: true,
                        feedback: '¡Pensamiento deductivo clave! El técnico debe diagnosticar la causa raíz, no sustituir periféricos al azar.'
                    }
                ]
            },
            {
                phase: 'adaptacion',
                title: 'Fase 3: Adaptación Rápida en Taller Informático',
                instruction: 'Si el cliente necesita el equipo hoy mismo para trabajar y no hay tiempo para soldadura SMD en placa base:',
                question: '¿Cuál es la solución de adaptación técnica más inteligente y económica?',
                options: [
                    {
                        id: 'fan-ada-1',
                        text: 'Conectar el ventilador a otra cabecera libre de la placa (ej. SYS_FAN2 o CHA_FAN) cuyo transistor esté sano, o instalar un cable reductor de 7V/adaptador con control PWM independiente.',
                        isCorrect: true,
                        feedback: '¡Excelente adaptación profesional! Da respuesta inmediata al cliente sin incurrir en costes desmedidos.'
                    },
                    {
                        id: 'fan-ada-2',
                        text: 'Desconectar el ventilador y dejar la torre sin ventilación trasera.',
                        isCorrect: false,
                        feedback: 'Provocarás estrangulamiento térmico (Thermal Throttling) y riesgo de daño en la fuente y GPU.'
                    }
                ]
            },
            {
                phase: 'pensamiento_critico',
                title: 'Fase 4: Pensamiento Crítico',
                instruction: 'Analiza por qué pudo quemarse el transistor original.',
                question: '¿Qué práctica errónea cometida habitualmente en talleres suele provocar el quemado de este transistor?',
                options: [
                    {
                        id: 'fan-crit-1',
                        text: 'Conectar múltiples ventiladores de alto amperaje o tiras RGB en paralelo a una misma cabecera mediante un ladrón/splitter simple, superando el límite de 1 Amperio del transistor.',
                        isCorrect: true,
                        feedback: '¡Gran visión técnica! Las cabeceras estándar suelen soportar 1A (12W). Superar esa corriente destruye por sobretemperatura la unión del transistor SMD.'
                    },
                    {
                        id: 'fan-crit-2',
                        text: 'Tener el cable Ethernet conectado.',
                        isCorrect: false,
                        feedback: 'No existe relación alguna.'
                    }
                ]
            }
        ],
        summaryLearning: 'Los transistores de baja señal (SOT-23) en placas base actúan como interruptores para ventiladores y relés. Si se sobrecarga la cabecera, se perforan en cortocircuito colector-emisor. Comprender la diferencia entre señal lógica de control y conmutación de potencia ahorra sustituciones innecesarias.'
    },
    {
        id: 'case-printer-optical',
        title: 'Caso 3: Impresora láser de secretaría con atasco fantasma persistente',
        hardwareContext: 'Impresora HP LaserJet Enterprise M608 de la oficina de administración',
        initialSymptom: 'La pantalla táctil muestra permanentemente el error "13.00.00 Atasco de papel en zona de registro". Al abrir las compuertas y bandejas, no hay absolutamente ninguna hoja ni trozo de papel.',
        difficulty: 2,
        difficultyLabel: 'Nivel 2 · Intermedio (Fototransistores y Sensores Ópticos)',
        estimatedTimeMin: 10,
        testPoints: [
            {
                id: 'tp-flag',
                label: 'Palanca mecánica basculante (Sensor Flag)',
                location: 'Entrada de papel en bandeja 2',
                diodeReading: 0.00,
                voltageReading: 'Movimiento libre, muelle de retroceso en perfecto estado',
                status: 'normal',
                hint: 'Mecánicamente la palanca sube y baja sin trabarse.'
            },
            {
                id: 'tp-ir-led',
                label: 'LED Infrarrojo de la barrera óptica',
                location: 'Lado emisor de la herradura óptica',
                diodeReading: 1.15,
                voltageReading: '1.2 V de polarización (visible con cámara de móvil)',
                status: 'normal',
                hint: 'El LED IR emite luz infrarroja correctamente.'
            },
            {
                id: 'tp-phototransistor',
                label: 'Fototransistor receptor de la barrera óptica',
                location: 'Lado receptor de la herradura óptica',
                diodeReading: 'OL',
                voltageReading: '5.0 V fijos en el Colector con o sin palanca activada',
                status: 'defectuoso',
                hint: 'El fototransistor nunca conmuta a masa: permanece en corte continuo (5V).'
            }
        ],
        steps: [
            {
                phase: 'observacion',
                title: 'Fase 1: Observación de Sensores Optoelectrónicos',
                instruction: 'Revisa cómo funciona un fototransistor en una barrera óptica (optointerruptor tipo herradura).',
                question: 'Si la tensión en el colector del fototransistor permanece en 5V cuando la palanca está levantada (haz de luz libre), ¿qué deduce el técnico?',
                options: [
                    {
                        id: 'print-obs-1',
                        text: 'El fototransistor no está detectando la luz infrarroja: para él, el haz siempre está "cortado", por lo que la electrónica interpreta que hay papel tapando el paso.',
                        isCorrect: true,
                        feedback: '¡Exacto! Sin luz que excite su base fotónica, el transistor se mantiene en corte y la resistencia de pull-up mantiene la línea en 5V (estado de atasco).'
                    },
                    {
                        id: 'print-obs-2',
                        text: 'El motor principal de arrastre está quemado.',
                        isCorrect: false,
                        feedback: 'El motor no tiene relación con la lectura óptica del sensor de paso.'
                    }
                ]
            },
            {
                phase: 'consecuencia',
                title: 'Fase 2: Consecuencia del Entorno de Oficina',
                instruction: 'En impresoras láser de gran volumen, el polvo de tóner microscópico y la pelusa de papel flotan continuamente.',
                question: '¿Qué consecuencia física directa tiene la acumulación de tóner sobre la lente del fototransistor?',
                options: [
                    {
                        id: 'print-con-1',
                        text: 'El polvo de tóner opaco bloquea físicamente la llegada de los fotones infrarrojos a la base del transistor, impidiendo su polarización aunque no haya papel.',
                        isCorrect: true,
                        feedback: '¡Brillante! El 80% de los atascos fantasma se deben a suciedad que ciega la ventana óptica del fototransistor.'
                    },
                    {
                        id: 'print-con-2',
                        text: 'El tóner aumenta la conductividad eléctrica del cable USB.',
                        isCorrect: false,
                        feedback: 'No tiene fundamento físico en este caso.'
                    }
                ]
            },
            {
                phase: 'adaptacion',
                title: 'Fase 3: Adaptación y Mantenimiento Preventivo',
                instruction: 'Antes de tramitar la garantía o pedir una placa lógica de 200€ al fabricante:',
                question: '¿Qué acción correctora de bajo coste debe realizar el técnico de SMR?',
                options: [
                    {
                        id: 'print-ada-1',
                        text: 'Limpiar con aire comprimido suave y un hisopo con alcohol isopropílico la ranura óptica del LED y del fototransistor para retirar el tóner carbonizado.',
                        isCorrect: true,
                        feedback: '¡Esa es la actitud del buen técnico! Mantenimiento físico de precisión antes de sustituir componentes caros.'
                    },
                    {
                        id: 'print-ada-2',
                        text: 'Reinstalar el sistema operativo Windows en todos los equipos del aula.',
                        isCorrect: false,
                        feedback: 'El error reside en el hardware interno de la impresora, no en el cliente de red.'
                    }
                ]
            },
            {
                phase: 'pensamiento_critico',
                title: 'Fase 4: Pensamiento Crítico y Verificación Posterior',
                instruction: 'Tras la limpieza, ¿cómo verificas objetivamente que el fototransistor ha vuelto a operar con normalidad?',
                question: '¿Qué variación de tensión debes medir en el colector al mover manualmente la palanca oscilante?',
                options: [
                    {
                        id: 'print-crit-1',
                        text: 'Debe alternar limpiamente entre ~0.1V (saturado con luz directa) y ~5.0V (en corte cuando la palanca bloquea el haz infrarrojo).',
                        isCorrect: true,
                        feedback: '¡Perfecto! La transición limpia alto/bajo confirma que la unión semiconductora conmuta sin interferencias.'
                    },
                    {
                        id: 'print-crit-2',
                        text: 'Debe mantenerse constante a 230V de corriente alterna.',
                        isCorrect: false,
                        feedback: 'La electrónica lógica trabaja a baja tensión DC (5V / 3.3V), jamás a 230V AC.'
                    }
                ]
            }
        ],
        summaryLearning: 'Los fototransistores convierten la presencia de luz en corriente de base. En impresoras, escáneres y sensores de intrusión de chasis, la suciedad ambiental simula falsas fallas mecánicas. Comprobar la conmutación de tensión 0V/5V evita descartar equipos viables.'
    },
    {
        id: 'case-atx-standby',
        title: 'Caso 4: Servidor que no enciende tras tormenta (Transistor auxiliar +5VSB)',
        hardwareContext: 'Armario Rack Sala de Servidores · Servidor de archivos NAS con fuente ATX EPS 750W',
        initialSymptom: 'Tras una fuerte tormenta eléctrica nocturna, el servidor está completamente inerte. Al pulsar el botón de encendido no ocurre nada: ningún LED parpadea en la placa base ni en la tarjeta de red integrada.',
        difficulty: 3,
        difficultyLabel: 'Nivel 3 · Avanzado (Seguridad Eléctrica y Fuentes ATX)',
        estimatedTimeMin: 15,
        testPoints: [
            {
                id: 'tp-sb-cable',
                label: 'Línea +5VSB (Pin 9 cable Violeta conector ATX 24p)',
                location: 'Conector principal ATX',
                diodeReading: 'OL',
                voltageReading: '0.00 V (Debería tener +5.0V estables siempre)',
                status: 'defectuoso',
                hint: '¡Falta total de tensión Standby! Sin 5VSB el chipset no puede despertar la fuente.'
            },
            {
                id: 'tp-primary-caps',
                label: 'Condensadores electrolíticos de alta tensión primarios (400V)',
                location: 'Etapa caliente de la fuente ATX',
                diodeReading: 'OL',
                voltageReading: '¡PELIGRO! 320 V DC residuales acumulados',
                status: 'alerta',
                hint: 'Descargar con resistencia de carga de potencia de 1kΩ antes de cualquier manipulación.'
            },
            {
                id: 'tp-mosfet-aux',
                label: 'Transistor MOSFET del circuito Flyback auxiliar Standby',
                location: 'Pequeño disipador en zona primaria',
                diodeReading: 0.00,
                voltageReading: 'Puerta-Surtidor (G-S) en cortocircuito por sobretensión',
                status: 'defectuoso',
                hint: 'El pico inductivo de la tormenta perforó la fina capa aislante de la Puerta.'
            }
        ],
        steps: [
            {
                phase: 'observacion',
                title: 'Fase 1: Observación y Medición de la Cadena de Arranque',
                instruction: 'Recuerda el estándar ATX de conmutación de fuentes de ordenador.',
                question: '¿Por qué la ausencia de los +5VSB (Standby) impide por completo encender el servidor?',
                options: [
                    {
                        id: 'sb-obs-1',
                        text: 'Porque el chip Super I/O y el circuito BMC del servidor se alimentan exclusivamente de los +5VSB para poder leer el pulsador frontal y poner a masa el pin verde (PS_ON#).',
                        isCorrect: true,
                        feedback: '¡Exacto! Sin los 5VSB de espera, el "cerebro de arranque" de la placa base está completamente apagado.'
                    },
                    {
                        id: 'sb-obs-2',
                        text: 'Porque los discos duros requieren 5VSB para girar antes de iniciar.',
                        isCorrect: false,
                        feedback: 'Los discos duros se alimentan de las líneas principales de 12V y 5V cuando la fuente ya ha arrancado.'
                    }
                ]
            },
            {
                phase: 'consecuencia',
                title: 'Fase 2: Consecuencia y Protocolo de Seguridad Eléctrica',
                instruction: 'En el punto de prueba de los condensadores primarios hay más de 300 Voltios continuos residuales.',
                question: '¿Qué consecuencia fatídica puede tener tocar el circuito primario sin descargar previamente los condensadores?',
                options: [
                    {
                        id: 'sb-con-1',
                        text: 'Descarga eléctrica grave o mortal que puede provocar fibrilación ventricular o quemaduras por arco voltaico.',
                        isCorrect: true,
                        feedback: '¡Prioridad absoluta a la seguridad! Los condensadores de 400V almacenan energía letal incluso horas después de desenchufar.'
                    },
                    {
                        id: 'sb-con-2',
                        text: 'Simplemente que el multímetro se descalibre un poco.',
                        isCorrect: false,
                        feedback: 'Inconsciencia total. La seguridad humana prevalece sobre cualquier componente.'
                    }
                ]
            },
            {
                phase: 'adaptacion',
                title: 'Fase 3: Adaptación del Diagnóstico al MOSFET Auxiliar',
                instruction: 'Al medir el transistor de la línea Standby, la unión Gate-Source da 0.00V (cortocircuito).',
                question: '¿Cómo se explica físicamente este fallo tras la tormenta?',
                options: [
                    {
                        id: 'sb-ada-1',
                        text: 'El pico de sobretensión en la red eléctrica superó la rigidez dieléctrica del óxido de silicio (SiO2) de la Puerta (típicamente ±20V max), perforándola microscópicamente.',
                        isCorrect: true,
                        feedback: '¡Riguroso análisis de semiconductores! El dieléctrico de la puerta del MOSFET es ultrafino y muy vulnerable a transitorios sin varistor.'
                    },
                    {
                        id: 'sb-ada-2',
                        text: 'El transistor se oxidó por la lluvia de la tormenta dentro de la sala.',
                        isCorrect: false,
                        feedback: 'El servidor está en un rack interior climatizado, no es corrosión húmeda.'
                    }
                ]
            },
            {
                phase: 'pensamiento_critico',
                title: 'Fase 4: Pensamiento Crítico y Decisión en Entorno Empresarial',
                instruction: 'Estás en una empresa con un servidor de producción crítico.',
                question: '¿Cuál es la decisión técnica y de gestión más sensata en este escenario?',
                options: [
                    {
                        id: 'sb-crit-1',
                        text: 'Sustituir la fuente de alimentación completa por una unidad redundante de repuesto de certificación homologada para restaurar el servicio en minutos, y proteger la línea con un SAI/UPS online con supresor de transitorios.',
                        isCorrect: true,
                        feedback: '¡Mentalidad de administrador de sistemas SMR! En un servidor de empresa, el tiempo de inactividad cuesta miles de euros; la fuente debe reemplazarse de inmediato y prevenir futuros rayos con SAI.'
                    },
                    {
                        id: 'sb-crit-2',
                        text: 'Poner cinta aislante alrededor del transistor roto y volver a encender.',
                        isCorrect: false,
                        feedback: 'Riesgo inminente de explosión o incendio.'
                    }
                ]
            }
        ],
        summaryLearning: 'La etapa auxiliar Standby (+5VSB) de una fuente ATX funciona ininterrumpidamente las 24 horas del día. Su transistor de conmutación sufre un desgaste continuo y es el primero en sucumbir ante transitorios de red. La seguridad en el taller SMR exige descargar siempre condensadores antes de medir.'
    }
];
exports.QUIZ_QUESTIONS = [
    {
        id: 'q-1',
        category: 'BJT',
        level: 1,
        question: 'En un transistor BJT NPN de silicio en zona activa, ¿qué tensión típica aproximada existe entre su Base y su Emisor (V_BE)?',
        options: ['0.0 Voltios', '0.7 Voltios', '3.3 Voltios', '12.0 Voltios'],
        correctIndex: 1,
        explanation: 'La unión Base-Emisor es un diodo PN polarizado en directa, por lo que presenta la típica caída de tensión de silicio de aproximadamente 0.6V a 0.7V.',
        pillar: 'Observación'
    },
    {
        id: 'q-2',
        category: 'MOSFET',
        level: 1,
        question: 'A diferencia del transistor BJT (que se gobierna por corriente de base), ¿cómo se controla la conducción de un transistor MOSFET?',
        options: [
            'Por corriente continua en el drenador',
            'Por tensión aplicada entre Puerta y Surtidor (V_GS)',
            'Por temperatura ambiental',
            'Por frecuencia de reloj del procesador'
        ],
        correctIndex: 1,
        explanation: 'El MOSFET es un dispositivo controlado por campo eléctrico (tensión en la puerta V_GS). Como su puerta está aislada por óxido, prácticamente no absorbe corriente de entrada.',
        pillar: 'Observación'
    },
    {
        id: 'q-3',
        category: 'Zonas de Trabajo',
        level: 2,
        question: 'Si medimos un transistor con el voltímetro y encontramos V_CE = 0.2V y la carga (ventilador o bombilla) funcionando al máximo, ¿en qué estado se encuentra?',
        options: ['Corte', 'Activa o Lineal', 'Saturación', 'Averiado en circuito abierto'],
        correctIndex: 2,
        explanation: 'En saturación, la caída de tensión Colector-Emisor se desploma a su valor mínimo de saturación (~0.2V), comportándose como un interruptor cerrado ideal.',
        pillar: 'Consecuencia'
    },
    {
        id: 'q-4',
        category: 'Diagnóstico SMR',
        level: 2,
        question: 'Al verificar un transistor con el multímetro en modo DIODO, obtenemos lectura de 0.00V y pitido de continuidad entre Colector y Emisor en ambos sentidos. ¿Qué significa?',
        options: [
            'Que el transistor está perfectamente polarizado',
            'Que la unión semiconductora está en cortocircuito (destruido)',
            'Que el transistor está en zona de corte',
            'Que el multímetro se ha quedado sin batería'
        ],
        correctIndex: 1,
        explanation: 'Entre Colector y Emisor en un transistor sano siempre debe dar OL (abierto). Si pita o marca 0.00V, la unión está fundida y debe reemplazarse.',
        pillar: 'Consecuencia'
    },
    {
        id: 'q-5',
        category: 'VRM Placa Base',
        level: 3,
        question: 'En las fases de alimentación VRM de una placa base de gama alta, ¿por qué los fabricantes utilizan MOSFETs con una R_DS(on) inferior a 3 mΩ?',
        options: [
            'Para que la placa base pese menos',
            'Para reducir las pérdidas por calor Joule (P = I² · R) ante consumos de más de 100 Amperios de la CPU',
            'Para iluminar los LEDs RGB de la torre',
            'Para aumentar la velocidad de la memoria RAM'
        ],
        correctIndex: 1,
        explanation: 'Con intensidades elevadísimas como las que demanda un procesador moderno, una resistencia de canal ínfima (milióhmios) es vital para evitar el sobrecalentamiento y la destrucción térmica de la placa.',
        pillar: 'Pensamiento Crítico'
    },
    {
        id: 'q-6',
        category: 'Taller SMR',
        level: 2,
        question: 'Si un equipo no enciende y notas que el MOSFET superior de la fase 1 del VRM está caliente incluso con el PC en reposo, ¿qué procedimiento técnico debes adaptar?',
        options: [
            'Echar agua fría sobre la placa base',
            'Desconectar la alimentación inmediatamente, descargar condensadores y comprobar cortocircuito en la línea de 12V EPS con el polímetro',
            'Subir el voltaje en la BIOS',
            'Cambiar el cable de corriente de 230V'
        ],
        correctIndex: 1,
        explanation: 'Un MOSFET que calienta en reposo indica fuga o semicortocircuito. Continuar encendiendo el equipo dañará irreversiblemente el PCB y el procesador.',
        pillar: 'Adaptación'
    },
    {
        id: 'q-7',
        category: 'Fototransistores',
        level: 2,
        question: 'En un sensor óptico de intrusión de chasis de un servidor, ¿qué ocurre con el fototransistor cuando la tapa del chasis está cerrada impidiendo la entrada de luz externa?',
        options: [
            'Pasa a estado de corte si dependía de luz externa, o conduce si se activa un haz interno conmutado',
            'El transistor explota',
            'El transistor consume 50W de potencia',
            'La memoria ECC se borra'
        ],
        correctIndex: 0,
        explanation: 'Los fototransistores conmutan su conducción según la incidencia de fotones en su base, generando estados lógicos 0 y 1 para la monitorización de seguridad del chasis.',
        pillar: 'Adaptación'
    },
    {
        id: 'q-8',
        category: 'Seguridad SMR',
        level: 3,
        question: 'Antes de medir con el multímetro los transistores de conmutación de la etapa primaria de una fuente de alimentación de PC, ¿cuál es el paso de seguridad OBLIGATORIO?',
        options: [
            'Encender la fuente a máxima potencia',
            'Desconectar de la red y descargar los condensadores electrolíticos de alta tensión (400V) mediante una resistencia de potencia adecuada',
            'Poner el multímetro en modo amperímetro a la red',
            'No hace falta tomar ninguna medida de seguridad'
        ],
        correctIndex: 1,
        explanation: 'Los condensadores primarios acumulan tensiones letales de más de 300V que pueden provocar descargas graves o destruir los instrumentos de medición.',
        pillar: 'Pensamiento Crítico'
    }
];

};
modules["js/main.js"] = function(module, exports, require) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = require("react-dom/client");
const App_js_1 = __importDefault(require("./App.js"));
(0, client_1.createRoot)(document.getElementById('root')).render(react_1.default.createElement(App_js_1.default, null));

};
modules["js/utils/transistor-physics.js"] = function(module, exports, require) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateBjt = simulateBjt;
exports.simulateMosfet = simulateMosfet;
exports.testComponentJunction = testComponentJunction;
exports.calculateSmrLevel = calculateSmrLevel;
function simulateBjt(params) {
    const vbeThreshold = params.vbeOn ?? 0.7;
    const vceSaturation = params.vceSat ?? 0.2;
    const { vcc, vin, rb, rc, beta, type } = params;
    const effectiveVin = type === 'NPN' ? vin : Math.max(0, vcc - vin);
    if (effectiveVin < vbeThreshold) {
        return {
            region: 'corte',
            ibMicroAmps: 0,
            icMilliAmps: 0,
            vbe: effectiveVin,
            vce: vcc,
            lampBrightnessPercent: 0,
            powerDissipatedWatts: 0,
            isSwitchClosed: false,
            explanation: 'El transistor está en CORTE (I_B = 0). Actúa como un interruptor abierto. La bombilla/carga no recibe corriente y V_CE es igual a la tensión de alimentación V_CC.',
        };
    }
    const vbe = vbeThreshold;
    const ibAmps = (effectiveVin - vbeThreshold) / rb;
    const ibMicroAmps = ibAmps * 1e6;
    const icSatAmps = Math.max(0, (vcc - vceSaturation) / rc);
    const icLinearAmps = beta * ibAmps;
    if (icLinearAmps >= icSatAmps) {
        const icMilliAmps = icSatAmps * 1000;
        const vce = vceSaturation;
        const powerDissipatedWatts = vce * icSatAmps;
        return {
            region: 'saturacion',
            ibMicroAmps: Number(ibMicroAmps.toFixed(2)),
            icMilliAmps: Number(icMilliAmps.toFixed(2)),
            vbe,
            vce,
            lampBrightnessPercent: 100,
            powerDissipatedWatts: Number(powerDissipatedWatts.toFixed(4)),
            isSwitchClosed: true,
            explanation: 'El transistor está en SATURACIÓN. La unión colector-base se polariza directamente y V_CE cae a su mínimo (~0.2V). Actúa como un interruptor cerrado (conducción máxima).',
        };
    }
    else {
        const icAmps = icLinearAmps;
        const icMilliAmps = icAmps * 1000;
        const vce = Math.max(vceSaturation, vcc - icAmps * rc);
        const lampBrightnessPercent = Math.min(100, Math.round((icAmps / icSatAmps) * 100));
        const powerDissipatedWatts = vce * icAmps;
        return {
            region: 'activa',
            ibMicroAmps: Number(ibMicroAmps.toFixed(2)),
            icMilliAmps: Number(icMilliAmps.toFixed(2)),
            vbe,
            vce: Number(vce.toFixed(2)),
            lampBrightnessPercent,
            powerDissipatedWatts: Number(powerDissipatedWatts.toFixed(4)),
            isSwitchClosed: false,
            explanation: 'El transistor está en zona ACTIVA / LINEAL. La corriente de colector es proporcional a la de base (I_C = β · I_B). Funciona como amplificador de señal.',
        };
    }
}
function simulateMosfet(params) {
    const { vdd, vgs, vth, rdson, rLoad, pwmPercent } = params;
    if (vgs < vth) {
        return {
            state: 'corte',
            isOn: false,
            vds: vdd,
            idMilliAmps: 0,
            channelResistanceOhms: 10e6,
            powerLossWatts: 0,
            fanSpeedRpm: 0,
            explanation: 'El MOSFET está en CORTE (V_GS < V_TH). El canal conductor no se ha formado. No hay paso de corriente y la tensión completa V_DD cae en el Drenador.',
        };
    }
    const effectiveDuty = pwmPercent !== undefined ? Math.max(0, Math.min(100, pwmPercent)) / 100 : 1;
    const vgsOverdrive = vgs - vth;
    const kFactor = 2.0;
    const channelResistance = Math.max(rdson, rdson + 2 / (1 + kFactor * vgsOverdrive));
    const totalR = channelResistance + rLoad;
    const maxIdAmps = vdd / totalR;
    const actualIdAmps = maxIdAmps * effectiveDuty;
    const idMilliAmps = actualIdAmps * 1000;
    const vds = actualIdAmps * channelResistance;
    const powerLossWatts = Math.pow(actualIdAmps, 2) * channelResistance;
    const maxFanRpm = 2800;
    const fanSpeedRpm = Math.round(maxFanRpm * (actualIdAmps / (vdd / (rdson + rLoad))));
    return {
        state: channelResistance <= rdson * 2 ? 'lineal_ohmic' : 'saturacion',
        isOn: true,
        vds: Number(vds.toFixed(3)),
        idMilliAmps: Number(idMilliAmps.toFixed(1)),
        channelResistanceOhms: Number(channelResistance.toFixed(4)),
        powerLossWatts: Number(powerLossWatts.toFixed(4)),
        fanSpeedRpm,
        explanation: 'El MOSFET está CONDUCIENDO en zona óhmica con bajísima resistencia R_DS(on). En placas base modernas se emplean para conmutar decenas de amperios a la CPU con mínimas pérdidas térmicas.',
    };
}
function testComponentJunction(componentType, redLead, blackLead) {
    if (componentType === 'BJT_NPN') {
        if (redLead === 'Base' && blackLead === 'Emitter') {
            return {
                voltageDrop: 0.65,
                isConducting: true,
                isShortCircuit: false,
                technicalInterpretation: 'Unión Base-Emisor en directa polarizada correctamente (0.65V típico de silicio).',
            };
        }
        if (redLead === 'Base' && blackLead === 'Collector') {
            return {
                voltageDrop: 0.63,
                isConducting: true,
                isShortCircuit: false,
                technicalInterpretation: 'Unión Base-Colector en directa polarizada correctamente (0.63V típico de silicio). La caída B-C suele ser ligeramente menor que B-E.',
            };
        }
        return {
            voltageDrop: 'OL',
            isConducting: false,
            isShortCircuit: false,
            technicalInterpretation: 'Circuito abierto (OL). Polarización inversa o aislamiento correcto entre Colector y Emisor.',
        };
    }
    if (componentType === 'BJT_PNP') {
        if (redLead === 'Emitter' && blackLead === 'Base') {
            return {
                voltageDrop: 0.65,
                isConducting: true,
                isShortCircuit: false,
                technicalInterpretation: 'Unión Emisor-Base en directa (0.65V). En PNP la base es material N, por lo que la sonda negra va a la base.',
            };
        }
        if (redLead === 'Collector' && blackLead === 'Base') {
            return {
                voltageDrop: 0.63,
                isConducting: true,
                isShortCircuit: false,
                technicalInterpretation: 'Unión Colector-Base en directa (0.63V).',
            };
        }
        return {
            voltageDrop: 'OL',
            isConducting: false,
            isShortCircuit: false,
            technicalInterpretation: 'Circuito abierto (OL). Correcto para polarización inversa en transistor PNP en buen estado.',
        };
    }
    if (componentType === 'MOSFET_N_GOOD') {
        if (redLead === 'Source' && blackLead === 'Drain') {
            return {
                voltageDrop: 0.52,
                isConducting: true,
                isShortCircuit: false,
                technicalInterpretation: 'Diodo interno de protección (Body Diode) en directa (~0.52V). Normal en MOSFET de potencia.',
            };
        }
        if (redLead === 'Gate' || blackLead === 'Gate') {
            return {
                voltageDrop: 'OL',
                isConducting: false,
                isShortCircuit: false,
                technicalInterpretation: 'Aislamiento galvánico perfecto de la Puerta (Gate por dióxido de silicio). La puerta no debe conducir en ningún sentido.',
            };
        }
        return {
            voltageDrop: 'OL',
            isConducting: false,
            isShortCircuit: false,
            technicalInterpretation: 'Aislamiento Drenador-Surtidor sin polarizar la puerta. Correcto.',
        };
    }
    if (componentType === 'MOSFET_N_SHORT') {
        if ((redLead === 'Drain' && blackLead === 'Source') ||
            (redLead === 'Source' && blackLead === 'Drain')) {
            return {
                voltageDrop: 0.01,
                isConducting: true,
                isShortCircuit: true,
                technicalInterpretation: '¡FALLA CRÍTICA DETECTADA! Cortocircuito directo entre Drenador y Surtidor (0.01V / 0Ω). La fuente entra en protección OCP.',
            };
        }
        return {
            voltageDrop: 'OL',
            isConducting: false,
            isShortCircuit: false,
            technicalInterpretation: 'Medición de aislamiento.',
        };
    }
    return {
        voltageDrop: 'OL',
        isConducting: false,
        isShortCircuit: false,
        technicalInterpretation: 'Medición no válida.',
    };
}
function calculateSmrLevel(xp) {
    if (xp < 200) {
        return {
            level: 1,
            title: 'Aprendiz de Taller SMR',
            minXp: 0,
            nextLevelXp: 200,
            rankBadge: '🔧 Nivel 1',
        };
    }
    if (xp < 550) {
        return {
            level: 2,
            title: 'Técnico de Hardware y Fuentes',
            minXp: 200,
            nextLevelXp: 550,
            rankBadge: '⚡ Nivel 2',
        };
    }
    return {
        level: 3,
        title: 'Especialista en Diagnóstico y VRM',
        minXp: 550,
        nextLevelXp: 1000,
        rankBadge: '🏆 Nivel 3 (Maestro SMR)',
    };
}

};

const caches = Object.create(null);
const externals = { 'react': {...ReactModule, default: ReactModule.default || ReactModule, __esModule: true}, 'react-dom/client': {...ReactDomModule, default: ReactDomModule.default || ReactDomModule, __esModule: true}, 'lucide-react': {...LucideModule, __esModule: true}};
function load(id){
 if(externals[id])return externals[id];
 if(caches[id])return caches[id].exports;
 const factory=modules[id];
 if(!factory)throw new Error('Módulo no encontrado: '+id);
 const module={exports:{}}; caches[id]=module;
 const base=id.includes('/')?id.slice(0,id.lastIndexOf('/')+1):'';
 function relative(spec){
  if(!spec.startsWith('.'))return load(spec);
  const parts=(base+spec).split('/');const normal=[];
  for(const part of parts){if(!part||part==='.')continue;if(part==='..')normal.pop();else normal.push(part)}
  return load(normal.join('/'));
 }
 factory(module,module.exports,relative);
 return module.exports;
}
try{load('js/main.js');}
catch(error){document.getElementById('root').innerHTML='<main style="max-width:800px;margin:5rem auto;font:16px system-ui;padding:2rem"><h1>No se ha podido iniciar la aplicación</h1><p>Comprueba la conexión a Internet y recarga la página.</p></main>';console.error(error);}

