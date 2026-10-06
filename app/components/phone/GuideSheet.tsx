"use client";

import { useState } from "react";
import Icon from "../Icon";
import { GUIDE_TOPICS } from "./data";

export default function GuideSheet({
  initialTopic = "cycle",
  onClose,
}: {
  initialTopic?: string;
  onClose: () => void;
}) {
  const [topicId, setTopicId] = useState(initialTopic);
  const topic = GUIDE_TOPICS.find((t) => t.id === topicId) ?? GUIDE_TOPICS[0];

  return (
    <div className="fade-in absolute inset-0 z-40 flex flex-col bg-ink-900">
      <div className="flex items-center justify-between border-b border-ink-600 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal/15 text-signal">
            <Icon name="file" size={16} />
          </span>
          <div>
            <p className="text-xs font-semibold text-paper-50">Pusat Panduan MyMoney</p>
            <p className="text-[9px] text-mist">Tips dan cara pakai fitur agar uang aman</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup panduan"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-ink-700 text-mist hover:text-paper-50"
        >
          <Icon name="close" size={12} strokeWidth={2.4} />
        </button>
      </div>

      <div className="no-scrollbar flex gap-1.5 overflow-x-auto px-4 py-2.5">
        {GUIDE_TOPICS.map((t) => {
          const on = t.id === topicId;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTopicId(t.id)}
              aria-pressed={on}
              className={
                "shrink-0 rounded-lg border px-3 py-1.5 text-[10px] font-semibold transition-colors " +
                (on ? "border-signal bg-signal/15 text-signal" : "border-ink-600 text-mist")
              }
            >
              {t.pill}
            </button>
          );
        })}
      </div>

      <div key={topic.id} className="fade-in no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 pb-4">
        <div>
          <p className="text-sm font-bold leading-tight text-paper-50">{topic.title}</p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-mist">{topic.summary}</p>
        </div>

        <ol className="space-y-1.5">
          {topic.steps.map((s, i) => (
            <li key={s.label} className="flex items-center gap-2.5 rounded-lg bg-ink-800 p-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-ink-700 text-signal">
                <Icon name={s.icon} size={16} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-semibold text-paper-50">{s.label}</span>
                <span className="block text-[10px] text-mist">{s.sub}</span>
              </span>
              {i < topic.steps.length - 1 && <Icon name="arrowRight" size={12} className="rotate-90 text-mist" />}
            </li>
          ))}
        </ol>

        <div className="rounded-lg border border-amber/40 p-2.5">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold text-amber">
            <Icon name="bulb" size={12} /> Tips
          </p>
          <p className="mt-1 text-[10px] leading-relaxed text-paper-100">{topic.tip}</p>
        </div>
      </div>
    </div>
  );
}
