import "./ProfileDialog.css";
import { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
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
        aria-label="Profile photo"
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
        </div>
      </section>
    </div>
  );
}
