// src/pages/food-partner/Profile.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/profile.css";

const Profile = () => {
   const { id } = useParams(); // partner id from URL
   const [profile, setProfile] = useState(null);
   const [posts, setPosts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   useEffect(() => {
      const fetchProfile = async () => {
         try {
            setLoading(true);
            const response = await axios.get(
               `http://localhost:4000/api/food-partner/${id}`,
               { withCredentials: true }
            );

            if (response.data && response.data.foodPartner) {
               setProfile(response.data.foodPartner);
               setPosts(response.data.foodPartner.foodItems || []);
            } else {
               setError("Profile not found");
            }
         } catch (err) {
            console.error(err);
            setError("Something went wrong while fetching the profile.");
         } finally {
            setLoading(false);
         }
      };

      fetchProfile();
   }, [id]);

   if (loading) return <div className="loading">Loading...</div>;
   if (error) return <div className="error">{error}</div>;

   return (
      <main className="profile-page">
         {/* Cover Banner */}
         <div
            className="profile-banner"
            style={{
               backgroundImage: `url(${profile?.coverImage || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=60"})`,
               backgroundSize: "cover",
               backgroundPosition: "center",
            }}
         ></div>

         {/* Profile Header */}
         <section className="profile-header">
            <div className="profile-avatar-wrap">
               <img
                  className="profile-avatar"
                  src={
                     profile?.avatar ||
                     "https://images.unsplash.com/photo-1602471615287-d733c59b79c4?w=600&auto=format&fit=crop&q=60"
                  }
                  alt="profile"
               />
            </div>

            <div className="profile-info">
               <h1 className="profile-name">{profile?.name || "Food Partner"}</h1>
               <p className="profile-username">@{profile?.username || "partner"}</p>
               <p className="profile-bio">
                  {profile?.bio || "Sharing delicious food items 🍕🥗🍔"}
               </p>
               <a
                  href={profile?.link || "#"}
                  className="profile-link"
                  target="_blank"
                  rel="noreferrer"
               >
                  {profile?.link || "www.myfoodpartner.com"}
               </a>

               {/* Action Buttons */}
               <div className="profile-actions">
                  <button className="btn follow-btn">Follow</button>
                  <button className="btn message-btn">Message</button>
               </div>
            </div>

            {/* Stats */}
            <div className="profile-stats" role="list" aria-label="Stats">
               <div className="profile-stat" role="listitem">
                  <span className="profile-stat-value">{posts.length}</span>
                  <span className="profile-stat-label">Posts</span>
               </div>
               <div className="profile-stat" role="listitem">
                  <span className="profile-stat-value">
                     {profile?.followers || "0"}
                  </span>
                  <span className="profile-stat-label">Followers</span>
               </div>
               <div className="profile-stat" role="listitem">
                  <span className="profile-stat-value">
                     {profile?.following || "0"}
                  </span>
                  <span className="profile-stat-label">Following</span>
               </div>
            </div>
         </section>

         <hr className="profile-sep" />

         {/* Posts Grid */}
         <section className="profile-grid" aria-label="Posts">
            {posts.length === 0 ? (
               <p className="no-posts">No food items posted yet.</p>
            ) : (
               posts.map((p, i) => (
                  <div key={i} className="profile-grid-item">
                     {p.video ? (
                        <video
                           className="profile-grid-video"
                           src={p.video}
                           muted
                           loop
                           autoPlay
                           style={{ objectFit: "cover", width: "100%", height: "100%" }}
                        />
                     ) : (
                        <img
                           src={p.image || "https://via.placeholder.com/300"}
                           alt={p.name || "Food Item"}
                           style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                     )}
                  </div>
               ))
            )}
         </section>
      </main>
   );
};

export default Profile;
