"use client";

import React, { useState, useId } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Wallet,
  KeyRound,
  MoreHorizontal,
  FileUp,
  Terminal,
  Share2,
  MapPin,
  QrCode,
} from "lucide-react";
import SecondaryModal from "./SecondaryModal";
import RecoveryPhraseRestore from "./RecoveryPhraseRestore";
import NewWallet from "./NewWallet";

import ImportBackup from "./ImportBackup";
import CLISigningKeys from "./CLISigningKeys";
import AccountPubKey from "./AccountPubKey";
import AddressReadOnly from "./AddressReadOnly";
import QRImport from "./QRImport";

function GradientLucideIcon({
  Icon,
  className = "h-6 w-6",
}: {
  Icon: LucideIcon;
  className?: string;
}) {
  const rawId = useId();
  const gradId = `wallet-type-grad-${rawId.replace(/:/g, "")}`;
  return (
    <>
      <svg width={0} height={0} className="absolute" aria-hidden>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="50%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>
        </defs>
      </svg>
      <Icon
        className={className}
        strokeWidth={2}
        stroke={`url(#${gradId})`}
      />
    </>
  );
}

type Item = {
  key: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  openSecondary?: boolean;
};

const items: Item[] = [
  {
    key: "new",
    title: "New Wallet",
    desc: "Generate a brand new wallet",
    icon: Wallet,
    openSecondary: true,
  },
  {
    key: "recovery",
    title: "Recover Wallet",
    desc: "Enter your recovery phrase to recover wallet",
    icon: KeyRound,
    openSecondary: true,
  },
  {
    key: "more",
    title: "More",
    desc: "Show additional wallet import options",
    icon: MoreHorizontal,
  },
];

const moreItems: Item[] = [
  {
    key: "import-backup",
    title: "Import Backup",
    desc: "Restore from Eternal Wallet JSON backup files",
    icon: FileUp,
    openSecondary: true,
  },
  {
    key: "cli-signing-keys",
    title: "CLI Signing Keys",
    desc: "Import CLI generated (skey) signing keys",
    icon: Terminal,
    openSecondary: true,
  },
  {
    key: "account-pubkey",
    title: "Account Public Key (read-only)",
    desc: "Input exported account public key",
    icon: Share2,
    openSecondary: true,
  },
  {
    key: "address-readonly",
    title: "Address (read-only)",
    desc: "Create from a bech32 address",
    icon: MapPin,
    openSecondary: true,
  },
  {
    key: "qr-import",
    title: "QR Code Import",
    desc: "Scan the QR Code from another Eternal Wallet app",
    icon: QrCode,
    openSecondary: true,
  },
];

