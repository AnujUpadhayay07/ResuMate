import React from 'react';

function FeaturesSection() {
  const styles = {
    section: {
      padding: '40px 20px',
      backgroundColor: '#f9f9ff',
    },
    title: {
      fontSize: '26px',
      fontWeight: '600',
      marginBottom: '30px',
      textAlign: 'center',
      color: '#333',
    },
    cardContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '20px',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '20px',
      width: '280px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease-in-out',
    },
    iconCircle: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: '#e6f0ff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
      color: '#0077cc',
      marginBottom: '15px',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '10px',
      color: '#222',
    },
    cardText: {
      fontSize: '15px',
      color: '#555',
      lineHeight: '1.5',
    }
  };

  const features = [
    {
      icon: '📊',
      title: 'In-depth Analysis',
      description: 'Detailed AI-powered resume insights to highlight your strengths and fix weaknesses.',
    },
    {
      icon: '💼',
      title: 'Career Portal',
      description: 'Explore top job listings directly integrated into your dashboard to apply with ease.',
    },
    {
      icon: '🧭',
      title: 'Personalized Guidance',
      description: 'Smart suggestions and career advice based on your profile and aspirations.',
    }
  ];

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Our Key Features</h2>
      <div style={styles.cardContainer}>
        {features.map((feature, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.iconCircle}>{feature.icon}</div>
            <h3 style={styles.cardTitle}>{feature.title}</h3>
            <p style={styles.cardText}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;