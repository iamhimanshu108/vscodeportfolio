import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MapPin, X } from "lucide-react";
import { profile } from "../data/portfolio.js";

export function ProfileDialog({ onClose }) {
  const [avatarLoadFailed, setAvatarLoadFailed] = useState(false);
  const closeButton = useRef(null);

  useEffect(() => {
    closeButton.current?.focus();
  }, []);

  return (
    <div
      className="profile-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="profile-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-dialog-title"
      >
        <div className="profile-dialog-top">
          <span>PROFILE / PHOTO</span>
          <button
            className="icon-button"
            ref={closeButton}
            onClick={onClose}
            aria-label="Close profile"
          >
            <X size={16} />
          </button>
        </div>
        <div className="profile-dialog-content">
          {avatarLoadFailed ? (
            <div className="profile-photo-large profile-photo-fallback">HY</div>
          ) : (
            <img
              className="profile-photo-large"
              src={profile.avatarUrl}
              alt={`${profile.name} profile photo`}
              onError={() => setAvatarLoadFailed(true)}
            />
          )}
          <h2 id="profile-dialog-title">{profile.name}</h2>
          <p className="profile-dialog-role">{profile.role}</p>
          <p className="profile-dialog-location text-[11px]">
            <MapPin size={14} /> {profile.location}
          </p>
          <div className="mt-[17px] flex flex-wrap justify-center gap-2">
            <a className="inline-flex min-w-[105px] items-center justify-center gap-1 whitespace-nowrap rounded border border-[#3b4746] bg-[#26312f] px-2 py-[6px] font-[var(--mono)] text-[9px] text-[#d7e8e5] no-underline transition-colors hover:border-[#5c817a] hover:bg-[#2c3d39]" href={profile.githubUrl} target="_blank" rel="noreferrer">
              <strong className="text-[13px] leading-none">⌘</strong> GitHub <ArrowUpRight size={13} />
            </a>
            <a className="inline-flex min-w-[105px] items-center justify-center gap-1 whitespace-nowrap rounded border border-[#3b4746] bg-[#26312f] px-2 py-[6px] font-[var(--mono)] text-[9px] text-[#d7e8e5] no-underline transition-colors hover:border-[#5c817a] hover:bg-[#2c3d39]" href={profile.linkedinUrl} target="_blank" rel="noreferrer">
              <strong className="text-[13px] leading-none">in</strong> LinkedIn <ArrowUpRight size={13} />
            </a>
            <a className="inline-flex min-w-[105px] items-center justify-center gap-1 whitespace-nowrap rounded border border-[#3b4746] bg-[#26312f] px-2 py-[6px] font-[var(--mono)] text-[9px] text-[#d7e8e5] no-underline transition-colors hover:border-[#5c817a] hover:bg-[#2c3d39]" href={profile.xUrl} target="_blank" rel="noreferrer">
              <strong className="text-[13px] leading-none">𝕏</strong> X <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