export default function SelectWalletTypeModal({
  open = true,
  onClose,
  onBack,
  onSelect,
}: {
  open?: boolean;
  onClose?: () => void;
  onBack?: () => void;
  onSelect?: (key: string, payload?: unknown) => void;
}) {
  const [view, setView] = useState<"main" | "more">("main");
  const [activeSecondaryKey, setActiveSecondaryKey] = useState<string | null>(
    null
  );

  if (!open) return null;

  const handleItemClick = (it: Item) => {
    if (it.key === "more") {
      setView("more");
      return;
    }
    if (it.openSecondary) {
      setActiveSecondaryKey(it.key);
      return;
    }
    onSelect?.(it.key);
  };

  const closeSecondary = () => {
    setActiveSecondaryKey(null);
  };

  const confirmFromSecondary = (key: string, payload?: unknown) => {
    setActiveSecondaryKey(null);
    onSelect?.(key, payload);
  };

  const renderItem = (it: Item) => (
    <button
      key={it.key}
      onClick={() => handleItemClick(it)}
      className="w-full text-left rounded-2xl bg-white/5 hover:bg-white/8 px-5 py-4 ring-1 ring-white/10 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 relative">
          <GradientLucideIcon Icon={it.icon} />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-white">{it.title}</div>
          <div className="text-sm text-white/60">{it.desc}</div>
        </div>
        <div className="text-white/40">›</div>
      </div>
    </button>
  );

  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-center justify-center sm:items-start sm:justify-center sm:pt-16">
        {/* Background overlay */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* MODAL CONTAINER */}
        <div
          className="
      relative mx-2 sm:mx-4 w-full 
      max-w-[860px] 
      sm:rounded-3xl 
      bg-neutral-900/95 ring-1 ring-white/10 
      shadow-2xl overflow-hidden
      flex flex-col
      sm:max-h-[90vh]
      sm:overflow-y-auto
      rounded-t-3xl sm:rounded-3xl
      animate-[slideUp_0.25s_ease-out]
    "
        >
          {/* Top gradient bar */}
          <div className="absolute left-6 right-6 top-0 h-[4px] bg-gradient-to-r from-pink-400 via-orange-300 to-fuchsia-500 rounded-full sm:block hidden" />

          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3 sm:px-8 sm:pt-8 sm:pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              {view === "more" && (
                <button
                  onClick={() => setView("main")}
                  className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center ring-1 ring-white/10 text-white/90"
                >
                  ‹
                </button>
              )}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {view === "main"
                    ? "Select wallet type"
                    : "Advanced wallet creation"}
                </h3>
                <p className="hidden sm:block mt-2 text-white/70 text-sm">
                  {view === "main"
                    ? "If you're a new user, create a new wallet, recover existing wallet, or use advanced options."
                    : "Advanced wallet creation. Go back for common options."}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex shrink-0 items-center gap-2">
              {onBack && (
                <button
                  onClick={onBack}
                  className="h-10 px-4 rounded-lg bg-white/5 flex items-center justify-center ring-1 ring-white/10 text-white/90 hover:bg-white/8 transition"
                >
                  ← Back
                </button>
              )}
              <span className="inline-flex items-center rounded-full bg-white/5 px-4 h-10 ring-1 ring-white/10 text-white text-sm">
                mainnet
              </span>
            </div>
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-5 sm:py-8 space-y-3 sm:space-y-4">
            {view === "main"
              ? items.map(renderItem)
              : moreItems.map(renderItem)}
          </div>
        </div>
      </div>

      {/* ✅ Secondary modal flow */}
      <SecondaryModal
        open={!!activeSecondaryKey}
        onClose={closeSecondary}
        title={
          activeSecondaryKey === "new"
            ? "Create New Wallet"
            : activeSecondaryKey === "recovery"
              ? "Recover Wallet"
              : ""
        }
      >
        {activeSecondaryKey === "new" && (
          <NewWallet
            onCancel={closeSecondary}
            onConfirm={(data) => confirmFromSecondary("new", data)}
          />
        )}



        {activeSecondaryKey === "recovery" && (
          <RecoveryPhraseRestore
            onCancel={closeSecondary}
            onConfirm={(data) => confirmFromSecondary("recovery", data)}
          />
        )}



        {activeSecondaryKey === "import-backup" && (
          <ImportBackup
            onCancel={closeSecondary}
            onConfirm={(data) => confirmFromSecondary("import-backup", data)}
          />
        )}
        {activeSecondaryKey === "cli-signing-keys" && (
          <CLISigningKeys
            onCancel={closeSecondary}
            onConfirm={(data) => confirmFromSecondary("cli-signing-keys", data)}
          />
        )}
        {activeSecondaryKey === "account-pubkey" && (
          <AccountPubKey
            onCancel={closeSecondary}
            onConfirm={(data) => confirmFromSecondary("account-pubkey", data)}
          />
        )}
        {activeSecondaryKey === "address-readonly" && (
          <AddressReadOnly
            onCancel={closeSecondary}
            onConfirm={(data) => confirmFromSecondary("address-readonly", data)}
          />
        )}
        {activeSecondaryKey === "qr-import" && (
          <QRImport
            onCancel={closeSecondary}
            onConfirm={(data) => confirmFromSecondary("qr-import", data)}
          />
        )}
      </SecondaryModal>
    </>
  );
}
