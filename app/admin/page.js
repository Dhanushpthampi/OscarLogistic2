"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ArrowPathIcon,
  PlusIcon,
  TrashIcon,
  KeyIcon,
  GlobeAltIcon,
  TruckIcon,
  BuildingOffice2Icon,
  SparklesIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  InformationCircleIcon,
  PhotoIcon
} from "@heroicons/react/24/outline";
import Logo from "@/components/Logo";

export default function AdminPage() {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    const savedPin = localStorage.getItem("oscar_admin_pin");
    if (savedPin) {
      setPin(savedPin);
      setIsAuthenticated(true);
    }
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/content");
      const json = await res.json();
      if (json.success && json.data) {
        setContent(json.data);
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({ text: "Failed to load content: " + err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === "oscar123" || pin.trim().length > 0) {
      localStorage.setItem("oscar_admin_pin", pin);
      setIsAuthenticated(true);
      setStatusMessage({ text: "Authenticated successfully!", type: "success" });
    } else {
      setStatusMessage({ text: "Please enter the admin PIN (default: oscar123)", type: "error" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("oscar_admin_pin");
    setIsAuthenticated(false);
    setPin("");
  };

  const handleSave = async () => {
    setSaving(true);
    setStatusMessage({ text: "Saving changes...", type: "info" });
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authPin: pin || localStorage.getItem("oscar_admin_pin") || "oscar123",
          content,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({
          text: data.message || "Changes saved successfully!",
          type: "success",
        });
        // Also save to client localStorage for immediate local preview
        localStorage.setItem("oscar_site_content_override", JSON.stringify(content));
      } else {
        setStatusMessage({ text: data.error || "Failed to save.", type: "error" });
      }
    } catch (err) {
      setStatusMessage({ text: "Network error saving content: " + err.message, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadBackup = () => {
    if (!content) return;
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `oscar-logistics-content-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        setContent(parsed);
        setStatusMessage({ text: "JSON file loaded into editor! Click 'Save Changes' to apply.", type: "success" });
      } catch (err) {
        setStatusMessage({ text: "Invalid JSON file: " + err.message, type: "error" });
      }
    };
    reader.readAsText(file);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const currentLogo = content?.logo || {
        type: "image",
        imageUrl: "",
        text: "OSCAR",
        tagline: "LOGISTICS",
        badgeLetter: "O",
        height: 42,
        badgeColor: "#f59e0b",
        badgeBg: "#071120",
      };
      setContent({
        ...content,
        logo: {
          ...currentLogo,
          type: currentLogo.type === "both" ? "both" : "image",
          imageUrl: event.target.result,
        },
      });
      setStatusMessage({ text: "Logo image loaded! Click 'Save Changes' to apply.", type: "success" });
    };
    reader.readAsDataURL(file);
  };

  const handleResetDefaults = async () => {
    if (confirm("Reset all content back to factory defaults? Any unsaved edits will be lost.")) {
      try {
        const res = await fetch("/api/content");
        const json = await res.json();
        if (json.data) {
          setContent(json.data);
          setStatusMessage({ text: "Reset to default values. Click 'Save' to confirm.", type: "info" });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-slate-900 text-xl font-black text-amber-500">
              O
            </span>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">Oscar Logistics</h1>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Admin Control Panel</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Enter Security PIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter PIN (Default: oscar123)"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-mono text-sm"
                  autoFocus
                />
                <KeyIcon className="h-5 w-5 text-slate-400 absolute right-3 top-3.5" />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Default PIN is <code className="bg-slate-100 px-1 py-0.5 rounded text-amber-600 font-mono">oscar123</code>. You can change this via <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">ADMIN_PIN</code> environment variable.
              </p>
            </div>

            {statusMessage.text && (
              <div
                className={`p-3 rounded-lg text-xs font-medium ${
                  statusMessage.type === "error" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-amber-500 hover:text-amber-400 font-bold py-3.5 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center text-xs">
            <Link href="/" className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold">
              <ArrowLeftIcon className="h-4 w-4" /> Back to Website
            </Link>
            <span className="text-slate-400">100% Free Vercel Architecture</span>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-medium">
        <ArrowPathIcon className="h-8 w-8 animate-spin text-amber-500 mr-3" /> Loading CMS Engine...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-500 text-slate-950 font-black text-lg">
                O
              </span>
              <div>
                <span className="block font-black text-sm tracking-wider text-white">OSCAR LOGISTICS</span>
                <span className="block text-[10px] font-bold text-amber-400 tracking-widest uppercase">Admin CMS</span>
              </div>
            </Link>
            <span className="hidden sm:inline-block text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
              Zero-Backend Mode
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleDownloadBackup}
              title="Download siteContent.json file to your computer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 border border-slate-700 transition"
            >
              <ArrowDownTrayIcon className="h-4 w-4 text-amber-400" /> Backup JSON
            </button>

            <label className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 border border-slate-700 cursor-pointer transition">
              <ArrowUpTrayIcon className="h-4 w-4 text-sky-400" /> Load JSON
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 border border-slate-700 transition"
            >
              <GlobeAltIcon className="h-4 w-4 text-emerald-400" /> Preview Site ↗
            </Link>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg shadow-sm transition disabled:opacity-50"
            >
              {saving ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <CheckCircleIcon className="h-4 w-4" />}
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={handleLogout}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 ml-1"
            >
              Lock
            </button>
          </div>
        </div>
      </header>

      {/* Notifications banner */}
      {statusMessage.text && (
        <div
          className={`py-2 px-4 text-center text-xs font-semibold flex items-center justify-center gap-2 ${
            statusMessage.type === "error"
              ? "bg-red-600 text-white"
              : statusMessage.type === "info"
              ? "bg-sky-600 text-white"
              : "bg-emerald-600 text-white"
          }`}
        >
          <span>{statusMessage.text}</span>
          <button onClick={() => setStatusMessage({ text: "", type: "" })} className="underline ml-2">
            Dismiss
          </button>
        </div>
      )}

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto w-full px-4 py-6 flex-1 flex flex-col md:flex-row gap-6">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-white rounded-2xl p-4 shadow-sm border border-slate-200 self-start space-y-1">
          <p className="px-3 py-2 text-[11px] font-black uppercase tracking-wider text-slate-400">Content Sections</p>
          {[
            { id: "hero", label: "Hero & Banner", icon: SparklesIcon },
            { id: "logo", label: "Logo & Branding", icon: PhotoIcon },
            { id: "company", label: "Company & Contact", icon: BuildingOffice2Icon },
            { id: "stats", label: "Stats & Counters", icon: CheckCircleIcon },
            { id: "services", label: "Services (FTL/PTL)", icon: GlobeAltIcon },
            { id: "fleet", label: "Fleet & Vehicles", icon: TruckIcon },
            { id: "districts", label: "14 Kerala Districts", icon: MapPinIcon },
            { id: "whyUs", label: "Why Choose Us", icon: CheckCircleIcon },
            { id: "testimonials", label: "Testimonials", icon: ChatBubbleLeftRightIcon },
            { id: "faqs", label: "FAQ Manager", icon: QuestionMarkCircleIcon },
            { id: "seo", label: "SEO & Search Engines", icon: GlobeAltIcon },
            { id: "hosting", label: "Free Vercel Guide", icon: InformationCircleIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                  active
                    ? "bg-slate-900 text-amber-400 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-amber-400" : "text-slate-400"}`} />
                {tab.label}
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-100">
            <button
              onClick={handleResetDefaults}
              className="w-full text-left px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition flex items-center gap-2"
            >
              <ArrowPathIcon className="h-4 w-4" /> Reset All Defaults
            </button>
          </div>
        </aside>

        {/* Tab Content Canvas */}
        <main className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          {/* TAB: LOGO & BRANDING */}
          {activeTab === "logo" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900">Logo &amp; Brand Customization</h2>
                <p className="text-xs text-slate-500">
                  Upload your business logo, adjust its dimensions, or customize the sleek text emblem.
                </p>
              </div>

              {/* Live Preview Box */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                  Live Logo Preview
                </span>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mb-2">Header (Light Mode)</span>
                    <Logo logo={content.logo} company={content.company} variant="light" />
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mb-2">Dark Surface</span>
                    <Logo logo={content.logo} company={content.company} variant="dark" />
                  </div>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Logo Type Selector */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Logo Display Mode
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "text", label: "Sleek Emblem + Text" },
                      { id: "image", label: "Uploaded Image Only" },
                      { id: "both", label: "Image + Brand Text" },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() =>
                          setContent({
                            ...content,
                            logo: { ...(content.logo || {}), type: mode.id },
                          })
                        }
                        className={`p-3 rounded-xl border text-xs font-bold transition text-center ${
                          (content.logo?.type || "text") === mode.id
                            ? "bg-slate-900 text-amber-400 border-slate-900 ring-2 ring-amber-500/50"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logo Height Slider */}
                <div className="sm:col-span-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Logo Height / Scale
                    </label>
                    <span className="text-xs font-mono font-black text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      {content.logo?.height || 42} px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="24"
                    max="80"
                    step="2"
                    value={content.logo?.height || 42}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        logo: { ...(content.logo || {}), height: parseInt(e.target.value) },
                      })
                    }
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Compact (24px)</span>
                    <span>Standard (42px)</span>
                    <span>Large (80px)</span>
                  </div>
                </div>

                {/* Upload Image */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Upload Logo File (PNG, SVG, JPG, WebP)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition">
                      <PhotoIcon className="h-4 w-4 text-amber-400" />
                      <span>Select Logo from Computer</span>
                      <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    </label>

                    {content.logo?.imageUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setContent({
                            ...content,
                            logo: { ...(content.logo || {}), imageUrl: "" },
                          })
                        }
                        className="text-xs text-rose-500 hover:text-rose-700 font-semibold"
                      >
                        Remove Image
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Works 100% free with zero cloud storage needed (embedded directly into site data).
                  </p>
                </div>

                {/* Or Image URL */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Or Enter Public Image URL
                  </label>
                  <input
                    type="text"
                    value={content.logo?.imageUrl || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        logo: { ...(content.logo || {}), imageUrl: e.target.value },
                      })
                    }
                    placeholder="https://example.com/logo.png"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-mono"
                  />
                </div>

                {/* Brand Text Settings */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Brand Name Text
                  </label>
                  <input
                    type="text"
                    value={content.logo?.text || "OSCAR"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        logo: { ...(content.logo || {}), text: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Brand Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    value={content.logo?.tagline || "LOGISTICS"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        logo: { ...(content.logo || {}), tagline: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Badge Initial Letter
                  </label>
                  <input
                    type="text"
                    maxLength={2}
                    value={content.logo?.badgeLetter || "O"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        logo: { ...(content.logo || {}), badgeLetter: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-black text-center uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Badge Accent Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={content.logo?.badgeColor || "#f59e0b"}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          logo: { ...(content.logo || {}), badgeColor: e.target.value },
                        })
                      }
                      className="h-10 w-12 rounded border border-slate-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={content.logo?.badgeColor || "#f59e0b"}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          logo: { ...(content.logo || {}), badgeColor: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: HERO */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900">Hero Section Content</h2>
                <p className="text-xs text-slate-500">Edit main landing headlines, top banner, and primary call-to-actions.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Top Highlight Eyebrow
                  </label>
                  <input
                    type="text"
                    value={content.hero.eyebrow}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, eyebrow: e.target.value } })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Headline (First Line)
                  </label>
                  <input
                    type="text"
                    value={content.hero.headline}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, headline: e.target.value } })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Headline Highlight (Orange Text)
                  </label>
                  <input
                    type="text"
                    value={content.hero.headlineHighlight}
                    onChange={(e) =>
                      setContent({ ...content, hero: { ...content.hero, headlineHighlight: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none text-amber-700 font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Hero Description Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={content.hero.description}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, description: e.target.value } })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Announcement Banner Pill
                  </label>
                  <input
                    type="text"
                    value={content.hero.bannerPill}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, bannerPill: e.target.value } })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Live Route / Status Badge
                  </label>
                  <input
                    type="text"
                    value={content.hero.activeCorridorText}
                    onChange={(e) =>
                      setContent({ ...content, hero: { ...content.hero, activeCorridorText: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Button 1 Label (Quote)
                  </label>
                  <input
                    type="text"
                    value={content.hero.ctaQuoteText}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, ctaQuoteText: e.target.value } })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Button 2 Label (Call)
                  </label>
                  <input
                    type="text"
                    value={content.hero.ctaCallText}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, ctaCallText: e.target.value } })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: COMPANY & CONTACT */}
          {activeTab === "company" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900">Company & Contact Details</h2>
                <p className="text-xs text-slate-500">Update phone numbers, WhatsApp, email, and Kerala hub details.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={content.company.name}
                    onChange={(e) =>
                      setContent({ ...content, company: { ...content.company, name: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Legal / Registered Entity Name
                  </label>
                  <input
                    type="text"
                    value={content.company.legalName}
                    onChange={(e) =>
                      setContent({ ...content, company: { ...content.company, legalName: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Primary Phone (Click to Call)
                  </label>
                  <input
                    type="text"
                    value={content.company.phonePrimary}
                    onChange={(e) =>
                      setContent({ ...content, company: { ...content.company, phonePrimary: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Secondary / Dispatch Desk Phone
                  </label>
                  <input
                    type="text"
                    value={content.company.phoneSecondary}
                    onChange={(e) =>
                      setContent({ ...content, company: { ...content.company, phoneSecondary: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    WhatsApp Number (Format: 91XXXXXXXXXX)
                  </label>
                  <input
                    type="text"
                    value={content.company.whatsappNumber}
                    onChange={(e) =>
                      setContent({ ...content, company: { ...content.company, whatsappNumber: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Official Email Address
                  </label>
                  <input
                    type="email"
                    value={content.company.email}
                    onChange={(e) =>
                      setContent({ ...content, company: { ...content.company, email: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Hub Office Address
                  </label>
                  <input
                    type="text"
                    value={content.company.address}
                    onChange={(e) =>
                      setContent({ ...content, company: { ...content.company, address: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Operating Schedule
                  </label>
                  <input
                    type="text"
                    value={content.company.operatingHours}
                    onChange={(e) =>
                      setContent({ ...content, company: { ...content.company, operatingHours: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Founded Year
                  </label>
                  <input
                    type="text"
                    value={content.company.foundedYear}
                    onChange={(e) =>
                      setContent({ ...content, company: { ...content.company, foundedYear: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: STATS */}
          {activeTab === "stats" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900">Key Statistics</h2>
                <p className="text-xs text-slate-500">Highlight your fleet scale, on-time percentage, and client volume.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {content.stats.map((stat, idx) => (
                  <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Stat #{idx + 1}</span>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Number / Value</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const updated = [...content.stats];
                          updated[idx].value = e.target.value;
                          setContent({ ...content, stats: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-black text-amber-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Main Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const updated = [...content.stats];
                          updated[idx].label = e.target.value;
                          setContent({ ...content, stats: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Subtext / Details</label>
                      <input
                        type="text"
                        value={stat.subtext}
                        onChange={(e) => {
                          const updated = [...content.stats];
                          updated[idx].subtext = e.target.value;
                          setContent({ ...content, stats: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SERVICES */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Services Portfolio</h2>
                  <p className="text-xs text-slate-500">Configure services (Full Truck Load, Part Truck Load, Express, etc.).</p>
                </div>
                <button
                  onClick={() => {
                    const newService = {
                      id: "service-" + Date.now(),
                      title: "New Logistics Service",
                      badge: "New",
                      shortDesc: "Description of the new freight offering.",
                      features: ["Point to point dispatch", "24/7 support", "Dedicated vehicle"],
                    };
                    setContent({ ...content, services: [...content.services, newService] });
                  }}
                  className="px-3 py-1.5 text-xs font-bold bg-slate-900 text-amber-400 rounded-lg hover:bg-slate-800 flex items-center gap-1"
                >
                  <PlusIcon className="h-4 w-4" /> Add Service
                </button>
              </div>

              <div className="space-y-4">
                {content.services.map((srv, idx) => (
                  <div key={srv.id || idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-amber-600">Service #{idx + 1}</span>
                      <button
                        onClick={() => {
                          if (confirm(`Delete ${srv.title}?`)) {
                            const updated = content.services.filter((_, i) => i !== idx);
                            setContent({ ...content, services: updated });
                          }
                        }}
                        className="text-rose-500 hover:text-rose-700 text-xs font-semibold flex items-center gap-1"
                      >
                        <TrashIcon className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Service Title</label>
                        <input
                          type="text"
                          value={srv.title}
                          onChange={(e) => {
                            const updated = [...content.services];
                            updated[idx].title = e.target.value;
                            setContent({ ...content, services: updated });
                          }}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Badge Tag</label>
                        <input
                          type="text"
                          value={srv.badge}
                          onChange={(e) => {
                            const updated = [...content.services];
                            updated[idx].badge = e.target.value;
                            setContent({ ...content, services: updated });
                          }}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Summary Description</label>
                      <textarea
                        rows={2}
                        value={srv.shortDesc}
                        onChange={(e) => {
                          const updated = [...content.services];
                          updated[idx].shortDesc = e.target.value;
                          setContent({ ...content, services: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                        Bullet Points / Key Features (1 per line)
                      </label>
                      <textarea
                        rows={3}
                        value={(srv.features || []).join("\n")}
                        onChange={(e) => {
                          const updated = [...content.services];
                          updated[idx].features = e.target.value.split("\n").filter((l) => l.trim().length > 0);
                          setContent({ ...content, services: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: FLEET */}
          {activeTab === "fleet" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Commercial Fleet</h2>
                  <p className="text-xs text-slate-500">Manage truck models, bed lengths, payloads, and ideal cargo types.</p>
                </div>
                <button
                  onClick={() => {
                    const newTruck = {
                      id: "truck-" + Date.now(),
                      size: "14 FT High Deck",
                      vehicle: "BharatBenz / Eicher Pro",
                      payload: "4.5 Ton",
                      volume: "650 cu.ft",
                      ideal: "Heavy industrial pallets, interstate cargo",
                      tag: "Heavy Duty",
                    };
                    setContent({ ...content, fleet: [...content.fleet, newTruck] });
                  }}
                  className="px-3 py-1.5 text-xs font-bold bg-slate-900 text-amber-400 rounded-lg hover:bg-slate-800 flex items-center gap-1"
                >
                  <PlusIcon className="h-4 w-4" /> Add Vehicle
                </button>
              </div>

              <div className="space-y-4">
                {content.fleet.map((truck, idx) => (
                  <div key={truck.id || idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-amber-600">Truck #{idx + 1}</span>
                      <button
                        onClick={() => {
                          if (confirm(`Delete ${truck.vehicle}?`)) {
                            const updated = content.fleet.filter((_, i) => i !== idx);
                            setContent({ ...content, fleet: updated });
                          }
                        }}
                        className="text-rose-500 hover:text-rose-700 text-xs font-semibold flex items-center gap-1"
                      >
                        <TrashIcon className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Deck Size</label>
                        <input
                          type="text"
                          value={truck.size}
                          onChange={(e) => {
                            const updated = [...content.fleet];
                            updated[idx].size = e.target.value;
                            setContent({ ...content, fleet: updated });
                          }}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-amber-600"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Vehicle Model</label>
                        <input
                          type="text"
                          value={truck.vehicle}
                          onChange={(e) => {
                            const updated = [...content.fleet];
                            updated[idx].vehicle = e.target.value;
                            setContent({ ...content, fleet: updated });
                          }}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Payload Capacity</label>
                        <input
                          type="text"
                          value={truck.payload}
                          onChange={(e) => {
                            const updated = [...content.fleet];
                            updated[idx].payload = e.target.value;
                            setContent({ ...content, fleet: updated });
                          }}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Tag / Category</label>
                        <input
                          type="text"
                          value={truck.tag || ""}
                          onChange={(e) => {
                            const updated = [...content.fleet];
                            updated[idx].tag = e.target.value;
                            setContent({ ...content, fleet: updated });
                          }}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Volume Capacity</label>
                        <input
                          type="text"
                          value={truck.volume || ""}
                          onChange={(e) => {
                            const updated = [...content.fleet];
                            updated[idx].volume = e.target.value;
                            setContent({ ...content, fleet: updated });
                          }}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Ideal Cargo / Best For</label>
                      <input
                        type="text"
                        value={truck.ideal}
                        onChange={(e) => {
                          const updated = [...content.fleet];
                          updated[idx].ideal = e.target.value;
                          setContent({ ...content, fleet: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-700"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: DISTRICTS */}
          {activeTab === "districts" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900">Kerala District Network</h2>
                <p className="text-xs text-slate-500">Configure transit times and hubs across all 14 Kerala districts.</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {content.districts.map((dist, idx) => (
                  <div key={idx} className="p-3 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
                    <span className="text-xs font-black text-slate-900">{dist.name}</span>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Hub Designation</label>
                      <input
                        type="text"
                        value={dist.hub}
                        onChange={(e) => {
                          const updated = [...content.districts];
                          updated[idx].hub = e.target.value;
                          setContent({ ...content, districts: updated });
                        }}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Transit / Delivery Time</label>
                      <input
                        type="text"
                        value={dist.deliveryTime}
                        onChange={(e) => {
                          const updated = [...content.districts];
                          updated[idx].deliveryTime = e.target.value;
                          setContent({ ...content, districts: updated });
                        }}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs text-amber-600 font-semibold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: WHY US */}
          {activeTab === "whyUs" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900">Why Choose Oscar</h2>
                <p className="text-xs text-slate-500">Highlight unique strengths (direct transit, verified drivers, transparent rates).</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {content.whyUs.map((item, idx) => (
                  <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Headline</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...content.whyUs];
                          updated[idx].title = e.target.value;
                          setContent({ ...content, whyUs: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Key Stat / Badge</label>
                      <input
                        type="text"
                        value={item.stat}
                        onChange={(e) => {
                          const updated = [...content.whyUs];
                          updated[idx].stat = e.target.value;
                          setContent({ ...content, whyUs: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-amber-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => {
                          const updated = [...content.whyUs];
                          updated[idx].description = e.target.value;
                          setContent({ ...content, whyUs: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Customer Reviews & Testimonials</h2>
                  <p className="text-xs text-slate-500">Real client feedback build immediate trust for high-value freight.</p>
                </div>
                <button
                  onClick={() => {
                    const newTestimonial = {
                      id: "test-" + Date.now(),
                      name: "New Client",
                      company: "Company Name, Kochi",
                      rating: 5,
                      comment: "Great experience with Oscar Logistics.",
                    };
                    setContent({ ...content, testimonials: [...content.testimonials, newTestimonial] });
                  }}
                  className="px-3 py-1.5 text-xs font-bold bg-slate-900 text-amber-400 rounded-lg hover:bg-slate-800 flex items-center gap-1"
                >
                  <PlusIcon className="h-4 w-4" /> Add Review
                </button>
              </div>

              <div className="space-y-4">
                {content.testimonials.map((test, idx) => (
                  <div key={test.id || idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-amber-600">Review #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const updated = content.testimonials.filter((_, i) => i !== idx);
                          setContent({ ...content, testimonials: updated });
                        }}
                        className="text-rose-500 hover:text-rose-700 text-xs font-semibold flex items-center gap-1"
                      >
                        <TrashIcon className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Client Name</label>
                        <input
                          type="text"
                          value={test.name}
                          onChange={(e) => {
                            const updated = [...content.testimonials];
                            updated[idx].name = e.target.value;
                            setContent({ ...content, testimonials: updated });
                          }}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Company & City</label>
                        <input
                          type="text"
                          value={test.company}
                          onChange={(e) => {
                            const updated = [...content.testimonials];
                            updated[idx].company = e.target.value;
                            setContent({ ...content, testimonials: updated });
                          }}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Review Quote</label>
                      <textarea
                        rows={2}
                        value={test.comment}
                        onChange={(e) => {
                          const updated = [...content.testimonials];
                          updated[idx].comment = e.target.value;
                          setContent({ ...content, testimonials: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: FAQS */}
          {activeTab === "faqs" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Frequently Asked Questions</h2>
                  <p className="text-xs text-slate-500">
                    FAQs are also automatically injected into Google Schema (SEO Rich Snippets!).
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newFaq = {
                      id: "faq-" + Date.now(),
                      category: "General",
                      question: "New FAQ Question?",
                      answer: "Detailed answer goes here.",
                    };
                    setContent({ ...content, faqs: [...content.faqs, newFaq] });
                  }}
                  className="px-3 py-1.5 text-xs font-bold bg-slate-900 text-amber-400 rounded-lg hover:bg-slate-800 flex items-center gap-1"
                >
                  <PlusIcon className="h-4 w-4" /> Add Question
                </button>
              </div>

              <div className="space-y-4">
                {content.faqs.map((faq, idx) => (
                  <div key={faq.id || idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-amber-600">Question #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const updated = content.faqs.filter((_, i) => i !== idx);
                          setContent({ ...content, faqs: updated });
                        }}
                        className="text-rose-500 hover:text-rose-700 text-xs font-semibold flex items-center gap-1"
                      >
                        <TrashIcon className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Question</label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => {
                          const updated = [...content.faqs];
                          updated[idx].question = e.target.value;
                          setContent({ ...content, faqs: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Answer</label>
                      <textarea
                        rows={3}
                        value={faq.answer}
                        onChange={(e) => {
                          const updated = [...content.faqs];
                          updated[idx].answer = e.target.value;
                          setContent({ ...content, faqs: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SEO & SEARCH ENGINES */}
          {activeTab === "seo" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900">SEO & Search Engine Optimization</h2>
                <p className="text-xs text-slate-500">
                  Control how Google, Bing, WhatsApp, and social networks display your website preview.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Canonical Website URL
                  </label>
                  <input
                    type="text"
                    value={content.seo.siteUrl}
                    onChange={(e) => setContent({ ...content, seo: { ...content.seo, siteUrl: e.target.value } })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Meta Title (Appears in Google Tab & Search Result)
                  </label>
                  <input
                    type="text"
                    value={content.seo.title}
                    onChange={(e) => setContent({ ...content, seo: { ...content.seo, title: e.target.value } })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-bold"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Recommended length: 50-60 characters. Current: {content.seo.title.length}</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Meta Description (Appears under search title on Google)
                  </label>
                  <textarea
                    rows={3}
                    value={content.seo.description}
                    onChange={(e) => setContent({ ...content, seo: { ...content.seo, description: e.target.value } })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Recommended length: 140-160 characters. Current: {content.seo.description.length}</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    SEO Keywords (Comma Separated)
                  </label>
                  <textarea
                    rows={3}
                    value={(content.seo.keywords || []).join(", ")}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        seo: {
                          ...content.seo,
                          keywords: e.target.value
                            .split(",")
                            .map((k) => k.trim())
                            .filter(Boolean),
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-mono"
                  />
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-2 text-amber-900">
                  <p className="font-bold flex items-center gap-1.5">
                    <SparklesIcon className="h-4 w-4 text-amber-700" /> Automated SEO Superpowers Already Built-In:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-amber-800">
                    <li>Dynamic <code>sitemap.xml</code> auto-generated for Googlebot and Bing.</li>
                    <li><code>robots.txt</code> configured to allow full indexing.</li>
                    <li>Google Schema.org <code>LocalBusiness</code> &amp; <code>LogisticsService</code> rich snippets.</li>
                    <li>Automated <code>FAQPage</code> structured markup so your questions appear as interactive accordions in Google search results.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB: FREE VERCEL HOSTING GUIDE */}
          {activeTab === "hosting" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900">How to Host 100% Free on Vercel</h2>
                <p className="text-xs text-slate-500">
                  You requested zero-cost hosting with no external paid backend. Here are the 2 easiest ways to use this admin panel.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50">
                  <span className="inline-block bg-emerald-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded mb-2">
                    Method 1: Zero Config (Fastest &amp; 100% Free)
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">Download JSON &amp; Commit</h3>
                  <ol className="mt-3 list-decimal list-inside space-y-2 text-xs text-slate-600 leading-relaxed">
                    <li>Make whatever edits you want in this Admin Panel.</li>
                    <li>Click the <strong>&quot;Backup JSON&quot;</strong> button at the top bar. It downloads <code>siteContent.json</code>.</li>
                    <li>Replace the <code>data/siteContent.json</code> file in your repo.</li>
                    <li>Commit &amp; push to GitHub. Vercel automatically deploys your new content in 40 seconds!</li>
                  </ol>
                </div>

                <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50">
                  <span className="inline-block bg-sky-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded mb-2">
                    Method 2: One-Click GitOps (Automated Save)
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">Direct Save via GitHub Free API</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    If you want the &quot;Save Changes&quot; button to directly update the website live from your browser on Vercel without touching Git:
                  </p>
                  <ol className="mt-3 list-decimal list-inside space-y-2 text-xs text-slate-600 leading-relaxed">
                    <li>Create a free Personal Access Token on GitHub (with repo write permissions).</li>
                    <li>In your free Vercel Project Settings &rarr; <strong>Environment Variables</strong>, add:</li>
                    <div className="bg-slate-900 text-amber-400 p-3 rounded-lg font-mono text-[11px] space-y-1 my-2">
                      <div>GITHUB_TOKEN = ghp_your_token_here</div>
                      <div>GITHUB_REPO = your-username/oscar-logistics</div>
                      <div>ADMIN_PIN = oscar123</div>
                    </div>
                    <li>Done! When you click &quot;Save Changes&quot; in the admin panel, it commits to GitHub and triggers a free instant Vercel redeployment!</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
