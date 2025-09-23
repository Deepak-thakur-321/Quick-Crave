import React, { useState, useEffect } from 'react'
import '../../styles/profile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
   const { id } = useParams()
   const [profile, setProfile] = useState(null)
   const [posts, setPosts] = useState([])

   useEffect(() => {
      axios.get(`http://localhost:4000/api/food-partner/${id}`, { withCredentials: true })
         .then(response => {
            setProfile(response.data.foodPartner)
            setPosts(response.data.foodPartner.foodItems)
         })
   }, [id])

   return (
      <main className="profile-page">

         {/* Cover Banner */}
         <div className="profile-banner"></div>

         {/* Profile Header */}
         <section className="profile-header">
            <div className="profile-avatar-wrap">
               <img
                  className="profile-avatar"
                  src="https://images.unsplash.com/photo-1602471615287-d733c59b79c4?w=600&auto=format&fit=crop&q=60"
                  alt="profile"
               />
            </div>

            <div className="profile-info">
               <h1 className="profile-name">{profile?.name}</h1>
               <p className="profile-username">@{profile?.username || "influencer"}</p>
               <p className="profile-bio">
                  {profile?.bio || "Lifestyle • Travel • Food 🍕✈️🌍"}
               </p>
               <a href={profile?.link || "#"} className="profile-link" target="_blank" rel="noreferrer">
                  {profile?.link || "www.myinfluencerlife.com"}
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
                  <span className="profile-stat-value">{profile?.followers || "10k"}</span>
                  <span className="profile-stat-label">Followers</span>
               </div>
               <div className="profile-stat" role="listitem">
                  <span className="profile-stat-value">{profile?.following || "500"}</span>
                  <span className="profile-stat-label">Following</span>
               </div>
            </div>
         </section>

         <hr className="profile-sep" />

         {/* Posts Grid */}
         <section className="profile-grid" aria-label="Posts">
            {posts.map((p, i) => (
               <div key={i} className="profile-grid-item">
                  <video
                     className="profile-grid-video"
                     style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                     src={p.video}
                     muted
                     loop
                     autoPlay
                  ></video>
               </div>
            ))}
         </section>
      </main>
   )
}

export default Profile
