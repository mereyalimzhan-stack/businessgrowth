import React, { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Coins,
  Eye,
  EyeOff,
  X,
} from "lucide-react";
import type { ClientStatus } from "../types";
import { hue, initials } from "../utils";

export function Brand({
  subtitle,
  compact,
}: {
  subtitle?: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "brand compact" : "brand"}>
      <div className="brand-mark">
        <Coins size={compact ? 17 : 20} strokeWidth={2.4} />
      </div>
      {!compact && (
        <div className="minw0">
          <div className="brand-title">
            Business<span>Growth</span>
          </div>
          {subtitle && <div className="brand-sub">{subtitle}</div>}
        </div>
      )}
    </div>
  );
}

export function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <span className="blob b1" />
      <span className="blob b2" />
      <span className="blob b3" />
      <span className="grid-overlay" />
    </div>
  );
}

export function Spinner({ size = 18 }: { size?: number }) {
  return <span className="spinner" style={{ width: size, height: size }} />;
}

export function Splash({ text }: { text?: string }) {
  return (
    <div className="center-page">
      <div className="splash">
        <div className="splash-mark">
          <Coins size={30} strokeWidth={2.3} />
        </div>
        <div className="splash-bar">
          <span />
        </div>
        {text && <p className="muted">{text}</p>}
      </div>
    </div>
  );
}

export function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = true,
  min,
  max,
  step,
  hint,
  icon,
  autoComplete,
  autoFocus,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number | string;
  hint?: string;
  icon?: React.ReactNode;
  autoComplete?: string;
  autoFocus?: boolean;
  disabled?: boolean;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <span className={icon ? "input-wrap has-icon" : "input-wrap"}>
        {icon && <span className="input-icon">{icon}</span>}
        <input
          className="input"
          type={isPassword && show ? "text" : type}
          required={required}
          value={value}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          inputMode={type === "number" ? "decimal" : undefined}
          onChange={(e) => onChange(e.target.value)}
        />
        {isPassword && (
          <button
            type="button"
            className="input-eye"
            onClick={() => setShow(!show)}
            aria-label={show ? "Скрыть пароль" : "Показать пароль"}
          >
            {show ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </span>
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  );
}

export function Textarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <textarea
        className="input textarea"
        value={value}
        placeholder={placeholder}
        rows={3}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export function Select<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <span className="input-wrap select-wrap">
        <select
          className="input"
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}

export function Segmented<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: React.ReactNode }[];
}) {
  const index = Math.max(
    0,
    options.findIndex((o) => o.value === value)
  );
  return (
    <div
      className="segmented"
      role="tablist"
      style={{ ["--n" as any]: options.length, ["--i" as any]: index }}
    >
      <span className="segmented-thumb" />
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="tab"
          aria-selected={o.value === value}
          className={
            o.value === value ? "segmented-item active" : "segmented-item"
          }
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Modal({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle?: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-grip" />
        <div className="modal-head">
          <div className="minw0">
            <h3>{title}</h3>
            {subtitle && <p className="muted">{subtitle}</p>}
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Закрыть"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      fromRef.current = target;
      return;
    }
    const from = fromRef.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      const v = from + (target - from) * eased;
      setValue(v);
      if (t < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      fromRef.current = target;
    };
  }, [target, duration]);

  return value;
}

export function CountUp({
  value,
  format,
}: {
  value: number;
  format?: (n: number) => string;
}) {
  const v = useCountUp(value);
  const rounded = Math.round(v);
  return <>{format ? format(rounded) : rounded.toLocaleString("ru-RU")}</>;
}

export function Stat({
  title,
  value,
  format,
  icon,
  tone = "violet",
  hint,
}: {
  title: string;
  value: number;
  format?: (n: number) => string;
  icon: React.ReactNode;
  tone?: "violet" | "cyan" | "lime" | "pink" | "amber" | "red";
  hint?: React.ReactNode;
}) {
  return (
    <div className={`stat tone-${tone}`}>
      <div className="stat-glow" />
      <div className="stat-top">
        <span className="stat-label">{title}</span>
        <span className="stat-icon">{icon}</span>
      </div>
      <div className="stat-value">
        <CountUp value={value} format={format} />
      </div>
      {hint && <div className="stat-hint">{hint}</div>}
    </div>
  );
}

export function Empty({
  icon,
  title,
  text,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  text?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="empty">
      {icon && <div className="empty-icon">{icon}</div>}
      <b>{title}</b>
      {text && <p>{text}</p>}
      {action}
    </div>
  );
}

export function StatusBadge({ status }: { status: ClientStatus }) {
  const cls =
    status === "VIP"
      ? "badge badge-vip"
      : status === "Активный"
      ? "badge badge-active"
      : "badge badge-basic";
  return <span className={cls}>{status === "VIP" ? "★ VIP" : status}</span>;
}

export function Avatar({
  name,
  size = "md",
}: {
  name: string;
  size?: "sm" | "md" | "lg";
}) {
  const h = hue(name || "x");
  return (
    <span
      className={`avatar avatar-${size}`}
      style={{
        background: `linear-gradient(135deg, hsl(${h} 85% 62%), hsl(${
          (h + 50) % 360
        } 85% 52%))`,
      }}
    >
      {initials(name)}
    </span>
  );
}

export interface Notice {
  kind: "error" | "success";
  text: string;
}

export function Toast({
  notice,
  onClose,
}: {
  notice: Notice | null;
  onClose: () => void;
}) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(
      () => closeRef.current(),
      notice.kind === "success" ? 3200 : 6500
    );
    return () => clearTimeout(t);
  }, [notice]);

  if (!notice) return null;
  return (
    <div
      className={`toast toast-${notice.kind}`}
      role={notice.kind === "error" ? "alert" : "status"}
    >
      <span className="toast-icon">
        {notice.kind === "error" ? (
          <AlertTriangle size={17} />
        ) : (
          <CheckCircle2 size={17} />
        )}
      </span>
      <span className="grow">{notice.text}</span>
      <button
        type="button"
        className="icon-btn sm"
        onClick={onClose}
        aria-label="Закрыть"
      >
        <X size={15} />
      </button>
    </div>
  );
}

export function TiltCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function move(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  }

  function leave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      ref={ref}
      className={`tilt ${className || ""}`}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      {children}
    </div>
  );
}
