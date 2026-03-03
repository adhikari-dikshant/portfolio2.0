"use client";

import React, { useState, useEffect, useCallback } from "react";
import "./admin.css";

const TABS = ["html", "css", "js"];

const buildSrcdoc = (html, css, js) => `
<!DOCTYPE html><html><head><meta charset="utf-8"/>
<style>*{margin:0;padding:0;box-sizing:border-box;}body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#e5e5e5;}${css}</style>
</head><body>${html}<script>${js}<\/script></body></html>
`;

const emptyForm = { title: "", description: "", tags: "", html: "", css: "", js: "" };

export default function AdminPage() {
    const [authed, setAuthed] = useState(false);
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [authLoading, setAuthLoading] = useState(false);

    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [activeTab, setActiveTab] = useState("html");
    const [showForm, setShowForm] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Check session on mount
    useEffect(() => {
        if (sessionStorage.getItem("admin_authed") === "1") {
            setAuthed(true);
        }
    }, []);

    const fetchSnippets = useCallback(async () => {
        setLoading(true);
        const res = await fetch("/api/snippets");
        const data = await res.json();
        setSnippets(Array.isArray(data) ? data : []);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (authed) fetchSnippets();
    }, [authed, fetchSnippets]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        setAuthError("");
        const res = await fetch("/api/admin/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });
        if (res.ok) {
            sessionStorage.setItem("admin_authed", "1");
            setAuthed(true);
        } else {
            setAuthError("Wrong password. Try again.");
        }
        setAuthLoading(false);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("admin_authed");
        setAuthed(false);
        setPassword("");
    };

    const openNewForm = () => {
        setForm(emptyForm);
        setEditingId(null);
        setActiveTab("html");
        setShowForm(true);
        setMessage("");
    };

    const openEditForm = (snippet) => {
        setForm({
            title: snippet.title || "",
            description: snippet.description || "",
            tags: (snippet.tags || []).join(", "),
            html: snippet.html || "",
            css: snippet.css || "",
            js: snippet.js || "",
        });
        setEditingId(snippet.id);
        setActiveTab("html");
        setShowForm(true);
        setMessage("");
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaveLoading(true);
        setMessage("");

        const payload = {
            title: form.title,
            description: form.description,
            tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
            html: form.html,
            css: form.css,
            js: form.js,
        };

        const url = editingId ? `/api/snippets/${editingId}` : "/api/snippets";
        const method = editingId ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            setMessage(editingId ? "Snippet updated!" : "Snippet created!");
            setShowForm(false);
            fetchSnippets();
        } else {
            const err = await res.json();
            setMessage(`Error: ${err.error}`);
        }
        setSaveLoading(false);
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this snippet?")) return;
        const res = await fetch(`/api/snippets/${id}`, { method: "DELETE" });
        if (res.ok) {
            setSnippets((prev) => prev.filter((s) => s.id !== id));
            setMessage("Snippet deleted.");
        }
    };

    // ── Login screen ────────────────────────────────────────────────────────
    if (!authed) {
        return (
            <div className="admin-login">
                <div className="admin-login-card">
                    <p className="admin-login-eyebrow">Admin</p>
                    <h1 className="admin-login-title">Playground CMS</h1>
                    <form onSubmit={handleLogin} className="admin-login-form">
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="admin-input"
                            autoFocus
                        />
                        {authError && <p className="admin-error">{authError}</p>}
                        <button type="submit" className="admin-btn-primary" disabled={authLoading}>
                            {authLoading ? "Checking..." : "Enter"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // ── Dashboard ────────────────────────────────────────────────────────────
    return (
        <div className="admin-page">
            <div className="admin-header">
                <div>
                    <p className="admin-eyebrow">Admin</p>
                    <h1 className="admin-title">Playground CMS</h1>
                </div>
                <div className="admin-header-actions">
                    <button className="admin-btn-primary" onClick={openNewForm}>
                        + Add Snippet
                    </button>
                    <button className="admin-btn-ghost" onClick={handleLogout}>
                        Log out
                    </button>
                </div>
            </div>

            {message && <p className="admin-message">{message}</p>}

            {/* Snippet Form */}
            {showForm && (
                <div className="admin-form-wrapper">
                    <div className="admin-form-header">
                        <h2>{editingId ? "Edit Snippet" : "New Snippet"}</h2>
                        <button className="admin-btn-ghost" onClick={() => setShowForm(false)}>
                            Cancel
                        </button>
                    </div>

                    <div className="admin-form-layout">
                        {/* Left: form fields */}
                        <form onSubmit={handleSave} className="admin-form">
                            <div className="admin-field">
                                <label>Title *</label>
                                <input
                                    className="admin-input"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    placeholder="e.g. Magnetic Button"
                                    required
                                />
                            </div>
                            <div className="admin-field">
                                <label>Description</label>
                                <input
                                    className="admin-input"
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    placeholder="Short description..."
                                />
                            </div>
                            <div className="admin-field">
                                <label>Tags <span className="admin-label-hint">(comma separated)</span></label>
                                <input
                                    className="admin-input"
                                    value={form.tags}
                                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                                    placeholder="e.g. CSS, Animation, GSAP"
                                />
                            </div>

                            {/* Code Tabs */}
                            <div className="admin-field">
                                <div className="admin-code-tabs">
                                    {TABS.map((tab) => (
                                        <button
                                            key={tab}
                                            type="button"
                                            className={`admin-code-tab ${activeTab === tab ? "active" : ""}`}
                                            onClick={() => setActiveTab(tab)}
                                        >
                                            {tab.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    className="admin-code-editor"
                                    value={form[activeTab]}
                                    onChange={(e) => setForm({ ...form, [activeTab]: e.target.value })}
                                    placeholder={`Write your ${activeTab.toUpperCase()} here...`}
                                    spellCheck={false}
                                />
                            </div>

                            <button type="submit" className="admin-btn-primary" disabled={saveLoading}>
                                {saveLoading ? "Saving..." : editingId ? "Update Snippet" : "Save Snippet"}
                            </button>
                        </form>

                        {/* Right: live preview */}
                        <div className="admin-preview">
                            <p className="admin-preview-label">Live Preview</p>
                            <iframe
                                srcDoc={buildSrcdoc(form.html, form.css, form.js)}
                                sandbox="allow-scripts"
                                title="preview"
                                className="admin-preview-iframe"
                                key={`${form.html}${form.css}${form.js}`}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Snippets list */}
            <div className="admin-snippets">
                {loading ? (
                    <p className="admin-empty">Loading snippets...</p>
                ) : snippets.length === 0 ? (
                    <p className="admin-empty">No snippets yet. Add your first one!</p>
                ) : (
                    snippets.map((s) => (
                        <div key={s.id} className="admin-snippet-row">
                            <div className="admin-snippet-info">
                                <p className="admin-snippet-title">{s.title}</p>
                                <p className="admin-snippet-meta">
                                    {s.description && <span>{s.description} · </span>}
                                    {(s.tags || []).join(", ")}
                                </p>
                            </div>
                            <div className="admin-snippet-actions">
                                <button className="admin-btn-ghost" onClick={() => openEditForm(s)}>
                                    Edit
                                </button>
                                <button className="admin-btn-danger" onClick={() => handleDelete(s.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
