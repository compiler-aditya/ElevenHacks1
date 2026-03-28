import { useState, useEffect, useRef, useCallback } from "react";
import { useAgent } from "agents/react";
import { Conversation } from "@elevenlabs/client";
import type { VaniState } from "./types";

// ─── Constants ───────────────────────────────────────────────────────
const FIELD_LABELS: Record<string, string> = {
  aadhaar: "आधार",
  fullName: "नाम",
  state: "राज्य",
  district: "ज़िला",
  subDistrict: "तहसील",
  village: "गाँव",
  bankAccount: "बैंक",
  ifscCode: "IFSC",
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

const QUICK_ACTIONS = [
  { icon: "file-text", label: "Form bharo" },
  { icon: "search", label: "Status check" },
  { icon: "globe", label: "Website kholo" },
  { icon: "help-circle", label: "Kuch bhi poocho" },
];

interface TranscriptEntry {
  id: string;
  role: "user" | "agent";
  text: string;
  timestamp: Date;
}

// ─── SVG Icons ───────────────────────────────────────────────────────
function MicIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--vani-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function FileTextIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--vani-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <line x1="10" x2="8" y1="9" y2="9" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--vani-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--vani-text-ghost)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

// ─── Waveform Component ──────────────────────────────────────────────
function Waveform({ isActive, isSpeaking, isListening, barCount = 20 }: {
  isActive: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  barCount?: number;
}) {
  return (
    <div className="flex items-center justify-center gap-[3px]" style={{ height: 36 }}>
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className={`waveform-bar ${isActive ? (isSpeaking ? "speaking" : "listening") : ""}`}
          style={{ animationDelay: `${i * 0.06}s` }}
        />
      ))}
    </div>
  );
}

// ─── Onboarding Screen ───────────────────────────────────────────────
function OnboardingScreen({ onStart }: { onStart: () => void }) {
  const [lang, setLang] = useState("hi");

  return (
    <div className="h-full flex flex-col items-center justify-between px-6 py-10"
      style={{ background: "radial-gradient(ellipse at top center, rgba(249,115,22,0.06) 0%, transparent 60%)" }}>

      {/* Top */}
      <div className="text-center onboarding-enter">
        <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "var(--font-headline)" }}>
          VANI
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--vani-text-muted)" }}>
          Aapki Digital Didi
        </p>
      </div>

      {/* Center — Feature illustration */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm onboarding-enter-delayed">
        {/* Mic illustration */}
        <div className="w-28 h-28 rounded-full flex items-center justify-center mb-8"
          style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(249,115,22,0.05))", border: "1px solid rgba(249,115,22,0.2)" }}>
          <MicIcon size={48} />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-3" style={{ fontFamily: "var(--font-headline)", color: "var(--vani-text-primary)" }}>
          Bolo, aur ho jayega!
        </h2>
        <p className="text-sm text-center leading-relaxed" style={{ color: "var(--vani-text-muted)" }}>
          Sirf apni awaaz se internet pe kuch bhi karo — forms bharo, websites kholo, kuch bhi dhundho
        </p>
      </div>

      {/* Bottom */}
      <div className="w-full max-w-sm onboarding-enter-delayed-2">
        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl font-semibold text-base text-white flex items-center justify-center gap-3"
          style={{ background: "linear-gradient(135deg, var(--vani-primary), var(--vani-primary-dark))", fontFamily: "var(--font-headline)" }}>
          <MicIcon size={20} />
          Shuru Karein
        </button>

        <p className="text-center text-xs mt-3" style={{ color: "var(--vani-text-ghost)" }}>
          Mic permission ki zaroorat hogi
        </p>

        {/* Language selector */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {[
            { code: "hi", label: "हिंदी" },
            { code: "en", label: "English" },
            { code: "ta", label: "தமிழ்" },
            { code: "bn", label: "বাংলা" },
          ].map((l) => (
            <button
              key={l.code}
              className={`lang-pill ${lang === l.code ? "active" : ""}`}
              onClick={() => setLang(l.code)}>
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Welcome State (Idle, no conversation yet) ───────────────────────
function WelcomeContent() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6">
      {/* V Monogram */}
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ background: "linear-gradient(135deg, var(--vani-primary), var(--vani-primary-dark))" }}>
        <span className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-headline)" }}>V</span>
      </div>

      <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "var(--font-headline)", color: "var(--vani-text-primary)" }}>
        Namaste! Main VANI hoon
      </h3>
      <p className="text-sm mb-8" style={{ color: "var(--vani-text-muted)" }}>
        Internet pe kuch bhi karne mein madad karungi
      </p>

      {/* Feature cards */}
      <div className="w-full max-w-xs space-y-3">
        <div className="feature-card">
          <div className="feature-card-icon"><GlobeIcon /></div>
          <div className="text-left">
            <p className="text-sm font-medium" style={{ color: "var(--vani-text-primary)" }}>Koi bhi website kholo</p>
            <p className="text-xs" style={{ color: "var(--vani-text-muted)" }}>Open any website</p>
          </div>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon"><FileTextIcon /></div>
          <div className="text-left">
            <p className="text-sm font-medium" style={{ color: "var(--vani-text-primary)" }}>Sarkari form bharo</p>
            <p className="text-xs" style={{ color: "var(--vani-text-muted)" }}>Fill government forms</p>
          </div>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon"><SearchIcon /></div>
          <div className="text-left">
            <p className="text-sm font-medium" style={{ color: "var(--vani-text-primary)" }}>Kuch bhi dhundho</p>
            <p className="text-xs" style={{ color: "var(--vani-text-muted)" }}>Search anything</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Browser Empty State ─────────────────────────────────────────────
function BrowserEmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-5 rounded-2xl flex items-center justify-center"
          style={{ background: "var(--vani-bg-surface)", border: "1px solid var(--vani-border-subtle)" }}>
          <MonitorIcon />
        </div>
        <h2 className="text-lg font-semibold mb-2" style={{ fontFamily: "var(--font-headline)", color: "var(--vani-text-secondary)" }}>
          Browser Ready
        </h2>
        <p className="text-sm max-w-xs mx-auto" style={{ color: "var(--vani-text-ghost)" }}>
          Jab aap VANI se website kholne ko kahenge, yahan real-time mein dikhayi degi
        </p>
      </div>
    </div>
  );
}

// ─── Success Overlay ─────────────────────────────────────────────────
function SuccessOverlay({ filled, total, sessionId }: { filled: number; total: number; sessionId: string | null }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10"
      style={{ background: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(8px)" }}>
      <div className="success-overlay text-center px-8 py-10 rounded-3xl max-w-sm"
        style={{ background: "var(--vani-bg-card)", border: "1px solid var(--vani-border)" }}>
        {/* Green check */}
        <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
          style={{ background: "var(--vani-success-soft)", color: "var(--vani-success)" }}>
          <CheckIcon size={32} />
        </div>

        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-headline)", color: "var(--vani-text-primary)" }}>
          Registration Complete!
        </h3>

        {sessionId && (
          <p className="text-sm mb-4" style={{ fontFamily: "var(--font-mono)", color: "var(--vani-primary)" }}>
            ID: {sessionId.substring(0, 12).toUpperCase()}
          </p>
        )}

        <div className="flex items-center justify-center gap-4 text-xs" style={{ color: "var(--vani-text-muted)" }}>
          <span>{filled}/{total} fields</span>
          <span style={{ color: "var(--vani-border)" }}>|</span>
          <span>Hindi</span>
        </div>
      </div>
    </div>
  );
}

// ─── Header Component ────────────────────────────────────────────────
function AppHeader({ isConnected }: { isConnected: boolean }) {
  return (
    <div className="px-5 py-3.5 flex items-center gap-3" style={{ borderBottom: "1px solid var(--vani-border-subtle)" }}>
      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: "linear-gradient(135deg, var(--vani-primary), var(--vani-primary-dark))" }}>
        <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-headline)" }}>V</span>
      </div>
      <div className="min-w-0">
        <h1 className="text-base font-bold leading-tight" style={{ fontFamily: "var(--font-headline)", color: "var(--vani-text-primary)" }}>
          VANI
        </h1>
        <p className="text-[11px] truncate" style={{ fontFamily: "var(--font-label)", color: "var(--vani-text-ghost)" }}>
          Voice Access to the Digital World
        </p>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className={`status-dot ${isConnected ? "connected" : "disconnected"}`} />
        <span className="text-[11px]" style={{ fontFamily: "var(--font-label)", color: "var(--vani-text-ghost)" }}>
          {isConnected ? "Connected" : "Offline"}
        </span>
      </div>
    </div>
  );
}

