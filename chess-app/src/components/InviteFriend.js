import React from "react";
import "../styles/InviteFriend.css";

const InviteFriend = ({ inviteLink }) => {
  if (!inviteLink) return null; // Don't render if no link is available

  return (
    <div className="invite-container">
      <p>Invite your friend using this link:</p>
      
      <input type="text" value={inviteLink || "Generating link..."} readOnly />

      <button onClick={() => {
        navigator.clipboard.writeText(inviteLink);
        alert("Link copied!");
      }}>
        Copy Link
      </button>

      <button onClick={() => {
        const whatsappMessage = `Let's play chess! Join my game: ${inviteLink}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`);
      }}>
        Share on WhatsApp
      </button>
      
    </div>
  );
};

export default InviteFriend;
