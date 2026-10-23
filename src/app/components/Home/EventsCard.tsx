"use client";

import { useState } from "react";
import Image from "next/image";
import parse, { DOMNode, domToReact, HTMLReactParserOptions } from "html-react-parser";
import { AnimatePresence, motion } from "motion/react";

export interface SingleEvent {
  id: number;
  banner?: {
    EN?: string;
  };
  nameFull?: {
    EN?: string;
  };
  startAt?: string;
  endAt?: string;
  description?: {
    EN?: string;
  };
}

interface EventsCardProps {
  eventsData: Record<string, SingleEvent> | null;
}

function calculateDaysLeft(endAt?: string): string {
  if (!endAt) return "Ends in [X] days";
  try {
    const end = new Date(String(endAt).replace(" ", "T")).getTime();
    const now = Date.now();
    const diff = end - now;
    if (diff <= 0) return "Ended";
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `Ends in ${days} days`;
  } catch {
    return "Ends in [X] days";
  }
}

function cleanEventTitle(title?: string): string {
  if (!title) return "Event";
  return title
    .replace(/<[^>]*>?/gm, "")
    .replace(/^Genshin Impact\s*-\s*/i, "")
    .replace(/^"Genius Invokation TCG"\s*/i, "Genius Invokation TCG: ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function sanitizeEventHtml(html?: string): string {
  if (!html) return "";
  return html
    .replace(/<t\b([^>]*)>/gi, "<span$1>")
    .replace(/<\/t>/gi, "</span>")
    .replace(/\s*contenteditable(\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?/gi, "")
    .replace(/\s*href\s*=\s*(?:""|'')/gi, "");
}

const parseOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode.type === "tag") {
      if (domNode.attribs) {
        delete domNode.attribs.contenteditable;
        delete (domNode.attribs as any).contentEditable;
        if (domNode.attribs.href === "") {
          delete domNode.attribs.href;
        }
      }
      if (domNode.name === "t") {
        const { class: className, ...rest } = domNode.attribs || {};
        delete (rest as any).contenteditable;
        delete (rest as any).contentEditable;
        if ((rest as any).href === "") {
          delete (rest as any).href;
        }
        return (
          <span className={className} {...rest}>
            {domToReact(domNode.children as DOMNode[], parseOptions)}
          </span>
        );
      }
    }
  },
};

