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
          <p className="profile-dialog-location">
            <MapPin size={14} /> {profile.location}
          </p>
          <div className="profile-social-links">
            <a className="github-profile-link" href={profile.githubUrl} target="_blank" rel="noreferrer">
              <strong>⌘</strong> GitHub <ArrowUpRight size={13} />
            </a>
            <a className="github-profile-link" href={profile.linkedinUrl} target="_blank" rel="noreferrer">
              <strong>in</strong> LinkedIn <ArrowUpRight size={13} />
            </a>
            <a className="github-profile-link" href={profile.xUrl} target="_blank" rel="noreferrer">
              <strong>𝕏</strong> X <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
