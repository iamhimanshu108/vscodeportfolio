import "./ProfileDialog.css";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { MdClose, MdLocationOn, MdOpenInNew } from "react-icons/md";
import { profile } from "../data/profileData.js";

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
            <MdClose size={18} />
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
          <p className="profile-dialog-location text-[11px]">
            <MdLocationOn size={16} aria-hidden="true" /> {profile.location}
          </p>
          <div className="mt-[17px] flex flex-wrap justify-center gap-2">
            <a className="inline-flex min-w-[105px] items-center justify-center gap-1 whitespace-nowrap rounded border border-[#3b4746] bg-[#26312f] px-2 py-[6px] font-[var(--mono)] text-[9px] text-[#d7e8e5] no-underline transition-colors hover:border-[#5c817a] hover:bg-[#2c3d39]" href={profile.githubUrl} target="_blank" rel="noreferrer">
              <FaGithub size={13} aria-hidden="true" /> GitHub <MdOpenInNew size={14} aria-hidden="true" />
            </a>
            <a className="inline-flex min-w-[105px] items-center justify-center gap-1 whitespace-nowrap rounded border border-[#3b4746] bg-[#26312f] px-2 py-[6px] font-[var(--mono)] text-[9px] text-[#d7e8e5] no-underline transition-colors hover:border-[#5c817a] hover:bg-[#2c3d39]" href={profile.linkedinUrl} target="_blank" rel="noreferrer">
              <FaLinkedin size={13} aria-hidden="true" /> LinkedIn <MdOpenInNew size={14} aria-hidden="true" />
            </a>
            <a className="inline-flex min-w-[105px] items-center justify-center gap-1 whitespace-nowrap rounded border border-[#3b4746] bg-[#26312f] px-2 py-[6px] font-[var(--mono)] text-[9px] text-[#d7e8e5] no-underline transition-colors hover:border-[#5c817a] hover:bg-[#2c3d39]" href={profile.xUrl} target="_blank" rel="noreferrer">
              <FaXTwitter size={12} aria-hidden="true" /> X <MdOpenInNew size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
