import { useState, useEffect, useRef, useCallback } from "react";
import { useAgent } from "agents/react";
import { Conversation } from "@elevenlabs/client";
import type { VaniState } from "./types";

// ─── Constants ───────────────────────────────────────────────────────
const FIELD_LABELS: Record<string, string> = {
  aadhaar: "आधार नंबर",
  fullName: "पूरा नाम",
  state: "राज्य",
  district: "ज़िला",
  subDistrict: "तहसील",
  village: "गाँव",
  bankAccount: "बैंक खाता",
  ifscCode: "IFSC कोड",
};

const INITIAL_STATE: VaniState = {
  currentStep: "idle",
  formProgress: { filled: 0, total: 0 },
  lastMessage: "",
  screenshotUrl: null,
  sessionId: null,
  language: "hi",
  userKey: null,
  isBrowsing: false,
  error: null,
};

interface TranscriptEntry {
  id: string;
  role: "user" | "agent";
  text: string;
  timestamp: Date;
}

// ─── App Component ───────────────────────────────────────────────────
export function App() {
  const [agentState, setAgentState] = useState<VaniState>(INITIAL_STATE);
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [status, setStatus] = useState<string>("idle");
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const conversationRef = useRef<any>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLImageElement>(null);

  // Connect to VaniAgent DO for state sync
  const agent = useAgent({
    agent: "vani-agent",
    name: "demo-user",
    onStateUpdate: (state: VaniState) => {
      setAgentState(state);
    },
    onOpen: () => setIsConnected(true),
    onClose: () => setIsConnected(false),
  });

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  // Refresh screenshot when URL changes
  useEffect(() => {
    if (agentState.screenshotUrl && screenshotRef.current) {
      screenshotRef.current.src = `${agentState.screenshotUrl}?t=${Date.now()}`;
    }
  }, [agentState.screenshotUrl]);

  const addTranscript = useCallback((role: "user" | "agent", text: string) => {
    if (!text.trim()) return;
    setTranscript((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role,
        text,
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Start ElevenLabs conversation
  const startConversation = useCallback(async () => {
    try {
      setStatus("connecting");

      // Get signed URL from our backend
      const resp = await fetch("/api/el-signed-url");
      if (!resp.ok) {
        console.error("Failed to get EL signed URL:", resp.status);
        setStatus("error");
        return;
      }
      const { signed_url } = (await resp.json()) as { signed_url: string };

      // Request mic permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start conversation session using ElevenLabs SDK
      const conversation = await Conversation.startSession({
        signedUrl: signed_url,
        onConnect: () => {
          console.log("EL conversation connected");
          setIsListening(true);
          setStatus("connected");
        },
        onDisconnect: (details) => {
          console.log("EL conversation disconnected:", details);
          setIsListening(false);
          setIsSpeaking(false);
          setStatus("idle");
          conversationRef.current = null;
        },
        onMessage: (message) => {
          const msg = message as { source?: string; message?: string };
          if (msg.source === "user" && msg.message) {
            addTranscript("user", msg.message);
          } else if (msg.source === "ai" && msg.message) {
            addTranscript("agent", msg.message);
          }
        },
        onModeChange: (mode) => {
          setIsSpeaking(mode.mode === "speaking");
          setIsListening(mode.mode === "listening");
        },
        onError: (error) => {
          console.error("EL conversation error:", error);
          setStatus("error");
        },
      });

      conversationRef.current = conversation;
    } catch (err) {
      console.error("Failed to start conversation:", err);
      setStatus("error");
      addTranscript("agent", "Mic access nahi mil paya. Kripya microphone permission dein aur dubara try karein.");
    }
  }, [addTranscript]);

  // End conversation
  const endConversation = useCallback(async () => {
    if (conversationRef.current) {
      await conversationRef.current.endSession();
      conversationRef.current = null;
    }
    setIsListening(false);
    setIsSpeaking(false);
    setStatus("idle");
  }, []);

  const handleMicClick = () => {
    if (conversationRef.current) {
      endConversation();
    } else {
      startConversation();
    }
  };

  const progressPercent =
    agentState.formProgress.total > 0
      ? (agentState.formProgress.filled / agentState.formProgress.total) * 100
      : 0;

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* ─── Left Panel: Voice Interface (40%) ─────────────────────── */}
      <div className="w-2/5 flex flex-col bg-[#0f172a] border-r border-slate-700">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
              V
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">VANI</h1>
              <p className="text-xs text-slate-400">Voice Access to the Digital World</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
              />
              <span className="text-xs text-slate-400">
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>
        </div>

        {/* Transcript */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {transcript.length === 0 && (
            <div className="text-center text-slate-500 mt-12">
              <p className="text-sm">Mic button dabao aur baat karo</p>
              <p className="text-xs mt-1">Press the mic to start talking</p>
            </div>
          )}
          {transcript.map((entry) => (
            <div
              key={entry.id}
              className={`transcript-message flex ${
                entry.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                  entry.role === "user"
                    ? "bg-orange-600 text-white rounded-br-sm"
                    : "bg-slate-700 text-slate-100 rounded-bl-sm"
                }`}
              >
                {entry.text}
              </div>
            </div>
          ))}
          <div ref={transcriptEndRef} />
        </div>

        {/* Waveform + Mic Button */}
        <div className="px-6 py-6 border-t border-slate-700">
          {/* Waveform */}
          <div className="flex items-center justify-center gap-1 h-10 mb-4">
            {(isListening || isSpeaking) &&
              Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="waveform-bar"
                  style={{
                    animationDelay: `${i * 0.05}s`,
                    opacity: isSpeaking ? 1 : 0.4,
                    background: isSpeaking ? "#f97316" : "#8b5cf6",
                  }}
                />
              ))}
          </div>

          {/* Mic Orb */}
          <div className="flex justify-center">
            <button
              onClick={handleMicClick}
              className={`mic-orb ${isListening ? "active" : ""} ${status === "connecting" ? "opacity-50" : ""}`}
              disabled={status === "connecting"}
              aria-label={isListening ? "Stop listening" : "Start listening"}
            >
              {status === "connecting" ? (
                <div className="w-10 h-10 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              )}
            </button>
          </div>

          <p className="text-center text-xs text-slate-500 mt-3">
            {status === "connecting"
              ? "Connecting..."
              : status === "error"
                ? "Error — tap to retry"
                : isListening
                  ? isSpeaking
                    ? "VANI bol rahi hai..."
                    : "Sun rahi hoon..."
                  : "Shuru karne ke liye mic dabayein"}
          </p>
        </div>
      </div>

      {/* ─── Right Panel: Browser View (60%) ───────────────────────── */}
      <div className="w-3/5 flex flex-col bg-[#1e293b]">
        {/* Browser Header */}
        <div className="px-6 py-3 border-b border-slate-700 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 bg-slate-800 rounded-full px-4 py-1.5 text-xs text-slate-400 truncate">
            {agentState.isBrowsing
              ? "Loading..."
              : agentState.screenshotUrl
                ? "pmkisan.gov.in/registrationformnew.aspx"
                : "Ready — waiting for voice command"}
          </div>
          {agentState.isBrowsing && (
            <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          )}
        </div>

        {/* Screenshot / Placeholder */}
        <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
          {agentState.screenshotUrl ? (
            <div className="screenshot-container w-full max-h-full">
              <img
                ref={screenshotRef}
                src={agentState.screenshotUrl}
                alt="Browser screenshot"
                className="w-full h-auto"
              />
            </div>
          ) : (
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-slate-800 flex items-center justify-center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#475569"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-300 mb-2">
                Browser Ready
              </h2>
              <p className="text-sm text-slate-500 max-w-sm">
                Jab aap VANI se form bharne ko kahenge, toh yahan real-time mein
                website dikhayi degi.
              </p>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {agentState.formProgress.total > 0 && (
          <div className="px-6 py-4 border-t border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-300">
                Form Progress
              </span>
              <span className="text-sm text-orange-400 font-bold">
                {agentState.formProgress.filled} / {agentState.formProgress.total}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
              <div
                className="progress-fill bg-gradient-to-r from-orange-500 to-orange-400 h-2.5 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {/* Field indicators */}
            <div className="flex gap-1 mt-3">
              {Object.entries(FIELD_LABELS).map(([key, label], i) => (
                <div
                  key={key}
                  className={`flex-1 text-center py-1 px-0.5 rounded text-[10px] ${
                    i < agentState.formProgress.filled
                      ? "bg-green-900/50 text-green-400"
                      : i === agentState.formProgress.filled
                        ? "bg-orange-900/50 text-orange-400 font-bold"
                        : "bg-slate-800 text-slate-600"
                  }`}
                  title={label}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error display */}
        {agentState.error && (
          <div className="mx-6 mb-4 p-3 bg-red-900/30 border border-red-800 rounded-lg text-sm text-red-300">
            {agentState.error}
          </div>
        )}

        {/* Status bar */}
        <div className="px-6 py-2 border-t border-slate-700 flex items-center justify-between text-xs text-slate-500">
          <span>
            Step: {agentState.currentStep}
          </span>
          <span>
            Session: {agentState.sessionId?.substring(0, 8) || "none"}
          </span>
          <span>
            Lang: {agentState.language.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
