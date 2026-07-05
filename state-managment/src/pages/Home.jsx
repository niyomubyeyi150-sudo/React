import { useEffect, useState } from "react";
import { getStories } from "../API/stories";
import StoryList from "../components/StoryList"; 
import { Link, useNavigate } from "react-router-dom"; 

export default function Home() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate(); 

  // 🔐 The Logout Controller Function
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login"); // Instantly sends user back to the login screen gate
  };

  useEffect(() => {
    async function fetchStory() {
      try {
        const data = await getStories();
        setStories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchStory();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#2563eb",
        }}
      >
        📖 Loading stories...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      {/* 🚀 ADDED: Sticky Minimal Dark Navbar Bar for clean Logout Navigation */}
      <nav style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "12px 30px", 
        background: "#1e293b", 
        color: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
      }}>
        <span style={{ fontWeight: "bold", fontSize: "15px", trackingLetter: "0.5px" }}>STUDENT SYSTEM</span>
        <button 
          onClick={handleLogout}
          style={{ 
            padding: "6px 14px", 
            background: "#ef4444", 
            color: "#fff", 
            border: "none", 
            borderRadius: "6px", 
            fontWeight: "bold", 
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </nav>

      {/* Hero Section */}
      <header
        style={{
          background:
            "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
          color: "white",
          padding: "60px 20px",
          textAlign: "center",
          gap: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "15px",
          }}
        >
          📚 Story Book
        </h1>

        <p
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            fontSize: "18px",
            lineHeight: 1.7,
            opacity: 0.95,
          }}
        >
          Discover inspiring stories, share your experiences, and connect
          with people from around the world.
        </p>

        <div
          style={{
            marginTop: "30px",
            display: "inline-block",
            padding: "12px 24px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            fontWeight: "bold",
          }}
        >
          {stories.length} Stories Published
        </div>
        <div
        style={{
            marginTop: "30px",
            marginInline: "10px",
            gap: "10px",
            display: "inline-block",
            padding: "12px 24px",
            borderRadius: "999px",
            background: "white",
            backdropFilter: "blur(10px)",
            fontWeight: "bold",
          }}
        >
            <Link to="/add" style={{color: "#2563eb", textDecoration: "none"}}>Add New Story</Link>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          padding: "0 20px",
        }}
      >
        {/* Stories Feed */}
        <section>
          <StoryList stories={stories} />
        </section>
      </main>
    </div>
  );
}