export default function EventsCard({ eventsData }: EventsCardProps) {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [showAllModal, setShowAllModal] = useState<boolean>(false);

  // Extract events list
  const eventsList: SingleEvent[] = eventsData
    ? (Object.values(eventsData) as SingleEvent[])
    : [];

  // Sort: by end date
  const sortedEvents = [...eventsList].sort((a, b) => {
    const endA = a.endAt ? new Date(String(a.endAt).replace(" ", "T")).getTime() : 0;
    const endB = b.endAt ? new Date(String(b.endAt).replace(" ", "T")).getTime() : 0;
    return endA - endB;
  });

  // Display top 2 featured events to match the mockup
  const featuredEvents = sortedEvents.slice(0, 2);

  const selectedEvent = eventsList.find((e) => e.id === selectedEventId);

  return (
    <div className="rounded-xl border border-bg-light/70 bg-bg-light/25 flex flex-col p-4 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-2xl font-bold text-primary">Current Events</h2>
        <button
          type="button"
          onClick={() => setShowAllModal(true)}
          className="text-xs md:text-sm text-[#8C7F7F] hover:text-primary transition-colors cursor-pointer"
        >
          All events
        </button>
      </div>

      {/* Events List */}
      <div className="flex flex-col gap-5">
        {featuredEvents.length === 0 ? (
          <div className="flex flex-col gap-4">
            {/* Fallback mockup cards if API is unavailable */}
            <div className="flex flex-col gap-2">
              <div className="aspect-[16/9] w-full rounded-xl bg-[#201b1b] border border-[#2e2626] flex items-center justify-center text-[#8C7F7F] text-sm">
                Event banner (16:9)
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-text text-sm">
                  Initial Top-Up Bonus Reset
                </span>
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  Ends in [X] days
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="aspect-[16/9] w-full rounded-xl bg-[#201b1b] border border-[#2e2626] flex items-center justify-center text-[#8C7F7F] text-sm">
                Event banner (16:9)
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-text text-sm">
                  Genius Invokation TCG
                </span>
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  Ends in [X] days
                </span>
              </div>
            </div>
          </div>
        ) : (
          featuredEvents.map((event) => {
            const bannerUrl = event.banner?.EN;
            const title = cleanEventTitle(event.nameFull?.EN);
            const daysBadge = calculateDaysLeft(event.endAt);

            return (
              <div
                key={event.id}
                onClick={() => setSelectedEventId(event.id)}
                className="flex flex-col gap-2 group cursor-pointer"
              >
                {/* 16:9 Banner */}
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#201b1b] border border-[#2d2626] group-hover:border-primary/50 transition-all duration-300">
                  {bannerUrl ? (
                    <Image
                      src={bannerUrl}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover group-hover:scale-103 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[#8C7F7F] text-xs md:text-sm">
                      Event banner (16:9)
                    </div>
                  )}
                </div>

                {/* Info row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-text text-sm truncate group-hover:text-primary transition-colors">
                    {title}
                  </span>
                  <span className="shrink-0 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                    {daysBadge}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Single Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={() => setSelectedEventId(null)}
          >
            <motion.div
              className="max-h-[85vh] w-full max-w-2xl bg-[#1b1717] border border-[#382f2f] rounded-2xl p-6 overflow-y-auto shadow-2xl flex flex-col gap-4 text-text"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold text-primary">
                  {cleanEventTitle(selectedEvent.nameFull?.EN)}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedEventId(null)}
                  className="text-text/60 hover:text-text p-1 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {selectedEvent.startAt && selectedEvent.endAt && (
                <div className="text-xs text-[#8C7F7F] flex items-center gap-2">
                  <span>Starts: {String(selectedEvent.startAt)}</span>
                  <span>•</span>
                  <span>Ends: {String(selectedEvent.endAt)}</span>
                  <span className="ml-auto text-primary font-semibold">
                    {calculateDaysLeft(selectedEvent.endAt)}
                  </span>
                </div>
              )}

              {selectedEvent.banner?.EN && (
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/40">
                  <Image
                    src={selectedEvent.banner.EN}
                    alt={cleanEventTitle(selectedEvent.nameFull?.EN)}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="prose prose-invert max-w-none text-sm text-text/80 leading-relaxed overflow-x-hidden">
                {selectedEvent.description?.EN
                  ? parse(sanitizeEventHtml(selectedEvent.description.EN), parseOptions)
                  : "No description available."}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* All Events Modal */}
      <AnimatePresence>
        {showAllModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={() => setShowAllModal(false)}
          >
            <motion.div
              className="max-h-[85vh] w-full max-w-3xl bg-[#1b1717] border border-[#382f2f] rounded-2xl p-6 overflow-y-auto shadow-2xl flex flex-col gap-4 text-text"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#2d2525]">
                <h3 className="text-2xl font-bold text-primary">All Events</h3>
                <button
                  type="button"
                  onClick={() => setShowAllModal(false)}
                  className="text-text/60 hover:text-text p-1 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {sortedEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => {
                      setSelectedEventId(event.id);
                    }}
                    className="p-3 rounded-xl bg-[#221c1c] border border-[#302828] hover:border-primary/50 transition-all cursor-pointer flex flex-col gap-2 group"
                  >
                    <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-black/30">
                      {event.banner?.EN && (
                        <Image
                          src={event.banner.EN}
                          alt={cleanEventTitle(event.nameFull?.EN)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      )}
                    </div>
                    <span className="font-semibold text-sm text-text truncate group-hover:text-primary">
                      {cleanEventTitle(event.nameFull?.EN)}
                    </span>
                    <span className="text-xs text-primary self-start font-medium">
                      {calculateDaysLeft(event.endAt)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
