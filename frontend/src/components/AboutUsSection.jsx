import React from "react";

const AboutUsSection = () => {
  const handleImageError = (e) => {
    e.target.style.display = "none";
  };

  // Styles for the section
  const styles = {
    section: {
      display: "flex",
      flexWrap: "wrap",
      padding: "40px",
      backgroundColor: "#f9f9f9",
      color: "#333",
      justifyContent: "center",
      gap: "40px",
    },
    mainImage: {
      width: "100%",
      display: "block",
      borderRadius: "10px",
      height: "300px",
      objectFit: "cover"
    },
    overlayImage: {
      position: "absolute",
      bottom: "20px",
      right: "20px",
      width: "150px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      borderRadius: "8px",
      border: "3px solid white",
      backgroundColor: "white",
    },
    contentWrapper: {
      flex: "1 1 400px",
      maxWidth: "600px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    smallLabel: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#ff6f61",
      textTransform: "uppercase",
      marginBottom: "10px",
      letterSpacing: "1.5px",
    },
    
    description: {
      fontSize: "1.1rem",
      lineHeight: "1.6",
      marginBottom: "16px",
      color: "#555",
    },
    checklist: {
      marginTop: "20px",
      paddingLeft: "20px",
      listStyleType: "disc",
      color: "#444",
      fontSize: "1rem",
      lineHeight: "1.5",
    },
    checklistStrong: {
      display: "block",
      fontWeight: "700",
      fontSize: "1.2rem",
      marginBottom: "10px",
      color: "#333",
    },
  };

  return (
<section style={styles.section}>
  <div style={styles.imageWrapper}>
<img
  src="/tyre services/tyre sales (2).jpg"
  alt="A team of five young professionals in a modern office, gathered around a white desk with laptops and documents, collaborating on a project."
  style={{ ...styles.mainImage, marginTop: '20px' }}
  onError={handleImageError}
/>
<img
  src="/tyre services/tyre sales (3).jpg"
  alt="A team of five young professionals in a modern office, gathered around a white desk with laptops and documents, collaborating on a project."
  style={{ ...styles.mainImage, marginTop: '20px' }} // Corrected syntax
  onError={handleImageError}
/>

  </div>
      <div style={styles.contentWrapper}>
        <h1 style={styles.title} className="text-3xl sm:text-4xl md:text-5xl font-bold text-start mb-4">          About Aussie Mobile Tyres <span className="text-red-500"> Your Trusted Mobile Tyre Specialists</span>
</h1>
        <p style={styles.description}>
          At Aussie Mobile Tyres, we understand how important it is to have safe, reliable tyres—without the hassle of visiting a workshop. That’s why we bring expert tyre services directly to you, wherever you are in Melbourne’s south-eastern suburbs. Whether you need new tyres, puncture repairs, wheel balancing, or fleet maintenance, our fully equipped mobile units are ready to deliver fast, convenient solutions.


        </p>
        <p style={styles.description}>
          Our experienced technicians pride themselves on friendly, transparent service and expert advice tailored to your vehicle and budget. We work closely with both everyday drivers and local businesses to keep everyone safely on the road. Plus, we’re committed to eco-friendly tyre recycling, helping protect the environment as we serve the community.
          Choose Aussie Mobile Tyres for dependable, professional, and hassle-free tyre care—because your safety and convenience are our top priorities.
        </p>
        <ul
          style={styles.checklist}
          aria-label="Reasons to choose Aussie Mobile Tyres"
        >
          <strong style={styles.checklistStrong}>
            Why Choose Aussie Mobile Tyres?
          </strong>
          <li>We Come to You – Anytime, Anywhere</li>
          <li>Comprehensive Tyre Services Under One Roof</li>
          <li>Servicing Over 100 South-East Melbourne Suburbs</li>
          <li>Experienced Technicians Who Care About Your Safety</li>
          <li>Fast Response Times, Transparent Pricing</li>
          <li>Eco-Friendly Tyre Recycling for a Greener Future</li>
        </ul>
      </div>
    </section>
  );
};

export default AboutUsSection;