// ─── Browser Chrome ──────────────────────────────────────────────────
function BrowserChrome({ url, isLoading }: { url: string; isLoading: boolean }) {
  return (
    <div className="px-5 py-2.5 flex items-center gap-3" style={{ borderBottom: "1px solid var(--vani-border-subtle)" }}>
      <div className="flex gap-1.5">
        <div className="browser-dot" style={{ background: "#ef4444" }} />
        <div className="browser-dot" style={{ background: "#eab308" }} />
        <div className="browser-dot" style={{ background: "#22c55e" }} />
      </div>
      <div className="flex-1 rounded-lg px-3 py-1.5 text-xs truncate"
        style={{ background: "var(--vani-bg-deepest)", color: "var(--vani-text-ghost)", fontFamily: "var(--font-label)" }}>
        {url}
      </div>
      {isLoading && (
        <div className="w-4 h-4 border-2 rounded-full animate-spin flex-shrink-0"
          style={{ borderColor: "var(--vani-primary)", borderTopColor: "transparent" }} />
      )}
    </div>
  );
}

// ─── App Component ───────────────────────────────────────────────────
export function App() {
  const [agentState, setAgentState] = useState<VaniState>(INITIAL_STATE);
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [status, setStatus] = useState<string>("idle");
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const conversationRef = useRef<any>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLImageElement>(null);

  const agent = useAgent({
    agent: "vani-agent",
    name: "demo-user",
    onStateUpdate: (state: VaniState) => setAgentState(state),
    onOpen: () => setIsConnected(true),
    onClose: () => setIsConnected(false),
  });

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  useEffect(() => {
    if (agentState.screenshotUrl && screenshotRef.current) {
      screenshotRef.current.src = `${agentState.screenshotUrl}?t=${Date.now()}`;
    }
  }, [agentState.screenshotUrl]);

  const addTranscript = useCallback((role: "user" | "agent", text: string) => {
    if (!text.trim()) return;
    setTranscript((prev) => [...prev, {
      id: crypto.randomUUID(),
      role,
      text,
      timestamp: new Date(),
    }]);
  }, []);

  const startConversation = useCallback(async () => {
    try {
      setStatus("connecting");
      const resp = await fetch("/api/el-signed-url");
      if (!resp.ok) {
        setStatus("error");
        return;
      }
      const { signed_url } = (await resp.json()) as { signed_url: string };
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const conversation = await Conversation.startSession({
        signedUrl: signed_url,
        onConnect: () => {
          setIsListening(true);
          setStatus("connected");
        },
        onDisconnect: () => {
          setIsListening(false);
          setIsSpeaking(false);
          setStatus("idle");
          conversationRef.current = null;
        },
        onMessage: (message) => {
          const msg = message as { source?: string; message?: string };
          if (msg.source === "user" && msg.message) addTranscript("user", msg.message);
          else if (msg.source === "ai" && msg.message) addTranscript("agent", msg.message);
        },
        onModeChange: (mode) => {
          setIsSpeaking(mode.mode === "speaking");
          setIsListening(mode.mode === "listening");
        },
        onError: () => setStatus("error"),
      });

      conversationRef.current = conversation;
    } catch {
      setStatus("error");
      addTranscript("agent", "Mic access nahi mil paya. Kripya microphone permission dein.");
    }
  }, [addTranscript]);

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
    if (conversationRef.current) endConversation();
    else startConversation();
  };

  const handleOnboardingStart = () => {
    setShowOnboarding(false);
    startConversation();
  };

  const isActive = isListening || isSpeaking;
  const isComplete = agentState.currentStep === "complete";
  const progressPercent = agentState.formProgress.total > 0
    ? (agentState.formProgress.filled / agentState.formProgress.total) * 100
    : 0;

  const statusText = status === "connecting"
    ? "Connecting..."
    : status === "error"
      ? "Error — tap to retry"
      : isSpeaking
        ? "VANI bol rahi hai..."
        : isListening
          ? "Sun rahi hoon..."
          : "Mic dabayein";

  // ─── Onboarding (mobile-first, also shown on desktop if first visit)
  if (showOnboarding) {
    return (
      <div className="h-dvh w-screen" style={{ background: "var(--vani-bg-dark)" }}>
        {/* Desktop: centered card */}
        <div className="desktop-only h-full flex items-center justify-center">
          <div className="w-[420px] h-[680px] rounded-3xl overflow-hidden"
            style={{ background: "var(--vani-bg-card)", border: "1px solid var(--vani-border)" }}>
            <OnboardingScreen onStart={handleOnboardingStart} />
          </div>
        </div>
        {/* Mobile: full screen */}
        <div className="mobile-only h-full">
          <OnboardingScreen onStart={handleOnboardingStart} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-dvh w-screen overflow-hidden" style={{ background: "var(--vani-bg-dark)" }}>
      {/* ─── Desktop Layout ───────────────────────────────────────── */}
      <div className="desktop-only flex h-full">
        {/* Left Panel — Voice (40%) */}
        <div className="flex flex-col" style={{ width: "40%", borderRight: "1px solid var(--vani-border-subtle)" }}>
          <AppHeader isConnected={isConnected} />

          {/* Transcript or Welcome */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            {transcript.length === 0 ? (
              <WelcomeContent />
            ) : (
              <div className="space-y-3">
                {transcript.map((entry) => (
                  <div key={entry.id} className={`flex ${entry.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`chat-bubble px-4 py-2.5 text-sm ${
                      entry.role === "user" ? "chat-bubble-user" : "chat-bubble-agent"
                    }`}>
                      {entry.text}
                    </div>
                  </div>
                ))}
                <div ref={transcriptEndRef} />
              </div>
            )}
          </div>

          {/* Quick Actions (when no transcript) */}
          {transcript.length === 0 && (
            <div className="px-5 pb-3">
              <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                {QUICK_ACTIONS.map((action) => (
                  <button key={action.label} className="quick-chip" onClick={handleMicClick}>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Waveform + Mic */}
          <div className="px-5 py-5" style={{ borderTop: "1px solid var(--vani-border-subtle)" }}>
            <Waveform isActive={isActive} isSpeaking={isSpeaking} isListening={isListening} />

            <div className="flex justify-center mt-4">
              <button
                onClick={handleMicClick}
                className={`mic-orb ${isActive ? "active" : ""} ${isListening && !isSpeaking ? "listening" : ""} ${status === "connecting" ? "opacity-50" : ""}`}
                disabled={status === "connecting"}
                aria-label={isActive ? "Stop" : "Start"}>
                {status === "connecting" ? (
                  <div className="w-8 h-8 border-[3px] border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <MicIcon size={36} />
                )}
              </button>
            </div>

            <p className="text-center text-xs mt-3" style={{ fontFamily: "var(--font-label)", color: "var(--vani-text-ghost)" }}>
              {statusText}
            </p>
          </div>
        </div>

        {/* Right Panel — Browser (60%) */}
        <div className="flex flex-col relative" style={{ width: "60%", background: "var(--vani-bg-deepest)" }}>
          <BrowserChrome
            url={agentState.isBrowsing ? "Loading..." : agentState.screenshotUrl ? "Website loading..." : "Ready — waiting for voice command"}
            isLoading={agentState.isBrowsing}
          />

          {/* Screenshot or Empty */}
          {agentState.screenshotUrl ? (
            <div className="flex-1 overflow-hidden p-5">
              <div className="screenshot-container w-full h-full overflow-auto">
                <div className="screenshot-live-badge">
                  <div className="w-2 h-2 rounded-full" style={{ background: "var(--vani-success)" }} />
                  Live
                </div>
                <img ref={screenshotRef} src={agentState.screenshotUrl} alt="Browser" className="w-full h-auto" />
              </div>
            </div>
          ) : (
            <BrowserEmptyState />
          )}

          {/* Success Overlay */}
          {isComplete && (
            <SuccessOverlay
              filled={agentState.formProgress.filled}
              total={agentState.formProgress.total}
              sessionId={agentState.sessionId}
            />
          )}

          {/* Progress */}
          {agentState.formProgress.total > 0 && (
            <div className="px-5 py-3.5" style={{ borderTop: "1px solid var(--vani-border-subtle)" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium" style={{ fontFamily: "var(--font-label)", color: "var(--vani-text-muted)" }}>
                  Form Progress
                </span>
                <span className="text-xs font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--vani-primary)" }}>
                  {agentState.formProgress.filled} / {agentState.formProgress.total}
                </span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
              <div className="flex gap-1 mt-2.5">
                {Object.entries(FIELD_LABELS).map(([key, label], i) => (
                  <div key={key} className={`field-chip flex-1 ${
                    i < agentState.formProgress.filled ? "done" : i === agentState.formProgress.filled ? "current" : "pending"
                  }`}>
                    {i < agentState.formProgress.filled && <span className="inline-block mr-0.5"><CheckIcon size={8} /></span>}
                    {label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {agentState.error && (
            <div className="mx-5 mb-3 px-4 py-2.5 rounded-xl text-sm"
              style={{ background: "var(--vani-error-soft)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.2)" }}>
              {agentState.error}
            </div>
          )}

          {/* Status bar */}
          <div className="px-5 py-2 flex items-center justify-between"
            style={{ borderTop: "1px solid var(--vani-border-subtle)", fontFamily: "var(--font-mono)" }}>
            <span className="text-[10px]" style={{ color: "var(--vani-text-ghost)" }}>
              Step: {agentState.currentStep}
            </span>
            <span className="text-[10px]" style={{ color: "var(--vani-text-ghost)" }}>
              Session: {agentState.sessionId?.substring(0, 8) || "none"}
            </span>
            <span className="text-[10px]" style={{ color: "var(--vani-text-ghost)" }}>
              Lang: {agentState.language.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* ─── Mobile Layout ────────────────────────────────────────── */}
      <div className="mobile-only flex flex-col h-full">
        <AppHeader isConnected={isConnected} />

        {/* Main content area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Screenshot visible when browsing */}
          {agentState.screenshotUrl && (
            <div className="px-4 pt-3" style={{ maxHeight: "45%" }}>
              <div className="screenshot-container overflow-hidden" style={{ maxHeight: "100%" }}>
                <div className="screenshot-live-badge">
                  <div className="w-2 h-2 rounded-full" style={{ background: "var(--vani-success)" }} />
                  Live
                </div>
                <img ref={!agentState.screenshotUrl ? undefined : screenshotRef}
                  src={agentState.screenshotUrl}
                  alt="Browser"
                  className="w-full h-auto" />
              </div>
            </div>
          )}

          {/* Transcript */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {transcript.length === 0 ? (
              <WelcomeContent />
            ) : (
              <div className="space-y-3">
                {transcript.map((entry) => (
                  <div key={entry.id} className={`flex ${entry.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`chat-bubble px-4 py-2.5 text-sm ${
                      entry.role === "user" ? "chat-bubble-user" : "chat-bubble-agent"
                    }`}>
                      {entry.text}
                    </div>
                  </div>
                ))}
                <div ref={transcriptEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        {transcript.length === 0 && (
          <div className="px-4 pb-2">
            <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {QUICK_ACTIONS.map((action) => (
                <button key={action.label} className="quick-chip" onClick={handleMicClick}>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Progress (mobile) */}
        {agentState.formProgress.total > 0 && (
          <div className="px-4 py-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px]" style={{ fontFamily: "var(--font-label)", color: "var(--vani-text-muted)" }}>
                Progress
              </span>
              <span className="text-[11px] font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--vani-primary)" }}>
                {agentState.formProgress.filled}/{agentState.formProgress.total}
              </span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        )}

        {/* Bottom — Waveform + Mic */}
        <div className="bottom-sheet px-5 pt-1 pb-6">
          <div className="bottom-sheet-handle" />
          <Waveform isActive={isActive} isSpeaking={isSpeaking} isListening={isListening} barCount={16} />

          <div className="flex justify-center mt-3">
            <button
              onClick={handleMicClick}
              className={`mic-orb ${isActive ? "active" : ""} ${isListening && !isSpeaking ? "listening" : ""} ${status === "connecting" ? "opacity-50" : ""}`}
              disabled={status === "connecting"}
              aria-label={isActive ? "Stop" : "Start"}>
              {status === "connecting" ? (
                <div className="w-7 h-7 border-[3px] border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <MicIcon size={32} />
              )}
            </button>
          </div>

          <p className="text-center text-xs mt-2.5" style={{ fontFamily: "var(--font-label)", color: "var(--vani-text-ghost)" }}>
            {statusText}
          </p>
        </div>

        {/* Error (mobile) */}
        {agentState.error && (
          <div className="mx-4 mb-2 px-3 py-2 rounded-xl text-xs"
            style={{ background: "var(--vani-error-soft)", color: "#fca5a5" }}>
            {agentState.error}
          </div>
        )}
      </div>
    </div>
  );
}
